"use client"

import Business from "@/components/business";
import { useState } from "react";


export default function Home(props) {

    const [activeTab, setActiveTab] = useState("about");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    return (
        <Business/>
    );

}