'use client';

import { useState } from 'react';
import { format } from 'date-fns';

export default function Comment({ comment, postId, onReply, session }) {
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = async (e) => {
    e.preventDefault();
    await onReply(comment._id, replyContent);
    setReplyContent('');
    setShowReplyForm(false);
  };

  return (
    <div className='border-l-2 border-gray-200 pl-4 mb-4'>
      <p className='text-gray-700'>{comment.content}</p>
      <p className='text-sm text-gray-500'>
        {comment.author} - {format(new Date(comment.createdAt), 'PPpp')}
      </p>
      <button
        onClick={() => setShowReplyForm(!showReplyForm)}
        className='text-blue-500 text-sm mt-2 hover:underline'
      >
        Reply
      </button>
      {showReplyForm && (
        <form
          onSubmit={handleReply}
          className='mt-2'
        >
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className='w-full p-2 border rounded'
            placeholder='Write your reply...'
            required
          />
          <button
            type='submit'
            className='mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
          >
            Submit Reply
          </button>
        </form>
      )}
      {comment.replies &&
        comment.replies.map((reply) => (
          <Comment
            key={reply._id}
            comment={reply}
            postId={postId}
            onReply={onReply}
            session={session}
          />
        ))}
    </div>
  );
}
