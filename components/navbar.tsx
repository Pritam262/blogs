'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
export default function Navbar() {
    ;
    const router = useRouter();
    const [query, setQuery] = useState('');
    return <div className="w-full h-20 flex vsm:flex-col vsm:justify-center md:flex-row items-center md:justify-between shadow-md shadow-slate500/50">
        <h2 className="md:ml-10">LOGO</h2>

        <div className="md:mr-10 flex items-center bg-white rounded-sm">
            <input type="text" name="search" placeholder="Search Something" className="px-2 py-1 bg-transparent" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} value={query} />
            <IoSearch className='text-xl text-black mx-2 cursor-pointer' onClick={() => router.push(`/search?query=${query}`)} />
        </div>
    </div>
}