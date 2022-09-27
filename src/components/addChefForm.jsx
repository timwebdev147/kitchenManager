import { useState, useReducer, useEffect } from "react";
import '../styles/chefForm.modules.scss';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import {GrFormAdd} from 'react-icons/gr';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";


function    AddChefForm(){

    countries.registerLocale(enLocale);

    const countryObj = countries.getNames('en', {select: 'official'});
    const countryArr = Object.entries(countryObj).map(([key, value]) => {
        return {
            label: value,
            value: key
        };
    });
    
    
    const initialFieldsState = {
        fields: [
            {
                className: "input-field half-width",
                name: 'chef',
                label: 'chef name',
                type: 'text',
                value: ''
            },
            {
                className: "input-field half-width",
                name: 'DOB',
                label: 'chef date of birth',
                type: 'date',
                value: ''
            },
            {
                className: "input-field",
                name: 'about',
                label: 'about chef',
                type: 'text',
                value: '',
                fieldType: 'textarea'
            },
            {
                className: "input-field half-width",
                name: 'nationalty',
                label: 'chef nationalty',
                type: '',
                value: '',
                fieldType: 'dropdown',
                optionType: 'country'
            },
            {
                className: "input-field half-width",
                name: 'specialty',
                label: 'chef specialty',
                type: '',
                value: '',
                fieldType: 'dropdown',
                options: [
                    'Beverage', 'Appetizer', 'Salad', 'Soup', 'Main', 'Side', 'Desert', 'Other'
                ]
            },
            {
                className: "input-field half-width",
                name: 'YOE',
                label: 'Years of experience',
                type: 'number',
                value: ''
            },
            {
                className: "input-field half-width",
                name: 'image',
                label: "Chef's picture",
                type: 'file',
                value: 'image',
                url: ''
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
    const [afterSubmit, setAfterSubmit] = useState(false);
    const [emptyAlert, setEmptyAlert] = useState(null);


    const updateFieldValue = (index, value ) => {
        dispatch({type: 'updateFieldValue', payload: {index, value}})
    }
    
    console.log(formFields);
   
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

        // if () {
            
        // }
        
        let requestObject = {};
        formFields.fields.forEach(field => {
            requestObject[field.name] = field.value;
            console.log(field)
            
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

            console.log(requestObject);
        })
        setAfterSubmit(true);

        if (emptyAlert == false) {
            
            axios.post("http://127.0.0.1:8000/api/chefs", requestObject)
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
        }else{
            return null
        }

      };

      const handleAfterSubmit = () => {
        setAfterSubmit(false);
      }


    return (
        <>
        <section className="AddChef-page">
            <div className="form-container">
            <h2>Create/Add new Chef</h2>
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
                        field.optionType === 'country'? countryArr.map(({label, value}) => ( <option key={value} value={value} >{label}</option> ))
                        :
                        field.options.map((option, optionIndex) => ( <option value={option}  key={optionIndex}>{option}</option> ))
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

                <Link to='/taskbox/chefs'>List of Chefs</Link>
                <Link onClick={handleAfterSubmit} to='/taskbox/addChef'>try again</Link>
                </div>
            </div>:

            condition == true?
            <div className="successCard">
                <h1>Success!</h1>
                <p>
                    The new Chef has been successfully added to the list of available Chefs.
                </p>

                <div className="buttons">

                <Link to='/taskbox/chefs'>List of Chefs</Link>
                <Link onClick={handleAfterSubmit} to='/taskbox/addChef'>Add another Chef</Link>
                </div>
            </div>
            :
            <div className="failedCard">
                <h1>Failed!</h1>
                <p>
                    Due to server error the Chef could not be added, please try again thanks.
                </p>

                <div className="buttons">

                <Link to='/taskbox/chefs'>List of Chefs</Link>
                <Link onClick={handleAfterSubmit} to='/taskbox/addChef'>Try again</Link>
                </div>
            </div>
}
        </div>
}
        </section>
        </>
    )

}


export default AddChefForm;