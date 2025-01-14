import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReceta,updateReceta } from '../../actions/RecetaAction';
import useAuthentication from "../../actions/auth";
function UpdateReceta() {
    const { mjekuId } = useParams();
    const dispatch = useDispatch();

    const selectedReceta = useSelector((state) => state.recetetaReducerContent.receta);

    // State to hold the receta data
    const [recetaData, setRecetaData] = useState({
        dataRecetes: "",
        emriIlacit: "",
        doza: "",
        frekuenca: "",
        kohezgjatja: "",
        verejtje: ""
    });

    
    useEffect(() => {
        dispatch(getReceta(mjekuId)); 
    }, [dispatch, mjekuId]);


    useEffect(() => {
        setRecetaData((prevRecetaData) => ({
            ...prevRecetaData,
            ...selectedReceta 
        }));
    }, [selectedReceta]);

    const onChange = (event) => {
        const { name, value } = event.target;
        setRecetaData((prevRecetaData) => ({
            ...prevRecetaData,
            [name]: value,
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(updateReceta(mjekuId, recetaData));
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
}export default UpdateReceta