'use client';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet';



L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png'
});

const countries = [
    {
        name: 'Kenya', lat: -1.2921, lng: 36.8219
    },
    {
        name: 'Nigeria', lat: 9.0820, lng: 8.6753
    },
    {
        name: 'Uganda', lat: 1.3733, lng: 32.2903
    },
    {
        name: 'Ghana', lat: 7.9465, lng: -1.0232 
    },
];

export default function
Maps() {
    return(
        <div style={{height: '500px', width: '100%'}}>
            <MapContainer center={[0, 20]}
            zoom={3} style={{height: '100%', width: '100%'}}>
                <TileLayer
                attribution='@
                OpenStreetMap'

                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'></TileLayer>
                {countries.map((country, index) =>(
                    <Marker key={index}
                    position={[country.lat, country.lng]}>
                        <Popup>{country.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}