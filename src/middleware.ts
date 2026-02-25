import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request : NextRequest){
  
 const token =  await getToken({req : request})
if (token) {

    if (request.nextUrl.pathname == "/login" || request.nextUrl.pathname == "/register" || request.nextUrl.pathname == "/verifycode" 
      || request.nextUrl.pathname == "/forgotpassword" || request.nextUrl.pathname == "/resetpassword"
    ) {
 
        return NextResponse.redirect(new URL('/', request.url))
    } else {
        return NextResponse.next()

    }
} else {

    if (request.nextUrl.pathname == "/cart" || request.nextUrl.pathname.includes("/products/") || request.nextUrl.pathname.includes("/changepassword") 
    || request.nextUrl.pathname.includes("/profile") || request.nextUrl.pathname.includes("/updatedata") || request.nextUrl.pathname.includes("/addaddress") ) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    else{
      return NextResponse.next()

    }
  }}
export const config = {
  matcher: [
    "/cart",
    "/login",
    "/register",
    "/products/:path*",
    "/verifycode",
    "/resetpassword",
    "/forgotpassword",
    "/changepassword",
    "/profile",
    "/updatedata",
    "/addaddress", // تأكد من إضافة / في البداية هنا
  ],
};
