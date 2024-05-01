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

        cookies().delete('admintoken');

        // cookies().set({
        //     name:"admintoken",
        //     value:'authtoken',
        //         //    secure: process.env.NODE_ENV !== "development",
        //         secure: false,
        //         httpOnly: true,
        //         // sameSite: "None",
        //         // domain: '.ims.pritamjana.com'
        //     expires:Date.now() + Number(process.env.JWT_COOKIES_EXPIRE_IN) * 24 * 60 *60 * 1000

        // })

        return new NextResponse(JSON.stringify({success:"ADMIN LOGOUT" }), { status: HttpStatusCode.Ok, headers: { 'Content-Type': 'application/json' } })

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: HttpStatusCode.InternalServerError, headers: { 'Content-Type': 'application/json' } })
    }

}