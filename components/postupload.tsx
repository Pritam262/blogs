'use client'
import hljs from "highlight.js";

import "highlight.js/styles/atom-one-dark.css";
import dynamic from 'next/dynamic';

import React, { useEffect, useState } from 'react';

// import ReactQuill from 'react-quill';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); // Dynamically import React Quill with no SSR
import 'react-quill/dist/quill.snow.css';


export default function  MyEditor()  {
    // hljs.configure({
    //     // optionally configure hljs
    //     languages: ["javascript", "python", "c", "c++", "java", "HTML", "css", "matlab"],
    //   });
    // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const [content, setContent] = useState(" ");


    const [data, setData] = useState({title:"", description:""})
    const uploadPost = async () => {
        try {

            const response = await fetch('/api/blog', {
                method: "POST",
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: data.title,description: data.description, content })
            })

            // console.log(JSON.stringify({ title, description, content: content }));

            console.log(await response.json());
        } catch (error) {
            console.error(error)
        }
    }

    const modules = {
        // syntax: {
        //     highlight: function (text: string) {
        //       return hljs.highlightAuto(text).value;
        //     },
        //   },
        syntax:true,
         toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],

            // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ],

    };

    // useEffect(()=>{
    //     ReactQuill
    // },[])

    
    return (

       <div className='flex flex-col'>
            <div className='mt-5   flex flex-col w-5/6'>

                <input className='border px-2 py-1'  type="text" name="title" id="" placeholder='Blog title' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, [e.target.name]: e.target.value})}  value={data.title} />
                <input className='border my-2 px-2 py-1' type="text" name="description" id="" placeholder='Blog description' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, [e.target.name]:e.target.value})}  value={data.description} />
            </div>


            <ReactQuill theme='snow' value={content} modules={modules} onChange={setContent} />

            <button style={{width:'fit-content', fontSize:'18px', backgroundColor:"rgb(124 58 237)", marginTop:'20px', marginLeft:'15px', padding:'.5rem 1rem .5rem 1rem', color:'white'}}   onClick={uploadPost}>Save</button>
        </div>
    )

};






