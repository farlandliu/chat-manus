import { prisma } from "@/lib/prisma"
import { PostForm } from "@/components/post-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function NewPostPage() {
  const [categories, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">创建文章</h1>
          <p className="text-gray-600 mt-2">撰写新的文章内容</p>
        </div>
        <Link href="/admin/posts">
          <Button variant="outline">返回列表</Button>
        </Link>
      </div>

      <PostForm categories={categories} tags={tags} />
    </div>
  )
}
