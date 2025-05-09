import type { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-900 pb-20 font-roboto text-white flex flex-col">
            <header className="bg-slate-800 p-4 shadow-md flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link to="/" className="text-white hover:text-gray-300">To-Do App</Link>
                </div>
                <nav className="space-x-4">
                    <Link to="/auth" className="hover:text-gray-300">Login</Link>
                    <Link to="/register" className="hover:text-gray-300">Register</Link>
                    <Link to="/logout" className="hover:text-gray-300">Logout</Link>
                </nav>
            </header>
            <main className="flex-1 p-6">
                {children}
            </main>
            <footer className="bg-slate-800 p-4 text-center text-gray-400">
                © 2025 To-Do App. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;

