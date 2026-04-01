import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import HeroSlide from '@/models/HeroSlide';

export async function GET() {
  try {
    await connect();
    const slides = await HeroSlide.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: slides });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch hero slides' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const slide = await HeroSlide.create(body);
    return NextResponse.json({ success: true, data: slide }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create hero slide' }, { status: 500 });
  }
}
