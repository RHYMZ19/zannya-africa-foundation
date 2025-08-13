type Props = {
    title: string;
}

export default function Divider ({title}: Props) {
    return(
        <div style={{
            textAlign: 'center',
            margin: '40px 0',
            position: 'relative',
            width: '100%',
            top: '0px',
        }}>
            <hr style={{borderTop: '1px solid #ccc'}}></hr>
            <span
            style={{
                position: 'absolute',
                top: '-30px',
                left: '5%',
                transform: 'translateX(-50%)',
                padding: '0 12px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: 'transparent'
                
            }}>
                {title}
            </span>
            <button 
            style={{
                position: 'absolute',
                transform: 'translateX(-50%)',
                top: '-40px',
                right: '2%',
                padding: '6px 12px',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
            }} onClick={() =>
                console.log('Rahim')
            }> Read more</button>
        </div>
    )
}