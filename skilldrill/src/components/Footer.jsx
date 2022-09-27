import './footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <div className="footer pb-0 mb-0 justify-content-center text-light ">
            <footer className="container">
                <div className="row my-5 justify-content-center py-5">
                    <div className="col-11">
                        <div className="row ">
                            <div className="col-xl-8 col-md-4 col-sm-4 col-12 mx-auto a">
                                <h3 className="text-muted mb-md-0 mb-5">
                                    <i className="bi bi-shop"></i> <span className="random">SkillDrill</span>{" "}
                                </h3>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                                <h6 className="mb-3 mb-lg-4 text-muted ">
                                    <b>MENU</b>
                                </h6>
                                <ul className="list-unstyled">
                                    <li>Home</li>
                                    <li>About</li>
                                    <li>Profile</li>
                                    <li>Past Experience</li>
                                </ul>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                                <h6 className="mb-3 mb-lg-4 text-muted mt-sm-0 mt-5">
                                    <b>ADDRESS</b>
                                </h6>
                                <p className="mb-1">605, RATAN ICON BUILDING</p>
                                <p>SEAWOODS SECTOR</p>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-xl-8 col-md-4 col-sm-4 col-auto my-md-0 mt-5 order-sm-1 order-3 align-self-end">
                                <p className="social mb-0 pb-0 text-muted">
                                    {" "}
                                    <span className="mx-2">
                                        <i className="bi bi-facebook"></i>
                                    </span>{" "}
                                    <span className="mx-2">
                                        <i className="bi bi-linkedin"></i>
                                    </span>{" "}
                                    <span className="mx-2">
                                        <i className="bi bi-twitter"></i>
                                    </span>{" "}
                                    <span className="mx-2">
                                        <i className="bi bi-instagram"></i>
                                    </span>{" "}
                                </p>
                                <small className="rights">
                                    <span>&#174;</span>Team All Rights Reserved.
                                </small>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-auto order-1 align-self-end ">
                                <h6 className="mt-55 mt-2 text-muted">
                                    <b>Team</b>
                                </h6>
                                <small>
                                    {" "}
                                    <span>
                                        <i className="fa fa-envelope" aria-hidden="true"></i>
                                    </span>{" "}
                                   Team@gmail.com
                                </small>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-auto order-2 align-self-end mt-3 ">
                                <h6 className="text-muted">
                                    <b>Co-ordinator</b>
                                </h6>
                                <small>
                                    <span>
                                        <i className="fa fa-envelope" aria-hidden="true"></i>
                                    </span>{" "}
                                    abcdef@gmail.com
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default Footer;