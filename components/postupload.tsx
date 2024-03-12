'use client'
import React, { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const MyEditor: React.FC = () => {
    // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const [content, setContent] = useState(" ");

    const [title, setTitle] = useState<String >();
    const [description, setDescription] = useState<String >();

    const [data, setData] = useState({title:" ", description:" "})
    const uploadPost = async () => {
        try {

            const response = await fetch('http://127.0.0.1:3003/api/blog', {
                method: "POST",
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: data.title,description: data.description, content })
            })

            console.log(JSON.stringify({ title, description, content: content }));

            console.log(await response.json());
        } catch (error) {
            console.log(error)
        }
    }

    const modules = {
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
    return (

       <div className='flex flex-col'>
            <div className='mt-5 border border-red-500'>

                <input className='border' style={{marginRight:'4px'}} type="text" name="title" id="" placeholder='Blog title' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, [e.target.name]: e.target.value})}  value={data.title.trim() !== '' ? data.title : ''} />
                <input className='border' type="text" name="description" id="" placeholder='Blog description' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, [e.target.name]:e.target.value})}  value={data.description.trim() !== '' ? data.description : ''} />
            </div>


            <ReactQuill theme='snow' value={content} modules={modules} onChange={setContent} />

            <button style={{width:'fit-content', fontSize:'18px', backgroundColor:"rgb(124 58 237)", marginTop:'20px', marginLeft:'15px', padding:'.5rem 1rem .5rem 1rem', color:'white'}}   onClick={uploadPost}>Save</button>
        </div>
    )

};

export default MyEditor;




