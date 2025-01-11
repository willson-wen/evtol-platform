import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '用户认证 - 深圳低空经济研究小组',
  description: '登录或注册深圳低空经济研究小组平台账号',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 