import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        message: "Hi there uglyugu"
    })
}