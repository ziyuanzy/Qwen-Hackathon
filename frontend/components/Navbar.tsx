"use client";

import Link from "next/link";

export default function Navbar() {

    return (

        <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center">

            <Link
                href="/"
                className="text-2xl font-bold"
            >
                mAIntAIn
            </Link>

            <span className="text-sm text-gray-300">

                AI-powered maintenance management platform

            </span>

        </nav>

    );

}