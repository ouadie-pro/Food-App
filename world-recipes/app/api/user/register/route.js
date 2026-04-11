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
      return NextResponse.json({ message: "Email and password can't be empty" }, { status: 400 });
    }

    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign(
      { email, id: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: '7h' }
    );

    return NextResponse.json({
      message: 'User registered successfully',
      token,
      user: { _id: newUser._id, email: newUser.email }
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
