import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminDashboard() {
  const [postsCount, publishedCount, categoriesCount, tagsCount] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.category.count(),
    prisma.tag.count(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">仪表盘</h1>
        <p className="text-gray-600 mt-2">欢迎回到 Readaly 管理后台</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总文章数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已发布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">分类数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoriesCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">标签数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tagsCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
            <CardDescription>常用功能快捷入口</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/posts/new">
              <Button className="w-full">创建新文章</Button>
            </Link>
            <Link href="/admin/posts">
              <Button variant="outline" className="w-full">管理文章</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>网站链接</CardTitle>
            <CardDescription>访问前端页面</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/" target="_blank">
              <Button variant="outline" className="w-full">查看网站首页</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
