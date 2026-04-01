import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import HeroSlide from '@/models/HeroSlide';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const body = await request.json();
    const slide = await HeroSlide.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!slide) {
      return NextResponse.json({ success: false, error: 'Hero slide not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: slide });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update hero slide' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const slide = await HeroSlide.findByIdAndDelete(params.id);
    
    if (!slide) {
      return NextResponse.json({ success: false, error: 'Hero slide not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: slide });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete hero slide' }, { status: 500 });
  }
}
