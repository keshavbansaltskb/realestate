"use client"
import Link from "next/link";

export default function AdminNav(){
    
    return(
        <>
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" style={{fontFamily:"serif",marginLeft:"20px"}}>Dashboard</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                     <Link href="/Admin/Dashboard" className="navlink">
                        <li className="nav-item">
                            <label>Home</label>
                        </li>
                    </Link>
                    <Link href="/Admin/Message" className="navlink">
                        <li className="nav-item">
                            <label>Messages</label>
                        </li>
                    </Link>
                    <Link href="/Admin/AllProperty" className="navlink">
                        <li className="nav-item">
                            <label>Properties</label>
                        </li>
                    </Link>
                    <Link href="/Admin/ChangePass" className="navlink">
                        <li className="nav-item">
                            <label>Change Password</label>
                        </li>
                    </Link>
                    <Link href="/Admin/Logout" className="navlink logout">
                        <li className="nav-item">
                            <label>Logout</label>
                        </li>
                    </Link>
                    
                </ul>
                </div>
            </div>
            </nav>
        </>
    );
}