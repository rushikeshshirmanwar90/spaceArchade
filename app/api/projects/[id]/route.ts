import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Project from '@/models/Project';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const body = await request.json();
    const project = await Project.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const project = await Project.findByIdAndDelete(params.id);
    
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 500 });
  }
}
