import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [this], // This allows for nested comments
}, { timestamps: true })

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  featuredImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [commentSchema]
}, {
  timestamps: true
})

// Add text index for search functionality
blogPostSchema.index({ title: 'text', content: 'text' })

export default mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema)




// 'use client'

// import { useState } from 'react'

// export default function BlogPostForm() {
//   const [title, setTitle] = useState('')
//   const [content, setContent] = useState('')
//   const [category, setCategory] = useState('')
//   const [tags, setTags] = useState('')
//   const [image, setImage] = useState(null)
//   const [submitting, setSubmitting] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setSubmitting(true)

//     const formData = new FormData()
//     formData.append('title', title)
//     formData.append('content', content)
//     formData.append('category', category)
//     formData.append('tags', tags)
//     if (image) {
//       formData.append('image', image)
//     }

//     try {
//       const response = await fetch('/api/blog', {
//         method: 'POST',
//         body: formData,
//       })

//       if (response.ok) {
//         setTitle('')
//         setContent('')
//         setCategory('')
//         setTags('')
//         setImage(null)
//         alert('Blog post created successfully!')
//       } else {
//         throw new Error('Failed to create blog post')
//       }
//     } catch (error) {
//       console.error('Error creating blog post:', error)
//       alert('Failed to create blog post. Please try again.')
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>
//       <div>
//         <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
//         <textarea
//           id="content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//           rows={10}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>
//       <div>
//         <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
//         <input
//           type="text"
//           id="category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>
//       <div>
//         <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
//         <input
//           type="text"
//           id="tags"
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>
//       <div>
//         <label htmlFor="image" className="block text-sm font-medium text-gray-700">Featured Image</label>
//         <input
//           type="file"
//           id="image"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           className="mt-1 block w-full"
//         />
//       </div>
//       <button
//         type="submit"
//         disabled={submitting}
//         className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
//       >
//         {submitting ? 'Creating...' : 'Create Blog Post'}
//       </button>
//     </form>
//   )
// }

