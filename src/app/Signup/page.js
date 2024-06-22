"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {  useRouter } from 'next/navigation';
import { hasCookie } from "cookies-next";
import Link from "next/link";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function page(){
    const [email,setEmail] = useState();
    const [pass, setPass]   = useState();
    const [retypepass, setRetypePass]   = useState();
    const [fname,setFname] = useState();
    const [lname,setLname] = useState();
    const [phone,setPhone] = useState();
    const [error,setError] = useState('');
    const router = useRouter();
    const Router = useRouter();
    useEffect(()=>{
        if(hasCookie("user") != false){
             Router.push("/");
        }
        
    },[])
    async function submit(){    
        if(email==null || pass==null || fname==null || lname==null || retypepass==null || phone==null){
            setError("empty");
        }
        else if(pass != retypepass){
            setError("password");
        }
        else{
            axios.post("http://localhost:3000/api/real/signup",{fname:fname,lname:lname,email:email,pass:pass,phone:phone}).then((res)=>{console.log(res.data.result);});
            router.push("/Login");  
        } 
    }
    return(
        <>
         <Navbar />
         <br/><br/> 
        <div className="container-fluid"  style={{background:"#F0F8FF"}}>
            <br/>
            <div className="row">
            <div className="col-lg-2"></div>
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-header" style={{textAlign:"center",fontSize:"20px",fontFamily:"serif"}}>Sign Up</div>
                        <div className="card-body">
                            {
                                error=="empty"?<div className="alert alert-danger">All Field Required</div>:
                                error=="password"?<div className="alert alert-danger">Password confirmation does not match</div>:null
                            }
                            <label>First Name :</label>
                            <input type="text" className="form-control" onChange={(e)=>setFname(e.target.value)} /><br/>
                            <label>Last Name :</label>
                            <input type="text" className="form-control" onChange={(e)=>setLname(e.target.value)} /><br/>
                            <label>Email :</label>
                            <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)} /><br/>
                            <label>Password :</label>
                            <input type="password" className="form-control" onChange={(e)=>setPass(e.target.value)} /><br/> 
                            <label>Retype Password :</label>
                            <input type="password" className="form-control" onChange={(e)=>setRetypePass(e.target.value)} /><br/> 
                            <label>Phone :</label>
                            <input type="number" className="form-control" onChange={(e)=>setPhone(e.target.value)} /><br/> 
                        </div>
                        <div className="card-footer">
                            <input type="submit" value="Submit" onClick={()=>submit()} className="btn btn-primary" />  <Link href="/Login" style={{textDecoration:"none"}}>Log in</Link> 
                        </div>
                    </div>
                </div>
                <div className="col-lg-2"></div>
            </div>
        </div>
        <Footer />
        </>
    )
}