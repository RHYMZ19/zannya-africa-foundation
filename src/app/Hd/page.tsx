'use client';

import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

export default function
Hd() {
    return(
        <div style={{display: 'flex', flexDirection: 'row',}}>
            <div style={{justifyItems: 'center', backgroundColor: 'red'}}>
                < Image src='/log.jpg' alt="log" style={{width: '50vw', height: '100vh'}}></Image>
            </div>

            <div style={{alignContent: 'center', height: '100vh',textAlign: 'center', width: '50vw'}}>
                <h1 style={{fontSize: '50px', lineHeight: '50px'}}><strong>ZANNYA AFRICA FOUNDATION</strong></h1>
                <h2><strong>''Cganging the community through sports''</strong></h2>

                <p style={{marginTop: '20px'}}>{`Changing the community through sports. We work with unprivileged children, 
                    youth and women for their own development and 
                    the community at large using sports and recreation activities as the engine!`}
                </p>

                <p style={{marginTop: '40px'}}>{`Follow Us`}</p>
        <div style={{ display: "flex",justifyContent: "center",  gap: "15px", fontSize: "30px",}}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
            <FaInstagram />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
            <FaTiktok />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
            <FaTwitter />
          </a>
          <a href="https://wa.me/256XXXXXXXXX" target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
            <FaWhatsapp />
          </a>
        </div>
            </div>
        </div>
    )
}