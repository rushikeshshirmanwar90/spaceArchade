import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import ProcessStep from '@/models/ProcessStep';

export async function GET() {
  try {
    await connect();
    const steps = await ProcessStep.find().sort({ step: 1 });
    return NextResponse.json({ success: true, data: steps });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch process steps' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const step = await ProcessStep.create(body);
    return NextResponse.json({ success: true, data: step }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create process step' }, { status: 500 });
  }
}
