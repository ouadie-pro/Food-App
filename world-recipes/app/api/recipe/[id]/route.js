import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDb';
import Recipe from '@/models/Recipe';

export async function GET(req, { params }) {
  await connectDB();

  try {
    const recipe = await Recipe.findById(params.id);
    if (!recipe) {
      return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
  }
}
