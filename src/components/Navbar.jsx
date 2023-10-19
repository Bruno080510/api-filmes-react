import React, { useState } from 'react';
import { IoHomeOutline, IoPersonOutline, IoChatbubbleOutline } from 'react-icons/io5';
import {BiCameraMovie} from 'react-icons/bi'
import {PiTelevisionSimpleBold} from 'react-icons/pi'
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <nav className="bg-black  h-24 justify-between flex items-center">
                <div className="py-8 text-3xl">
                    <h1 className="ps-6 font-extrabold">Telefy</h1>
                </div>
                <div className="flex items-center font-bold">
                    <Link to="/filmes" className="p-3">
                        <a className="px-7 p-3 bg-[#1DDA63] rounded-xl">Movies</a>
                    </Link>
                    
                </div>
                <div>
                    <h1 className="font-extrabold pe-7">putaa</h1>
                </div>
            </nav>
  );
}

export default Navbar;
