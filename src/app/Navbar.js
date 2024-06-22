"use client"
import { getCookie, hasCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar(){
    const [id,setId] = useState("");
    useEffect(()=>{
        setId(getCookie("user"));
    },[])
    return(
        <>
           <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
            <div className="container-fluid">
                <Link href="/" className="navlink"><label style={{cursor:"pointer"}}><span style={{fontFamily:"serif",marginLeft:"20px",color:"red",fontWeight:"bold",fontSize:"20px"}}>Real</span><span style={{fontFamily:"serif",fontSize:"20px",color:"black"}}>Estate</span></label></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                     <Link href="/" className="navlink">
                        <li className="nav-item">
                            <label>Home</label>
                        </li>
                    </Link>
                    {
                        id===undefined?<>
                            <Link href="/Login" className="navlink">
                                <li className="nav-item">
                                    <label>Login</label>
                                </li>
                            </Link>
                            <Link href="/Signup" className="navlink">
                                <li className="nav-item">
                                    <label>Create Account</label>
                                </li>
                            </Link>
                        </>:null
                    }   
                    {
                        id!==undefined?<>
                            <Link href="/AddProperty" className="navlink">
                                <li className="nav-item">
                                    <label>Add Property</label>
                                </li>
                            </Link>
                            <Link href="/EditDetails" className="navlink">
                                <li className="nav-item">
                                    <label>Edit Profile</label>
                                </li>
                            </Link>
                            <Link href="/ChangePass" className="navlink">
                                <li className="nav-item">
                                    <label>Change Password</label>
                                </li>
                            </Link>
                            <Link href="/Logout" className="navlink">
                                <li className="nav-item">
                                    <label>Logout</label>
                                </li>
                            </Link>
                        </>:null
                    }   
                       
                </ul>
                </div>
            </div>
            </nav>
        </>
    );
}