import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  getUserData,
  checkReviewExists,
  createReview,
  updateReview,
} from "@/lib/apis";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Authentication Required", { status: 400 });
  }
  const userId = session.user.id;
  try {
    const data = await getUserData(userId);
    return NextResponse.json(data, { status: 200, statusText: "Successful" });
  } catch (err: any) {
    console.log("Error at the Router : ", err.message);
    return new NextResponse("Unable to fetch ", { status: 400 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Authentication Required", { status: 500 });
  }
  const { roomId, reviewText, ratingValue } = await req.json();

  if (!roomId || !reviewText || !ratingValue) {
    return new NextResponse("All Fields are required", { status: 400 });
  }
  const userId = session.user.id;

  try {
    //Check if already exists
    const alreadyExists = await checkReviewExists(userId, roomId);
    let data;
    if (alreadyExists) {
      data = await updateReview({
        reviewId: alreadyExists._id,
        reviewText,
        userRating: ratingValue,
      });
    } else {
      data = await createReview({
        hotelRoomId: roomId,
        reviewText,
        userId,
        userRating: ratingValue,
      });
    }

    return NextResponse.json(data, {
      status: 200,
      statusText: "Successful Review Submission !",
    });
  } catch (err: any) {
    console.log("Error Updating: ", err.message);
    return new NextResponse("Unable to create the review", { status: 400 });
  }
}
