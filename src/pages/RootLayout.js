import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { rootNavigationLinks } from '../utils/navigation'
import { useToast } from '../hooks/useToast';

const RootLayout = () => {
    const { ToastContainer } = useToast();
    return (
        <div className="h-screen w-screen grid grid-rows-[auto_auto_1fr] gap-3 p-3 sm:px-5 bg-orange-50 overflow-y-auto">
            <h1 className="text-3xl text-center font-bold text-orange-900 top-0 left-0"><Link to="/">Challenges</Link></h1>
            <div className="flex flex-wrap justify-center p-2 gap-2">
                {
                    rootNavigationLinks.map((item, index) => (
                        <NavLink key={index} to={item.url} style={({ isActive }) => ({ color: isActive ? 'rgba(154, 52, 18, 1)' : 'white', backgroundColor: isActive ? 'white' : 'rgba(154, 52, 18, 1)' })} 
                            className="px-3 py-2 rounded border-0 transition-transform hover:scale-105 text-sm font-semibold">
                            {item.label}
                        </NavLink>))
                }
            </div>
            <div className="py-2 flex justify-center items-center w-full h-full">
                <Outlet />
            </div>
            <ToastContainer />
        </div>
    )
}

export default RootLayout
