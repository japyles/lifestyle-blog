import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import { handleError, ApiError } from '@/lib/api-utils'

export async function GET(req) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 10
    
    const posts = await BlogPost.find({ status: 'published' })
      .populate('author', 'username')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
    
    const total = await BlogPost.countDocuments({ status: 'published' })
    
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
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error instanceof ApiError ? error.statusCode : 500 }
    )
  }
}

export async function POST(req) {
  try {
    await dbConnect()
    
    const body = await req.json()
    
    const post = await BlogPost.create(body)
    
    return NextResponse.json({
      success: true,
      data: post
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error instanceof ApiError ? error.statusCode : 500 }
    )
  }
}

