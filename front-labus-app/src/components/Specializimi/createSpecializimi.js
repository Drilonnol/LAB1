import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createSpecializimi } from "../../actions/SpecializimiActions";
import useAuthentication from "../../actions/auth";
function CreateSpecializimiForm(){
    const errors = useSelector((state) =>state.errorReducerContent);
    const dispatch = useDispatch();
        const {mjketId} = useParams();
        const[spitali, setSpitali] = useState({
            emri:"",
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
                emri:spitali.emri,
        }
        dispatch(createSpecializimi(mjketId,newEmployee)

        );
         }; const isAuthenticated = useAuthentication(); 
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
        || errors.emri ? " is-invalid" : ""}`}
    placeholder="Employee name"
    name="emri"
    value={spitali.emri}
    onChange={onChange}
    //required
></input>
{errors.emri && <p className="invalid-feedback">{errors.emri}</p>}

    <input type="submit" className="btn btn-danger"></input>
</form>
        </div>
    </div>
)
}
export default CreateSpecializimiForm