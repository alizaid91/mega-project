import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <div className='fixed w-full z-10'>
      <nav>
        <ul className='bg-gray-800 text-white py-4 px-4 sm:px-8 flex justify-between items-center'>
          <h1 className='text-xl sm:text-2xl font-bold'>
            <Link to="/">Mega Project</Link>
          </h1>
          <div className='items-center hidden sm:flex gap-6 md:gap-8 font-bold text-gray-200'>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todo">Todo</Link>
            </li>
            <li>
              <Link to="/weather">Weather</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </div>
          <div className='sm:hidden'>
            <GiHamburgerMenu className='text-xl sm:text-2xl cursor-pointer' onClick={() => setIsMobileMenuOpen(true)} />
          </div>
        </ul>
      </nav>
      <div className={`${isMobileMenuOpen ? 'scale-100 opacity-100 visible' : 'scale-110 opacity-0 invisible'} transition-all fixed w-screen h-screen top-0 left-0 bg-gray-800 flex justify-center items-center`}>
        <RxCross2 className='text-3xl absolute top-5 right-5 text-black bg-white p-1 rounded-full cursor-pointer' onClick={() => setIsMobileMenuOpen(false)} />
        <ul className={`flex flex-col items-center justify-center gap-6 text-xl text-white p-4 font-bold`}>
          <li>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/todo" onClick={() => setIsMobileMenuOpen(false)}>Todo</Link>
          </li>
          <li>
            <Link to="/weather" onClick={() => setIsMobileMenuOpen(false)}>Weather</Link>
          </li>
          <li>
            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar