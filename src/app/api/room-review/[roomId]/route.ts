import { NextResponse, type NextRequest } from "next/server";
import { getRoomReviews } from "@/lib/apis";
export async function GET(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
  const { roomId } = params;
  try {
    const roomReviews = await getRoomReviews(roomId);
    return NextResponse.json(roomReviews, {
      status: 200,
      statusText: "Succesful!",
    });
  } catch (err: any) {
    console.log("Getting Review Failded", err.message);
    return new NextResponse("Unable to Fetch", { status: 400 });
  }
}
