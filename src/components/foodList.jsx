import { useState, useEffect, useReducer } from "react";
import '../styles/foodList.modules.scss'
import {GrFormAdd} from 'react-icons/gr'
import {BiTimeFive, BiDish} from 'react-icons/bi'
import {MdFoodBank, MdDeleteForever} from 'react-icons/md'
import {HiOutlineBookOpen} from 'react-icons/hi'
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

function FoodList(){

    // get data from API

    const [foods, getFoods] = useState('')
    const [errorFoods, setErrorFoods] = useState('')


    const url = 'https://foodlist-api.vercel.app/foods';

    const getAllFoods = () => {
        axios.get(url)
        .then((response) => {
            const allFoods = response.data.data.data;
            getFoods(allFoods);
            setErrorFoods(response.data.status)
        })
        .catch(error => {
            setErrorFoods(error.response.data.message)
        })
    }

    const client = axios.create({
        baseURL: 'https://foodlist-api.vercel.app/foods'
    });
    

    const deleteFood = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            client.delete(`${id}`)
        .then((response) => {
            const allFoods = response.data.data.data;
            getFoods(allFoods);
            alert('delete successful')
            getFoods(
                foods.filter((food) => {
                    return food.id !== id;
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
        getAllFoods();
    }, []);

    useEffect(() => {
        if(errorFoods == 1){
            console.log(errorFoods)
            return undefined
        } else{
            getAllFoods()
        }

    });
    
    const refresh = () => {
        getAllFoods()
    }

    
    console.log(foods);










    return (
        <>
        
            <section className="foodList-page">
                    <h2>
                        List of Foods
                    </h2>
                <div className="food-container">
                    <div className="foodlist">
                        {
                            errorFoods != 1
                            ?
                            <div className="connectingIndicator">
                                <h1>connecting to database.<span className="firstDot">.</span><span className="secondDot">.</span></h1>
                                <button className="refreshBtn" onClick={refresh} >refresh</button>
                            </div>:
                           foods.length > 0 ? foods.map((food) => {
                              return  <div className="card" key={food.id}>
                                    <div className="imageContainer">
                                        <p>{food.food}</p>
                                        <button onClick={() =>deleteFood(food.id) } className="deleteBtn">
                                            <MdDeleteForever/>&nbsp;Delete Recipe
                                        </button>
                                    </div>
                                    <div className="info">
                                        <div className="type">
                                        <span><MdFoodBank/>&nbsp;cuisine type: {food['cuisine']}</span>
                                        <span><BiDish/>&nbsp;dish type: {food['dish-type']}</span>
                                        </div>
                                        <div className="time">
                                        <span><BiTimeFive/>&nbsp;prep: {food['prep-time']}</span>
                                        <span><BiTimeFive/>&nbsp;cook: {food['cook-time']}</span>
                                        </div>
                                        <div className="description">
                                            <p><b>Description</b>:</p>
                                            <p>{food.description}</p>
                                        </div>
                                        <div className="ingredient">
                                            <p><b>Primary Ingredient</b>:</p>
                                            <p>{food["p-ingredient"]}</p>
                                        </div>
                                        <div className="ingredient">
                                            <p><b>Ingredients</b>:</p>
                                            <p>{food.ingredient}</p>
                                        </div>
                                        <div className="instruction">
                                            <p><b>Instructions</b>:</p>
                                            <p>{food.instructions}</p>
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

export default FoodList;