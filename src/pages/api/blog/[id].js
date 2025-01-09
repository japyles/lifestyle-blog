import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' })
  }

  const { db } = await connectToDatabase()
  const { id } = req.query

  if (req.method === 'PUT') {
    try {
      const { title, content, category, tags } = req.body
      const result = await db.collection('blogPosts').updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, content, category, tags, updatedAt: new Date() } }
      )

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Blog post updated successfully' })
      } else {
        res.status(404).json({ error: 'Blog post not found' })
      }
    } catch (error) {
      console.error('Error updating blog post:', error)
      res.status(500).json({ error: 'Error updating blog post' })
    }
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

