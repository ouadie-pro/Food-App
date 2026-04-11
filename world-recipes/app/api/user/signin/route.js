import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDb';
import User from '@/models/User';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await connectDB();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    let user = await User.findOne({ email });
    
    if (user && await bcryptjs.compare(password, user.password)) {
      const token = jwt.sign(
        { email, id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: '7h' }
      );

      return NextResponse.json({
        message: 'User logged in successfully',
        token,
        user: { _id: user._id, email: user.email }
      }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
