'use client'
import axios from "axios";
import { useEffect, useState } from "react";

interface User{
    username:string
    
}
const Usercard = () => {
    const [userData,setUserData]=useState<User>()
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/user`).then(res=>{
            setUserData(res.data)
            setLoading(false)
        })
    },[])

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="flex justify-center">
                <div className="border p-8 rounded">
                    <div>
                        Name:{userData?.username}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Usercard;