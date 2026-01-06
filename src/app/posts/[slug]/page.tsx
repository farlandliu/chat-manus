import { prisma } from "@/lib/prisma"
import Link from "next/link"
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
  const post = await prisma.post.findUnique({
    where: { slug },
    select: {
      title: true,
      excerpt: true,
      content: true,
      coverImage: true,
    },
  })

  if (!post) {
    return {
      title: "文章未找到",
    }
  }

  return {
    title: `${post.title} - Readaly`,
    description: post.excerpt || post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
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
          slug: true,
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })

  if (!post) {
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

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Meta */}
        <div className="mb-6">
          <div className="flex gap-2 mb-4">
            {post.category && (
              <Link href={`/category/${post.category.slug}`}>
                <Badge variant="secondary">{post.category.name}</Badge>
              </Link>
            )}
            {post.tags.map(({ tag }) => (
              <Badge key={tag.id} variant="outline">
                {tag.name}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600">
            <span>{post.author.name || "匿名"}</span>
            <span className="mx-2">·</span>
            <time>
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </time>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none bg-white rounded-lg p-8 shadow-sm">
          <div className="whitespace-pre-wrap">{post.content}</div>
        </div>

        {/* Back Link */}
        <div className="mt-12">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← 返回首页
          </Link>
        </div>
      </article>

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
