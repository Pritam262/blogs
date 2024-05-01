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

function validateRequest(object: any): object is RequestBody {
    return (
        (object as RequestBody) && typeof (object as RequestBody).title === "string" && (object as RequestBody).title.length >= 6
    );
}



export async function POST(req: NextRequest) {
    await mongoose.connect(MONGO_URI);
    try {
        const token = await getDataFromToken(req);

        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get('id');
        const body = await req.json();

        const { title, description, content } = body;

        if (!validateRequest(body)) {
            return new NextResponse(JSON.stringify({ error: "Enter valid data" }), { status: HttpStatusCode.BadRequest, headers: { 'Content-Type': 'application/json' } });
        }

        let blog = await Blog.findById(id);
        if (!blog) {
            return new NextResponse("BLOG Not Found", { status: HttpStatusCode.BadRequest, headers: { 'Content-Type': 'application/json' } });
        }
        // const updateBlog = Blog.findByIdAndUpdate(id, {
        //     user: token, title, description, content
        // });

        blog.title = title;
        blog.description = description;
        blog.content = content;

        await blog.save();

        return new NextResponse(JSON.stringify({ success: "BLOG UPDATE SUCCESSFULLY" }), { status: HttpStatusCode.Ok, headers: { 'Content-Type': 'application/json' } });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: HttpStatusCode.InternalServerError, });
    }
}