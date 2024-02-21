"use client"

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.jpg";

export default function Nav() {

    return (
        <nav className="flex flex-row items-center text-2xl font-mono">
            <Link href="/"> 
                <Image src={logo} className="w-32 h-32 px-8 py-8"/>
            </Link>
            <Link href="/search" className="ml-40 hover:underline"> 
                Search 
            </Link>
            <Link href="/enter" className="ml-40 hover:underline">
                Enter 
            </Link>
            
        </nav>
    );

}