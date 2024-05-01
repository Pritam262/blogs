'use client'

import { BlogsInterface } from "@/app/utils/blogs";
import { SERVER_URL } from "@/variable";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function UserPage() {

    const [blogs, setBlogs] = useState<BlogsInterface | null>()


    const handleDelete = async (id: String) => {

        try {

            const response = await fetch(`${SERVER_URL}/api/blog?id=${id}`, {
                method: 'DELETE',
                credentials: 'include',

            });
            await response.json();

            if (response.ok) {
                const updatedBlogsData: BlogsInterface = {
                    success: blogs?.success?.filter(blog => blog._id !== id) ?? [],
                };
                setBlogs(updatedBlogsData);
                console.log('Blog deleted successfully');
            } else {
                console.error('Failed to delete blog:', response.statusText);
            }

        } catch (error) {
            console.log(error)
        }

    }


    const getBlogs = async () => {

        const response = await fetch(`${SERVER_URL}/api/blog`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
        })

        const resData = await response.json();

        setBlogs(resData);


    }

    useEffect(() => {
        getBlogs();
    }, [])

    // const Blogs = resData.success;




    return (
        <div className="w-full min-h-fit max-h-fit bg-gray-200  flex flex-col mt-5">

            <div className="w-full mt-2 flex flex-col items-center">



                {blogs && blogs.success.map(blog => {

                    return (
                        <div key={String(blog._id)} className="w-3/5  mb-5 p-4 bg-white rounded shadow-lg flex flex-col justify-between">
                            <p className="text-3xl">{blog.title}</p>
                            <p className="text-xl">{blog.description}</p>
                            <div>
                                <Link href={`/admin//blogs/edit?id=${blog._id}`} className="mr-2"><button className="p-2 bg-purple-600 rounded text-white text-xl">Edit blog</button></Link>

                                <Link href={`/blog?q=${blog.title}&id=${blog._id}`} className="mr-2"><button className="p-2 bg-purple-600 rounded text-white text-xl">Read more</button></Link>
                                {/* <DeleteBtn  id={String(blog._id)} /> */}
                                <button className="p-2 bg-purple-600 rounded text-white text-xl" onClick={() => handleDelete(blog._id)}>Delete Blog</button>


                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}