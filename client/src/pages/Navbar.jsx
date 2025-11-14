import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { navLinks } from "../constants";
import logo from '../assets/mergecode-logo.png';

export default function Nav() {
    const [active, setActive] = useState("");
    
    return (
        <nav className="relative container z-0 mx-auto px-6">
           <div className="flex flex-row justify-between items-center">
              <div>
                <NavLink to="/" className='flex items-center gap-2'
                onClick={() => {
                    setActive("")
                    window.scrollTo(0,0);
                }}
                >
                 <img src={logo} alt="logo" className="w-24 h-24 object-contain" />
               </NavLink>
              </div>
              <ul className='list-none hidden sm:flex flex-row gap-10'>
              {navLinks.map((link) => (
                <li
                key={link.id}
                className={`${
                active === link.title
                    ? "text-white"
                    : "text-gray-400"
                } hover:text-gray-500 text[18px] font-medium cursor-pointer`}
                onClick={() => setActive(link.title)}>
                <NavLink to={link.path}>
                    {link.title}
                </NavLink>
                </li>
                ))}
             </ul>
           </div>
        </nav>
    )
}