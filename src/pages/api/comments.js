import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const { db } = await connectToDatabase()

  if (req.method === 'POST') {
    const { postId, content, author, parentCommentId } = req.body

    try {
      const comment = {
        _id: new ObjectId(),
        content,
        author,
        createdAt: new Date(),
        replies: []
      }

      let updateOperation

      if (parentCommentId) {
        // This is a reply to an existing comment
        updateOperation = {
          $push: {
            "comments.$[comment].replies": comment
          }
        }
        const arrayFilters = [{ "comment._id": new ObjectId(parentCommentId) }]

        await db.collection('blogPosts').updateOne(
          { _id: new ObjectId(postId) },
          updateOperation,
          { arrayFilters }
        )
      } else {
        // This is a new top-level comment
        updateOperation = {
          $push: { comments: comment }
        }

        await db.collection('blogPosts').updateOne(
          { _id: new ObjectId(postId) },
          updateOperation
        )
      }

      res.status(201).json({ success: true, comment })
    } catch (error) {
      res.status(500).json({ success: false, message: error.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

