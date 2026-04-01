import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import CollectionImage from '@/models/CollectionImage';

export async function GET() {
  try {
    await connect();
    const images = await CollectionImage.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch collection images' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const image = await CollectionImage.create(body);
    return NextResponse.json({ success: true, data: image }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create collection image' }, { status: 500 });
  }
}
