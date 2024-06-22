"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { hasCookie } from "cookies-next";
import { useSearchParams } from 'next/navigation'

export default function File() {
    const [file, setFile] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    useEffect(() => {
        if(hasCookie("admin") == false){
            router.push("/Admin/Index");
        }
    }, []);

    const uploadFile = (e) => {
        e.preventDefault();
        if (!file) {
            console.error("File is missing.");
            return;
        }
        const data = new FormData();
        data.append("file", file, code+".jpg");
            axios.post("http://localhost:3000/api/admin/file", data).then((result) => {
                console.log("Success:", result.data);
                router.push("/");
                
            })
            .catch((error) => {
                console.error("Error uploading file:", error);  
            });
    }

    return (
        <>
            <br/><br/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-sm-8">
                        <form onSubmit={uploadFile}>
                            <div className="card">
                                <div className="card-header" style={{ textAlign: "center", fontSize: "20px", fontFamily: "serif" }}>Upload Property Image</div>
                                <div className="card-body">
                                    <label>Image :</label>
                                    <input type="file" name="file" className="form-control" onChange={(e) => setFile(e.target.files?.[0])} /><br/>
                                </div>
                                <div className="card-footer">
                                    <input type="submit" value="Submit" className="btn btn-primary" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-2"></div>
                </div>
            </div>
        </>
    );
}
