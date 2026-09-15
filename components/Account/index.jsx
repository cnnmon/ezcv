import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from 'convex/react';
import { MdCheck, MdContentCopy, MdOpenInNew } from 'react-icons/md';
import { COLORS } from '../../constants';
import { useAuth } from '../../context/auth';
import { api } from '../../convex/_generated/api';
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

const Panel = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  z-index: 20;
  background: ${COLORS.yellow};
  border: 2px solid ${COLORS.darkBrown};
  box-sizing: border-box;
  font-family: Helvetica;
  padding: 20px;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 19;
`;

const Title = styled.h4`
  margin: 0 0 6px;
  font-family: Mabry;
  font-weight: normal;
  font-size: 18px;
  line-height: 1.2;
`;

const Sub = styled.p`
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 1.45;
  opacity: 0.7;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FieldWrap = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
`;

const Prefix = styled.span`
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  opacity: 0.55;
  font-size: 13px;
  pointer-events: none;
`;

const FIELD_BG = {
  taken: COLORS.red,
  checking: COLORS.yellowGreen,
};

const Field = styled.input`
  width: 100%;
  min-width: 0;
  padding: 8px 56px 8px 52px;
  border: 2px solid ${COLORS.darkBrown};
  background: ${(p) => FIELD_BG[p.$status] || 'white'};
  font-family: Helvetica;
  box-sizing: border-box;
  transition: background 0.15s ease-out;
`;

const FieldIcons = styled.div`
  position: absolute;
  right: 6px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`;

const IconBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 0 4px;
  border: none;
  background: none;
  cursor: pointer;
  opacity: 0.55;
  color: inherit;

  &:hover {
    opacity: 0.9;
  }
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

const SaveButton = styled(SmallButton)`
  width: 100%;
  margin-top: 16px;
  padding: 10px 12px;
  font-size: 16px;
  color: black;
  background: ${COLORS.green};
  &:hover {
    background: ${COLORS.red};
  }
`;

const SignOut = styled.button`
  display: block;
  width: 100%;
  margin-top: 4px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-family: Helvetica;
  font-size: 13px;
  opacity: 0.55;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 4px;
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

function AccountBarLive({ text, resumeId, setResumeId }) {
  const { user, ready, signIn, logOut } = useAuth();
  const { labels, setLabel, clearLabel } = useFlashLabels();
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [slugDraft, setSlugDraft] = useState('');
  const [slug, setSlug] = useState('');
  const saveResume = useMutation(api.resumes.save);
  const setSlugMutation = useMutation(api.resumes.setSlug);
  const resumesQuery = useQuery(api.resumes.listMine, user ? {} : 'skip');

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

  const handleOpenLink = () => {
    const url = viewUrl(slug);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
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

  const slugStatus = (() => {
    if (!slugDraft) {
      return '';
    }
    if (availability === undefined) {
      return 'checking';
    }
    if (!availability || availability.ok) {
      return '';
    }
    return 'taken';
  })();

  const publishLabel = (() => {
    if (labels.publish) {
      return labels.publish;
    }
    if (!user) {
      return 'Login';
    }
    if (published) {
      return 'Edit published';
    }
    return 'Publish';
  })();

  return (
    <Wrap>
      <HeaderButton
        style={{
          background: COLORS.green,
        }}
        content={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {publishLabel}
          </span>
        }
        onClick={handlePublishClick}
        disabled={!ready}
      />

      {loginOpen && !user ? (
        <>
          <Backdrop
            aria-hidden="true"
            onClick={() => {
              clearLabel('google');
              setLoginOpen(false);
            }}
          />
          <Panel>
            <Title>Log in</Title>
            <Sub>Sign in with Google to publish a live link.</Sub>
            <GoogleButton type="button" onClick={handleSignIn}>
              <span style={{ fontWeight: 'bold' }}>G</span>
              {labels.google || 'Continue with Google'}
            </GoogleButton>
            <SignOut
              type="button"
              onClick={() => {
                clearLabel('google');
                setLoginOpen(false);
              }}
            >
              Not now
            </SignOut>
          </Panel>
        </>
      ) : null}

      {open && user ? (
        <>
          <Backdrop aria-hidden="true" onClick={() => setOpen(false)} />
          <Panel>
            <Title>Your live resume page</Title>
            {!resumeId ? (
              <Sub>Publish to create a live page.</Sub>
            ) : (
              <>
                <Row>
                  <FieldWrap>
                    <Prefix>/view/</Prefix>
                    <Field
                      value={slugDraft}
                      onChange={(e) => setSlugDraft(e.target.value)}
                      placeholder="your-name"
                      spellCheck={false}
                      $status={slugStatus}
                      aria-invalid={slugStatus === 'taken'}
                    />
                    <FieldIcons>
                      <IconBtn
                        type="button"
                        aria-label="Copy link"
                        title="Copy link"
                        onClick={handleCopyLink}
                      >
                        {labels.copy === 'Copied!' ? (
                          <MdCheck size={16} />
                        ) : (
                          <MdContentCopy size={16} />
                        )}
                      </IconBtn>
                      <IconBtn
                        type="button"
                        aria-label="Open"
                        title="Open"
                        onClick={handleOpenLink}
                      >
                        <MdOpenInNew size={16} />
                      </IconBtn>
                    </FieldIcons>
                  </FieldWrap>
                  <SmallButton type="button" onClick={handleSaveSlug}>
                    {labels.set || 'Set'}
                  </SmallButton>
                </Row>
                <SaveButton type="button" $primary onClick={handleSave}>
                  {labels.save || 'Save'}
                </SaveButton>
              </>
            )}
            <SignOut
              type="button"
              onClick={async () => {
                await logOut();
                setOpen(false);
              }}
            >
              (Sign out)
            </SignOut>
          </Panel>
        </>
      ) : null}
    </Wrap>
  );
}

export default function AccountBar({ text, resumeId, setResumeId }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const { labels, setLabel } = useFlashLabels();

  if (!isConvexEnabled()) {
    return (
      <Wrap>
        <HeaderButton content="Publish" onClick={() => setLoginOpen(true)} />
        {loginOpen ? (
          <>
            <Backdrop aria-hidden="true" onClick={() => setLoginOpen(false)} />
            <Panel>
              <Title>Log in</Title>
              <Sub>
                Add NEXT_PUBLIC_CONVEX_URL in .env.local to enable publishing.
              </Sub>
              <SmallButton
                type="button"
                style={{ width: '100%' }}
                onClick={() => {
                  setLabel('close', 'Not configured');
                  setLoginOpen(false);
                }}
              >
                {labels.close || 'Close'}
              </SmallButton>
            </Panel>
          </>
        ) : null}
      </Wrap>
    );
  }

  return (
    <AccountBarLive text={text} resumeId={resumeId} setResumeId={setResumeId} />
  );
}
