import Stripe from "stripe";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getRoom } from "@/lib/apis";
import { getServerSession } from "next-auth";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

type RequestData = {
  checkinDate: string;
  checkoutDate: string;
  adults: number;
  children: number;
  numberOfDays: number;
  hotelRoomSlug: string;
};
export async function POST(request: Request, response: Response) {
  const {
    checkinDate,
    checkoutDate,
    adults,
    children,
    numberOfDays,
    hotelRoomSlug,
  }: RequestData = await request.json();

  if (
    !checkinDate ||
    !checkoutDate ||
    !adults ||
    !hotelRoomSlug ||
    !numberOfDays
  ) {
    return new NextResponse("Please Provide all the fields", { status: 400 });
  }
  const headers = new Headers(request.headers);
  const origin = headers.get("origin");

  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Authentication Required", { status: 400 });
  }
  const userId = session.user.id;

  const formattedCheckoutDate = checkoutDate.split("T")[0];
  const formattedCheckinDate = checkinDate.split("T")[0];

  try {
    const room = await getRoom(hotelRoomSlug);
    const discountPrice = room.price - (room.price / 100) * room.discount;
    const totalPrice = discountPrice * numberOfDays;

    // Create a stripe payment
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "INR",
            product_data: {
              name: room.name,
              images: room.images.map((image) => image.url),
            },
            unit_amount: parseInt((totalPrice * 100).toString()),
          },
        },
      ],
      payment_method_types: ["card"],
      success_url: `${origin}/users/${userId}`,
      metadata: {
        adults: adults,
        checkinDate: formattedCheckinDate,
        checkoutDate: formattedCheckoutDate,
        children,
        hotelRoom: room._id,
        numberOfDays,
        user: userId,
        discount: room.discount,
        totalPrice,
      },
    });
    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: "Payment Session Created",
    });
  } catch (err: any) {
    console.log("Payment Failded", err.message);
    return new NextResponse("Something Went Wrong!", { status: 500 });
  }
}
