// import { Shield } from 'lucide-react'
// import Link from 'next/link'
// import React from 'react'

// const Navbar = () => {
//     return (
//         <header className="bg-white shadow-sm">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//                 <Link href="/" className="flex items-center">
//                     <Shield className="h-8 w-8 text-blue-600 mr-2" />
//                     <span className="text-2xl font-bold text-gray-900">SafeSpace</span>
//                 </Link>
//                 <nav>
//                     <ul className="flex space-x-4">
//                         <li><Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
//                         <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
//                         <li><Link href="/report" className="text-gray-600 hover:text-gray-900">Report</Link></li>
//                         <li><Link href="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link></li>
//                     </ul>
//                 </nav>
//             </div>
//         </header>
//     )
// }

// export default Navbar
"use client";
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield } from 'lucide-react';
import getAvatarUrl from '@/helpers/getAvatarUrl';

const Navbar = () => {
    const [user, setUser] = useState<User>();
    const [menuOpen, setMenuOpen] = useState(false);
    const path = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                // Gérer l'état de l'utilisateur non authentifié si nécessaire
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <nav className="bg-[#ffffff] fixed top-0 left-0 w-full z-50 bg-opacity-20 backdrop-blur-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <Shield className="h-8 w-8 text-blue-600 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">SafeSpace</span>
                </Link>
                <button
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="sr-only">Ouvrir le menu principal</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`w-full md:block md:w-auto ${menuOpen ? 'block' : 'hidden'}`}>
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">About</a>
                        </li>
                        <li>
                            <a href="/volunteer" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Report</a>
                        </li>
                        <li>
                            <a href="/requests" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Ressources</a>
                        </li>
                        <li>
                            <a href="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Contact</a>
                        </li>
                        {!user ? (
                            (path === '/join' ? (
                                <li>
                                    <Link href="/login" className='shadow-sm shadow-[#282828] px-4 py-1 rounded-md' prefetch={false}>Login</Link>
                                </li>) : (
                                <li>
                                    <Link href="/signup" className='shadow-sm shadow-[#282828] px-4 py-1 rounded-md' prefetch={false}>Signup</Link>
                                </li>
                            ))
                        ) : (
                            <li>
                                <Link href="/profile" prefetch={false}>
                                    <img
                                        src={user.photoURL ?? getAvatarUrl(user.email ?? "johndoe@gmail.com")}
                                        alt="Avatar de l'utilisateur"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;