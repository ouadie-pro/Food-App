import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/connectDb';
import verifyToken from '@/lib/verifyToken';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const parts = pathname.split('/');
  const id = parts[parts.length - 2];

  const auth = verifyToken(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }

  try {
    await connectDB();
    const db = mongoose.connection.db;

    const formData = await req.formData();
    const title = formData.get('title');
    const ingredients = formData.get('ingredients');
    const instructions = formData.get('instructions');
    const coverImage = formData.get('coverImage');

    const recipe = await db.collection('recipes').findOne({ _id: new mongoose.Types.ObjectId(id) });
    if (!recipe) {
      return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
    }

    let imageUrl = recipe.coverImage;
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

    const parsedIngredients = typeof ingredients === "string" ? JSON.parse(ingredients) : ingredients;
    
    await db.collection('recipes').updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { title, ingredients: parsedIngredients, instructions, coverImage: imageUrl } }
    );

    const updatedRecipe = await db.collection('recipes').findOne({ _id: new mongoose.Types.ObjectId(id) });
    return NextResponse.json(updatedRecipe);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
