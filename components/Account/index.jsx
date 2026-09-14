import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from 'convex/react';
import { COLORS } from '../../constants';
import { useAuth } from '../../context/auth';
import { api } from '../../convex/_generated/api';
import { formatRelative, formatStamp, versionPreview } from '../../lib/resumes';
import isConvexEnabled from '../../lib/convex';
import Button from '../Button';

const styles = {
  button: {
    padding: '20px',
    borderLeft: `2px solid ${COLORS.darkBrown}`,
    borderTop: 'none',
    borderBottom: 'none',
    borderRight: 'none',
    fontWeight: 'normal',
    fontFamily: 'Mabry',
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    background: COLORS.yellow,
  },
  hover: {
    background: COLORS.red,
    color: COLORS.darkBrown,
  },
};

const Wrap = styled.div`
  display: flex;
  position: relative;
`;

const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${COLORS.darkBrown};
  margin-right: 8px;
`;

const Panel = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 360px;
  max-height: calc(100vh - 110px);
  z-index: 20;
  background: ${COLORS.yellow};
  border: 2px solid ${COLORS.darkBrown};
  box-sizing: border-box;
  font-family: Helvetica;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PanelBody = styled.div`
  padding: 16px 16px 0;
  flex-shrink: 0;
`;

const PanelFooter = styled.div`
  padding: 12px 16px 16px;
  flex-shrink: 0;
  border-top: 2px solid ${COLORS.darkBrown};
`;

const SectionTitle = styled.h4`
  margin: 0 0 10px;
  font-family: Mabry;
  font-weight: normal;
  font-size: 16px;
`;

const Hint = styled.div`
  margin: 10px 0 0;
  font-size: 13px;
  min-height: 1.2em;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  margin-top: 12px;
`;

const Prefix = styled.span`
  opacity: 0.65;
  font-size: 13px;
  flex-shrink: 0;
`;

const VersionsBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  margin-top: 16px;
  border-top: 2px solid ${COLORS.darkBrown};
`;

const VersionsHeader = styled.div`
  padding: 12px 16px 8px;
  flex-shrink: 0;
`;

const VersionsHint = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  opacity: 0.65;
  line-height: 1.35;
`;

const VersionsScroll = styled.div`
  flex: 1;
  min-height: 140px;
  max-height: 280px;
  overflow-y: auto;
  padding: 0 12px 12px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS.darkBrown};
  }
`;

const VersionCard = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  margin: 0 0 8px;
  padding: 10px 12px;
  border: 2px solid ${COLORS.darkBrown};
  background: ${(p) => (p.$active ? 'white' : COLORS.background)};
  cursor: pointer;
  font-family: Helvetica;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: white;
  }
`;

const VersionMeta = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
  font-family: Mabry;
  font-size: 13px;
`;

const VersionTitle = styled.div`
  font-size: 14px;
  line-height: 1.3;
`;

const VersionSnippet = styled.div`
  margin-top: 4px;
  font-size: 12px;
  opacity: 0.6;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const VersionBadge = styled.span`
  flex-shrink: 0;
  font-size: 11px;
  opacity: 0.7;
`;

const Field = styled.input`
  flex: 1;
  min-width: 0;
  padding: 8px;
  border: 2px solid ${COLORS.darkBrown};
  background: white;
  font-family: Helvetica;
  box-sizing: border-box;
`;

const SmallButton = styled.button`
  padding: 8px 12px;
  border: 2px solid ${COLORS.darkBrown};
  background: ${(p) => (p.$primary ? COLORS.darkBrown : 'white')};
  color: ${(p) => (p.$primary ? 'white' : COLORS.darkBrown)};
  cursor: pointer;
  font-family: Mabry;
  white-space: nowrap;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  border: 2px solid ${COLORS.darkBrown};
  background: white;
  cursor: pointer;
  font-family: Mabry;
  font-size: 16px;
`;

const FLASH_MS = 1600;

function useFlashLabels() {
  const [labels, setLabels] = useState({});
  const timers = useRef({});

  const clearKey = (key) => {
    if (timers.current[key]) {
      clearTimeout(timers.current[key]);
      delete timers.current[key];
    }
  };

  useEffect(
    () => () => {
      Object.values(timers.current).forEach(clearTimeout);
    },
    []
  );

  const setLabel = (key, text, { sticky = false } = {}) => {
    clearKey(key);
    setLabels((prev) => ({ ...prev, [key]: text }));
    if (!sticky) {
      timers.current[key] = setTimeout(() => {
        setLabels((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
        delete timers.current[key];
      }, FLASH_MS);
    }
  };

  const clearLabel = (key) => {
    clearKey(key);
    setLabels((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  return { labels, setLabel, clearLabel };
}

function HeaderButton({ content, onClick, style, disabled }) {
  return (
    <Button
      content={content}
      style={{
        ...styles.button,
        ...(disabled
          ? {
              opacity: 0.45,
              cursor: 'not-allowed',
              pointerEvents: 'none',
            }
          : {}),
        ...style,
      }}
      onClick={disabled ? undefined : onClick}
      hoverStyle={disabled ? {} : styles.hover}
    />
  );
}

function viewUrl(slug) {
  if (typeof window === 'undefined' || !slug) {
    return '';
  }
  return `${window.location.origin}/view/${slug}`;
}

function AccountBarLive({ text, setText, resumeId, setResumeId }) {
  const { user, ready, signIn, logOut } = useAuth();
  const { labels, setLabel, clearLabel } = useFlashLabels();
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [slugDraft, setSlugDraft] = useState('');
  const [slug, setSlug] = useState('');
  const saveResume = useMutation(api.resumes.save);
  const setSlugMutation = useMutation(api.resumes.setSlug);
  const resumesQuery = useQuery(api.resumes.listMine, user ? {} : 'skip');

  const versions =
    useQuery(
      api.resumes.listVersions,
      user && resumeId ? { resumeId } : 'skip'
    ) || [];

  const availability = useQuery(
    api.resumes.isSlugAvailable,
    open && user && slugDraft
      ? { slug: slugDraft, resumeId: resumeId || undefined }
      : 'skip'
  );

  useEffect(() => {
    if (!resumeId || !resumesQuery) {
      return;
    }
    const current = resumesQuery.find((row) => row.id === resumeId);
    if (current && current.slug) {
      setSlug(current.slug);
      setSlugDraft(current.slug);
    }
  }, [resumeId, resumesQuery]);

  useEffect(() => {
    if (user && loginOpen) {
      setLoginOpen(false);
      setOpen(true);
    }
  }, [user, loginOpen]);

  const handleSignIn = async () => {
    setLabel('google', 'Opening…', { sticky: true });
    try {
      await signIn();
    } catch (err) {
      setLabel('google', err.message || 'Failed');
    }
  };

  const published = Boolean(resumeId);

  const handleSave = async () => {
    setOpen(true);
    setLoginOpen(false);
    const key = published ? 'save' : 'publish';
    setLabel(key, published ? 'Saving…' : 'Publishing…', { sticky: true });
    try {
      const result = await saveResume({
        resumeId: resumeId || undefined,
        text,
      });
      setResumeId(result.id);
      setSlug(result.slug);
      setSlugDraft(result.slug);
      setLabel(key, published ? 'Saved' : 'Published');
    } catch (err) {
      setLabel(key, err.message || 'Failed');
    }
  };

  const handlePublishClick = async () => {
    if (!user) {
      setLoginOpen(true);
      setOpen(false);
      return;
    }
    if (published) {
      setOpen((v) => !v);
      setLoginOpen(false);
      return;
    }
    await handleSave();
  };

  const handleCopyLink = async () => {
    const url = viewUrl(slug);
    if (!url) {
      setLabel('copy', 'Publish first');
      return;
    }
    await navigator.clipboard.writeText(url);
    setLabel('copy', 'Copied!');
  };

  const handleSaveSlug = async () => {
    if (!resumeId) {
      setLabel('set', 'Publish first');
      return;
    }
    setLabel('set', 'Setting…', { sticky: true });
    try {
      const next = await setSlugMutation({ resumeId, slug: slugDraft });
      setSlug(next);
      setSlugDraft(next);
      setLabel('set', 'Set!');
    } catch (err) {
      setLabel('set', err.message || 'Taken');
    }
  };

  const handleRestoreVersion = (version) => {
    if (!setText) {
      return;
    }
    setText(version.text || '');
    setLabel(`version:${version.id}`, 'Loaded');
  };

  const slugHint = (() => {
    if (!slugDraft) {
      return '';
    }
    if (availability === undefined) {
      return 'Checking…';
    }
    if (!availability) {
      return '';
    }
    if (availability.ok) {
      return availability.slug === slug ? 'Current link' : 'Available';
    }
    if (availability.reason === 'taken') {
      return 'Already taken';
    }
    if (availability.reason === 'reserved') {
      return 'Reserved';
    }
    if (availability.reason === 'invalid') {
      return 'Letters, numbers, hyphens only';
    }
    return 'Too short';
  })();

  const publishLabel = (() => {
    if (labels.publish) {
      return labels.publish;
    }
    if (published) {
      return 'Edit';
    }
    return 'Publish';
  })();

  return (
    <Wrap>
      <HeaderButton
        content={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {ready && user && user.photoURL ? (
              <Avatar src={user.photoURL} alt="" />
            ) : null}
            {publishLabel}
          </span>
        }
        onClick={handlePublishClick}
        disabled={!ready}
      />

      {loginOpen && !user ? (
        <Panel>
          <PanelBody style={{ paddingBottom: 16 }}>
            <SectionTitle>Want to log in?</SectionTitle>
            <p style={{ margin: 0, lineHeight: 1.4 }}>
              Sign in with Google to publish a live link and keep version
              history.
            </p>
            <GoogleButton type="button" onClick={handleSignIn}>
              <span style={{ fontWeight: 'bold' }}>G</span>
              {labels.google || 'Continue with Google'}
            </GoogleButton>
            <SmallButton
              type="button"
              style={{ width: '100%', marginTop: 8 }}
              onClick={() => {
                clearLabel('google');
                setLoginOpen(false);
              }}
            >
              Not now
            </SmallButton>
          </PanelBody>
        </Panel>
      ) : null}

      {open && user ? (
        <Panel>
          <PanelBody>
            <SectionTitle>Published link</SectionTitle>
            {!resumeId ? (
              <p style={{ margin: 0, lineHeight: 1.4 }}>
                Hit Publish to create your live link.
              </p>
            ) : (
              <>
                <Row>
                  <Prefix>/view/</Prefix>
                  <Field
                    value={slugDraft}
                    onChange={(e) => setSlugDraft(e.target.value)}
                    placeholder="your-name"
                    spellCheck={false}
                  />
                  <SmallButton type="button" onClick={handleSaveSlug}>
                    {labels.set || 'Set'}
                  </SmallButton>
                </Row>
                <Hint>Status: {slugHint}</Hint>
                <Actions>
                  <SmallButton type="button" $primary onClick={handleSave}>
                    {labels.save || 'Save'}
                  </SmallButton>
                  <SmallButton type="button" onClick={handleCopyLink}>
                    {labels.copy || 'Copy link'}
                  </SmallButton>
                  <SmallButton
                    type="button"
                    onClick={() => {
                      const url = viewUrl(slug);
                      if (url) {
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    Open
                  </SmallButton>
                </Actions>
              </>
            )}
          </PanelBody>

          <VersionsBlock>
            <VersionsHeader>
              <SectionTitle style={{ marginBottom: 0 }}>History</SectionTitle>
              <VersionsHint>
                Click a version to load it into the editor. Save to publish it.
              </VersionsHint>
            </VersionsHeader>
            <VersionsScroll>
              {!resumeId ? (
                <p style={{ margin: '4px 4px 0', opacity: 0.7 }}>
                  Publish once to start keeping history.
                </p>
              ) : null}
              {resumeId && versions.length === 0 ? (
                <p style={{ margin: '4px 4px 0', opacity: 0.7 }}>
                  No versions yet.
                </p>
              ) : null}
              {versions.map((version, index) => {
                const preview = versionPreview(version.text);
                const isCurrent = version.text === text;
                const loaded = labels[`version:${version.id}`];
                return (
                  <VersionCard
                    type="button"
                    key={version.id}
                    $active={isCurrent}
                    onClick={() => handleRestoreVersion(version)}
                    title={formatStamp(version.createdAt)}
                  >
                    <VersionMeta>
                      <span>{formatRelative(version.createdAt)}</span>
                      <VersionBadge>
                        {(() => {
                          if (loaded) {
                            return loaded;
                          }
                          if (isCurrent) {
                            return 'In editor';
                          }
                          if (index === 0) {
                            return 'Latest';
                          }
                          return '';
                        })()}
                      </VersionBadge>
                    </VersionMeta>
                    <VersionTitle>{preview.title}</VersionTitle>
                    {preview.snippet ? (
                      <VersionSnippet>{preview.snippet}</VersionSnippet>
                    ) : null}
                  </VersionCard>
                );
              })}
            </VersionsScroll>
          </VersionsBlock>

          <PanelFooter>
            <SmallButton
              type="button"
              style={{ width: '100%' }}
              onClick={async () => {
                await logOut();
                setOpen(false);
              }}
            >
              Sign out
            </SmallButton>
          </PanelFooter>
        </Panel>
      ) : null}
    </Wrap>
  );
}

export default function AccountBar({ text, setText, resumeId, setResumeId }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const { labels, setLabel } = useFlashLabels();

  if (!isConvexEnabled()) {
    return (
      <Wrap>
        <HeaderButton content="Publish" onClick={() => setLoginOpen(true)} />
        {loginOpen ? (
          <Panel>
            <PanelBody style={{ paddingBottom: 16 }}>
              <SectionTitle>Want to log in?</SectionTitle>
              <p style={{ margin: 0, lineHeight: 1.4 }}>
                Add NEXT_PUBLIC_CONVEX_URL in .env.local to enable publishing.
                See the README.
              </p>
              <SmallButton
                type="button"
                style={{ width: '100%', marginTop: 12 }}
                onClick={() => {
                  setLabel('close', 'Not configured');
                  setLoginOpen(false);
                }}
              >
                {labels.close || 'Close'}
              </SmallButton>
            </PanelBody>
          </Panel>
        ) : null}
      </Wrap>
    );
  }

  return (
    <AccountBarLive
      text={text}
      setText={setText}
      resumeId={resumeId}
      setResumeId={setResumeId}
    />
  );
}
