import type { FC } from "react";
import { Link } from "react-router-dom";

// icons
import { HiAcademicCap } from "react-icons/hi2";

export const Header:FC = () => {
    const isAuth= false;


    return (
        <header>
            <Link to='/'>
                <HiAcademicCap />
            </Link>
        </header>
    )
}

export default Header;