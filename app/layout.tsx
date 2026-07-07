import type { Metadata, Viewport } from 'next';
import './globals.css';
import '@/styles/narrative.css';
import '@/styles/cinematic.css';

export const metadata: Metadata = {
  title: 'Oh My PRD | AI 需求资产工作台',
  description:
    'Oh My PRD 将对话、PRD、评审、知识库、研发问答和 GitLab 只读影响分析串成可追踪的需求资产链路。',
  keywords: [
    'Oh My PRD',
    'AI PRD',
    '需求管理',
    'AI 评审',
    '知识库',
    '研发协作',
  ],
  openGraph: {
    title: 'Oh My PRD | AI 需求资产工作台',
    description:
      '让需求从聊天和文档变成可生成、可评审、可版本化、可追踪、可检索、可关联代码的项目知识资产。',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: '#0d1416',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
