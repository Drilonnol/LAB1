import React ,{useEffect} from "react";
import User from "./USER/user";

import { getAllUsers } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import useAuthentication from "../actions/auth";
import { Link } from "react-router-dom";
function UserList(){
    const dispatch = useDispatch();
    const [alertShown, setAlertShown] = useState(false);
    const userList= useSelector(
        (state)=> state.useReducerContent.users
    );

    useEffect(() =>{
        dispatch(getAllUsers());
    },[dispatch]);



    useEffect(() => {
        if (userList.length > 0 && !alertShown) {
            const lastDepartment = userList[userList.length - 1];
            const { id, name } = lastDepartment;
            alert(`Qyteti me ID: ${id} dhe emrin: "${name}" është shtuar i fundit`);
            setAlertShown(true);
        }
    }, [userList, alertShown]);
    const isAuthenticated = useAuthentication();  
    if (isAuthenticated === null) {
        return  <p>Loading</p>;
      }
    
      if (isAuthenticated === false) {
        return window.location.href = '/';
    }
    return(
        <div className="container">
        {userList.map((user) =>(
            <User key={user.id} user={user}/>
        ))}

        </div>
    );

}
export default UserList;