import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 10
    const search = searchParams.get('search') || ''
    
    const { db } = await connectToDatabase()
    
    let query = {}
    if (search) {
      query = { $text: { $search: search } }
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
//       .sort({ score: { $meta: "textScore" } })
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
//       .sort({ createdAt: -1 })
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







// import { NextResponse } from 'next/server'
// import dbConnect from '@/lib/mongodb'
// import BlogPost from '@/models/BlogPost'
// import { handleError, ApiError } from '@/lib/api-utils'

// export async function GET(req) {
//   try {
//     await dbConnect()
    
//     const { searchParams } = new URL(req.url)
//     const page = parseInt(searchParams.get('page')) || 1
//     const limit = parseInt(searchParams.get('limit')) || 10
    
//     const posts = await BlogPost.find({ status: 'published' })
//       .populate('author', 'username')
//       .populate('category', 'name')
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .lean()
    
//     const total = await BlogPost.countDocuments({ status: 'published' })
    
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
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: error instanceof ApiError ? error.statusCode : 500 }
//     )
//   }
// }

// export async function POST(req) {
//   try {
//     await dbConnect()
    
//     const body = await req.json()
    
//     const post = await BlogPost.create(body)
    
//     return NextResponse.json({
//       success: true,
//       data: post
//     }, { status: 201 })
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: error instanceof ApiError ? error.statusCode : 500 }
//     )
//   }
// }

