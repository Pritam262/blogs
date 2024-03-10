import { MONGO_URI } from "@/lib/db";
import { Blog } from "@/lib/model/blogModel";
import mongoose from "mongoose";
import { Metadata } from "next";



interface Data {
    title: String;
    description: String;
    content: String;

}
export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }): Promise<Metadata> {

    const getBlogs = await Blog.find(
        { $text: { $search: searchParams.q } },
        { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    const blog = getBlogs[0];


    return {
        title: blog.title,
        description: blog.description,
        keywords: "India's top bloging website"
    };
}

export default async function blog({ params, searchParams }: { params: { slug: string }; searchParams: { id: string; q: string } }) {

    await mongoose.connect(MONGO_URI);
    const query = searchParams.q;
    const getBlogs = await Blog.find(
        { $text: { $search: query } },
        { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    const blog = getBlogs[0];

    const data: Data = {
        title: blog.title,
        description: blog.description,
        content: blog.content
    };

    return (
        <div className="w-10/12 mt-10 mx-auto bg-white px-12 pt-12 shadow-md">
            {blog && (
                <>
                <div className="w-fit mx-auto">
                    <h1 className="text-3xl ">{data.title}</h1>
                </div>
                    <p className="text-xl font-light">{data.description}</p>
                    {data.content && <div className="" dangerouslySetInnerHTML={{ __html: data.content }} />}
                </>
            )}
            {!blog && <p>Loading...</p>}
        </div>
    )
}