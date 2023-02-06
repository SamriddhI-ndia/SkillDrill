import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {PersonCircle} from "react-bootstrap-icons";
import './nav.css';
import React from  "react";
const Navbar = ({isLogged,setIsLogged, userName, setUserName}) => {
    
    return (
        <nav className="navbar navbar-expand-md navbar-light nav shadow-sm navBar">
            <div className="container py-3">
                <Link className="navbar-brand" to="/">
                    <span className="fw-bold h3 d-flex align-items-center">
                        
                        <img className="img-fluid" src="" alt="" />
                        <span className="fs-3 fw-bold ps-3">SkillDrill</span>
                    </span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#main-nav"
                    aria-controls="main-nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end align-center" id="main-nav">
                    <ul className="navbar-nav">
                    <li className="nav-item pe-4">
                            <Link to="/" className="nav-link fs-5 fw-bold color">
                            <span className="border-primary border-p-4 mr-2">Home </span>
                            </Link>
                        </li>
                        <li className="nav-item pe-4">
                            <Link to="/" className="nav-link fs-5 fw-bold color">
                            About
                            </Link>
                        </li>
                        <li className="nav-item pe-4">
                            <Link to={isLogged?"/room":"/login"} className="nav-link fs-5 fw-bold color">
                                Join A Room
                            </Link>
                        </li>
                        <li className="nav-item pe-4">
                            <Link to={isLogged?`/reportCard/${userName}`:"/login"} className="nav-link fs-5 fw-bold color">
                                Report
                            </Link>
                        </li>
                        {isLogged?(<li className="nav-item pe-4">
                        <PersonCircle size={25} className="profileIcon" /> <span className="username">{userName}</span>
                        </li>):(<li className="nav-item pe-4">
                            <Link to="/login" className="nav-link fs-5 fw-bold color">
                               Login
                            </Link>
                        </li>)}
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;