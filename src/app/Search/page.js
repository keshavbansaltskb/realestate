"use client";
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import axios from "axios";
import Aos from "aos";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Home(){
    const searchParams = useSearchParams();
    const propertyfor = searchParams.get('for');
    const property = searchParams.get('property');
    const state = searchParams.get('state');
    const city = searchParams.get('city');
    const bhk = searchParams.get('bhk');
    const [rec,setRec] = useState([]);
    const [record,setRecord] = useState([]);
    useEffect(()=>{
        axios.post("http://localhost:3000/api/real/search",{propertyfor:propertyfor,property:property,state:state,city:city,bhk:bhk}).then((res)=>{setRec(res.data.result);});
        axios.post("http://localhost:3000/api/real/searches",{property:property}).then((req)=>{setRecord(req.data.result);});
        Aos.init({
            duration: 1500,
            once: false,
        })
    },[])
    return(
        <>
            <Navbar />
            <div className="container-fluid" style={{background:"#F0F8FF"}}>
                <div className="row">
                    {rec.length!=0 &&(
                        <div style={{marginTop:"80px"}}>
                            <label className='propertycat'>Your Searched Property : </label>
                            <br/><br/>
                        </div>
                    )}
                    {rec.length!=0 &&(
                        <>
                            {rec.map((record) => {
                                const view = `/Property/${record.code}`;
                                const link = `/${record.code}.jpg`;
                                return <div className="col-lg-3"  data-aos="fade-up" key={record._id}>
                                    <div className="topiccard">
                                        <label><img src={link} className="img-fluid"></img></label><br/>
                                        <label className="topicname">{record.category}</label><br/>
                                        <label className="topicname">{record.property} Property</label><br/>
                                        <label className="topicname">Property availale for {record.propertyfor}</label><br/>
                                        <label className="topicname"> {record.bhk} BHK , Amount {record.amount} {record.amounttype}</label><br/><br/>
                                        <Link href={view}  style={{ display: 'flex', justifyContent: 'center',textDecoration:"none" }}><button className="btn btn-danger">View Details</button></Link>
                                    </div>
                                </div>
                                }   
                            )}
                        </>
                    )}
                    {rec.length==0 &&(
                        <div style={{marginTop:"80px"}}>
                            <label className='propertycat'>Your Searched Property Not Found, But You Can See Some Related Property : </label>
                            <br/><br/>
                        </div>
                    )}
                    {rec.length==0 &&(
                        <>
                            {record.map((record) => {
                                const view = `/Property/${record.code}`;
                                const link = `/${record.code}.jpg`;
                                return <div className="col-lg-3"  data-aos="fade-up" key={record._id}>
                                    <div className="topiccard">
                                        <label><img src={link} className="img-fluid"></img></label><br/>
                                        <label className="topicname">{record.category}</label><br/>
                                        <label className="topicname">{record.property} Property</label><br/>
                                        <label className="topicname">Property availale for {record.propertyfor}</label><br/>
                                        <label className="topicname"> {record.bhk} BHK , Amount {record.amount} {record.amounttype}</label><br/><br/>
                                        <Link href={view}  style={{ display: 'flex', justifyContent: 'center',textDecoration:"none" }}><button className="btn btn-danger">View Details</button></Link>
                                    </div>
                                </div>
                                }   
                            )}
                        </>
                    )}
                            

                    
                    
                </div>
            </div>
            <Footer />
        </>
    )
}