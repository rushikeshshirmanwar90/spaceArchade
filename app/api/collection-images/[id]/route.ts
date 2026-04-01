import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import CollectionImage from '@/models/CollectionImage';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const body = await request.json();
    const image = await CollectionImage.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!image) {
      return NextResponse.json({ success: false, error: 'Collection image not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: image });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update collection image' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const image = await CollectionImage.findByIdAndDelete(params.id);
    
    if (!image) {
      return NextResponse.json({ success: false, error: 'Collection image not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: image });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete collection image' }, { status: 500 });
  }
}
