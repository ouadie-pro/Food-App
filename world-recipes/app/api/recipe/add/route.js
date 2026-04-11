import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDb';
import Recipe from '@/models/Recipe';
import verifyToken from '@/lib/verifyToken';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    let imageUrl = null;
    if (coverImage && coverImage.size > 0) {
      const bytes = await coverImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'world-recipes' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
      
      imageUrl = result.secure_url;
    }

    const newRecipe = await Recipe.create({
      title,
      ingredients: typeof ingredients === "string" ? JSON.parse(ingredients) : ingredients,
      instructions,
      coverImage: imageUrl,
      createdBy: auth.user.id
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}