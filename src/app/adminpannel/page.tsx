'use client';
import { useRouter } from 'next/navigation';
import {auth, firestore} from '../lib/firebase';
import { useEffect, useState } from 'react';
import {onAuthStateChanged, User} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import ProgAdmin from '../ProgAdmin/page';
import NewsAdmn from '../NewsAdmn/page';
import GalleryAdmin from '../GalleryAdmin/page';
import MissionAdmn from '../MissionAdmn/page';
import SuccessAdmin from '../SuccessAdmin/page';
import ResoAdmin from '../ResoAdmin/page';
import AdminEvents from '../UpcomingEvents/AdminEvents/AdminEvents';



export default function
SocialButtonsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
    const unsubscribe =
    onAuthStateChanged( auth,async (user: User | null) => {
        if (!user) {
            router.push('/login');
            return;
        } 
            const adminRef = 
            doc(firestore, 'admins', user.uid);
            const adminSnap = await getDoc(adminRef);
            if (!adminSnap.exists()) {
                router.push('/');
                return;
            }
            setLoading(false);
        
    });

    return () => unsubscribe();
}, [router]);

if (loading) {
    return <div>Loading admin pannel...</div>
}
    
    return (
        <div style={{justifyItems: "center", gap: "5%"}}>
            <h1 style={{color: 'black', fontWeight: 'bolder', fontSize: '20px', marginTop: '7%'}}>WELCOME TO ZANNYA AFRICA FOUNADTION CONTROL ROOM </h1>
            <div style={{
                marginTop: '7%',
               backgroundColor: "#fff3cd",
               border: "1px solid #ffeeba",
               color: "#856404",
               padding: "15px",
               borderRadius: "8px",
               marginBottom: "20px"
             }}>
               <h3>📌 Admin Notes</h3>
               <ul style={{ margin: 0, paddingLeft: "20px" }}>
                 <li>Each <strong>image</strong>, <strong>video</strong>, and <strong>PDF</strong> must be uploaded <strong>first</strong>, before pressing <strong>Submit</strong>.</li>
                 <li>Only <strong>high-quality images</strong> should be uploaded.</li>
                 <li>Only <strong>good quality videos</strong> should be uploaded.</li>
                 <li>Uploading <strong>unwanted or irrelevant videos</strong> will lead to <strong>disqualification as an admin</strong>.</li>
                 <li><strong>All uploaded content is permanent.</strong></li>
                 <li>If you want to make changes to already uploaded content, <strong>contact the developer for assistance</strong>.</li>
                 <li>Please take note of our  <strong> terms and conditions </strong> before you make any upload.</li>
               </ul>
             </div>
        <div>
            <ProgAdmin></ProgAdmin>
        </div>
        <div>
            <NewsAdmn></NewsAdmn>
        </div>
        <div>
            <GalleryAdmin></GalleryAdmin>
        </div>

        <div>
            <MissionAdmn></MissionAdmn>
        </div>

        <div>
            <SuccessAdmin></SuccessAdmin>
        </div>

        <div style={{marginBottom: '7%'}}>
            <ResoAdmin></ResoAdmin>
        </div>

        <div>
            <AdminEvents></AdminEvents>
        </div>

        </div>
    )
}

