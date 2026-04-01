import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Settings from '@/models/Settings';

export async function GET(request: Request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    
    if (key) {
      const setting = await Settings.findOne({ key });
      return NextResponse.json({ success: true, data: setting });
    }
    
    const settings = await Settings.find();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const { key, value } = body;
    
    const setting = await Settings.findOneAndUpdate(
      { key },
      { key, value },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ success: true, data: setting });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save setting' }, { status: 500 });
  }
}
