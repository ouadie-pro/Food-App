import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDb';
import Recipe from '@/models/Recipe';
import verifyToken from '@/lib/verifyToken';

export async function PUT(req, { params }) {
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

    const recipe = await Recipe.findById(params.id);
    if (!recipe) {
      return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
    }

    let imageFilename = recipe.coverImage;
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

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      params.id,
      {
        title,
        ingredients: typeof ingredients === "string" ? JSON.parse(ingredients) : ingredients,
        instructions,
        coverImage: imageFilename,
      },
      { new: true }
    );

    return NextResponse.json(updatedRecipe);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
