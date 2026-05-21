import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Testimonial from '@/models/Testimonial';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    const params = await context.params;
    const body = await request.json();
    const testimonial = await Testimonial.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!testimonial) {
      return NextResponse.json({ success: false, error: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    const params = await context.params;
    const testimonial = await Testimonial.findByIdAndDelete(params.id);
    
    if (!testimonial) {
      return NextResponse.json({ success: false, error: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
