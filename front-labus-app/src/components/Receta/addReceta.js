import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReceta } from '../../actions/RecetaAction';
import useAuthentication from "../../actions/auth";
function AddReceta() {
    const { mjekuId } = useParams();
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.errorReducer);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [recetaData, setRecetaData] = useState({
        dataRecetes: getCurrentDate(),
        emriIlacit: "",
        doza: "",
        frekuenca: "",
        kohezgjatja: "",
        verejtje: ""
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setRecetaData((prevRecetaData) => ({
            ...prevRecetaData,
            [name]: value,
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(createReceta(mjekuId, recetaData));
    };
    const isAuthenticated = useAuthentication(); 
    if (isAuthenticated === null) {
        return <p>Loading...</p>;
      }
    
      if (isAuthenticated === false) {
        return window.location.href="/";
      }
    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="col-md-8 m-auto">
                <h5 className="text-center">Add Receta Form</h5>
                <hr />
                <form onSubmit={onSubmit} className='d-flex flex-column'>
                    <div className="form-group">
                        <input
                            type="date"
                            className={`form-control form-control-lg `}
                            placeholder="Data Recetes"
                            name="dataRecetes"
                            value={recetaData.dataRecetes}
                            onChange={onChange}
                        />
                      
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className={`form-control form-control-lg`}
                            placeholder="Emri Ilacit"
                            name="emriIlacit"
                            value={recetaData.emriIlacit}
                            onChange={onChange}
                        />
                    
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className={`form-control form-control-lg `}
                            placeholder="Doza"
                            name="doza"
                            value={recetaData.doza}
                            onChange={onChange}
                        />
                   
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className={`form-control form-control-lg`}
                            placeholder="Frekuenca"
                            name="frekuenca"
                            value={recetaData.frekuenca}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className={`form-control form-control-lg`}
                            placeholder="Kohezgjatja"
                            name="kohezgjatja"
                            value={recetaData.kohezgjatja}
                            onChange={onChange}
                        />
                        
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className={`form-control form-control-lg`}
                            placeholder="Verejtje"
                            name="verejtje"
                            value={recetaData.verejtje}
                            onChange={onChange}
                        />
                       
                    </div>
                    <input type="submit" className="btn btn-primary btn-block mt-4" value="Add Receta" />
                </form>
            </div>
        </div>
    );
}

export default AddReceta;
