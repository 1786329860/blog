import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return Response.json(
        { error: "邮箱、密码和名字为必填项" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: "密码长度不能少于6位" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { error: "该邮箱已被注册" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return Response.json(user, { status: 201 });
  } catch (error) {
    console.error("注册失败:", error);
    return Response.json({ error: "注册失败" }, { status: 500 });
  }
}
