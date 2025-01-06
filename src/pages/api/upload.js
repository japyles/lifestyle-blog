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

      const { db } = await connectToDatabase()

      const imagePromises = Object.keys(files).map(async (key) => {
        const file = Array.isArray(files[key]) ? files[key][0] : files[key];
        const newPath = path.join(form.uploadDir, file.newFilename);
        await fs.rename(file.filepath, newPath);

        const index = key.replace('file', '');
        const imageData = {
          title: Array.isArray(fields[`title${index}`]) ? fields[`title${index}`][0] : fields[`title${index}`],
          description: Array.isArray(fields[`description${index}`]) ? fields[`description${index}`][0] : fields[`description${index}`],
          location: Array.isArray(fields[`location${index}`]) ? fields[`location${index}`][0] : fields[`location${index}`],
          url: `/uploads/${file.newFilename}`,
          uploadedAt: new Date(),
        };

        const result = await db.collection('images').insertOne(imageData);
        return serializeDocument(result);
      });

      try {
        const results = await Promise.all(imagePromises)
        res.status(200).json({ message: 'Images uploaded successfully', results })
      } catch (error) {
        console.error('Error saving to database:', error)
        res.status(500).json({ error: 'Error saving to database' })
      }
    })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

