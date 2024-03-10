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

        const { username, email, password, conpass } = await req.json();

        const user = await AdminAuthModel.findOne({email});
        if(user){
            return new NextResponse(JSON.stringify({ error: "User already exit"}), { status: HttpStatusCode.Forbidden, headers: { 'Content-Type': 'application/json' } })
        }

        if(password != conpass){
            return new NextResponse(JSON.stringify({ error: "password and confirm password did not match"}), { status: HttpStatusCode.BadRequest, headers: { 'Content-Type': 'application/json' } })
        }

        const salt  = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const registerUser = await AdminAuthModel.create({
            username,
            email,
            password:hashPassword
        })

        const tokenPayload = {
            user:{
                id:registerUser.id,
            }
        }

        const authtoken = jwt.sign(tokenPayload, JWT_KEY);

        // const cookieOption = {
        //     expires:new Date(
        //         Date.now() + process.env.JWT_COOKIE_EXPIR_IN * 24 * 60 * 60 * 1000
        //     ),
        //     // secure:true,
        //     secure:false,
        //     httpOnly:true,
        //     SameSite:false,
        // }

        cookies().set({
            name:"authtoken",
            value:authtoken,
            httpOnly:true,
            path:'/',
            expires:Date.now() + Number(process.env.JWT_COOKIES_EXPIRE_IN) * 24 * 60 *60 * 1000

        })
        
        return new NextResponse(JSON.stringify({ authtoken}), { status: HttpStatusCode.Ok, headers: { 'Content-Type': 'application/json' } })

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: HttpStatusCode.InternalServerError, headers: { 'Content-Type': 'application/json' } })
    }

}