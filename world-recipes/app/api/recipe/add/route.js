import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDb';
import Recipe from '@/models/Recipe';
import verifyToken from '@/lib/verifyToken';

export async function POST(req) {
  await connectDB();

  const auth = verifyToken(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }

  try {
    const formData = await req.formData();
    const title = formData.get('title');
    const ingredients = formData.get('ingredients');
    const instructions = formData.get('instructions');
    const coverImage = formData.get('coverImage');

    if (!title || !ingredients || !instructions) {
      return NextResponse.json({ message: "Required fields can't be empty" }, { status: 400 });
    }

    let imageFilename = null;
    if (coverImage && coverImage.size > 0) {
      const bytes = await coverImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fs = require('fs');
      const path = require('path');
      const uploadDir = path.join(process.cwd(), 'public', 'images');
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      imageFilename = Date.now() + '-' + coverImage.name;
      fs.writeFileSync(path.join(uploadDir, imageFilename), buffer);
    }

    const newRecipe = await Recipe.create({
      title,
      ingredients: typeof ingredients === "string" ? JSON.parse(ingredients) : ingredients,
      instructions,
      coverImage: imageFilename,
      createdBy: auth.user.id
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
