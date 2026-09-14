import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'convex/react';
import styled from 'styled-components';
import WebView from '../../components/WebView';
import { parseIntoContent } from '../../utils';
import { STYLING, TRIGGERS } from '../../constants';
import { api } from '../../convex/_generated/api';
import isConvexEnabled from '../../lib/convex';

const Page = styled.main`
  min-height: 100vh;
  margin: 0;
  background: #f7f7f5;
  color: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 72px 24px 80px;

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    padding: 40px 20px 56px;
  }

  @media print {
    background: white;
    padding: 24px;
  }
`;

const Footer = styled.footer`
  margin-top: 56px;
  font-family: 'Neue Montreal', Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #9a9a9a;
  text-align: center;

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: #1a1a1a;
  }

  @media print {
    display: none;
  }
`;

const Message = styled.p`
  margin: 80px 0;
  text-align: center;
  font-family: 'Neue Montreal', Helvetica, Arial, sans-serif;
  color: #1a1a1a;
`;

function PublicResumeLive({ id }) {
  const [styling, setStyling] = useState(STYLING.getDefaultStyling());
  const record = useQuery(api.resumes.getPublic, id ? { slug: id } : 'skip');

  const { content } = useMemo(() => {
    if (!record) {
      return { content: [] };
    }
    return parseIntoContent(record.text || '', styling, setStyling);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);

  const error = record === null ? 'This resume is missing or was deleted.' : '';
  const loading = record === undefined;
  const pageTitle = record?.title || record?.name || 'Resume';

  return (
    <>
      <Head>
        <title>{record ? `${pageTitle} — ezcv` : 'ezcv'}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Page>
        {error || loading ? <Message>{error || 'Loading…'}</Message> : null}
        {record ? (
          <>
            <WebView content={content} />
            <Footer>
              <Link href="/builder">Made with ezcv</Link>
            </Footer>
          </>
        ) : null}
      </Page>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          background: #f7f7f5;
        }

        @media print {
          html,
          body {
            background: white !important;
          }
        }
      `}</style>
    </>
  );
}

export default function PublicResume() {
  const router = useRouter();
  const { id } = router.query;

  if (!isConvexEnabled()) {
    return (
      <>
        <Head>
          <title>ezcv</title>
        </Head>
        <Page>
          <Message>Cloud resumes are not configured.</Message>
        </Page>
      </>
    );
  }

  return <PublicResumeLive id={typeof id === 'string' ? id : ''} />;
}
