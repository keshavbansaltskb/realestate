"use client"
import { useEffect, useState } from "react";
import AdminNav from "../Component/AdminNav";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { hasCookie } from "cookies-next";
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import './styles.scss';

export default function page(){
    const [rec,setRec] = useState([]);
    const searchParams = useSearchParams();
    const success = searchParams.get('success');
    const del = searchParams.get('delete');
    var sn=1;
    const Router = useRouter();
    useEffect(()=>{
        
        if(hasCookie("admin") == false){
            Router.push("/Admin/Index");
        }
        axios.get("http://localhost:3000/api/admin/property").then((res)=>setRec(res.data.result));

        if(success==1){
            toast.success("Property Updated");
        }
        if(del==1){
            toast.error("Property Deleted");
        }
        
    },[])

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
        setDelCode(null);
        document.body.style.overflowY = "scroll";
    };
    const [delCode, setDelCode] = useState(null);
    const MyModal = ({closeModal}) => {
        return <>
            <div className="modal-wrapper" onClick={closeModal}></div>
            <div className="modal-container">
                <h2>Are you sure you want to delete this property ?</h2>
                <p>This action is irreversible and will permanently remove your property and all associated data.</p>
                <button className='modal-btn' onClick={closeModal}>Cancle</button><button className='modal-btn' onClick={()=>DeleteProperty()}>Delete</button>
            </div>
        </>
    }
    function delproperty(code){
        document.body.style.overflowY = "hidden";
        setShowModal(true); 
        setDelCode(code);
    }
    function DeleteProperty(){
        Router.push(`/Admin/DeleteProperty/${delCode}`)
        closeModal();
    }
    return(
        <>
            <AdminNav/>
            <ToastContainer position="bottom-right" />
            {showModal && <MyModal closeModal={closeModal}/> }
            <div className="container">
                <div className="row">
                    <table className="table table-borderless table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Sn</th>
                                <th>Property</th>
                                <th>Category</th>
                                <th>Area</th>
                                <th>Unit</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>For</th>
                                <th>BHK</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Visit</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rec.map((record) => {
                                const edit = `/Admin/EditProperty/${record.code}`;
                                const visit = `/Admin/VisitProperty/${record.code}`;
                                return <tr  key={record._id}>
                                    <td>{sn++}</td>
                                    <td>{record.property}</td> 
                                    <td>{record.category}</td> 
                                    <td>{record.area}</td>  
                                    <td>{record.unit}</td> 
                                    <td>{record.amount}</td> 
                                    <td>{record.amounttype}</td> 
                                    <td>{record.propertyfor}</td> 
                                    <td>{record.bhk}</td>
                                    <td>{record.state}</td> 
                                    <td>{record.city}</td>
                                    <td><Link href={visit}><button className="btn btn-danger">Visit</button></Link></td>
                                    <td><Link href={edit} style={{color:"skyblue"}}><i className="fa fa-edit"></i></Link></td>
                                    <td style={{cursor:"pointer",color:"red"}} onClick={()=>delproperty(record.code)}><i className="fa fa-trash"></i></td>
                                </tr>
                                }   
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </>
    )
}