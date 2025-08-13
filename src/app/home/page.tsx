'use client';
import { useRouter } from "next/navigation";

export default function
MixedButtonsPage() {
    const router = useRouter();

    return (
        <div style={{padding: '2rem'}}>
            <h1>HOME WELCOME</h1>

            {/* top section - vertical buttons */}
            <div style={{ marginBottom: '40px'}}>
                <h2>verticalbuttons</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <button onClick={() => 
                        router.push('/adminpannel')
                    }
                    style={btnStyle}>admin</button>
                </div>
            </div>

            {/* Bottom section Holizontal buttons */}
            <div>
                <h2>Holizontalbuttons</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() =>
                    router.push('/featuredcars')
                }
                style={btnStyle}>featuredcars</button>

                <button onClick={() =>
                    router.push('/featuredcars')
                }
                style={btnStyle}>featuredcars</button>
                </div>
            </div>
        </div>
    );
}

const btnStyle = {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#222',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
}