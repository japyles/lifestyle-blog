'use client';

import { useState } from 'react';

export default function BlogPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('tags', tags);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setTitle('');
        setContent('');
        setCategory('');
        setTags('');
        setImage(null);
        alert('Blog post created successfully!');
      } else {
        throw new Error('Failed to create blog post');
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4'
    >
      <div>
        <label
          htmlFor='title'
          className='block text-sm font-medium text-gray-700'
        >
          Title
        </label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>
      <div>
        <label
          htmlFor='content'
          className='block text-sm font-medium text-gray-700'
        >
          Content
        </label>
        <div className='mb-2 text-sm text-gray-600'>
          <p>Formatting options:</p>
          <ul className='list-disc list-inside'>
            <li>For bold text, use **double asterisks**</li>
            <li>For underlined text, use __double underscores__</li>
            <li>For a single line break, use a single newline</li>
            <li>For a new paragraph, use two newlines</li>
          </ul>
        </div>
        <textarea
          id='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>
      <div>
        <label
          htmlFor='category'
          className='block text-sm font-medium text-gray-700'
        >
          Category
        </label>
        <input
          type='text'
          id='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>
      <div>
        <label
          htmlFor='tags'
          className='block text-sm font-medium text-gray-700'
        >
          Tags (comma-separated)
        </label>
        <input
          type='text'
          id='tags'
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>
      <div>
        <label
          htmlFor='image'
          className='block text-sm font-medium text-gray-700'
        >
          Featured Image
        </label>
        <input
          type='file'
          id='image'
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
          className='mt-1 block w-full'
        />
      </div>
      <button
        type='submit'
        disabled={submitting}
        className='w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-300'
      >
        {submitting ? 'Creating...' : 'Create Blog Post'}
      </button>
    </form>
  );
}

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
//         <div className="mb-2 text-sm text-gray-600">
//           <p>Formatting options:</p>
//           <ul className="list-disc list-inside">
//             <li>For bold text, use **double asterisks**</li>
//             <li>For underlined text, use __double underscores__</li>
//           </ul>
//         </div>
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

// 'use client';

// import { useState } from 'react';

// export default function BlogPostForm() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [category, setCategory] = useState('');
//   const [tags, setTags] = useState('');
//   const [image, setImage] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', content);
//     formData.append('category', category);
//     formData.append('tags', tags);
//     if (image) {
//       formData.append('image', image);
//     }

//     try {
//       const response = await fetch('/api/blog', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         setTitle('');
//         setContent('');
//         setCategory('');
//         setTags('');
//         setImage(null);
//         alert('Blog post created successfully!');
//       } else {
//         throw new Error('Failed to create blog post');
//       }
//     } catch (error) {
//       console.error('Error creating blog post:', error);
//       alert('Failed to create blog post. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className='space-y-4'
//     >
//       <div>
//         <label
//           htmlFor='title'
//           className='block text-sm font-medium text-gray-700'
//         >
//           Title
//         </label>
//         <input
//           type='text'
//           id='title'
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
//         />
//       </div>
//       <div>
//         <label
//           htmlFor='content'
//           className='block text-sm font-medium text-gray-700'
//         >
//           Content
//         </label>
//         <textarea
//           id='content'
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//           rows={10}
//           className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
//         />
//       </div>
//       <div>
//         <label
//           htmlFor='category'
//           className='block text-sm font-medium text-gray-700'
//         >
//           Category
//         </label>
//         <input
//           type='text'
//           id='category'
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//           className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
//         />
//       </div>
//       <div>
//         <label
//           htmlFor='tags'
//           className='block text-sm font-medium text-gray-700'
//         >
//           Tags (comma-separated)
//         </label>
//         <input
//           type='text'
//           id='tags'
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//           className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
//         />
//       </div>
//       <div>
//         <label
//           htmlFor='image'
//           className='block text-sm font-medium text-gray-700'
//         >
//           Featured Image
//         </label>
//         <input
//           type='file'
//           id='image'
//           accept='image/*'
//           onChange={(e) => setImage(e.target.files[0])}
//           className='mt-1 block w-full'
//         />
//       </div>
//       <button
//         type='submit'
//         disabled={submitting}
//         className='w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-300'
//       >
//         {submitting ? 'Creating...' : 'Create Blog Post'}
//       </button>
//     </form>
//   );
// }
