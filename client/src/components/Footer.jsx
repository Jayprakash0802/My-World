import { Link } from "react-router-dom";

export default function Footer(){
    
    return(
        <footer>
            <ul className="footer__categories">
                <li><Link to="/posts/categories/Agriculture">Agriculture</Link></li>
                <li><Link to="/posts/categories/Business">Business</Link></li>
                <li><Link to="/posts/categories/Education">Education</Link></li>
                <li><Link to="/posts/categories/Entertainment">Entertainment</Link></li>
                <li><Link to="/posts/categories/Uncategorized">Unrecognized</Link></li>
                <li><Link to="/posts/categories/Art">Art</Link></li>
                <li><Link to="/posts/categories/Investment">Investment</Link></li>
                <li><Link to="/posts/categories/Weather">Weather</Link></li>
            </ul>
            <div className="footer__copyright">
                <small>All rights reserved &copy; Copyright, My Blog</small>
            </div>
        </footer>
    )
}