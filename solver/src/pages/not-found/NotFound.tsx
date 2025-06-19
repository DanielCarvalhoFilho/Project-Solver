import './NotFound.css';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";

function NotFoundPage() {
    return (
        <div className='container'>
            <div>
                <svg width={0} height={0}>
                    <linearGradient id="gradient" x1={0} y1={0} x2={1} y2={1} gradientTransform="rotate(30)">
                        <stop offset='0%' stopColor="#e74c3c" />
                        <stop offset='100%' stopColor="#14a9ff" />
                    </linearGradient>
                </svg>
                <Link to={"/"} >
                    <FaArrowLeft style={{ fill: "url(#gradient)" }} className='back' />
                </Link>
            </div>

            <div className="notfound-container">
                <h1 className="error-code">404</h1>
                <p className="error-message">Page Not Found!</p>
            </div>
        </div>
    );
}

export default NotFoundPage