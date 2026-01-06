import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await prisma.category.findUnique({
    where: { slug },
    select: {
      name: true,
      description: true,
    },
  })

  if (!category) {
    return {
      title: "分类未找到",
    }
  }

  return {
    title: `${category.name} - Readaly`,
    description: category.description || `浏览 ${category.name} 分类下的所有文章`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      posts: {
        where: { published: true },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          publishedAt: "desc",
        },
      },
    },
  })

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-3xl font-bold text-gray-900">
            Readaly
          </Link>
        </div>
      </header>

      {/* Category Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-lg text-gray-600">{category.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-4">{category.posts.length} 篇文章</p>
        </div>
      </section>

      {/* Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {category.posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">该分类下暂无文章</p>
            <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              返回首页
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.posts.map((post) => (
              <Link key={post.id} href={`/posts/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  {post.coverImage && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary">{category.name}</Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + "..."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{post.author.name || "匿名"}</span>
                      <span className="mx-2">·</span>
                      <time>
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("zh-CN")
                          : ""}
                      </time>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2026 Readaly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
