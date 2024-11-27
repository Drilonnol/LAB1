import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletemjkete } from "../../actions/MjekteAction";


function Mjekt({ qytetiId,spitaliId,mjeket,repartiId }) {
    const dispatch = useDispatch();

    const onClickdeleteEmployee = (repartiId, mjektId) => {
        dispatch(deletemjkete(repartiId, mjektId));
        window.location.reload();
    }

    return (
        <div className="card bg-light mb-3">
            <div className="card-body d-flex justify-content-between">
                <div className="employee-info">
                    <div className="d-flex flex-column">
                        {/* Kontrollo nëse 'mjeket' është i përcaktuar para se të lexoni atributet */}
                        {mjeket && (
                            <>
                                <h5>{mjeket.name}</h5>
                                <h5>{mjeket.address}</h5>
                                <h5>{mjeket.email}</h5>
                                <h5>{mjeket.phoneNumber}</h5>
                            </>
                        )}
                    </div>
                </div>
                <div className="employee-buttons">
                    <ul className="list-group d-flex mb-0">
                        <li className="list-group-item update mr-2">
                            <Link to={`/taskList/${repartiId}/${mjeket.id}`}>
                                <i className="fa fa-edit pr-1"></i>takimet Bord
                            </Link>
                        </li>
                        <li className="list-group-item update mr-2">
                            <Link to={`/specializimi/${mjeket.id}`}>
                                <i className="fa fa-edit pr-1"></i>Specializimi Bord
                            </Link>
                        </li><li className="list-group-item update mr-2">
                            <Link to={`/recetaList/${repartiId}/${mjeket.id}`}>
                                <i className="fa fa-edit pr-1"></i>receta Bord
                            </Link>
                        </li>
                        <li className="list-group-item update mr-2">
                            <Link to={`/updateMjekeForm/${qytetiId}/${spitaliId}/${repartiId}/${mjeket.id}`}>
                                <i className="fa fa-edit pr-1"></i>Update Employee
                            </Link>
                        </li>
                        <li className="list-group-item delete">
                            <Link to="" onClick={() => onClickdeleteEmployee(repartiId, mjeket.id)} className="btn btn-danger">
                                <i className="fa fa-trash pr-1"></i>Delete Employee
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}export default Mjekt;
