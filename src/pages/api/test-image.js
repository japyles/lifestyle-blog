import { readdir } from 'fs/promises'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    // Try to read a test image from the uploads directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    const files = await readdir(uploadDir)
    
    res.status(200).json({
      success: true,
      message: 'Image directory accessible',
      files: files,
      uploadDir: uploadDir,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      uploadDir: path.join(process.cwd(), 'public', 'uploads'),
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL
    })
  }
}

