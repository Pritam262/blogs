import { getDataFromToken } from "@/helper/getDataFromToken";
import { MONGO_URI } from "@/lib/db";
import { Blog } from "@/lib/model/blogModel";
import { HttpStatusCode } from "axios";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


interface RequestBody {
    title: string;
    description: string;
    content: string;

}



export async function GET(req: NextRequest) {

    const blogId = req.nextUrl.searchParams.get('id')
    try {

        await mongoose.connect(MONGO_URI);

        const data = await Blog.findById(blogId).sort({ date: -1 });

        return NextResponse.json({ success: data })
    } catch (error) {
        return NextResponse.json({ error })
    }
}




