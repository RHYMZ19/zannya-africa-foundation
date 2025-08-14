'use client';
import React from "react";
import "./BlueStripInput.css";

export default function
BlueStripInput() {
    return (
        <div className="strip-container">
            <div className="blue-strip">
                <input type="text"
                className="strip-input"
                placeholder="Type your words..."
                 />
            </div>
        </div>
    )
}