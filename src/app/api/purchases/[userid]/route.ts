import prisma from "@/app/lib/next-auth/prisma";
import { NextRequest, NextResponse } from "next/server";

// 購入履歴検索API
export async function GET(
    request: Request,
    context: {params: {userId: string}}
){
    const userId = context.params.userId;

    try {
        const purchases = await prisma.purchase.findMany({
            where: {userId}
        });
        return NextResponse.json(purchases);
    } catch (err) {
        return NextResponse.json(err);
    }
}