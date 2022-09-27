import { useState } from "react";
import '../styles/login.modules.scss'
import { HiMail} from 'react-icons/hi';
import { RiLockPasswordFill, RiLoginCircleFill } from 'react-icons/ri';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios, { Axios } from "axios";






// import { ReactDOM } from "react";

function MyLogin(){
    // const [password, setPassword] = useState("");
    // const [username, setUsername] = useState("");


    const field = [
        {
            id: 'username',
            className: 'input-field',
            icon: <HiMail className="icon" />,
            placeholder: 'Your username/email',
            value: '',
            name: 'email',
            type: 'text'
        },
        {
            id: 'password',
            className: 'input-field',
            icon: <RiLockPasswordFill className="icon" />,
            placeholder: 'Your password',
            value: '',
            name: 'password',
            type: 'password'
        }
    ];

    const [formFields, updateFormFields] = useState(field);

    useEffect(() => {
        console.log(formFields);
    }, [formFields]);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let requestObject = {};
        formFields.forEach(field => {
            requestObject[field.name] = field.value
        })

        axios.post("https://foodlist-pusc6cy21-timwebdev147.vercel.app/login", requestObject)
        .then(response => {
            console.log(response.data)
            if (response.status = 200) {
                let data = response.data.success.token;
                sessionStorage.setItem("isToken", JSON.stringify(data))
                window.localStorage.setItem("isLoggedIn", true)
                // window.location = '/taskbox';
                navigate('/taskbox')
            }
        })
        .catch(error => {
            console.log(error.response.data)
        })
        // alert(`The name you entered was: ${name}`)
      };

    function handleChange(value, index) {
        let fieldsClone = [...formFields];
        fieldsClone[index].value = value;
        updateFormFields(fieldsClone)
    }

    return (
        <>
        <div className="blend"></div>
        <section className="Login-page">
            <div className="form-container">
            <h2>Sign in and connect</h2>
        <form onSubmit={handleSubmit}>
                {formFields.map((item, index) => (
                <div className={item.className} key={item.id}>
                    {item.icon} 
                <input name={item.name} type={item.type} placeholder={item.placeholder} value={item.value} onChange={event => handleChange(event.target.value, index)} />
                </div>
            ))}
            
            <div className="form-submit">
                <button type="submit"> <RiLoginCircleFill className="icon" /> </button>
            </div>
            <div className="sign_up_link">
                <p>
                Don't have an account? <span><Link to="/register">Sign up</Link></span>
                </p>
            </div>
        </form>
        </div>
        </section>
        </>
    )

}



export default MyLogin;