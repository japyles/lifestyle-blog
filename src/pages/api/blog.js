import { connectToDatabase } from '@/lib/mongodb'
import { writeFile } from 'fs/promises'
import path from 'path'
import formidable from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const { db } = await connectToDatabase()

    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public', 'uploads'),
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    })

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err)
        return res.status(500).json({ success: false, message: 'Error parsing form data' })
      }

      const title = fields.title?.[0]
      const content = fields.content?.[0]
      const category = fields.category?.[0]
      const tags = fields.tags?.[0]
      const image = files.image?.[0]

      console.log('Received blog post data:', { title, category, tags, hasImage: !!image })

      let imageUrl = null
      if (image) {
        const filename = image.newFilename
        imageUrl = `/uploads/${filename}`
        console.log('Image saved:', imageUrl)
      }

      const blogPost = {
        title,
        content,
        category,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = await db.collection('blogPosts').insertOne(blogPost)
      console.log('Blog post added:', result.insertedId)

      if (imageUrl) {
        const photoResult = await db.collection('images').insertOne({
          title: title,
          description: `Image for blog post: ${title}`,
          url: imageUrl,
          uploadedAt: new Date(),
          associatedBlogPost: result.insertedId.toString()
        })
        console.log('Photo added to photos collection:', photoResult.insertedId)
      }

      res.status(201).json({ success: true, id: result.insertedId })
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}






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

//     const form = new formidable.IncomingForm()
//     form.uploadDir = path.join(process.cwd(), 'public', 'uploads')
//     form.keepExtensions = true

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error('Error parsing form:', err)
//         return res.status(500).json({ success: false, message: 'Error parsing form data' })
//       }

//       const { title, content, category, tags } = fields
//       const image = files.image

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
//         const photoResult = await db.collection('photos').insertOne({
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








// import { NextResponse } from 'next/server'
// import { connectToDatabase } from '@/lib/mongodb'
// import { writeFile } from 'fs/promises'
// import path from 'path'

// export async function POST(req) {
//   try {
//     const { db } = await connectToDatabase()
//     const data = await req.formData()
//     const title = data.get('title')
//     const content = data.get('content')
//     const category = data.get('category')
//     const tags = data.get('tags').split(',').map(tag => tag.trim())
//     const image = data.get('image')

//     console.log('Received blog post data:', { title, category, tags, hasImage: !!image })

//     let imageUrl = null
//     if (image) {
//       const bytes = await image.arrayBuffer()
//       const buffer = Buffer.from(bytes)
//       const filename = Date.now() + '-' + image.name
//       const filepath = path.join(process.cwd(), 'public', 'uploads', filename)
//       await writeFile(filepath, buffer)
//       imageUrl = `/uploads/${filename}`
//       console.log('Image saved:', imageUrl)
//     }

//     const blogPost = {
//       title,
//       content,
//       category,
//       tags,
//       imageUrl,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }

//     const result = await db.collection('blogPosts').insertOne(blogPost)
//     console.log('Blog post added:', result.insertedId)

//     if (imageUrl) {
//       const photoResult = await db.collection('photos').insertOne({
//         title: title,
//         description: `Image for blog post: ${title}`,
//         url: imageUrl,
//         uploadedAt: new Date(),
//         associatedBlogPost: result.insertedId.toString()
//       })
//       console.log('Photo added to photos collection:', photoResult.insertedId)
//     }

//     return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 })
//   } catch (error) {
//     console.error('Error creating blog post:', error)
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 })
//   }
// }




// import { NextResponse } from 'next/server'
// import { connectToDatabase } from '@/lib/mongodb'
// import { writeFile } from 'fs/promises'
// import path from 'path'

// export async function POST(req) {
//   try {
//     const { db } = await connectToDatabase()
//     const data = await req.formData()
//     const title = data.get('title')
//     const content = data.get('content')
//     const category = data.get('category')
//     const tags = data.get('tags').split(',').map(tag => tag.trim())
//     const image = data.get('image')

//     console.log('Received blog post data:', { title, category, tags, hasImage: !!image })

//     let imageUrl = null
//     if (image) {
//       const bytes = await image.arrayBuffer()
//       const buffer = Buffer.from(bytes)
//       const filename = Date.now() + '-' + image.name
//       const filepath = path.join(process.cwd(), 'public', 'uploads', filename)
//       await writeFile(filepath, buffer)
//       imageUrl = `/uploads/${filename}`
//       console.log('Image saved:', imageUrl)
//     }

//     const blogPost = {
//       title,
//       content,
//       category,
//       tags,
//       imageUrl,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }

//     const result = await db.collection('blogPosts').insertOne(blogPost)
//     console.log('Blog post added:', result.insertedId)

//     if (imageUrl) {
//       const photoResult = await db.collection('photos').insertOne({
//         title: title,
//         description: `Image for blog post: ${title}`,
//         url: imageUrl,
//         uploadedAt: new Date(),
//         associatedBlogPost: result.insertedId.toString()
//       })
//       console.log('Photo added to photos collection:', photoResult.insertedId)
//     }

//     return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 })
//   } catch (error) {
//     console.error('Error creating blog post:', error)
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 })
//   }
// }




// import { IncomingForm } from 'formidable'
// import { promises as fs } from 'fs'
// import path from 'path'
// import { connectToDatabase } from '@/lib/mongodb'
// import { serializeDocument } from '@/lib/serialize'

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const form = new IncomingForm()
//     form.uploadDir = path.join(process.cwd(), 'public/uploads')
//     form.keepExtensions = true

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         res.status(500).json({ error: 'Error parsing form data' })
//         return
//       }

//       try {
//         const { db } = await connectToDatabase()

//         let imageUrl = null
//         if (files.image && files.image[0]) {
//           const file = files.image[0]
//           const newPath = path.join(form.uploadDir, file.newFilename)
//           await fs.rename(file.filepath, newPath)
//           imageUrl = `/uploads/${file.newFilename}`
//         }

//         const blogPost = {
//           title: fields.title[0],
//           content: fields.content[0],
//           category: fields.category[0],
//           tags: fields.tags[0].split(',').map(tag => tag.trim()),
//           imageUrl,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         }

//         const result = await db.collection('blogPosts').insertOne(blogPost)
//         const serializedResult = serializeDocument(result)

//         res.status(201).json({ message: 'Blog post created successfully', id: serializedResult.insertedId })
//       } catch (error) {
//         console.error('Error creating blog post:', error)
//         res.status(500).json({ error: 'Error creating blog post' })
//       }
//     })
//   } else {
//     res.setHeader('Allow', ['POST'])
//     res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// }




// import { IncomingForm } from 'formidable'
// import { promises as fs } from 'fs'
// import path from 'path'
// import { connectToDatabase } from '@/lib/mongodb'
// import { serializeDocument } from '@/lib/serialize'

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const form = new IncomingForm()
//     form.uploadDir = path.join(process.cwd(), 'public/uploads')
//     form.keepExtensions = true

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         res.status(500).json({ error: 'Error parsing form data' })
//         return
//       }

//       try {
//         const { db } = await connectToDatabase()

//         let imageUrl = null
//         if (files.image && files.image[0]) {
//           const file = files.image[0]
//           const newPath = path.join(form.uploadDir, file.newFilename)
//           await fs.rename(file.filepath, newPath)
//           imageUrl = `/uploads/${file.newFilename}`
//         }

//         const blogPost = {
//           title: fields.title[0],
//           content: fields.content[0],
//           category: fields.category[0],
//           tags: fields.tags[0].split(',').map(tag => tag.trim()),
//           imageUrl,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         }

//         const result = await db.collection('blogPosts').insertOne(blogPost)
//         const serializedResult = serializeDocument(result)

//         res.status(201).json({ message: 'Blog post created successfully', id: serializedResult.insertedId })
//       } catch (error) {
//         console.error('Error creating blog post:', error)
//         res.status(500).json({ error: 'Error creating blog post' })
//       }
//     })
//   } else {
//     res.setHeader('Allow', ['POST'])
//     res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// }

