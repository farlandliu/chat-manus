import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "未授权" }, { status: 401 })
    }

    const body = await request.json()
    const { title, slug, content, excerpt, coverImage, categoryId, published, tagIds } = body

    // 检查 slug 是否已存在
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    })

    if (existingPost) {
      return NextResponse.json({ message: "URL 别名已存在" }, { status: 400 })
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        published,
        publishedAt: published ? new Date() : null,
        authorId: session.user.id,
        categoryId: categoryId || null,
        tags: tagIds?.length
          ? {
              create: tagIds.map((tagId: string) => ({
                tag: { connect: { id: tagId } },
              })),
            }
          : undefined,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("创建文章失败:", error)
    return NextResponse.json({ message: "创建文章失败" }, { status: 500 })
  }
}
