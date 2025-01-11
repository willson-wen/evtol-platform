# 深圳低空经济研究小组网站

## 项目概述
本项目是一个专注于eVTOL（电动垂直起降）行业的综合信息平台。

## 技术栈
- 前端：Next.js 13 + TailwindCSS
- 后端：Next.js API Routes + Vercel Serverless Functions
- 数据库：MongoDB Atlas
- 部署：Vercel

## 项目结构
```
evtol-platform/
├── app/                # Next.js 13 应用目录
│   ├── page.tsx       # 首页
│   ├── layout.tsx     # 全局布局
│   ├── companies/     # eVTOL公司信息
│   ├── jobs/          # 求职信息
│   ├── posts/         # 社区帖子
│   └── auth/          # 用户认证
├── components/        # 可复用组件
├── lib/              # 工具函数和数据库连接
├── models/           # MongoDB 数据模型
└── public/           # 静态资源
```

## 核心功能
1. eVTOL公司和产品搜索
2. 白皮书和新闻资讯
3. 公司调研报告
4. 求职信息发布与浏览
5. 社区帖子、评论和点赞
6. 用户注册登录系统

## 开发进度
- [x] 项目初始化
- [ ] 基础架构搭建
- [ ] 数据库模型设计
- [ ] 用户认证系统
- [ ] 公司信息搜索
- [ ] 社区功能
- [ ] UI/UX 优化
- [ ] 响应式设计
- [ ] 部署上线

## 更新日志
### 2024-01-20
- 项目初始化
- 创建基本文档结构
- 设置技术栈 