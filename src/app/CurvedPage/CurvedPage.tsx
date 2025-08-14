'use client';
import React, { ReactNode } from "react";
import styles from "./CurvedPage.module.css";

type Props = {
    children: ReactNode;
}

export default function 
CurvedPage({ children }: Props) {
    return <div 
    className={styles["curved-page"]}>{ children }</div>
}