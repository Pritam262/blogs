import { getDataFromToken } from "@/helper/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";

import { AdminAuthModel } from "@/lib/model/adminauthModel";

import { MONGO_URI } from "@/lib/db";
import mongoose from "mongoose";

mongoose.connect(MONGO_URI);

export async function GET(request: NextRequest) {
    try {

        const token = await getDataFromToken(request);

        const user = await AdminAuthModel.findById(token).select('-password -__v');

        return NextResponse.json({ user }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}