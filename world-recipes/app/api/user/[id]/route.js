import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDb';
import User from '@/models/User';

export async function GET(req, { params }) {
  await connectDB();

  try {
    const user = await User.findById(params.id).select('-password');
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}
