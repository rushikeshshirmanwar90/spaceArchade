import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Architect from '@/models/Architect';

export async function GET() {
  try {
    await connect();
    const architects = await Architect.find().sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, data: architects });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch architects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const architect = await Architect.create({ ...body, image: body.image || '' });
    return NextResponse.json({ success: true, data: architect }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/architects error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to create architect' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const { architects } = body;

    if (!Array.isArray(architects)) {
      return NextResponse.json({ success: false, error: 'Invalid architects data' }, { status: 400 });
    }

    // Update order for all architects
    await Promise.all(
      architects.map((item: any, index: number) =>
        Architect.findByIdAndUpdate(item._id, { order: index }, { new: true })
      )
    );

    return NextResponse.json({ success: true, message: 'Architects reordered successfully' });
  } catch (error: any) {
    console.error('PATCH /api/architects error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to reorder architects' }, { status: 500 });
  }
}
