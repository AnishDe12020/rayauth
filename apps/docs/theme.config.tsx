import type { DocsThemeConfig } from 'nextra-theme-docs';
import { useConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';

const config: DocsThemeConfig = {
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== '/') {
      return {
        titleTemplate: '%s | RayAuth',
      };
    }
    return {};
  },

  logo: (
    <>
      <span
        style={{
          marginLeft: '.4em',
          marginTop: '.1em',
          fontWeight: 600,
          fontSize: '1.2em',
        }}
      >
        RayAuth Docs
      </span>
    </>
  ),
  docsRepositoryBase:
    'https://github.com/AnishDe12020/rayauth/tree/main/apps/docs',
  project: {
    link: 'https://github.com/AnishDe12020/rayauth',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    text: (
      <span>
        {new Date().getFullYear()} ©{' '}
        <a href="https://rayauth.com" target="_blank" rel="noreferrer">
          RayAuth
        </a>
        .
      </span>
    ),
  },
  feedback: {
    content: 'Feedback? Submit an issue',
  },
};

export default config;
