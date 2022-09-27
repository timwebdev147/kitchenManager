import { useState, useEffect, useReducer } from "react";
import '../styles/foodForm.modules.scss'
import {GrFormAdd} from 'react-icons/gr'
import { Outlet, Link, Router } from "react-router-dom";
import axios from "axios";


function    CreateFoodForm(){
    /*const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");*/

    const cuisine = [
        
        {
            id: 'african',
            option: 'African'
        },
        {
            id: 'american',
            option: 'American'
        },
        {
            id: 'asia',
            option: 'Asia'
        },
        {
            id: 'carribean',
            option: 'Carribean'
        },
        {
            id: 'chinese',
            option: 'Chinese'
        },
        {
            id: 'french',
            option: 'French'
        },
        {
            id: 'greek',
            option: 'Greek'
        },
        {
            id: 'indian',
            option: 'Indian'
        },
        {
            id: 'italian',
            option: 'Italian'
        },
        {
            id: 'japanese',
            option: 'Japanese'
        },
        {
            id: 'mexican',
            option: 'Mexican'
        },
        {
            id: 'middle eastern',
            option: 'Middle Eastern'
        },
        {
            id: 'moroccan',
            option: 'Moroccan'
        },
        {
            id: 'spanish',
            option: 'Spanish'
        },
        {
            id: 'thai',
            option: 'Thai'
        },
        {
            id: 'other',
            option: 'Other'
        }
    ]

    const dish = [
        {
            id: 'beverage',
            option: 'Beverage'
        },
        {
            id: 'bread',
            option: 'Appetizer'
        },
        {
            id: 'salad',
            option: 'Salad'
        },
        {
            id: 'soup',
            option: 'Soup'
        },
        {
            id: 'main',
            option: 'Main'
        },
        {
            id: 'side',
            option: 'Side'
        },
        {
            id: 'desert',
            option: 'Desert'
        },
        {
            id: 'other',
            option: 'Other'
        }
    ]



    const initialFieldsState = {
        fields: [
            {
                className: "input-field half-width",
                name: 'food',
                label: 'Recipe/Food Name',
                type: 'text',
                value: ''
            },
            {
                className: "input-field half-width",
                name: 'image',
                label: "Recipe's picture",
                type: 'file',
                value: 'image',
                url: ''
            },
            {
                className: "input-field",
                name: 'description',
                label: 'Recipe Description',
                type: 'text',
                value: '',
                fieldType: 'textarea'
            },
            {
                className: "input-field half-width",
                name: 'cuisine',
                label: 'Cuisine Type',
                type: '',
                value: '',
                fieldType: 'dropdown',
                optionType: 'cuisine'
            },
            {
                className: "input-field half-width",
                name: 'dish-type',
                label: 'Dish type',
                type: '',
                value: '',
                fieldType: 'dropdown',
                optionType: 'dish',
            },
            {
                className: "input-field half-width",
                name: 'p-ingredient',
                label: 'Primary Ingredient',
                type: 'text',
                value: ''
            },
            {
                className: "input-field",
                name: 'ingredient',
                label: 'Ingredients',
                type: 'text',
                value: '',
                fieldType: 'textarea'
            },
            {
                className: "input-field",
                name: 'instructions',
                label: 'Instructions',
                type: 'text',
                value: '',
                fieldType: 'textarea'
            },
            {
                className: "input-field half-width",
                name: 'prep-time',
                label: 'Prep time',
                type: 'text',
                value: ''
            },
            {
                className: "input-field half-width",
                name: 'cook-time',
                label: 'Cook time',
                type: 'text',
                value: ''
            }
        ]
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'updateFieldValue':
                let stateData = {...state};
                stateData.fields[action.payload.index].value = action.payload.value;
                return stateData
        
            default:
                return state
        }
    }
    
    const [formFields, dispatch] = useReducer(reducer, initialFieldsState);

    const [condition, setCondition] = useState(false);
    const [afterSubmit, setAfterSubmit] = useState(true)
    const [emptyAlert, setEmptyAlert] = useState(null);

    const updateFieldValue = (index, value ) => {
        dispatch({type: 'updateFieldValue', payload: {index, value}})
    }

    console.log(formFields.fields);

    const [image, setImage] = useState()

    function handlechange(e) {
        console.log(e.target.files)
        // image.value = e.target.value;
        // image.url = URL.createObjectURL(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]))
        // setImage(image);
    }
    console.log(image)
   

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let requestObject = {};
        formFields.fields.forEach(field => {
            requestObject[field.name] = field.value

            if (field.type == 'file') {
                requestObject[field.name] = image;
            }
            if (field.type != 'file') {
                
                if (field.value == '') {
                    setEmptyAlert(true)
                }else{
                    setEmptyAlert(false)
                }
            }
        })
        console.log(requestObject)

        axios.post("https://foodlist-api.vercel.app/foods", requestObject)
        .then(response => {
            console.log(response.data)
            if (response.status == 200) {
                setCondition(true)
            }else{
                setCondition(false)
            }
        })
        .catch(error => {
            console.log(error.response.data)
        })
        setAfterSubmit(true);
      };

      const handleAfterSubmit = () => {
        setAfterSubmit(false);
      }

      
    return (
        <>

        
        <section className="CreateFood-page">
            <div className="form-container">
            <h2>Create/Add new Recipe</h2>
        <form onSubmit={handleSubmit}>


        {
                formFields.fields.map((field, index) => {
                  return  <div className={field.className} key={index}>
                    <label>
                        {field.label}
                    </label>
                    {
                        field.fieldType === "textarea"? <textarea
                                                    name={field.name}
                                                    value={field.value}
                                                    onChange={event => updateFieldValue(index, event.target.value)}
                                                    />
                        : 
                        field.fieldType === "dropdown"? <select value={field.value} onChange={event => updateFieldValue(index, event.target.value)}>
                                                            {
                        field.optionType === 'cuisine'? cuisine.map(({option, optionIndex}) => ( <option key={optionIndex} value={option} >{option}</option> ))
                        :
                        dish.map(({option, optionIndex}) => ( <option value={option}  key={optionIndex}>{option}</option> ))
                                                            }
                                                        </select>
                        : 
                        field.type == 'file'?<input 
                                                type={field.type} 
                                                onChange={handlechange}
                                                />
                        : 
                        <input 
                        type={field.type}
                        value={field.value} 
                        onChange={event => updateFieldValue(index, event.target.value)}
                        />
                    }
                  </div>
                })
            }

           
            <div className="form-submit">
                <button onClick={handleSubmit} type="submit"><GrFormAdd className="icon" /> Add Recipe  </button>
            </div>
        </form>
        </div>
        {
            afterSubmit == false? null:
            
        <div className="afterSubmit">
            {
                emptyAlert == true? 
                <div className="failedCard">
                <h1>missing or incorrect field!</h1>
                <p>
                    kindly make sure all fields are filled correctly, Thanks.
                </p>

                <div className="buttons">

                <Link to='/taskbox/foods'>List of Recipes</Link>
                <Link onClick={handleAfterSubmit} to='/taskbox/createFood'>try again</Link>
                </div>
            </div>:

            condition == true?
            <div className="successCard">
                <h1>Success!</h1>
                <p>
                    Your recipe has been successfully created and added to the list of available recipes.
                </p>

                <div className="buttons">

                <Link to='/taskbox/foods'>List of recipes</Link>
                <Link onClick={handleAfterSubmit} to='/taskbox/createFood'>Add another recipe</Link>
                </div>
            </div>
            :
            <div className="failedCard">
                <h1>Failed!</h1>
                <p>
                    Due to server error your recipe could not be added, please try again thanks.
                </p>

                <div className="buttons">

                <Link to='/taskbox/foods'>List of recipes</Link>
                <Link onClick={handleAfterSubmit} to='/taskbox/createFood'>Try again</Link>
                </div>
            </div>
}
        </div>
}
        </section>
        </>
    )

}


export default CreateFoodForm;