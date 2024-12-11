"use client";
import Link from "next/link"
import React, {useEffect, useState} from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)


    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login Success", response.data);
            router.push("/profile")
        } catch (err: any) {
            console.log("Login Failed", err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#222222] text-white max-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr/>
            <label htmlFor="email">Email</label>
            <input id="email"
                   type="text"
                   value={user.email}
                   onChange={(e) => setUser({...user, email: e.target.value})}
                   placeholder="Email"
                   className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />
            <label htmlFor="password">Password</label>
            <input id="password"
                   type="password"
                   value={user.password}
                   onChange={(e) => setUser({...user, password: e.target.value})}
                   placeholder="Password"
                   className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />
            <button
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={onLogin}
            >{buttonDisabled ? "No Login" : "Login"}</button>

            <Link href="/signup">Visit Sign up</Link>
        </div>
    )
}