import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDb';
import User from '@/models/User';

export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const user = await User.findByIdAndDelete(params.id);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}
