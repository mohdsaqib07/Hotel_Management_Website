import { NextResponse } from "next/server";
import { createBooking, updateHotelRoom } from "@/lib/apis";
import Stripe from "stripe";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(request: Request, response: Response) {
  const reqBody = await request.text();
  const headers = new Headers(request.headers);
  const sig = headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (err: any) {
    return new NextResponse(`ebhook Error ${err.message} ! `, { status: 500 });
  }

  // loading our Event
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object;
      console.log(session);
      // Create a booking

      // using @ts-ignore comment you can bypass the typescript warning
      const {
        
        metadata: {
          //@ts-ignore
          adults,
          //@ts-ignore
          checkinDate,
          //@ts-ignore
          checkoutDate,
          //@ts-ignore
          children,
          //@ts-ignore
          hotelRoom,
          //@ts-ignore
          numberOfDays,
          //@ts-ignore
          user,
          //@ts-ignore
          discount,
          //@ts-ignore
          totalPrice,
        },
      } = session;
      await createBooking({
        adults: Number(adults),
        checkinDate,
        checkoutDate,
        children: Number(children),
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        discount: Number(discount),
        totalPrice: Number(totalPrice),
        user,
      });

      // update hotel Room
      await updateHotelRoom(hotelRoom);
      return NextResponse.json("Booking Successful", {
        status: 200,
        statusText: "Booking Successful",
      });

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json("Event Received", {
    status: 200,
    statusText: "Event Received",
  });
}
