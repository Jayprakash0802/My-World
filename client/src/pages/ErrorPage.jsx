import { Link } from "react-router-dom";

export default function ErrorPage({Message="Page Not Found", link = "/",linkMessage="Back to Home"}){
    return(
        <section className="error-page">
            <div className="center">
                <Link to={link} className="btn primary">{linkMessage}</Link>
                <h2>{Message}</h2>
            </div>
        </section>
    )
}