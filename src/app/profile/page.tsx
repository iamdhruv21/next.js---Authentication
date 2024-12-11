"use client";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            router.push('/login')
        } catch (err: any) {
            console.log("Their is an error", err.message)
        }
    }

    const getUserDetail = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data)
        setData(res.data.data._id)
    }



    return (
        <div className="flex text-white bg-[#222] flex-col items-center justify-center h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <h2 className='px-2 py-1 rounded bg-purple-400'>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>
            <button onClick={logout} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg mt-4'>Logout</button>
            <button onClick={getUserDetail} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4'>Get Data</button>
        </div>
    )
}