import Link from 'next/link';
import React from 'react'
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
const Icons = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-[#0291D4] rounded-full p-2">
                <Link href='' className="text-white"><FaFacebookF size={20} /></Link>
            </div>
            <div className="bg-[#0291D4] rounded-full p-2">
                <Link href='' className="text-white"><FaTwitter size={20} /></Link>
            </div>
            <div className="bg-[#0291D4] rounded-full p-2">
                <Link href='' className="text-white"><IoLogoInstagram size={20} /></Link>
            </div>
            <div className="bg-[#0291D4] rounded-full p-2">
                <Link href='' className="text-white"><MdOutlineMail size={20} /></Link>
            </div>
        </div>
    )
}

export default Icons