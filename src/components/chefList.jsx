import { useState, useEffect, useReducer } from "react";
import '../styles/chefList.modules.scss'
import {GrFormAdd} from 'react-icons/gr'
import {BiTimeFive, BiDish} from 'react-icons/bi'
import {MdFoodBank, MdDeleteForever} from 'react-icons/md'
import {HiOutlineBookOpen} from 'react-icons/hi'
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

function ChefList(){

    // get data from API

    const [chefs, getChefs] = useState('')
    const [errorChefs, setErrorChefs] = useState('')


    const url = 'https://foodlist-api.vercel.app/chefs';

    const getAllChefs = () => {
        axios.get(url)
        .then((response) => {
            const allChefs = response.data.data.data;
            getChefs(allChefs);
            setErrorChefs(response.data.status)
        })
        .catch(error => {
            setErrorChefs(error.response.data.message)
        })
    }

    const client = axios.create({
        baseURL: 'https://foodlist-api.vercel.app/chefs'
    });
    

    const deleteFood = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            client.delete(`${id}`)
        .then((response) => {
            const allChefs = response.data.data.data;
            getChefs(allChefs);
            alert('delete successful')
            getChefs(
                chefs.filter((chef) => {
                    return chef.id !== id;
                })
            );
        })
        .catch(error => {
            console.log(error)
            alert('delete not successful, server error')
        })
        }
        
    }
    

    useEffect(() => {
        getAllChefs();
    }, []);

    useEffect(() => {
        if(errorChefs == 1){
            console.log(errorChefs)
            return undefined
        } else{
            getAllChefs()
        }

    });
    
    const refresh = () => {
        getAllChefs()
    }

    
    console.log(chefs);










    return (
        <>
        
            <section className="chefList-page">
                <div className="chef-container">
                    <h2>
                        List of Chefs
                    </h2>
                    <div className="cheflist">
                        {
                            errorChefs != 1
                            ?
                            <div className="connectingIndicator">
                                <h1>connecting to database.<span className="firstDot">.</span><span className="secondDot">.</span></h1>
                                <button className="refreshBtn" onClick={refresh} >refresh</button>
                            </div>:
                           chefs.length > 0 ? chefs.map((chef) => {
                              return  <div className="card" key={chef.id}>
                                    <div className="imageContainer">
                                        <p>{chef.chef}</p>
                                        <button onClick={() =>deleteFood(chef.id) } className="deleteBtn">
                                            <MdDeleteForever/>&nbsp;Delete Chef
                                        </button>
                                    </div>
                                    <div className="info">
                                        <div className="type">
                                        <span><MdFoodBank/>&nbsp;Chef Date of Birth: {chef['DOB']}</span>
                                        <span><BiDish/>&nbsp;Nationalty: {chef['nationalty']}</span>
                                        </div>
                                        <div className="time">
                                        <span><BiTimeFive/>&nbsp;specialty: {chef['specialty']}</span>
                                        <span><BiTimeFive/>&nbsp;Years of Experience: {chef['YOE']}</span>
                                        </div>
                                        <div className="description">
                                            <p><b>About Chef</b>:</p>
                                            <p>{chef.about}</p>
                                        </div>
                                        <div className="time">
                                        <span><BiTimeFive/>&nbsp;Registered/Added at: {chef['created_at']}</span>
                                        </div>
                                        
                                    </div>
                                </div>
                            }): <div>
                                <h1>fetching recipes from database.<span className="firstDot">.</span><span className="secondDot">.</span></h1>
                            </div>
                        }
                    </div>

                </div>
            </section>
        </>
    )
}

export default ChefList;