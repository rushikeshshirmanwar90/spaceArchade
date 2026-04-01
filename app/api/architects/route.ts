import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Architect from '@/models/Architect';

export async function GET() {
  try {
    await connect();
    const architects = await Architect.find().sort({ createdAt: 1 });
    return NextResponse.json({ success: true, data: architects });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch architects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const architect = await Architect.create(body);
    return NextResponse.json({ success: true, data: architect }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create architect' }, { status: 500 });
  }
}
