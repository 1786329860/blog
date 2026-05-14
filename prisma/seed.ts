// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 开始播种数据...\n");

  const hashedPassword = await bcrypt.hash("admin123456", 12);

  const admin = await prisma.user.upsert({
    where: { email: "1786329860@qq.com" },
    update: {},
    create: {
      email: "1786329860@qq.com",
      password: hashedPassword,
      name: "街喧嚣，人过往",
      role: "ADMIN",
      bio: "世界很吵，但我们可以安静地写代码、记生活、留痕迹。",
    },
  });
  console.log(`✅ 管理员用户创建成功: ${admin.email}`);

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "frontend" },
      update: {},
      create: { name: "前端开发", slug: "frontend", description: "React、Next.js、CSS 等" },
    }),
    prisma.category.upsert({
      where: { slug: "backend" },
      update: {},
      create: { name: "后端架构", slug: "backend", description: "Node.js、数据库、API 设计" },
    }),
    prisma.category.upsert({
      where: { slug: "design" },
      update: {},
      create: { name: "设计美学", slug: "design", description: "UI/UX、视觉设计、交互体验" },
    }),
    prisma.category.upsert({
      where: { slug: "life" },
      update: {},
      create: { name: "生活随笔", slug: "life", description: "日常记录、思考感悟" },
    }),
  ]);
  console.log(`✅ 分类创建成功: ${categories.length} 个`);

  const tags = await Promise.all([
    prisma.tag.upsert({ where: { slug: "nextjs" }, update: {}, create: { name: "Next.js", slug: "nextjs" } }),
    prisma.tag.upsert({ where: { slug: "react" }, update: {}, create: { name: "React", slug: "react" } }),
    prisma.tag.upsert({ where: { slug: "typescript" }, update: {}, create: { name: "TypeScript", slug: "typescript" } }),
    prisma.tag.upsert({ where: { slug: "tailwindcss" }, update: {}, create: { name: "Tailwind CSS", slug: "tailwindcss" } }),
    prisma.tag.upsert({ where: { slug: "prisma" }, update: {}, create: { name: "Prisma", slug: "prisma" } }),
    prisma.tag.upsert({ where: { slug: "postgresql" }, update: {}, create: { name: "PostgreSQL", slug: "postgresql" } }),
    prisma.tag.upsert({ where: { slug: "docker" }, update: {}, create: { name: "Docker", slug: "docker" } }),
    prisma.tag.upsert({ where: { slug: "blog" }, update: {}, create: { name: "博客", slug: "blog" } }),
  ]);
  console.log(`✅ 标签创建成功: ${tags.length} 个`);

  const welcomePost = await prisma.post.create({
    data: {
      title: "欢迎来到「街喧嚣，人过往」",
      slug: "welcome-to-blog",
      content: `# 欢迎来到我的博客 🎉

这是**街喧嚣，人过往** — 我的个人数字花园。

## 关于这个博客

这个博客使用以下技术栈构建：

- **Next.js 16** — React 全栈框架
- **TypeScript** — 类型安全的 JavaScript
- **Tailwind CSS v4** — 原子化 CSS 框架
- **Prisma** — 数据库 ORM
- **PostgreSQL** — 关系型数据库
- **NextAuth** — 认证方案

## 设计理念

采用**玻璃拟态（Glassmorphism）**设计风格，以蓝色为主调。

> 世界很吵，但我们可以安静地写代码、记生活、留痕迹。

## 功能特性

- ✅ 文章发布与管理（Markdown）
- ✅ 评论与留言板系统
- ✅ 暗/亮主题切换
- ✅ 响应式设计
- ✅ 代码高亮

---

*感谢你的访问 ✨*`,
      excerpt: "这是「街喧嚣，人过往」的第一篇文章，记录了博客的诞生与技术选型。",
      isPublished: true,
      isTop: true,
      readTime: 3,
      publishedAt: new Date(),
      authorId: admin.id,
      categoryId: categories[0].id,
      tags: {
        create: [
          { tag: { connect: { slug: "nextjs" } } },
          { tag: { connect: { slug: "blog" } } },
        ],
      },
    },
  });
  console.log(`✅ 示例文章创建成功: ${welcomePost.title}`);

  const guestbookEntry = await prisma.guestbook.create({
    data: {
      content: "欢迎来到我的留言板！留下你想说的任何话吧 ✨",
      authorName: "街喧嚣，人过往",
      userId: admin.id,
    },
  });
  console.log(`✅ 示例留言创建成功`);

  console.log("\n🎉 播种完成！");
  console.log("\n📋 登录信息:");
  console.log("   邮箱: 1786329860@qq.com");
  console.log("   密码: admin123456");
  console.log("   ⚠️ 请登录后立即修改密码！");
}

main()
  .catch((e) => {
    console.error("❌ 播种失败:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
