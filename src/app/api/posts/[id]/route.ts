import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "未授权" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { title, slug, content, excerpt, coverImage, categoryId, published, tagIds } = body

    // 检查文章是否存在
    const existingPost = await prisma.post.findUnique({
      where: { id },
    })

    if (!existingPost) {
      return NextResponse.json({ message: "文章不存在" }, { status: 404 })
    }

    // 检查 slug 是否与其他文章冲突
    const slugConflict = await prisma.post.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    })

    if (slugConflict) {
      return NextResponse.json({ message: "URL 别名已被其他文章使用" }, { status: 400 })
    }

    // 删除现有标签关联
    await prisma.postTag.deleteMany({
      where: { postId: id },
    })

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        published,
        publishedAt: published && !existingPost.published ? new Date() : existingPost.publishedAt,
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

    return NextResponse.json(post)
  } catch (error) {
    console.error("更新文章失败:", error)
    return NextResponse.json({ message: "更新文章失败" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "未授权" }, { status: 401 })
    }

    const { id } = await params

    await prisma.post.delete({
      where: { id },
    })

    return NextResponse.json({ message: "删除成功" })
  } catch (error) {
    console.error("删除文章失败:", error)
    return NextResponse.json({ message: "删除文章失败" }, { status: 500 })
  }
}
