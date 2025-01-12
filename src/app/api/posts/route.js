import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 10
    const search = searchParams.get('search') || ''
    const tag = searchParams.get('tag') || ''
    
    const { db } = await connectToDatabase()
    
    let query = {}
    if (search) {
      query = { $text: { $search: search } }
    }
    if (tag) {
      query.tags = tag
    }
    
    const posts = await db.collection('blogPosts')
      .find(query)
      .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
    
    const total = await db.collection('blogPosts').countDocuments(query)
    
    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error in /api/posts:', error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}





// import { NextResponse } from 'next/server'
// import { connectToDatabase } from '@/lib/mongodb'

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url)
//     const page = parseInt(searchParams.get('page')) || 1
//     const limit = parseInt(searchParams.get('limit')) || 10
//     const search = searchParams.get('search') || ''
    
//     const { db } = await connectToDatabase()
    
//     let query = {}
//     if (search) {
//       query = { $text: { $search: search } }
//     }
    
//     const posts = await db.collection('blogPosts')
//       .find(query)
//       .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .toArray()
    
//     const total = await db.collection('blogPosts').countDocuments(query)
    
//     return NextResponse.json({
//       success: true,
//       data: posts,
//       pagination: {
//         total,
//         page,
//         pages: Math.ceil(total / limit)
//       }
//     })
//   } catch (error) {
//     console.error('Error in /api/posts:', error)
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     )
//   }
// }

