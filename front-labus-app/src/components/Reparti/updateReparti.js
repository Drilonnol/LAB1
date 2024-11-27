import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRepart, getReparti } from '../../actions/RepartiActions';
import { useParams } from 'react-router-dom';
import useAuthentication from "../../actions/auth";
function UpdateReparti() {
    const { qytetiId, spitaliId, repartiId } = useParams();

    const dispatch = useDispatch();
    const errors = useSelector((state) => state.errorReducerContent);
    const reparti = useSelector((state) => state.repartiReducerContent.repart);

    const [repartidata, setRepartiData] = useState({
        id: "",
        name: ""
    });

    useEffect(() => {
        dispatch(getReparti(qytetiId, spitaliId, repartiId));
    }, [dispatch, qytetiId, spitaliId, repartiId]);

    useEffect(() => {
        if (reparti) {
            setRepartiData({
                id: reparti.id,
                name: reparti.name
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
            name: repartidata.name
        };
        dispatch(createRepart(qytetiId, spitaliId, updateRepartiObject));
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
                        </div>
                        <input type="submit" className="btn btn-primary btn-block mt-4" value="Update Department" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateReparti;
