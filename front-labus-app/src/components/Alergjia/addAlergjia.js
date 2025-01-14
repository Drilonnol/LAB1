import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createAlergjia } from "../../actions/AlergjiaActions";
import useAuthentication from "../../actions/auth";
function AddAlergjia(){
    const errors = useSelector((state) =>state.errorReducerContent);
    const dispatch = useDispatch();
        const {repartiId,pacinetiId} = useParams();
        const[spitali, setSpitali] = useState({
            name:"",
            shkaktari:"",
        });
      
    
        const onChange = (event) => {
            const { name, value } = event.target;
            setSpitali((prevEmployeeData) => ({
                ...prevEmployeeData,
                [name]: value,
            }));
        };
         const onSubmit = (event)=>{
            event.preventDefault();
            
           const newEmployee ={
                name:spitali.name,
                shkaktari:spitali.shkaktari
            
            
        }
        dispatch(createAlergjia(repartiId,pacinetiId,newEmployee)

        );
         };
         const isAuthenticated = useAuthentication(); 
         if (isAuthenticated === null) {
             return <p>Loading...</p>;
           }
         
           if (isAuthenticated === false) {
             return window.location.href="/";
           }

            return(
    <div className="row">
        <div className="col-md-10 m-auto">
            <h1 className="text-center">Create Employee Formrom</h1>
            <hr></hr>
            <form onSubmit={onSubmit} >
<input
    type="text"
    className={`form-control form-control-lg mt-4${errors.emri 
        || errors.name ? " is-invalid" : ""}`}
    placeholder="Employee name"
    name="name"
    value={spitali.name}
    onChange={onChange}
    //required
></input>
{errors.name && <p className="invalid-feedback">{errors.name}</p>}
<input
    type="text"
    className={`form-control form-control-lg mt-4${errors.emri 
        || errors.shkaktari? " is-invalid" : ""}`}
    placeholder="Employee address"
    name="shkaktari"
    value={spitali.shkaktari}
    onChange={onChange}
    //required
></input>
{errors.shkaktari && <p className="invalid-feedback">{errors.shkaktari}</p>}

<input type="submit" className="btn btn-danger"></input>
</form>
        </div>
    </div>
)
}
export default AddAlergjia