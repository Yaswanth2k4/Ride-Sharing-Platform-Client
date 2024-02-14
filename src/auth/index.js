export const doLogin=(token)=>{
    localStorage.setItem("token",JSON.stringify(token));
}

export const doLogout=()=>{
    localStorage.removeItem("token");
}

export const isLoggedIn=()=>{
    const data=localStorage.getItem("token")
    if(data!=null)
    {
        return true
    }
    return false;
}

export const getCurrentUser=()=>{
    if(isLoggedIn)
    {
        return {
            token: localStorage.getItem("token"),
        };
    }
    else
    {
        return false;
    }
}