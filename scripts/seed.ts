import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'
import { config } from 'dotenv'

config({ path: '.env' })

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env file')
}

console.log('连接数据库:', DATABASE_URL.replace(/:[^:@]+@/, ':****@'))

const pool = new Pool({ connectionString: DATABASE_URL })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('开始初始化数据库...')

  // 创建管理员账户
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@readaly.com' },
    update: {},
    create: {
      email: 'admin@readaly.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('管理员账户已创建:', admin.email)

  // 创建示例分类
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'technology' },
      update: {},
      create: {
        name: '技术',
        slug: 'technology',
        description: '技术相关文章',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'lifestyle' },
      update: {},
      create: {
        name: '生活',
        slug: 'lifestyle',
        description: '生活方式相关文章',
      },
    }),
  ])

  console.log('分类已创建:', categories.map(c => c.name).join(', '))

  // 创建示例标签
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'nextjs' },
      update: {},
      create: {
        name: 'Next.js',
        slug: 'nextjs',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'react' },
      update: {},
      create: {
        name: 'React',
        slug: 'react',
      },
    }),
  ])

  console.log('标签已创建:', tags.map(t => t.name).join(', '))

  console.log('数据库初始化完成！')
  console.log('\n管理员登录信息:')
  console.log('邮箱: admin@readaly.com')
  console.log('密码: admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
