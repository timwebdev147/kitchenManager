import '../styles/navbar.modules.scss';
import logo from '../images/logo.png'
import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import {FaBars} from 'react-icons/fa'


function Navbar(props){

    const navMenu = [
        {
            id: 1,
            menu: props.menu1,
            link: props.link1,
            icon: props.icon1
        },
        {
            id: 2,
            menu: props.menu2,
            link: props.link2,
            icon: props.icon2
        },
        {
            id: 3,
            menu: props.menu3,
            link: props.link3,
            icon: props.icon3
        },
        {
            id: 4,
            menu: props.logout,
            link: props.logoutLink,
            icon: props.logoutIcon,
            onClick: props.clickFunction
        },
        {
            id: 5,
            menu: props.signIn,
            link: '/Login',
            icon: props.iconSignIn
        },
        {
            id: 6,
            menu: props.signUp,
            link: 'Register',
            icon: props.iconSignUp
        }
    ]

    const sidebarButton = [
        {
        onClick: props.dropDownFunction
        }
    ]

    navMenu.forEach((data) => {

        console.log(data.menu);
    })

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const Position = window.pageYOffset;
        setScrollPosition(Position);
    }

    useEffect(
        () => {
            window.addEventListener("scroll", handleScroll);


            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }, []
    );
       // console.log(scrollPosition);
    return (
        <>
        <div className={scrollPosition > 5 ? 'nav-rep d-none' : "d-none"}></div>
        <nav  className={scrollPosition > 5 ? 'sticky navbar '+props.customClass : "navbar "+props.customClass}>
            <div className='logo-container'><img src={logo} alt="" /></div>
            
            <ul>
               
                {navMenu.map((list) => (
                    <span>
                        
                    {list.menu ===null? null:
                    <li key={list.id}>
                        <Link onClick={list.onClick} to={list.link}>{list.icon} {list.menu}</Link>
                    </li>}
                    </span>
                ))}
                {
                    sidebarButton.map((button) => (

                        <button onClick={button.onClick} className='navDropdown'><FaBars/></button>
                    ))
                }
                
            </ul>
        </nav>
        </>
    )
  }


export default Navbar;