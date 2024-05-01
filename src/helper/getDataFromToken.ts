import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { HttpStatusCode } from "axios";

export const getDataFromToken = (request: NextRequest) => {

    const token = String(request.cookies.get("admintoken")?.value);

    if (!token) {
        return new NextResponse(JSON.stringify({ error: "Token not found" }), { status: HttpStatusCode.Unauthorized, headers: { 'Content-Type': 'application/json' } });
    }
    try {

        //    const token =  String(request.cookies.get("authtoken")?.value);
        const decodeToken: any = jwt.verify(token, process.env.JWT_SECRETE_KEY!);

        return decodeToken.user.id

    } catch (error: any) {
        throw new Error(error.message);
        // throw new Error("Error");

    }
}