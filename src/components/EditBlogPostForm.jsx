'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditBlogPostForm({ post }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category);
  const [tags, setTags] = useState(post.tags.join(', '));
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const updatedPost = {
      title,
      content,
      category,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    try {
      const response = await fetch(`/api/blog/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        router.push(`/blog/${post._id}`);
        router.refresh();
      } else {
        throw new Error('Failed to update blog post');
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      alert('Failed to update blog post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/blog/${post._id}`);
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
      <div className='flex gap-4'>
        <button
          type='submit'
          disabled={submitting}
          className='flex-1 bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors'
        >
          {submitting ? 'Updating...' : 'Update Blog Post'}
        </button>
        <button
          type='button'
          onClick={handleCancel}
          className='flex-1 bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200 transition-colors'
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
