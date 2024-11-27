import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useAuthentication from "../../actions/auth";
import { creaetMjeket } from '../../actions/MjekteAction';
function AddMjket() {
    /*function AddReparti() {
    const { qytetiId, spitaliId } = useParams();
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.errorReducerContent);
    const [repartiData, setRepartiData] = useState({
        name: ""
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setRepartiData({ ...repartiData, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const newReparti = {
            name: repartiData.name
        };
        dispatch(createRepart(qytetiId, spitaliId, newReparti));
    }; */
    const { qytetiId, spitaliId, repartiId } = useParams();
    console.log('qytetId:', qytetiId); // Debug: Log the qytetiId
    console.log('spitaliId:', spitaliId); // Debug: Log the spitaliId
    console.log('repartiId:', repartiId); 
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.errorReducerContent);
    const [mjketData, setMjketData] = useState({
        name: "",
        address: "",
        email: "",
        phoneNumber: ""
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setMjketData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const newEmployee = {
            name: mjketData.name,
            address: mjketData.address,
            email: mjketData.email,
            phoneNumber: mjketData.phoneNumber
        };
        dispatch(creaetMjeket(qytetiId, spitaliId, repartiId, newEmployee));
    };
    const isAuthenticated = useAuthentication(); 
    if (isAuthenticated === null) {
        return <p>Loading...</p>;
      }
    
      if (isAuthenticated === false) {
        return window.location.href="/";
      }
    return (
        <div className="row">
            <div className="col-md-10 m-auto">
                <h1 className="text-center">Create Employee Form</h1>
                <hr />
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        className={`form-control form-control-lg mt-4${errors.name ? " is-invalid" : ""}`}
                        placeholder="Employee name"
                        name="name"
                        value={mjketData.name}
                        onChange={onChange}
                        required
                    />
                    {errors.name && <p className="invalid-feedback">{errors.name}</p>}
                    <input
                        type="text"
                        className={`form-control form-control-lg mt-4${errors.address ? " is-invalid" : ""}`}
                        placeholder="Employee address"
                        name="address"
                        value={mjketData.address}
                        onChange={onChange}
                        required
                    />
                    {errors.address && <p className="invalid-feedback">{errors.address}</p>}
                    <input
                        type="email"
                        className={`form-control form-control-lg mt-4${errors.email ? " is-invalid" : ""}`}
                        placeholder="Employee email"
                        name="email"
                        value={mjketData.email}
                        onChange={onChange}
                        required
                    />
                    {errors.email && <p className="invalid-feedback">{errors.email}</p>}
                    <input
                        type="text"
                        className={`form-control form-control-lg mt-4${errors.phoneNumber ? " is-invalid" : ""}`}
                        placeholder="Employee phone number"
                        name="phoneNumber"
                        value={mjketData.phoneNumber}
                        onChange={onChange}
                        required
                    />
                    {errors.phoneNumber && <p className="invalid-feedback">{errors.phoneNumber}</p>}
                    <input type="submit" className="btn btn-danger mt-4" value="Create Employee" />
                </form>
            </div>
        </div>
    );
}

export default AddMjket;