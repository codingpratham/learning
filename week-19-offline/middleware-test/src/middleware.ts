/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";

let count=0

export function middleware(req : NextRequest){
  count++
  const res =  NextResponse.next()
  console.log("Request count:",count);
  return res
}

export const config = {
  matcher:"/api/:path*"
}