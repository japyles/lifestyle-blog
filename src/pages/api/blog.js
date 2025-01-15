import { connectToDatabase } from '@/lib/mongodb'
import { writeFile, mkdir } from 'fs/promises'
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

      const title = fields.title
      const content = fields.content
      const category = fields.category
      const tags = fields.tags
      const image = files.image

      console.log('Received blog post data:', { 
        title, 
        category, 
        tags, 
        hasImage: !!image,
        imageType: image?.type,
        imageSize: image?.size 
      })

      let imageUrl = null
      if (image) {
        try {
          // Ensure uploads directory exists
          const uploadDir = path.join(process.cwd(), 'public', 'uploads')
          await mkdir(uploadDir, { recursive: true })

          const filename = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
          const filepath = path.join(uploadDir, filename)
          
          console.log('Saving image to:', filepath)
          await writeFile(filepath, await readFile(image.path))
          
          // Store the relative path in the database
          imageUrl = `/uploads/${filename}`
          console.log('Image URL saved as:', imageUrl)
        } catch (error) {
          console.error('Error saving image:', error)
          return res.status(500).json({ success: false, message: `Failed to save image: ${error.message}` })
        }
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
        const photoResult = await db.collection('photos').insertOne({
          title: title,
          description: `Image for blog post: ${title}`,
          url: imageUrl,
          uploadedAt: new Date(),
          associatedBlogPost: result.insertedId.toString()
        })
        console.log('Photo added to photos collection:', photoResult.insertedId)
      }

      res.status(201).json({ 
        success: true, 
        id: result.insertedId,
        imageUrl: imageUrl // Return the imageUrl for debugging
      })
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
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




