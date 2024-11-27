import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createRepart } from '../../actions/RepartiActions';
import useAuthentication from "../../actions/auth";
function AddReparti() {
    const { qytetiId, spitaliId } = useParams();
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.errorReducerContent);
    const [repartidata, setRepartitData] = useState({
        name: "",
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setRepartitData({ ...repartidata, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(createRepart(qytetiId, spitaliId, repartidata));
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



export default AddReparti;
