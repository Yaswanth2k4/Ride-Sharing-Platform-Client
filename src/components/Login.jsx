import React,{useState} from "react"
import "./Login.css"
import axios from "axios";
import Header from "./Header";
import Home from "./Home.jsx";
import { doLogin, doLogout, isLoggedIn } from "../auth/index.js";

function Login()
{
    const [submitBtn,setSubmitBtn]=useState("Login")
    const [isLogin,setLoginActive]=useState(true)
    const [isSignup,setSignupActive]=useState(false);
    const [message,setMessage]=useState("")
    const [isSuccess,setSuccess]=useState(false)
    const [input,setInput]=useState({
        FirstName:"",
        LastName:"",
        Phone:"",
        Email:"",
        Password:""
    })
    const [loggedIn,setLoggedIn]=useState(isLoggedIn());

    function handleChange(e)
    {
        setMessage("")
        const {name,value}=e.target;
        setInput(prev=>{
            return {
                ...prev,
                [name]:value
            }

        })
    }

    function signupClick()
    {
        setMessage("")
        setSubmitBtn("Signup")
        setSignupActive(true);
        setLoginActive(false)
    }

    function loginClick()
    {
        setSubmitBtn("Login")
        setLoginActive(true)
        setSignupActive(false);
    }
    
    function handleSubmitClick(e)
    {
        if(e.target.name==="Login" && input.Email!=="" && input.Password!=="")
        {
            console.log(input.Email+" "+input.Password)
            axios.post(`${process.env.REACT_APP_API}/login`,{email:input.Email, password:input.Password, isTraveller:true, isAdmin: false, isCompanion:false })
            .then(res=>res.data).then(data=>{
                setSuccess(true)
                doLogin(data.token);
                setLoggedIn(true);
                setInput({
                    FirstName:"",
                    LastName:"",
                    Phone:"",
                    Email:"",
                    Password:""
                })
            })
            .catch(function(err){
                setSuccess(false)
                setMessage(err.response.data.message)
            })
        }

        else if(e.target.name==="Signup")
        {
            if(isNaN(parseInt(input.Phone)) || isNaN(input.Phone - 0))
            {
                setMessage("Wrong Phone number format")
                return;
            }
            if(input.Email!=="" && input.Name!=="" && input.Password!=="" && input.Phone!=="")
            {
                axios.post(`${process.env.REACT_APP_API}/signup`,{fname:input.FirstName, lname:input.LastName, 
                    phoneNumber:input.Phone ,email:input.Email, password:input.Password, isTraveller:true})
                .then(res=>res.data).then(data=>{
                    setSuccess(true)
                    setMessage(data.message)
                    loginClick()
                })
                .catch(function(err){
                    setMessage(err.response.data.message)
                    setSuccess(false)
                })
            }
        }
    }

    function logout()
    {
        doLogout();
        setLoggedIn(isLoggedIn());
    }

    return !loggedIn?(<div className="d-flex flex-column align-items-center">
        <Header></Header>
        <div id="main-div" className="container col-11 col-sm-8 col-lg-3 rounded rounded-5 d-flex flex-column mt-5 text-center bg-white">
            
            <h4 className="h4 mt-4">{submitBtn}</h4>

            <div className="border-0 btn-group mx-5 mt-3 mb-4" role="group">
                <button type="button" className={isLogin?"btn btn-primary text-center active py-2":"btn btn-primary text-center py-2"} onClick={loginClick}>Login</button>
                <button type="button" className={isSignup?"btn btn-primary text-center active py-2":"btn btn-primary text-center py-2"} onClick={signupClick}>Signup</button>
            </div>

            <form className="mx-5" onSubmit={e=>e.preventDefault()}>

                {isSignup &&
                    <div>
                        <input type="text" name="FirstName" value={input.FirstName} onFocus={()=>setMessage("")} onChange={handleChange} className="form-control mb-4" placeholder="First Name" required="true"></input>
                        <input type="text" name="LastName" value={input.LastName} onFocus={()=>setMessage("")} onChange={handleChange} className="form-control mb-4" placeholder="Last Name" required="true"></input>
                        <input type="tel" id="phone" name="Phone" value={input.Phone} onFocus={()=>setMessage("")} onChange={handleChange} className="form-control mb-4" placeholder="1234567890" pattern="[0-9]{10}]" required></input>
                    </div>
                }
                
                <input type="email" name="Email" value={input.Email} onFocus={()=>setMessage("")} onChange={handleChange} className="form-control mb-4" placeholder="Email Address" required></input>
                <input type="password" name="Password" value={input.Password} onFocus={()=>setMessage("")} onChange={handleChange} className="form-control mb-4" placeholder="Password" required></input>
                <input type="submit" name={submitBtn} className="btn btn-primary w-50 mb-4 py-2" onClick={handleSubmitClick} value={submitBtn} />
            </form>

            {isLogin && <button className="btn border-0 align-self-center" style={{width:"75%"}} onClick={signupClick}>New User? <span className="text-primary">Signup</span></button>}
            <p className={isSuccess?"text-success align-self-center":"text-danger align-self-center"}>{message}</p>
        </div>
    </div>):<Home 
                logout={logout}
                />
}

export default Login;