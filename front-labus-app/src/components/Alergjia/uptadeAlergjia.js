import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlergjia,getAlergjia } from '../../actions/AlergjiaActions';
import { useParams } from 'react-router-dom';
import useAuthentication from "../../actions/auth";
function UpdateAlergjia() {
    const { repartiId, pacinetiId, alergjiaId } = useParams();

    const dispatch = useDispatch();
    const errors = useSelector((state) => state.errorReducerContent);
    const reparti = useSelector((state) => state.alergjiaReducerContent.alergjia);

    const [repartidata, setRepartiData] = useState({
        id: "",
        name: "",
        shkaktari:""
    });

    useEffect(() => {
        dispatch(getAlergjia(repartiId, pacinetiId, alergjiaId));
    }, [dispatch, repartiId, pacinetiId, alergjiaId]);

    useEffect(() => {
        if (reparti) {
            setRepartiData({
                id: reparti.id,
                name: reparti.name,
                shkaktari: reparti.shkaktari
            });
        }
    }, [reparti]);

    const onChange = (event) => {
        const { name, value } = event.target;
        setRepartiData((prevRepartiData) => ({
            ...prevRepartiData,
            [name]: value,
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const updateRepartiObject = {
            id: repartidata.id,
            name: repartidata.name,
            shkaktari: repartidata.shkaktari,
        };
        dispatch(createAlergjia(repartiId, pacinetiId, updateRepartiObject));
    };
    const isAuthenticated = useAuthentication(); 
    if (isAuthenticated === null) {
        return <p>Loading...</p>;
      }
    
      if (isAuthenticated === false) {
        return window.location.href="/";
      }
    return (
        <>
            <div className="container d-flex justify-content-center mt-5">
                <div className="col-md-8 m-auto">
                    <h5 className="text-center">Update Department Form</h5>
                    <hr />
                    <form onSubmit={onSubmit} className='d-flex flex-column'>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Department ID"
                                name="id"
                                value={repartidata.id}
                                disabled
                            />
                            <br />
                            <input
                                type="text"
                                className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="Department Name"
                                name="name"
                                value={repartidata.name}
                                onChange={onChange}
                            />
                            {errors.name && <p className="invalid-feedback">{errors.name}</p>}
                            <input
                                type="text"
                                className={`form-control form-control-lg ${errors.shkaktari ? 'is-invalid' : ''}`}
                                placeholder="Department Name"
                                name="shkaktari"
                                value={repartidata.shkaktari}
                                onChange={onChange}
                            />
                        </div>
                        <input type="submit" className="btn btn-primary btn-block mt-4" value="Update Department" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateAlergjia;
