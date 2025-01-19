import prisma from "@/app/lib/next-auth/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// 購入履歴の保存
export async function POST(request: Request, respose: Response) {
  const { sessionId } = await request.json();
  console.log("AAAAAAAAAAAAAAAAAAAAA")
  console.log(sessionId);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("BBBBBBBBBBBBBBBBBB")
    console.log(session);

    const existiongPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id!,
        bookId: session.metadata?.bookId!,
      },
    });

    console.log("CCCCCCCCCCCCCCCC")
    console.log(existiongPurchase);

    if (!existiongPurchase) {
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata?.bookId!,
        },
      });
      return NextResponse.json({ purchase });
    } else {
      return NextResponse.json({ message: "すでに購入済みです。" });
    }
  } catch (err) {
    return NextResponse.json(err);
  }
}
