import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteReceta } from "../../actions/RecetaAction";

function Receta({ receta, departmentId, mjekuId }) {
    const dispatch = useDispatch();

    const onClickDeleteReceta = (recetaId) => {
        dispatch(deleteReceta(recetaId));
        window.location.reload();
    }

    return (
        <div className="card bg-light mb-3">
            <div className="card-body d-flex justify-content-between">
                <div className="receta-info">
                    <div className="d-flex flex-column">
                        <h5>Data Recetes: {receta.dataRecetes}</h5>
                        <h5>Emri Ilacit: {receta.emriIlacit}</h5>
                        <h5>Doza: {receta.doza}</h5>
                        <h5>Frekuenca: {receta.frekuenca}</h5>
                        <h5>Kohezgjatja: {receta.kohezgjatja}</h5>
                        <h5>Verejtje: {receta.verejtje}</h5>
                        <h5>Mjeku: {receta.employee.name}</h5> {/* Adjust based on your Mjeket entity */}
                    </div>
                </div>
                <div className="receta-buttons">
                    <ul className="list-group d-flex mb-0">
                        <li className="list-group-item update mr-2">
                            <Link to={`/updatereceta/${mjekuId}`}>
                                <i className="fa fa-edit pr-1"></i>Update Receta
                            </Link>
                        </li>
                      
                        <li className="list-group-item delete">
                            <button onClick={() => onClickDeleteReceta(receta.id)} className="btn btn-danger">
                                <i className="fa fa-trash pr-1"></i>Delete Receta
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Receta;
