import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import '../styles/taskBox.modules.scss';
import {Outlet, Link, useLocation, useNavigate} from 'react-router-dom';
import {FiGrid, FiArrowRight} from 'react-icons/fi'
import {GiBowlOfRice, GiChefToque} from 'react-icons/gi'
import {RiArrowRightSLine, RiAccountCircleFill, RiLogoutCircleFill} from 'react-icons/ri'
import {GoPrimitiveDot} from 'react-icons/go'
import  axios  from "axios";
const TaskBox = () => {

    const [active, setActive] = useState( false);
    const [active2, setActive2] = useState( false);
    const [inActive, setInActive] = useState( false);
    const [inActive2, setInActive2] = useState( false);
    const [foodsAmount, setFoodsAmount] = useState(0);
    const [chefsAmount, setChefsAmount] = useState(0);


    let loggedIn = window.localStorage.getItem('isLoggedIn');
    const navigate = useNavigate();
    console.log(loggedIn);
    useEffect(() => {
        if(loggedIn === null){
            console.log('logged out');
            // window.location = '/'
            navigate('/')
        }else{
            console.log('logged in')
        }
    })

    const signOut = () => {
        window.localStorage.removeItem('isLoggedIn');
        // navigate('/')
        window.location = '/'
    }
    const dropdownFood = (index) => {
        let state = active;
        let active2State = active2;
        if (active == false) {
            state = true;
        } else{
            state = false;
            active2State = true;
        }
        setActive(state);
        setActive2(active2State);
    }
    console.log(active2);

    const dropdownChef = () => {
        let secondState = inActive;
        let inActive2State = inActive2;
        if (inActive == true) {
            secondState = false;
            inActive2State = true;
        } else{
            secondState = true;
        }
        setInActive(secondState);
        setInActive2(inActive2State);
        console.log(inActive);
    }

    // const url = 'http://127.0.0.1:8000/api';

    const getFoodsAmount = () => {
        axios.get('https://foodlist-api.vercel.app/foods')
        .then((response) => {
            const amounts = response.data.data.data.length;
            setFoodsAmount(amounts);
            console.log(amounts)
        })
        .catch(error => {
        })
    }
    // const getUserName = () => {

    //     const user = sessionStorage.getItem('isToken');
    //     const token = user;
    //     console.log(token)
    //     axios.post('http://127.0.0.1:8000/api/user-details', {headers: {'Authorization': `Bearer ${token}`}})
    //     .then((response) => {
    //         const responseData = response;
    //         console.log(responseData)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }
    const getChefsAmount = () => {
        axios.get('https://foodlist-api.vercel.app/chefs')
        .then((response) => {
            const amounts = response.data.data.data.length;
            setChefsAmount(amounts);
            console.log(amounts)
        })
        .catch(error => {
        })
    }
    

    useEffect(() => {
        getFoodsAmount()
        getChefsAmount()
        // getUserName()
    }, [])

    
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
   








    if (loggedIn == null ) {
        return null
    } else{

    return <> 
        <Navbar customClass="taskbox-navbar" clickFunction={signOut}
        menu1={'account'} link1='#' icon1={<RiAccountCircleFill className="menu-icon" />}
        menu2={null} link2='#' 
        menu3={null} link3='#' 
        logout={'logout'} logoutLink='#' logoutIcon={<RiLogoutCircleFill className="menu-icon" />}
        signIn={null} signUp={null} 
        dropDownFunction = {sidebar}
        />
        <>
            <section className="taskbox">
                <div className="hidden-sidebar"></div>
                <div className="sidebar">
                    <Link to={'#'} className='dashboard-title'><FiGrid className="menu-icon"/> Dashboard</Link>
                    <ul>
                        <a onClick={dropdownFood} className="food-title" ><GiBowlOfRice className="menu-icon"/> Food <RiArrowRightSLine id="dropdown-indicator" className={active? 'rotate ':null + active2? 'dropdown-icon':null  } /> </a> 
                        
                            <ul className={active? 'dropdown-effect ':null + active2? 'submenu-container':null }>
                                <Link className="submenu" to={'/taskbox/foods'}><GoPrimitiveDot className="menu-icon"/> List of Foods ({foodsAmount})</Link> 
                                <Link className="submenu" to={'#'}><GoPrimitiveDot className="menu-icon"/> Edit Food Item</Link> 
                                <Link className="submenu" to={'/taskbox/createFood'}><GoPrimitiveDot className="menu-icon"/> Create Food </Link> 
                            </ul>
                        <a onClick={dropdownChef}><GiChefToque className="menu-icon"/> Chefs <RiArrowRightSLine id="dropdown-indicator" className={inActive? 'rotate ':null + inActive2? 'dropdown-icon':null   }/> </a>

                            <ul className={inActive? 'dropdown-effect ':null + inActive2? 'submenu-container':null }>
                                <Link className="submenu" to={'/taskbox/chefs'}><GoPrimitiveDot className="menu-icon"/> List of Chefs ({chefsAmount}) </Link> 
                                <Link className="submenu" to={'#'}><GoPrimitiveDot className="menu-icon"/> Update Chef Data</Link> 
                                <Link className="submenu" to={'/taskbox/addChef'}><GoPrimitiveDot className="menu-icon"/> Add new Chef </Link> 
                            </ul>
                        <Link className="mobileLink" to={'#'}><RiAccountCircleFill className="menu-icon" /> Account</Link>
                        <Link className="mobileLink" onClick={signOut} to={'#'}><RiLogoutCircleFill className="menu-icon" /> Logout</Link>
                    </ul>
                    <p>
                    Copyright © Kitchen-Manager 2022 Created By Akinsanmi Timothy
                    </p>
                </div>
                <div className="taskDisplay">
                    <Outlet />
                </div>
            </section>
        </>
    </>
    }
}

export default TaskBox;