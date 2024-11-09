import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No Signature" }, { status: 400 });
  }

  const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webHookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook secret is not set" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webHookSecret);
  } catch (error) {
    console.error("Webhook signature verfication failed", error);
    return NextResponse.json(
      { error: `Web Hook Error : ${error}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      const order = createOrderInSanity(session);
      return NextResponse.json({ order });
    } catch (error) {
      console.error("Error creating order in sanity : ", error);
      return NextResponse.json(
        {
          error: `Error Creating Order : ${error}`,
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

const createOrderInSanity = async (session: Stripe.Checkout.Session) => {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  const { clerkUserId, customerEmail, customerName, orderNumber } =
    metadata as Metadata;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ["data.price.product"] }
  );

  const sanityProducts = lineItemsWithProduct?.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity,
  }));

  const order = await backendClient.create({
    _type: "orders",
    orderNumber: orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName: customerName,
    stripeCustomerId: customer,
    clerkUserId: clerkUserId,
    customerEmail: customerEmail,
    currency: currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  return order;
};
