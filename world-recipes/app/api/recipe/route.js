import connectDB from '@/lib/connectDb';
import Recipe from '@/models/Recipe';

export async function GET(req, res) {
  await connectDB();

  try {
    const recipes = await Recipe.find();
    return Response.json(recipes);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
