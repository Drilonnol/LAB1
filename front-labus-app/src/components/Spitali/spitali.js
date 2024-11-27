import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEmployee } from "../../actions/SpitaliAction";

function Spitali({ spitali, qyteti_id }) {
    const dispatch = useDispatch();

    const onClickdeleteEmployee = (departmentId, spitaliId) => {
        dispatch(deleteEmployee(departmentId, spitaliId));
        window.location.reload();
    }

    return (
        <div className="card bg-light mb-3">
            <div className="card-body d-flex justify-content-between">
                <div className="employee-info">
                    <div className="d-flex flex-column">
                        <h5>{spitali.emri}</h5>
                        <h5>{spitali.adressa}</h5>
                        <h5>{spitali.email}</h5>
                        <h5>{spitali.phoneNumber}</h5>
                    </div>
                </div>
                <div className="employee-buttons">
                    <ul className="list-group d-flex mb-0">
                        <li className="list-group-item update mr-2">
                            <Link to={`/repartiList/${qyteti_id}/${spitali.id}`}>
                                <i className="fa fa-edit pr-1"></i>Repartet Bord
                            </Link>
                        </li>
                        <li className="list-group-item update mr-2">
                            <Link to={`/updateSpitaliForm/${qyteti_id}/${spitali.id}`}>
                            
                                <i className="fa fa-edit pr-1"></i>Update Employee
                            </Link>
                        </li>
                        <li className="list-group-item delete">
                            <Link to="" onClick={() => onClickdeleteEmployee(qyteti_id, spitali.id)} className="btn btn-danger">
                                <i className="fa fa-trash pr-1"></i>Delete Employee
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Spitali;


