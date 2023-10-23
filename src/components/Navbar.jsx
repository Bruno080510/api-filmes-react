import React, { useState } from 'react';
import { IoHomeOutline, IoPersonOutline, IoChatbubbleOutline } from 'react-icons/io5';
import {BiCameraMovie} from 'react-icons/bi'
import {PiTelevisionSimpleBold} from 'react-icons/pi'
import {AiOutlineSearch} from 'react-icons/ai'
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <nav className="bg-black  h-24 justify-between flex items-center">
                <div className="py-8 text-3xl">
                    <h1 className="ps-6 font-extrabold">Telefy</h1>
                </div>
                <div className="flex items-center font-bold">
               
                </div>
                <Link to={'/search'}>
                  <div className="font-extrabold  cursor-pointer pe-7">
                    <AiOutlineSearch size={30}/>
                  </div>
                </Link>
                
            </nav>
  );
}

export default Navbar;
