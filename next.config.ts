import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const githubPagesBasePath = '/oh-my-prd-website';

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? githubPagesBasePath : '',
  },
  ...(isGitHubPages
    ? {
        output: 'export',
        basePath: githubPagesBasePath,
        images: {
          unoptimized: true,
        },
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
