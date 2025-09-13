'use client';
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
export default function
Hd() {
    return(
        <div style={{display: 'flex',justifyContent: 'center', flexDirection: 'column',height: '100%',width: '100%', alignItems: 'center'}}>
            <div style={{justifyItems: 'center', width: '70%',borderColor: 'red', height: '100%', marginBottom: '0%', marginTop: '0%'}}>
                < Image src='/log.jpg' alt="log" style={{width: '90%', height: '100%',}}></Image>
            </div>

            <div style={{alignContent: 'center', height: '100%',textAlign: 'center', width: '70%', paddingBottom: '5rem', paddingTop: '5rem'}}>
              <h1 style={{
                color: 'rgb(128, 12, 12)',
                fontSize: '40px',
                fontStyle: 'italic',
                marginBottom: '0%', 
                lineHeight: '1',
                fontWeight: 'bolder',
                marginTop: '0%',
                paddingTop: '0%'
                }}>ZANNYA AFRICA </h1>

                <h2 style={{
                  color: 'black',
                  fontSize: '40px',
                  lineHeight: '1',
                  fontStyle: 'italic',
                  marginBottom: '20px',
                  fontWeight: 'bolder'}}> FOUNDATION</h2>

                <p style={{marginTop: '20px'}}>Changing the community through sports. We work with unprivileged children, 
                    youth and women for their own development and 
                    the community at large using sports and recreation activities as the engine!
                </p>

                <p style={{marginTop: '40px'}}>Follow Us</p>
        <div style={{ display: "flex",justifyContent: "center",  gap: "15px", fontSize: "30px",}}>
          <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
            <FaFacebook />
          </a>
          <a href="https://instagram.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "pink" }}>
            <FaInstagram />
          </a>
          <a href="https://tiktok.com/zannyaafricaFDN" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
            <FaTiktok />
          </a>
          
          <a href="https://x.com/zannyaafrica" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
              <FaXTwitter />   
          </a>
        </div>
            </div>
        </div>
    )
}