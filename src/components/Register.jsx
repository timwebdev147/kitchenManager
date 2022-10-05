import { useState, useEffect } from "react";
import '../styles/register.modules.scss'
import Navbar from "./Navbar";
import Loader from "./Loader"
import { HiMail} from 'react-icons/hi';
import { RiLockPasswordFill, RiLoginCircleFill } from 'react-icons/ri';
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";


function MyRegister(){
    /*const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");*/

    const field = [
        {
            id: 'firstname',
            className: 'input-field half-width',
            label: 'Your first name',
            placeholder: 'first name',
            name: 'name',
            value: '',
            type: 'text',

        },
        {

            id: 'lastname',
            className: 'input-field half-width',
            label: 'Your last name',
            placeholder: 'last name',
            value: '',
            type: 'text',
        },
        {

            id: 'email',
            className: 'input-field ',
            label: 'Your email',
            placeholder: 'Your email',
            name: 'email',
            value: '',
            type: 'email',
        
        },
        {

            id: 'password',
            className: 'input-field ',
            label: 'Your password',
            placeholder: 'Your password',
            name: 'password',
            value: '',
            type: 'password',

        },
        {

            id: 'confirm-password',
            className: 'input-field ',
            label: 'Confirm your password',
            placeholder: 'Confirm password',
            name: 'c_password',
            value: '',
            type: 'password',

        }
    ]

    const [formFields, updateFormFields] = useState(field);
    const [clicked, setClicked] = useState(false);
    const [serverResponse, setServerResponse] = useState();
    const [emailResponse, setEmailResponse] = useState();
    const [nameResponse, setNameResponse] = useState();
    const [passwordResponse, setPasswordResponse] = useState();

    useEffect(() => {
        console.log('Re-rendered:', formFields)
    }, [formFields]) 

    // useEffect(() => {
        
    // }, [])

    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        setClicked(true);
        let requestObject = {};

        formFields.forEach(field => {
                requestObject[field.name] = field.value
        })
        axios.post("https://foodlist-api.vercel.app/register", requestObject/* {
            Accepts: 'application/json',
            Authorization: `Bearer ${token}`
        }*/).then(response => {
                console.log(response)
                setClicked(false)
                setServerResponse("success")
                navigate('/login')
                
        }).catch(error => {
            console.log(error.response)
            if (error.response.data == undefined) {
            setClicked(false)
                return null
            } else{

                if(error.response.data.error.email && error.response.data.error.email.length > 0){
                    setEmailResponse("Email has already been taken.")
            }if(error.response.data.error.name && error.response.data.error.name.length > 0){
                setNameResponse("Name field is required.")
            }if(error.response.data.error.c_password && error.response.data.error.c_password[0] == 'The c password field is required.'){
                setPasswordResponse("Confirm password field is required.")
            }if(error.response.data.error.c_password && error.response.data.error.c_password[0] == "The c password and password must match."){
                setPasswordResponse("Confirm password and password must match.")
            }
        }
            setClicked(false)
        })
      //  alert(`The name you entered was: ${firstname + " " + lastname}`)
      
      };

      function handleChange(value, index) {
      //  formFields[index].value = value;
        let fieldsClone = [...formFields];
        fieldsClone[index].value = value;
        updateFormFields(fieldsClone)
      }

    return (
        <>

        <div className="blend"></div>
        <section className="Register-page">
            <div className="form-container">
            <h2>Sign up and connect</h2>
        <form method="post" action="" onSubmit={event => handleSubmit(event)}>
            
        {formFields.map((item, index) => (
                <div className={item.className} key={item.id}>
                    <label htmlFor="">{item.label}</label>
                <input name={item.name} type={item.type} placeholder={item.placeholder} value={item.value} onChange={event => handleChange(event.target.value, index)} />
                <span className="errorMessage">
                    {
                    item.id == 'email'? emailResponse:
                    item.id == 'confirm-password'? passwordResponse:
                    item.id ==  'lastname'? nameResponse: null
                    }
                </span>
                </div>
            ))}

           
            <div className="form-submit">
                <button type="submit"> {clicked == true?<Loader customClass="myLoader" className="" /> : <RiLoginCircleFill className="icon" /> }</button>
            </div>
            <div className="sign_up_link">
                <p>
                Already have an account? <span><a href=""><Link to="/login">Sign in</Link></a></span>
                </p>
            </div>
        </form>
        </div>
        </section>
        </>
    )

}


export default MyRegister;