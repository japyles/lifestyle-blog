import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export function BlogPosts({ posts }) {
  const [imageErrors, setImageErrors] = useState({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log('Posts received:', posts)
  }, [posts])

  const handleImageError = (postId, error) => {
    console.error(`Image loading error for post ${postId}:`, error)
    setImageErrors(prev => ({ ...prev, [postId]: true }))
  }

  const getImageUrl = (url) => {
    if (!url) return "/placeholder.svg?height=400&width=600"
    if (url.startsWith('http')) return url
    if (url.startsWith('/')) return `${process.env.NEXT_PUBLIC_BASE_URL}${url}`
    return `/uploads/${url}`
  }

  if (!mounted) {
    return null // or a loading placeholder
  }

  return (
    <div className="space-y-12">
      {posts.map((post) => {
        console.log(`Processing post ${post._id}:`, post)
        
        const imageUrl = getImageUrl(post.imageUrl)

        console.log(`Post ${post._id} final image URL:`, imageUrl)

        return (
          <article key={post._id} className="space-y-4">
            <Link href={`/blog/${post._id}`} className="block group">
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                {imageErrors[post._id] ? (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Image failed to load
                  </div>
                ) : (
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={post.title || "Blog post image"}
                    width={800}
                    height={450}
                    className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                    onError={(e) => handleImageError(post._id, e)}
                  />
                )}
              </div>
              <div className="mt-6 space-y-3">
                <h2 className="font-dm-serif text-3xl group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toISOString().split('T')[0]} - {post.author || 'Anonymous'}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {post.content.substring(0, 200)}...
                </p>
              </div>
            </Link>
          </article>
        )
      })}
    </div>
  )
}




// import { connectToDatabase } from '@/lib/mongodb'
// import { writeFile, mkdir } from 'fs/promises'
// import path from 'path'
// import formidable from 'formidable'

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' })
//   }

//   try {
//     const { db } = await connectToDatabase()

//     const form = formidable({
//       uploadDir: path.join(process.cwd(), 'public', 'uploads'),
//       keepExtensions: true,
//       maxFileSize: 5 * 1024 * 1024, // 5MB
//     })

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error('Error parsing form:', err)
//         return res.status(500).json({ success: false, message: 'Error parsing form data' })
//       }

//       const title = fields.title
//       const content = fields.content
//       const category = fields.category
//       const tags = fields.tags
//       const image = files.image

//       console.log('Received blog post data:', { 
//         title, 
//         category, 
//         tags, 
//         hasImage: !!image,
//         imageType: image?.type,
//         imageSize: image?.size 
//       })

//       let imageUrl = null
//       if (image) {
//         try {
//           // Ensure uploads directory exists
//           const uploadDir = path.join(process.cwd(), 'public', 'uploads')
//           await mkdir(uploadDir, { recursive: true })

//           const filename = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
//           const filepath = path.join(uploadDir, filename)
          
//           console.log('Saving image to:', filepath)
//           await writeFile(filepath, await readFile(image.path))
          
//           // Store the relative path in the database
//           imageUrl = `/uploads/${filename}`
//           console.log('Image URL saved as:', imageUrl)
//         } catch (error) {
//           console.error('Error saving image:', error)
//           return res.status(500).json({ success: false, message: `Failed to save image: ${error.message}` })
//         }
//       }

//       const blogPost = {
//         title,
//         content,
//         category,
//         tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
//         imageUrl,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }

//       const result = await db.collection('blogPosts').insertOne(blogPost)
//       console.log('Blog post added:', result.insertedId)

//       if (imageUrl) {
//         const photoResult = await db.collection('photos').insertOne({
//           title: title,
//           description: `Image for blog post: ${title}`,
//           url: imageUrl,
//           uploadedAt: new Date(),
//           associatedBlogPost: result.insertedId.toString()
//         })
//         console.log('Photo added to photos collection:', photoResult.insertedId)
//       }

//       res.status(201).json({ 
//         success: true, 
//         id: result.insertedId,
//         imageUrl: imageUrl // Return the imageUrl for debugging
//       })
//     })
//   } catch (error) {
//     console.error('Error creating blog post:', error)
//     res.status(500).json({ 
//       success: false, 
//       message: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     })
//   }
// }




// import { connectToDatabase } from '@/lib/mongodb'
// import { writeFile } from 'fs/promises'
// import path from 'path'
// import formidable from 'formidable'

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' })
//   }

//   try {
//     const { db } = await connectToDatabase()

//     const form = formidable({
//       uploadDir: path.join(process.cwd(), 'public', 'uploads'),
//       keepExtensions: true,
//       maxFileSize: 5 * 1024 * 1024, // 5MB
//     })

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error('Error parsing form:', err)
//         return res.status(500).json({ success: false, message: 'Error parsing form data' })
//       }

//       const title = fields.title?.[0]
//       const content = fields.content?.[0]
//       const category = fields.category?.[0]
//       const tags = fields.tags?.[0]
//       const image = files.image?.[0]

//       console.log('Received blog post data:', { title, category, tags, hasImage: !!image })

//       let imageUrl = null
//       if (image) {
//         const filename = image.newFilename
//         imageUrl = `/uploads/${filename}`
//         console.log('Image saved:', imageUrl)
//       }

//       const blogPost = {
//         title,
//         content,
//         category,
//         tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
//         imageUrl,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }

//       const result = await db.collection('blogPosts').insertOne(blogPost)
//       console.log('Blog post added:', result.insertedId)

//       if (imageUrl) {
//         const photoResult = await db.collection('images').insertOne({
//           title: title,
//           description: `Image for blog post: ${title}`,
//           url: imageUrl,
//           uploadedAt: new Date(),
//           associatedBlogPost: result.insertedId.toString()
//         })
//         console.log('Photo added to photos collection:', photoResult.insertedId)
//       }

//       res.status(201).json({ success: true, id: result.insertedId })
//     })
//   } catch (error) {
//     console.error('Error creating blog post:', error)
//     res.status(500).json({ success: false, message: error.message })
//   }
// }




