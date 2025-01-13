'use client';

import { useState } from 'react';
import Comment from '@/components/Comment';

export default function CommentSection({ postId, initialComments, session }) {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: postId,
        content: newComment,
        author: session?.user?.name || 'Anonymous',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setComments([...comments, data.comment]);
      setNewComment('');
    }
  };

  const handleReply = async (parentCommentId, content) => {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: postId,
        content,
        author: session?.user?.name || 'Anonymous',
        parentCommentId,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const updatedComments = comments.map((comment) => {
        if (comment._id === parentCommentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), data.comment],
          };
        }
        return comment;
      });
      setComments(updatedComments);
    }
  };

  return (
    <section className='max-w-3xl mx-auto mt-12'>
      <h2 className='text-2xl font-bold mb-4'>Comments</h2>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          postId={postId}
          onReply={handleReply}
          session={session}
        />
      ))}
      <form
        onSubmit={handleCommentSubmit}
        className='mt-8'
      >
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className='w-full p-2 border rounded'
          placeholder='Write your comment...'
          required
        />
        <button
          type='submit'
          className='mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
        >
          Submit Comment
        </button>
      </form>
    </section>
  );
}
