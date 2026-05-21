import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Architect from '@/models/Architect';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    const params = await context.params;
    const body = await request.json();
    const architect = await Architect.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!architect) {
      return NextResponse.json({ success: false, error: 'Architect not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: architect });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update architect' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    const params = await context.params;
    const architect = await Architect.findByIdAndDelete(params.id);
    
    if (!architect) {
      return NextResponse.json({ success: false, error: 'Architect not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: architect });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete architect' }, { status: 500 });
  }
}
