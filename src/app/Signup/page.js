"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasCookie } from "cookies-next";
import Link from "next/link";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Page() {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [retypepass, setRetypePass] = useState();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [phone, setPhone] = useState();
    const [fieldError, setFieldError] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (hasCookie("user") != false) {
            router.push("/");
        }
    }, []);

    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/;
        return emailPattern.test(email);
    }

    async function submit() {
        let newFieldError = {};

        if (!fname) {
            newFieldError.fname = "First name is required";
        }
        if (!lname) {
            newFieldError.lname = "Last name is required";
        }
        if (!email) {
            newFieldError.email = "Email is required";
        } else if (!validateEmail(email)) {
            newFieldError.email = "Invalid email format";
        }
        if (!pass) {
            newFieldError.pass = "Password is required";
        }
        if (!retypepass) {
            newFieldError.retypepass = "Retype password is required";
        } else if (pass !== retypepass) {
            newFieldError.retypepass = "Password confirmation does not match";
        }
        if (!phone) {
            newFieldError.phone = "Phone number is required";
        }

        setFieldError(newFieldError);
        if (Object.keys(newFieldError).length === 0) {
            axios.post("http://localhost:3000/api/real/signup", {fname: fname,lname: lname,email: email,pass: pass,phone: phone}).then((res) => {
                console.log(res.data.result);
                router.push("/Login");
            });
        }
    }

    return (
        <>
            <Navbar />
            <br />
            <br />
            <div className="container-fluid" style={{ background: "#F0F8FF" }}>
                <br />
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-sm-8">
                        <div className="card">
                            <div className="card-header" style={{ textAlign: "center", fontSize: "20px", fontFamily: "serif" }}>Sign Up</div>
                            <div className="card-body">
                                <label>First Name :</label>
                                <input type="text" className="form-control" onChange={(e) => setFname(e.target.value)} />
                                {fieldError.fname && <label className="text-danger">{fieldError.fname}<br /><br /></label>}
                                <br />
                                <label>Last Name :</label>
                                <input type="text" className="form-control" onChange={(e) => setLname(e.target.value)} />
                                {fieldError.lname && <label className="text-danger">{fieldError.lname}<br /><br /></label>}
                                <br />
                                <label>Email :</label>
                                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
                                {fieldError.email && <label className="text-danger">{fieldError.email}<br /><br /></label>}
                                <br />
                                <label>Password :</label>
                                <input type="password" className="form-control" onChange={(e) => setPass(e.target.value)}/>
                                {fieldError.pass && <label className="text-danger">{fieldError.pass}<br /><br /></label>}
                                <br />
                                <label>Retype Password :</label>
                                <input type="password" className="form-control" onChange={(e) => setRetypePass(e.target.value)}/>
                                {fieldError.retypepass && <label className="text-danger">{fieldError.retypepass}<br /><br /></label>}
                                <br />
                                <label>Phone :</label>
                                <input type="number" className="form-control" onChange={(e) => setPhone(e.target.value)} />
                                {fieldError.phone && <label className="text-danger">{fieldError.phone}<br /><br /></label>}
                                <br />
                            </div>
                            <div className="card-footer">
                                <input type="submit" value="Submit" onClick={() => submit()} className="btn btn-primary" />{" "}
                                <Link href="/Login" style={{ textDecoration: "none" }}>
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2"></div>
                </div>
            </div>
            <Footer />
        </>
    );
}
