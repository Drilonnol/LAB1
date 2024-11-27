import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createEmployee } from "../../actions/SpitaliAction";
import useAuthentication from "../../actions/auth";
function AddSpitali(){
    const errors = useSelector((state) =>state.errorReducerContent);
    const dispatch = useDispatch();
        const {qytetiId} = useParams();
        const[spitali, setSpitali] = useState({
            emri:"",
            adressa:"",
            email:"",
            phoneNumber:""
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
                adressa:spitali.adressa,
                email:spitali.email,
                phoneNumber:spitali.phoneNumber
            
            
        }
        dispatch(createEmployee(qytetiId,newEmployee)

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
        || errors.emri ? " is-invalid" : ""}`}
    placeholder="Employee name"
    name="emri"
    value={spitali.emri}
    onChange={onChange}
    //required
></input>
{errors.emri && <p className="invalid-feedback">{errors.emri}</p>}
<input
    type="text"
    className={`form-control form-control-lg mt-4${errors.emri 
        || errors.emri? " is-invalid" : ""}`}
    placeholder="Employee address"
    name="adressa"
    value={spitali.adressa}
    onChange={onChange}
    //required
></input>
{errors.adressa && <p className="invalid-feedback">{errors.adressa}</p>}
<input
    type="email"
    className={`form-control form-control-lg mt-4${errors.emri ? " is-invalid" : ""}`}
    placeholder="Employee email"
    name="email"
    value={spitali.email}
    onChange={onChange}
    //required
></input>
  
{errors.email && <p className="invalid-feedback">{errors.email}</p>}
<input
    type="text"
    className={`form-control form-control-lg mt-4${errors.phoneNumber ? " is-invalid" : ""}`}
    placeholder="Employee phone number"
    name="phoneNumber"
    value={spitali.phoneNumber}
    onChange={onChange}
    required
    
></input>
{errors.phoneNumber && <p className="invalid-feedback">{errors.phoneNumber}</p>}
    <input type="submit" className="btn btn-danger"></input>
</form>
        </div>
    </div>
)
}
export default AddSpitali