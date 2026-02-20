import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Navbar({ user }) {
    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log("Logged out");
        }).catch((error) => {
            console.error("Logout error", error);
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">Expense Tracker</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/read-products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-products">Add Product</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        {user ? (
                            <>
                                <span className="text-light me-3 small">{user.email}</span>
                                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-outline-light btn-sm me-2" to="/login">Login</Link>
                                <Link className="btn btn-light btn-sm" to="/register">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
