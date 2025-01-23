"use client"
import { signIn, signOut } from "next-auth/react";

const AppBar = () => {
    return (
        <div>
            <button onClick={()=>{
                signIn()
            }}> SignIn</button>
            <button onClick={()=>{
                signOut()
            }}>Signout</button>
        </div>
    );
}

export default AppBar;