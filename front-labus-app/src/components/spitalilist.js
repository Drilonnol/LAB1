import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Combine import statements
import { getSpitaletList } from "../actions/SpitaliAction";
import Spitali from "./Spitali/spitali";
import useAuthentication from '../actions/auth';
    import { useState } from "react";
function SpitaliList() {
    const { qyteti_id } = useParams();
    const dispatch = useDispatch();
    const [previousEmployeeListLength, setPreviousEmployeeListLength] = useState(0); 
    const employeeList = useSelector((state) => state.spitaliReducerContent.spitalis);
    
    useEffect(() => {
        dispatch(getSpitaletList(qyteti_id));
    },[dispatch, qyteti_id]);

    useEffect(() => {
        if (employeeList.length !== previousEmployeeListLength) { 
            const lastEmploye = employeeList[employeeList.length - 1];
            const { id, name } = lastEmploye;
            alert(`Employe me ID: ${id} dhe emrin: "${name}" është shtuar i fundit`);
        }
        // Përditëso gjendjen e mëparshme të listës
        setPreviousEmployeeListLength(employeeList.length);
    }, [employeeList, previousEmployeeListLength]);
    const isAuthenticated = useAuthentication();  
    if (isAuthenticated === null) {
        return <p>Loading...</p>;
      }
    
      if (isAuthenticated === false) {
        return window.location.href="/";
      }
    return (
        <div className="container">
            <Link to={`/createSpitaliForm/${qyteti_id}`}className="btn btn-danger">Create Employee</Link>
            <hr></hr>
             {employeeList.map((spitali) => 
                 <Spitali qyteti_id={qyteti_id} key={spitali.id} spitali={spitali}/> // Changed id={id} to key={employee.id}
             )}
        </div>
    );
}
export default SpitaliList