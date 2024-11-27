import React ,{useEffect} from "react";
import Qyteti from "./Qytete/qyteti";
import CreateQytetButton from "./Qytete/createQytetet"; 
import { getAllQytetet } from "../actions/QyteteAction";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import useAuthentication from "../actions/auth";
import { Link } from "react-router-dom";
function QytetiList(){
    const dispatch = useDispatch();
    const [alertShown, setAlertShown] = useState(false);
    const qytetilist= useSelector(
        (state)=> state.qytetiReducerContent.qytetets
    );

    useEffect(() =>{
        dispatch(getAllQytetet());
    },[dispatch]);



    useEffect(() => {
        if (qytetilist.length > 0 && !alertShown) {
            const lastDepartment = qytetilist[qytetilist.length - 1];
            const { id, name } = lastDepartment;
            alert(`Qyteti me ID: ${id} dhe emrin: "${name}" është shtuar i fundit`);
            setAlertShown(true);
        }
    }, [qytetilist, alertShown]);

    /*useEffect(() => {
        // Kontrolloni në fillim të ngarkimit të faqes nese localStorage është bosh
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        // Nëse localStorage është bosh, ridrejto përdoruesin në faqen e login-it
        if (user==null || token==null) {
            window.location.href = '/';
        }
    }, []);*/
    const isAuthenticated = useAuthentication();  
    if (isAuthenticated === null) {
        return  <p>Loading</p>;
      }
    
      if (isAuthenticated === false) {
        return window.location.href = '/';
    }
    return(
        <div className="container">
        <CreateQytetButton/>
        {qytetilist.map((qytet) =>(
            <Qyteti key={qytet.id} qytet={qytet}/>
        ))}

        </div>
    );

}
export default QytetiList;