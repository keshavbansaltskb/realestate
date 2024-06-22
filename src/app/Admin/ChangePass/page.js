"use client"
import axios from "axios";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import AdminNav from "../Component/AdminNav";
export default function ChangePass(){
    const [rec,setRec] = useState([]);
    const [msg,setMsg] = useState("");
    const pass={cpass:"",npass:"",rpass:""};
    const [ppass, setPpass] = useState(pass);
    const Router = useRouter();
    useEffect(()=>{
        if(hasCookie("admin") == false){
            Router.push("/Admin/Index");
        }
        else{
            let id = getCookie("admin");
            axios.get("http://localhost:3000/api/admin/password/"+id).then((res)=>setRec(res.data.result));
        }
        deleteCookie("tosty");

    },[])
    function change(e){
        setPpass({...ppass,[e.target.name]:e.target.value});
    }
    function update(ids){
        axios.put("http://localhost:3000/api/admin/password",{cpass:ppass.cpass,npass:ppass.npass,rpass:ppass.rpass,id:ids}).then((res)=>setMsg(res.data.result));   
        setPpass({ cpass: "", npass: "", rpass: "" });
    }
    return(
        <>
         <div>
            <AdminNav />
            <div className="container">
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                    {
                        msg=="mismatch"?
                             <div className="alert alert-danger" style={{textAlign:"center"}}>New And Current Password Not Match</div>
                        :msg=="success"?<div className="alert alert-success" style={{textAlign:"center"}}>Password Changed Successfully</div>
                        :msg=="incorrect"?<div className="alert alert-danger" style={{textAlign:"center"}}>Current Password Is Incorrect</div>:null
                        
                   }
                    
                        <table className="table table-hover">
                            <tbody>
                                <tr><td>Current Password :</td><td><input type="password" value={ppass.cpass} name="cpass" className='form-control' onChange={change}></input></td></tr>
                                <tr><td>New Password :</td><td><input type="password"  value={ppass.npass} name="npass" className='form-control' onChange={change}></input></td></tr>
                                <tr><td>Retype Password :</td><td><input type="password" value={ppass.rpass}  name="rpass" className='form-control' onChange={change}></input></td></tr>
                            </tbody>
                        </table>
                        <button className="btn btn-primary" style={{textAlign:"right"}} onClick={()=>update(rec._id)} >Submit</button>
                    </div>
                    <div className="col-sm-2"></div>
                </div>
            </div>
        </div>
           
        </>
    )
}