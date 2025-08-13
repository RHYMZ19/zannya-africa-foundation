export default function
LanguageSelecter() {
    return (
        <div style={{
            marginBottom: '20px'
        }}>
            <label htmlFor="language">
                Choose Language:
            </label>
            <select
            id='language'
            onChange={(e) =>
                console.log('Selected langauge:', e.target.value)
            }
            style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: '1px solid #ccc'
            }}>
                <option value='en'>English</option>
                <option value='sw'>Swahili</option>
                <option value='fr'>French</option>
                <option value='ar'>Arabic</option>
            </select>
        </div>
    )
}