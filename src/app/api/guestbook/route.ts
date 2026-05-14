import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    const [guestbooks, total] = await Promise.all([
      prisma.guestbook.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.guestbook.count(),
    ]);

    return Response.json({
      guestbooks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("获取留言列表失败:", error);
    return Response.json({ error: "获取留言列表失败" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    let { content, authorName, authorEmail } = body;

    if (!content || !content.trim()) {
      return Response.json({ error: "留言内容不能为空" }, { status: 400 });
    }

    let guestbook;

    if (session?.user?.id) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      guestbook = await prisma.guestbook.create({
        data: {
          content: content.trim(),
          authorName: user?.name || "匿名用户",
          userId: session.user.id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      });
    } else {
      if (!authorName || !authorName.trim()) {
        return Response.json({ error: "游客留言需要填写昵称" }, { status: 400 });
      }

      guestbook = await prisma.guestbook.create({
        data: {
          content: content.trim(),
          authorName: authorName.trim(),
          authorEmail: authorEmail?.trim() || null,
        },
      });
    }

    return Response.json(guestbook, { status: 201 });
  } catch (error) {
    console.error("发表留言失败:", error);
    return Response.json({ error: "发表留言失败" }, { status: 500 });
  }
}
