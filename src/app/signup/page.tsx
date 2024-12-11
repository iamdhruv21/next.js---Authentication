"use client";
import Link from "next/link"
import React, {useEffect, useState} from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup Success", response.data);
            router.push("/login")
        } catch (err: any) {
            console.log("Signup failed", err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#222222] text-white max-h-screen py-2">
            <h1>{loading ? "Processing" : "SignUp"}</h1>
            <hr/>
            <label htmlFor="username">Username</label>
            <input id="username"
                   type="text"
                   value={user.username}
                   onChange={(e) => setUser({...user, username: e.target.value})}
                   placeholder="Username"
                   className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />
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
                onClick={onSignup}
            >{buttonDisabled ? "No Signup" : "Signup"}</button>

            <Link href="/login">Visit login</Link>
        </div>
    )
}