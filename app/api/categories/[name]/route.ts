import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Category from '@/models/Category';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    await connect();
    const { name } = await params;

    const category = await Category.findOneAndDelete({ name: decodeURIComponent(name) });

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error: any) {
    console.error('DELETE /api/categories/[name] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete category' },
      { status: 500 }
    );
  }
}
