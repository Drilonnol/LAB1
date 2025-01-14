import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useAuthentication from "../../actions/auth";
import { creaetPacient } from '../../actions/PacinetActions';
function AddPacinet() {
    
    const { qytetiId, spitaliId, repartiId } = useParams();
    console.log('qytetId:', qytetiId); // Debug: Log the qytetiId
    console.log('spitaliId:', spitaliId); // Debug: Log the spitaliId
    console.log('repartiId:', repartiId); 
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.errorReducerContent);
    const [pacinetData, setPacinetData] = useState({
        name: "",
        address: "",
        email: "",
        phoneNumber: ""
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setPacinetData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const newPacinet = {
            name: pacinetData.name,
            address: pacinetData.address,
            email: pacinetData.email,
            phoneNumber: pacinetData.phoneNumber,
            gjinia: pacinetData.gjinia
        };
        dispatch(creaetPacient(qytetiId, spitaliId, repartiId, newPacinet));
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
                        value={pacinetData.name}
                        onChange={onChange}
                        required
                    />
                    {errors.name && <p className="invalid-feedback">{errors.name}</p>}
                    <input
                        type="text"
                        className={`form-control form-control-lg mt-4${errors.address ? " is-invalid" : ""}`}
                        placeholder="Employee address"
                        name="address"
                        value={pacinetData.address}
                        onChange={onChange}
                        required
                    />
                    {errors.address && <p className="invalid-feedback">{errors.address}</p>}
                    <input
                        type="email"
                        className={`form-control form-control-lg mt-4${errors.email ? " is-invalid" : ""}`}
                        placeholder="Employee email"
                        name="email"
                        value={pacinetData.email}
                        onChange={onChange}
                        required
                    />
                    {errors.email && <p className="invalid-feedback">{errors.email}</p>}
                    <input
                        type="text"
                        className={`form-control form-control-lg mt-4${errors.phoneNumber ? " is-invalid" : ""}`}
                        placeholder="Employee phone number"
                        name="phoneNumber"
                        value={pacinetData.phoneNumber}
                        onChange={onChange}
                        required
                    />
                     <input
                        type="text"
                        className={`form-control form-control-lg mt-4${errors.gjinia ? " is-invalid" : ""}`}
                        placeholder="Employee phone number"
                        name="gjinia"
                        value={pacinetData.gjinia}
                        onChange={onChange}
                        required
                    />
                    {errors.gjinia && <p className="invalid-feedback">{errors.gjinia}</p>}
                    <input type="submit" className="btn btn-danger mt-4" value="Create Employee" />
                </form>
            </div>
        </div>
    );
}

export default AddPacinet;