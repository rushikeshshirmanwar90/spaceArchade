import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Stats from '@/models/Stats';

export async function GET() {
  try {
    await connect();
    let stats = await Stats.findOne();
    
    if (!stats) {
      stats = await Stats.create({
        projectsCompleted: 150,
        yearsExperience: 25,
        teamMembers: 45,
      });
    }
    
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connect();
    const body = await request.json();
    let stats = await Stats.findOne();
    
    if (!stats) {
      stats = await Stats.create(body);
    } else {
      stats = await Stats.findByIdAndUpdate(stats._id, body, { new: true });
    }
    
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update stats' }, { status: 500 });
  }
}
