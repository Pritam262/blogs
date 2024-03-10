import { MONGO_URI } from "@/lib/db";
import { HttpStatusCode } from "axios";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminAuthModel } from "@/lib/model/adminauthModel";
import { cookies } from "next/headers";

const JWT_KEY = process.env.JWT_SECRETE_KEY || 'UEmdDJiFF4514';

export const POST = async (req: NextRequest) => {

    await mongoose.connect(MONGO_URI);
    try {

        const { email, password } = await req.json();


        const user = await AdminAuthModel.findOne({email});
        if(!user){
            return new NextResponse(JSON.stringify({ error: "Wrong credencials"}), { status: HttpStatusCode.NotFound, headers: { 'Content-Type': 'application/json' } })
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if(!passCompare){
            return new NextResponse(JSON.stringify({ error: "Please try to login with correct credencials" }), { status: HttpStatusCode.BadRequest, headers: { 'Content-Type': 'application/json' } })
        }

        const tokenPayload = {
            user:{
                id:user.id,
            }
        }

        const authtoken = jwt.sign(tokenPayload, JWT_KEY);

        cookies().set({
            name:"authtoken",
            value:authtoken,
            httpOnly:true,
            sameSite:true,
            secure:true,
            path:'/',
            expires:Date.now() + Number(process.env.JWT_COOKIES_EXPIRE_IN) * 24 * 60 *60 * 1000

        })

        return new NextResponse(JSON.stringify({ authtoken}), { status: HttpStatusCode.Ok, headers: { 'Content-Type': 'application/json' } })

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: HttpStatusCode.InternalServerError, headers: { 'Content-Type': 'application/json' } })
    }

}