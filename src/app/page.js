import { Header } from '@/components/header'
import { FeaturedPost } from '@/components/featured-post'
import { PopularPosts } from '@/components/popular-posts'
import { BlogPosts } from '@/components/blog-posts'

const popularPosts = [
  {
    title: "Filtre kahve ile granül kahve arasındaki farklar",
    date: "10 HAZİRAN 2021",
    author: "SÜDENUR TOKÖOZ",
    image: "/placeholder.svg?height=80&width=80",
    slug: "kahve-farklari"
  },
  {
    title: "Mutlaka uygulamanız gereken bakım sırları",
    date: "08 HAZİRAN 2021",
    author: "HASAN ŞEREF",
    image: "/placeholder.svg?height=80&width=80",
    slug: "bakim-sirlari"
  },
  {
    title: "Mezoterapi nedir? Nerelerde kullanılır?",
    date: "16 HAZİRAN 2021",
    author: "DAMLA AYDIN",
    image: "/placeholder.svg?height=80&width=80",
    slug: "mezoterapi"
  }
]

const blogPosts = [
  {
    title: "Doğal makyaj tüyoları",
    date: "10 HAZİRAN 2021",
    author: "SÜDENUR TOKÖOZ",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "dogal-makyaj-tuyolari",
    excerpt: "Günlük hayatın koşuşturması içinde vücudumuz kadar zihnimizi de yoruluyor. Uzandığımız zaman vücudumuzu dinlendirebilsekte zihnimizi çok kolay dinlendiremiyoruz. Özellikle son bir yıldır içinde bulunduğumuz pandemi şartları zihnimizi ve ruhumuzu daha çok yormaya başladı."
  },
  {
    title: "Güneşe çıkmadan önce mutlaka cilt bakımı uygulayın",
    date: "10 HAZİRAN 2021",
    author: "SÜDENUR TOKÖOZ",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "cilt-bakimi",
    excerpt: "Normalde kendimizi doğaya atıp, tatile çok rahat giderken artık bu seçeneklerin kısıtlı olması sonucunda evde yapılabilecek rahatlama yöntemlerini keşfetmeye başladık. İşte tam bu noktada aromaterapinin gücünü de keşfettik."
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <FeaturedPost
          title="Doğal makyaj tüyoları"
          date="10 HAZİRAN 2021"
          author="SÜDENUR TOKÖOZ"
          category="YAŞAM TARZI"
          image="/placeholder.svg?height=600&width=1200"
          slug="dogal-makyaj-tuyolari"
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

