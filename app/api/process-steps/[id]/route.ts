import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import ProcessStep from '@/models/ProcessStep';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    const params = await context.params;
    const body = await request.json();
    const step = await ProcessStep.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!step) {
      return NextResponse.json({ success: false, error: 'Process step not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: step });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update process step' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    const params = await context.params;
    const step = await ProcessStep.findByIdAndDelete(params.id);
    
    if (!step) {
      return NextResponse.json({ success: false, error: 'Process step not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: step });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete process step' }, { status: 500 });
  }
}
