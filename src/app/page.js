import { Header } from '@/components/header'
import { FeaturedPost } from '@/components/featured-post'
import { PopularPosts } from '@/components/popular-posts'
import { BlogPosts } from '@/components/blog-posts'

const popularPosts = [
  {
    title: "Differences between filter coffee and instant coffee",
    date: "JUNE 10, 2021",
    author: "SUSAN THOMPSON",
    image: "/placeholder.svg?height=80&width=80",
    slug: "coffee-differences"
  },
  {
    title: "Essential beauty care tips you must follow",
    date: "JUNE 8, 2021",
    author: "HANNAH SMITH",
    image: "/placeholder.svg?height=80&width=80",
    slug: "beauty-tips"
  },
  {
    title: "What is mesotherapy? Where is it used?",
    date: "JUNE 16, 2021",
    author: "DIANA ADAMS",
    image: "/placeholder.svg?height=80&width=80",
    slug: "mesotherapy"
  }
]

const blogPosts = [
  {
    title: "Natural makeup tips",
    date: "JUNE 10, 2021",
    author: "SUSAN THOMPSON",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "natural-makeup-tips",
    excerpt: "In the hustle and bustle of daily life, our minds get as tired as our bodies. While we can rest our bodies when we lie down, we can't easily rest our minds. Especially during the pandemic conditions we've been in for the past year, our minds and souls have started to get more tired."
  },
  {
    title: "Always apply skincare before sun exposure",
    date: "JUNE 10, 2021",
    author: "SUSAN THOMPSON",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "skincare",
    excerpt: "While we used to be able to easily go out in nature and on vacation, now that these options are limited, we've started to discover relaxation methods that can be done at home. It's at this point that we discovered the power of aromatherapy."
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <FeaturedPost
          title="Natural makeup tips"
          date="JUNE 10, 2021"
          author="SUSAN THOMPSON"
          category="YAŞAM TARZI"
          image="/placeholder.svg?height=600&width=1200"
          slug="natural-makeup-tips"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <BlogPosts posts={blogPosts} />
            </div>
            <aside>
              <PopularPosts posts={popularPosts} />
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

