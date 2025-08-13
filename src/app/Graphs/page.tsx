'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    {
        country: 'Kenya', participation: 50
    },
    {
        country: 'Uganda', participation: 80
    },
    {
        country: 'Nigeria', participation: 60
    },
    {
        country: 'Ghana', participation: 20
    },
];

export default function
Graphs() {
    return(
        <div style={{width: '100%', height: '300px'}}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid
                    strokeDasharray='3 3'></CartesianGrid>
                    <XAxis dataKey='country'></XAxis>
                    <YAxis></YAxis>
                    <Tooltip></Tooltip>
                    <Bar dataKey='participation'
                    fill='#8884d8'></Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}