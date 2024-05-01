import { Metadata } from "next";
import { BlogInterface } from "../utils/blogs";
import 'highlight.js/styles/github-dark.css';

const ServerUrl = process.env.SERVER_URL;
export async function generateMetadata({ searchParams }: { searchParams: { id: string; q: string } }): Promise<Metadata> {

    const response = await fetch(`${ServerUrl}/api/blog/specificblog?id=${searchParams.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-cache',
    })

    const blog: BlogInterface = await response.json();


    return {
        title: String(blog?.success?.title),
        description: String(blog?.success?.description),
        keywords: "India's top bloging website"
    };
}

export default async function blog({ params, searchParams }: { params: { slug: string }; searchParams: { id: string; q: string } }) {

    
    const response = await fetch(`${ServerUrl}/api/blog/specificblog?id=${searchParams.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-cache',
    })
    
    const blog: BlogInterface = await response.json();

    return (
        <div className="sm:w-screen  lg:w-10/12  md:mt-10 mx-auto bg-white vsm:px-1 md:px-1 lg:px-12 pt-12 shadow-md overflow-x-hidden vsm:pb-10">
            {blog && (
                <>
                    <div className="w-fit mx-auto overflow-x-hidden">
                        <h1 className="text-3xl ">{blog?.success?.title}</h1>
                    </div>
                    <p className="text-xl font-light">{blog?.success?.description}</p>
                    {blog?.success?.content && <div className="" dangerouslySetInnerHTML={{ __html: blog?.success?.content }} />}

                </>
            )}
            {!blog && <p>Loading...</p>}
        </div>
    )
}