import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import HeroSlide from '@/models/HeroSlide';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    const params = await context.params;
    const body = await request.json();
    const slide = await HeroSlide.findByIdAndUpdate(params.id, body, { new: true });

    if (!slide) {
      return NextResponse.json({ success: false, error: 'Hero slide not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: slide });
  } catch (error) {
    console.error('Error updating hero slide:', error);
    return NextResponse.json({ success: false, error: 'Failed to update hero slide' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    const params = await context.params;
    const slide = await HeroSlide.findByIdAndDelete(params.id);

    if (!slide) {
      return NextResponse.json({ success: false, error: 'Hero slide not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: slide });
  } catch (error) {
    console.error('Error deleting hero slide:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete hero slide' }, { status: 500 });
  }
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    const params = await context.params;
    const slide = await HeroSlide.findById(params.id);

    if (!slide) {
      return NextResponse.json({ success: false, error: 'Hero slide not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: slide });
  } catch (error) {
    console.error('Error fetching hero slide:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch hero slide' }, { status: 500 });
  }
}
