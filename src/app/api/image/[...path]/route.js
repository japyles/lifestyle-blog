import { createReadStream } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const path = params.path.join('/');
  const imagePath = join(process.cwd(), 'public', path);

  try {
    const stream = createReadStream(imagePath);
    
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'image/jpeg', // Adjust this based on your image types
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Image not found', { status: 404 });
  }
}

