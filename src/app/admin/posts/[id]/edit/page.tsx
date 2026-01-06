import { prisma } from "@/lib/prisma"
import { PostForm } from "@/components/post-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const [post, categories, tags] = await Promise.all([
    prisma.post.findUnique({
      where: { id },
      include: {
        tags: {
          select: {
            tagId: true,
          },
        },
      },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ])

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">编辑文章</h1>
          <p className="text-gray-600 mt-2">修改文章内容</p>
        </div>
        <Link href="/admin/posts">
          <Button variant="outline">返回列表</Button>
        </Link>
      </div>

      <PostForm post={post} categories={categories} tags={tags} />
    </div>
  )
}
