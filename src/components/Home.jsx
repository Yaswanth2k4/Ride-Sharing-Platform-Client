import React from "react";
import Header from "./Header";

function Home(props)
{

    function loginClick()
    {
        props.logout()
    }

    return <div>
        <Header /> 
            <div id="main-div" className="container col-11 col-sm-8 col-lg-3 rounded rounded-5 d-flex flex-column mt-5 text-center bg-white">
            <h3>Yet to be implemented</h3>
            <button type="button" className="btn btn-primary text-center py-2" onClick={loginClick}>Logout</button>

            </div>
    </div>    
}

export default Home;