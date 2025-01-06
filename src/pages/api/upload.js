import { MongoClient } from 'mongodb'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'POST') {
    const { images } = req.body

    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db()

    try {
      const result = await db.collection('images').insertMany(images)
      client.close()
      res.status(200).json({ message: 'Images uploaded successfully', result })
    } catch (error) {
      client.close()
      res.status(500).json({ error: 'Failed to upload images' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

