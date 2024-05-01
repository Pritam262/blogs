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


    const query = req.nextUrl.searchParams.get('query');
    if (!query) {
        return new NextResponse(JSON.stringify({ error: "Query not found" }), { status: HttpStatusCode.BadRequest })
    }

    try {

        await mongoose.connect(MONGO_URI);

        const data = await Blog.findOne(
            { $text: { $search:String(query) } },
            { score: { $meta: "textScore" } }
        );

        return new NextResponse(JSON.stringify({ success: data }), { status: HttpStatusCode.Ok })
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: HttpStatusCode.InternalServerError })
    }
}





