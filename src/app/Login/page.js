"use client";
import axios from "axios";
import { useState } from "react";
import {  useRouter } from 'next/navigation';
import { useEffect } from "react";
import { hasCookie, setCookie } from "cookies-next";
import Link from "next/link";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Login() {
    const [email,setEmail] = useState();
    const [pass,setPass] = useState();
    const router = useRouter();
    const [msg,setMsg] = useState();
    useEffect(()=>{
        if(hasCookie("user") != false){
            router.push("/");
        }
    },[])
    async function submit(){
        const response = await axios.post("http://localhost:3000/api/real/login/", { email: email, pass: pass });
        const result = response.data.result;
        setMsg(result);
        const userId = response.data.userId; 
        if (result === "success") {
            setCookie("user", userId);
            router.push("/");
        } 
        }
    return(
        <main>
            <Navbar />
            
            <div className="container-fluid"  style={{background:"#F0F8FF"}}>
                <br/><br/><br/>
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-7">
                    {
                        msg=="Mismatch"?<div className="alert alert-danger" style={{textAlign:"center"}}>Password Not Currect</div>:
                        msg=="Invalid"?<div className="alert alert-danger" style={{textAlign:"center"}}>Email I'd Not Found</div>:null        
                    }
                    <div className="card">
                        <div className="card-header" style={{textAlign:"center",fontSize:"20px",fontFamily:"serif"}}>Login</div>
                        <div className="card-body">
                            <label>Email :</label>
                            <input type="email" required style={{marginTop:"10px"}} className="form-control" onChange={(e)=>setEmail(e.target.value)} /><br/>
                            <label>Password :</label>
                            <input type="password" required className="form-control" onChange={(e)=>setPass(e.target.value)} /><br/>
                        </div>
                        <div className="card-footer">
                        <input type="submit" value="Login" onClick={()=>submit()} className="btn btn-primary" /> <Link href="/Signup" style={{textDecoration:"none"}}>Register</Link> 
                        </div>
                    </div>
                </div>
                <div className="col-lg-2"></div>
            </div>
            <br/><br/><br/><br/><br/><br/>
            </div>
            <Footer />
        </main>
    );
}
