import React from 'react';
import { Header, Sidebar } from '../components';
import "./Request.css";
const Request = () => {
    return(
        <div className='main'>
        <Header />
        <Sidebar/>
            <div className='product-card'>

            </div>
            {/* <div className='gradiants-background'>
            <div className="gradinat1">
                <div className="color1"></div>
                <div className="color2"></div>
                <div className="color3"></div>
            </div>
            <div className="gradinat2">
                <div className="color1"></div>
                <div className="color2"></div>
                <div className="color3"></div>
            </div>
            <div className="gradinat3">
                <div className="color1"></div>
                <div className="color2"></div>
                <div className="color3"></div>
            </div>
            </div> */}
        </div>
    );
};

export default Request;