'use client';

import  { useRouter } from "next/navigation";

export default function
Gallery() {
    const router = useRouter();
    return (
        <div style={{
            marginBottom: '20px'
        }}>
            <label htmlFor="gallery">
                Gallery
            </label>
            <select
            id='gallery'
            onClick={() => router.push('/Videos')}
            onChange={(e) =>
                console.log('Gallery', e.target.value)
            }
            style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                cursor: 'pointer'
            }}>
                <option   value='ph'>Press</option>
                
            </select>
        </div>
    )
}