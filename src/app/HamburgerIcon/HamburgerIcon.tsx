import React, { useState } from 'react';

export default function
HamburgerIcon() {
    const [isOpen, setIsOpen] = useState(false);
    const [showInvolveitems, setShowInvolveItems] = useState(false);
    const toggleAboutUs = () => {setShowInvolveItems(!showInvolveitems);};

    return (
        <>
        {/* hamburgericon */}
        <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
        
            top: '20px',
            left: '20px',
            cursor: 'pointer',
            zIndex: 2000,
        }}>
            <div style={{width: '30px',
                height: '4px',
                background: '#333',
                margin: "6px 0"
            }} />
                <div style={{width: '30px',
                height: '4px',
                background: '#333',
                margin: "6px 0",
                }} />
                    
                    <div style={{width: '30px',
                height: '4px',
                background: '#333',
                margin: "6px 0",
                }} /></div>

                {/* side bar drawer*/}
                <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: isOpen ? 0 : '-250px',
                    width: '250px',
                    height: '100%',
                    backgroundColor: '#222',
                    color: '#fff',
                    padding: '20px',
                    transition: 'left 0.3s esae-in-out',
                    zIndex: 1500,
                }}>

                    <h3>Menu</h3>
                    <ul style={{
                        listStyle: 'none',
                        color: 'red',
                        textAlign: 'start',
                        margin: '30px'
                    }}>

                        <li>
                            <span 
                            onClick={toggleAboutUs}
                             style={{
                            color: '#fff',
                            textDecoration: "none",
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            lineHeight: '3',
                        }}>About us {showInvolveitems ? '^' : '^'}
                        </span>

                        {showInvolveitems && (
                            <ul style={{
                                padding: '20px',
                                marginTop: '5px',
                            }}>
                                <li>
                                    <a
                                    href='#Mission'
                                    style={{
                                        textDecorationLine: 'underline',
                                        color: '#fff', lineHeight: '2'
                                    }}>Mission</a>
                                </li>

                                <li>
                                    <a
                                    href='#Mission'
                                    style={{
                                        textDecorationLine: 'underline',
                                        color: '#fff', lineHeight: '2'
                                    }}>Histories</a>
                                </li>

                                <li>
                                    <a
                                    href='#Mission'
                                    style={{
                                        textDecorationLine: 'underline',
                                        color: '#fff', lineHeight: '2'
                                    }}>leadership</a>
                                </li>

                                <li>
                                    <a
                                    href='#Mission'
                                    style={{
                                        textDecorationLine: 'underline',
                                        color: '#fff', lineHeight: '2'
                                    }}>Locations</a>
                                </li>

                                <li>
                                    <a
                                    href='#Mission'
                                    style={{
                                        textDecorationLine: 'underline',
                                        color: '#fff', lineHeight: '2'
                                    }}>Partners</a>
                                </li>
                            </ul>
                        )}
                        
                        </li>


                        <li><a href='#Programsservices' style={{
                            color: '#fff',
                            lineHeight: '3',
                            textDecorationLine: 'underline',
                            textDecoration: "none"
                        }}>Programs</a>
                        </li>

                        <li><a href='#Resources' style={{
                            color: '#fff',
                            lineHeight: '3',
                            textDecorationLine: 'underline',
                            textDecoration: "none"
                        }}>Resources</a>
                        </li>

                        <li><a href='#News' style={{
                            color: '#fff',
                            lineHeight: '3',
                            textDecorationLine: 'underline',
                            textDecoration: "none"
                        }}>News</a>
                        </li>

                        <li><a href='#Success' style={{
                            color: '#fff',
                            lineHeight: '3',
                            textDecorationLine: 'underline',
                            textDecoration: "none"
                        }}>Success</a>
                        </li>

                        <li><a href='#GetInvolve' style={{
                            color: '#fff',
                            lineHeight: '3',
                            textDecorationLine: 'underline',
                            textDecoration: "none"
                        }}>GetInvolve</a>
                        </li>

                        <li><a href='#InternationalReach' style={{
                            color: '#fff',
                            lineHeight: '3',
                            textDecorationLine: 'underline',
                            textDecoration: "none"
                        }}>International Reach</a>
                        </li>


                        <li><a href='#Contact' style={{
                            color: '#fff',
                            lineHeight: '3',
                            textDecorationLine: 'underline',
                            textDecoration: "none"
                        }}>Contact</a>
                        </li>
                    </ul>
                </div>

                {/* when menu is clicked */}
                {
                    isOpen && (
                        <div 
                        onClick={() => 
                            setIsOpen(false)
                        }
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            zIndex: 1000,
                        }} />
                    )
                }
                
            
        
        </>
    )
}