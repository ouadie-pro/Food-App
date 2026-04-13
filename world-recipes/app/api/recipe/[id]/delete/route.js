import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/connectDb';

export async function DELETE(req) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const parts = pathname.split('/');
  const id = parts[parts.length - 2];
  
  try {
    await connectDB();
    const db = mongoose.connection.db;
    
    const recipe = await db.collection('recipes').findOne({ 
      _id: new mongoose.Types.ObjectId(id) 
    });
    
    if (!recipe) {
      return NextResponse.json({ message: "Recipe not found", id: id }, { status: 404 });
    }
    
    await db.collection('recipes').deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    return NextResponse.json({ message: "Recipe deleted" });
  } catch (error) {
    return NextResponse.json({ message: error.message, id: id }, { status: 500 });
  }
}
