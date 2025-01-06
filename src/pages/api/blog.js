import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'
import path from 'path'
import { connectToDatabase } from '@/lib/mongodb'
import { serializeDocument } from '@/lib/serialize'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm()
    form.uploadDir = path.join(process.cwd(), 'public/uploads')
    form.keepExtensions = true

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Error parsing form data' })
        return
      }

      try {
        const { db } = await connectToDatabase()

        let imageUrl = null
        if (files.image && files.image[0]) {
          const file = files.image[0]
          const newPath = path.join(form.uploadDir, file.newFilename)
          await fs.rename(file.filepath, newPath)
          imageUrl = `/uploads/${file.newFilename}`
        }

        const blogPost = {
          title: fields.title[0],
          content: fields.content[0],
          category: fields.category[0],
          tags: fields.tags[0].split(',').map(tag => tag.trim()),
          imageUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        const result = await db.collection('blogPosts').insertOne(blogPost)
        const serializedResult = serializeDocument(result)

        res.status(201).json({ message: 'Blog post created successfully', id: serializedResult.insertedId })
      } catch (error) {
        console.error('Error creating blog post:', error)
        res.status(500).json({ error: 'Error creating blog post' })
      }
    })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

