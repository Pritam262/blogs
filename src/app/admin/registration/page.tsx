'use client'
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SERVER_URL } from "@/variable";

export default function AdminRegister() {


    const router = useRouter();

    const [error, setError] = useState({ type: '', msg: '' })

    const [credencials, setCredencials] = useState({ username: ' ', email: ' ', password: ' ', conpass: ' ' })
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "username") {
            if (e.target.value.length < 6 && e.target.value != '') {
                setError({ type: "username", msg: "Username atleast 3 digit" })
            }
            else {
                setError({ type: '', msg: '' })
            }
        }

        if (e.target.name === "email") {

        } else if (e.target.name === 'password') {
            if (e.target.value.length < 6 && e.target.value != '') {
                setError({ type: "password", msg: " password length should be grethaer than 6" })
            }
            else {
                setError({ type: '', msg: '' })
            }
        }
        else if (e.target.name === 'conpass') {
            if (credencials.password != credencials.conpass) {
                setError({ type: 'conpass', msg: 'Confirm password does not match with password' })
            }
            else {
                setError({ type: '', msg: '' })
            }
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username')
        const email = formData.get('email');
        const password = formData.get('password');
        const conpass = formData.get('conpass');

        try {


            const response = await fetch(`${SERVER_URL}/api/admin/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, conpass })
            })


            const resData = await response.json();

            if (response.ok) {
                router.push('/admin/blogs');
            }
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">

            <form onSubmit={handleSubmit} className="min-w-[350px] max-w-[350px] h-[400px] border-2 border-red-900 flex flex-col p-2">

                <input className="p-2 mb-2 bg-transparent border border-black" type="text" name="username" placeholder="Enter first name" required onChange={onChange} />
                <input className="p-2 mb-2 bg-transparent border border-black" type="email" name="email" placeholder="Enter email" required onChange={onChange} />
                <input className="p-2 mb-2 bg-transparent border border-black" type="password" name="password" placeholder="Enter password" required onChange={onChange} />
                <input className="p-2 mb-2 bg-transparent border border-black" type="password" name="conpass" placeholder="Enter confirm password" required onChange={onChange} />
                <div className="w-full h-3">
                    {error && error.msg.length >= 1 ? <p>{error.msg}</p> : ""}

                </div>
                <button className="bg-blue-600 w-fit mx-auto px-3 py-2 rounded text-white mt-5" type="submit">Login</button>
                <p className="mt-5">Don&apos;t have an account <Link href="/admin/adminregister" className="text-blue-500">Click</Link> here</p>
            </form>
        </div>
    )
} 