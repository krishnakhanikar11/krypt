import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '../../images/logo.png';
import { useState } from 'react';

const NavbarItem = ({title, classprops}) => {
    return(
        <li className={`mx-4 cursor-pointer ${classprops}`}>
            {title}
        </li>
    );
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

;    return (
        <nav className='w-full flex md:justify-center justify-between items-center p-4'>

            {/* adding logo */}
            <div className='md:flex-[0.5] flex-initial justify-center items-center'>
                <img src={logo} alt='logo' className='w-32 cursor-pointer'></img>
            </div>

            {/* adding nav items by creating a component Navbaritem and mapping over an array */}
            <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
                {['Market','Exchange','Tutorials','Wallet'].map((item,index) => (
                    <NavbarItem key={item+ index} title={item}/>
                ))}
            </ul>

            {/* adding a login button */}
            <li className='list-none text-white bg-[#2952e3] py-2 px-7 mx-4 rounded-full hover:bg-[#2546bd] cursor-pointer'>Login</li>


            {/* creating navbar for mobile view by creating a state to tell whether the mobile view is on or not */}
            <div className='flex-relative'>
            {!toggleMenu && (
                <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(true)} />
            )}
            {toggleMenu && (
                <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(false)} />
            )}

            {toggleMenu && (
                <ul className='z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
                    <li>
                    <AiOutlineClose fontSize={28} className='text-xl w-full my-2' onClick={() => setToggleMenu(false)} />
                    </li>
                    {['Market','Exchange','Tutorials','Wallet'].map((item,index) => (
                    <NavbarItem key={item+ index} title={item} classprops='my-2 text-lg'/>
                ))}
                </ul>
            )}


            </div>
        </nav>
    );
    
}

export default Navbar;