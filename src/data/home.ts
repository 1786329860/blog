import type {
  NavItem,
  SocialLink,
  Article,
  Project,
  TopicData,
  TechItemData,
  CurrentProjectData,
} from "@/types";

export const navItems: NavItem[] = [
  { label: "文章", href: "/blog" },
  { label: "项目", href: "#projects" },
  { label: "留言板", href: "/guestbook" },
  { label: "关于", href: "/about" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/1786329860", icon: "github" },
  { label: "邮箱", href: "mailto:1786329860@qq.com", icon: "mail" },
];

export const featuredPost: Article & { imageLabel: string } = {
  id: "welcome",
  title: "欢迎来到我的博客",
  description:
    "这是「街喧嚣，人过往」— 一个记录代码、设计、灵感与成长的个人空间。",
  href: "/blog",
  date: "2026年5月",
  readTime: "3 min read",
  category: "生活",
  tags: ["博客", "开始"],
  icon: "sparkle",
  accent: "blue",
  imageLabel: "博客",
};

export const currentProject: CurrentProjectData = {
  title: "个人博客系统",
  description:
    "用 Next.js + TypeScript + Tailwind CSS 构建的现代化个人博客平台",
  status: "开发中",
  progress: 65,
  tags: ["Next.js", "TypeScript", "Tailwind CSS"],
};

export const techStack: TechItemData[] = [
  { id: "next", label: "Next.js", icon: "next" },
  { id: "react", label: "React", icon: "react" },
  { id: "typescript", label: "TypeScript", icon: "typescript" },
  { id: "tailwind", label: "Tailwind CSS", icon: "tailwind" },
  { id: "prisma", label: "Prisma", icon: "prisma" },
  { id: "framer", label: "Framer Motion", icon: "framer" },
  { id: "postgresql", label: "PostgreSQL", icon: "database" },
];

export const articles: Article[] = [
  {
    id: "1",
    title: "从零搭建一个现代化个人博客",
    description:
      "使用 Next.js、Prisma、Tailwind CSS 从零构建一个支持暗色模式的个人博客系统。",
    href: "/blog/building-modern-blog",
    date: "2026年5月14日",
    readTime: "10 min read",
    category: "前端",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    icon: "next",
    accent: "blue",
  },
  {
    id: "2",
    title: "玻璃拟态设计指南",
    description:
      "深入探讨 glassmorphism 设计模式在 Web 开发中的实现技巧与最佳实践。",
    href: "/blog/glassmorphism-design-guide",
    date: "2026年5月10日",
    readTime: "7 min read",
    category: "设计",
    tags: ["CSS", "UI Design", "Glassmorphism"],
    icon: "grid",
    accent: "cyan",
  },
  {
    id: "3",
    title: "PostgreSQL 数据建模实战",
    description:
      "如何用 Prisma ORM 设计一个灵活可扩展的博客数据模型。",
    href: "/blog/postgresql-data-modeling",
    date: "2026年5月5日",
    readTime: "8 min read",
    category: "后端",
    tags: ["Prisma", "PostgreSQL", "数据库"],
    icon: "database",
    accent: "indigo",
  },
];

export const topics: TopicData[] = [
  { id: "frontend", label: "前端开发", href: "/blog?tag=前端", icon: "code" },
  { id: "design", label: "设计美学", href: "/blog?tag=设计", icon: "grid" },
  { id: "backend", label: "后端架构", href: "/blog?tag=后端", icon: "schema" },
  { id: "life", label: "生活随笔", href: "/blog?tag=生活", icon: "lightbulb" },
  { id: "thinking", label: "思考记录", href: "/blog?tag=思考", icon: "sparkle" },
];

export const projects: Project[] = [
  {
    id: "blog-platform",
    title: "个人博客平台",
    description:
      "一个现代化的个人博客系统，支持 Markdown 写作、评论系统和暗色主题切换。",
    href: "https://github.com/1786329860",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageLabel: "Blog",
    accent: "site",
  },
];
