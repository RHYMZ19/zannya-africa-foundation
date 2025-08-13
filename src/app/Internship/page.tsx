'use client';

import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import LanguageSelecter from "../LanguageSelecter/LanguageSelecter";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import StickyBar from "../StickyBar/StickyBar";
import styles from './Internship.module.css';
import { useState, useEffect } from "react";
import ContactUs from "../ContactUs/page";

export default function
    Internship() {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    
         useEffect(() => {
           setTimeout(() =>
           setVisible(true), 100);}, []);
        return(
           <div>
             <StickyBar>
                <FaHome size={24} color="black" cursor='pointer' onClick={() => router.push('/')} >Home
                </FaHome>
                    <GetInvolved />
                    <LanguageSelecter />
                    <Gallery />
                    <button onClick={() =>
                                        router.push('')
                                    }
                                    className={styles.arrowButton}>
                                        Donate
                    </button>
                    < img src='/log.jpg' alt="log" width={100} height={100}></img>
            </StickyBar>
            <div className={styles.container}>
                            <header className={`header ${visible ? 'show' : ""}`}>
                            <h1 className={styles.h1}>
                                OPPORTUNITIES
                            </h1>
                            <p className={styles.p1}>
                                zannya africa foundation
                            </p>
                            </header>
                        </div>

                        <div>
                            <section className={styles.c}>
                                <h2 className={styles.head}>Internship and Career Opportunities</h2>
                                <p>
                                    Zannya Africa Foundation is committed to nurturing future leaders by providing internship placements and career development opportunities across its programs and departments.
                                </p>

                                <h3>Available Opportunities</h3>
                                <ul>
                                    <li style={{paddingTop: '15px'}}><strong>Internships:</strong></li>
                                    <ul>
                                    <li>Program Assistant (6 months)</li>
                                    <li>Communications Intern</li>
                                    <li>Research & Data Intern</li>
                                    <li>
                                        <a href="/pdfs/Zannya Africa F-WPS Offices.pdf"
                                        download
                                        className={styles.DW}>download internship_description</a>
                                    </li>
                                    </ul>
                                    <li style={{paddingTop: '15px'}}><strong>Jobs:</strong></li>
                                    <ul>
                                    < li>Project Officer  Youth Empowerment</li>
                                    <li>Finance & Admin Associate</li>
                                    <li>Field Coordinator (Community Health)</li>
                                    </ul>
                                </ul>

                                <h3 style={{paddingTop: '15px'}}><strong>Eligibility Criteria:</strong></h3>
                                <ul>
                                    <li>University students or recent graduates</li>
                                    <li>Passionate about social impact and community development</li>
                                    <li>Strong communication and teamwork skills</li>
                                </ul>

                                <h3 style={{paddingTop: '15px'}}><strong>Application Process:</strong></h3>
                                <p>
                                    To apply, send your CV and a short cover letter to <a href="mailto:careers@zannyafoundation.org"><p style={{color: 'red', textDecoration:'underline'}}><strong>careers@zannyafoundation.org</strong></p></a> with the position title as the subject line. Please include your availability and location.
                                </p>
                                
                                <form className={styles.form}>
                                    <label>
                                        Full Name:...
                                        <input type='text' name='name' required />
                                    </label>
                                    <label>
                                        Email:...
                                        <input type='text' name='email' required />
                                    </label>
                                    <label>
                                        Why are you intrested?
                                        <textarea name='motivation'
                                        rows={4} required></textarea>
                                    </label>
                                    <button type="submit" className={styles.btn}> Submit Application</button>
                                </form>

                                <h3 style={{paddingTop: '15px'}}><strong>Internship Benefits:</strong></h3>
                                <ul>
                                    <li>Mentorship from experienced professionals</li>
                                    <li>Fieldwork experience and program involvement</li>
                                    <li>Certificate of completion</li>
                                     <li>Consideration for future job openings</li>
                                </ul>

                                <h3 style={{paddingTop: '15px'}}><strong>Testimonials from Past Interns:</strong></h3>
                                <blockquote className={styles.Qoute}>
                                    “My internship at Zannya helped me grow professionally and personally. I felt truly valued and learned more than I expected.”<br/>
                                    <em> Rahim SS., Former Software Eng Intern</em>
                                </blockquote>

                                <h3 style={{paddingTop: '15px'}}><strong>Frequently Asked Questions</strong></h3>
                                <p><strong>Q: Is this a paid internship?</strong><br/>
                                A: Some internships may include a stipend, others are voluntary based on the program and funding.</p>

                                <p><strong>Q: Do you accept international applicants?</strong><br/>
                                A: Yes, we welcome applications from across Africa and beyond, provided applicants meet our criteria.</p>
                    </section>

                </div>
                <ContactUs></ContactUs>
            <OptionalFeatures></OptionalFeatures>
        </div> 
    )
}