import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">文章管理</h1>
          <p className="text-gray-600 mt-2">管理您的所有文章内容</p>
        </div>
        <Link href="/admin/posts/new">
          <Button>创建文章</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标题</TableHead>
              <TableHead>分类</TableHead>
              <TableHead>作者</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  暂无文章，<Link href="/admin/posts/new" className="text-blue-600 hover:underline">创建第一篇文章</Link>
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.category?.name || "-"}</TableCell>
                  <TableCell>{post.author.name || post.author.email}</TableCell>
                  <TableCell>
                    {post.published ? (
                      <Badge>已发布</Badge>
                    ) : (
                      <Badge variant="secondary">草稿</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(post.createdAt).toLocaleDateString("zh-CN")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/admin/posts/${post.id}/edit`}>
                        <Button variant="outline" size="sm">编辑</Button>
                      </Link>
                      {post.published && (
                        <Link href={`/posts/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="sm">查看</Button>
                        </Link>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
