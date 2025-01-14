import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletePacinet } from "../../actions/PacinetActions";


function Pacient({ qytetiId,spitaliId,pacient, repartiId }) {
    const dispatch = useDispatch();

    const onClickdeleteEmployee = (repartiId, pacinetId) => {
        dispatch(deletePacinet(repartiId, pacinetId));
        window.location.reload();
    }

    return (
        <div className="card bg-light mb-3">
            <div className="card-body d-flex justify-content-between">
                <div className="employee-info">
                    <div className="d-flex flex-column">
                        {/* Kontrollo nëse 'mjeket' është i përcaktuar para se të lexoni atributet */}
                        {pacient && (
                            <>
                                <h5>{pacient.name}</h5>
                                <h5>{pacient.address}</h5>
                                <h5>{pacient.email}</h5>
                                <h5>{pacient.phoneNumber}</h5>
                                <h5>{pacient.gjinia}</h5>
                            </>
                        )}
                    </div>
                </div>
                <div className="employee-buttons">
                    <ul className="list-group d-flex mb-0">
                        <li className="list-group-item update mr-2">
                            <Link to={""}>
                                <i className="fa fa-edit pr-1"></i>Employee Bord
                            </Link>
                        </li>
                        <li className="list-group-item update mr-2">
                            <Link to={`/alergjiaList/${repartiId}/${spitaliId}`}>
                                <i className="fa fa-edit pr-1"></i> Alergjia
                            </Link>
                        </li>
                        <li className="list-group-item update mr-2">
                            <Link to={`/updatePacinetiForm/${qytetiId}/${spitaliId}/${repartiId}/${pacient.id}`}>
                                <i className="fa fa-edit pr-1"></i>Update Employee
                            </Link>
                        </li>
                        <li className="list-group-item delete">
                            <Link to="" onClick={() => onClickdeleteEmployee(repartiId, pacient.id)} className="btn btn-danger">
                                <i className="fa fa-trash pr-1"></i>Delete Employee
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}export default Pacient;