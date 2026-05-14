import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            bio: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!post) {
      return Response.json({ error: "文章不存在" }, { status: 404 });
    }

    await prisma.post.update({
      where: { id: post.id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return Response.json({
      ...post,
      viewCount: post.viewCount + 1,
    });
  } catch (error) {
    console.error("获取文章详情失败:", error);
    return Response.json({ error: "获取文章详情失败" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: "请先登录" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();
    const { title, content, excerpt, coverImage, categoryId, tags, isPublished } = body;

    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (!existingPost) {
      return Response.json({ error: "文章不存在" }, { status: 404 });
    }

    if (existingPost.authorId !== session.user.id) {
      return Response.json({ error: "无权修改此文章" }, { status: 403 });
    }

    const updateData: Record<string, unknown> = {};

    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (isPublished !== undefined) {
      updateData.isPublished = isPublished;
      updateData.publishedAt = isPublished && !existingPost.publishedAt ? new Date() : existingPost.publishedAt;
    }

    const post = await prisma.post.update({
      where: { slug },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (tags !== undefined) {
      await prisma.postTag.deleteMany({
        where: { postId: post.id },
      });

      if (tags.length > 0) {
        await prisma.postTag.createMany({
          data: tags.map((tagId: string) => ({
            postId: post.id,
            tagId,
          })),
        });
      }
    }

    return Response.json(post);
  } catch (error) {
    console.error("更新文章失败:", error);
    return Response.json({ error: "更新文章失败" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: "请先登录" }, { status: 401 });
    }

    const { slug } = await params;

    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (!existingPost) {
      return Response.json({ error: "文章不存在" }, { status: 404 });
    }

    if (existingPost.authorId !== session.user.id) {
      return Response.json({ error: "无权删除此文章" }, { status: 403 });
    }

    await prisma.post.delete({
      where: { slug },
    });

    return Response.json({ message: "删除成功" });
  } catch (error) {
    console.error("删除文章失败:", error);
    return Response.json({ error: "删除文章失败" }, { status: 500 });
  }
}
