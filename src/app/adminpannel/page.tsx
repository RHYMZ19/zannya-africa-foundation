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
        <><div>
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
        </>
    )
}

