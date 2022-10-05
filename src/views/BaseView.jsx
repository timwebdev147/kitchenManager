import React from "react";
import { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import '../styles/baseView.modules.scss';
import { GiArchiveRegister } from "react-icons/gi";
import {IoIosLogIn, IoIosPersonAdd, IoLogInSharp} from "react-icons/io"
import { RiLoginCircleFill } from "react-icons/ri";

const BaseView = () => {

    function sidebar() {
        let sidebar = document.querySelector('.sidebar');
        console.log('hry')

        sidebar.classList.toggle('sidebarMobile')
        
    }
    function removeSidebar() {
        let sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('sidebarMobile')
    }


    const location = useLocation();

  useEffect(() => {
    removeSidebar()
  }, [location]);


    return <>
        <Navbar customClass="taskbox-navbar" 
        menu1={null} link1='#' 
        menu2={null} link2='#' 
        menu3={null} link3='#' 
        logout={null} logoutLink='#' 
        signIn={'Sign in'} iconSignIn={<RiLoginCircleFill className="menu-icon" />}
        signUp={'Sign up'} iconSignUp={<IoIosPersonAdd className="menu-icon"/>} 
        dropDownFunction = {sidebar}/>
        <div className="sidebar">
            <Link to={'/login'}><RiLoginCircleFill className="menu-icon" />Sign in</Link>
            <Link to={'/register'}><IoIosPersonAdd className="menu-icon"/>Sign up</Link>
            <p>
                    Copyright © Kitchen-Manager 2022 Created By Akinsanmi Timothy
            </p>
        </div>
        <>
            <Outlet/>
            <Loader/>
        </>
    </>
}

export default BaseView;