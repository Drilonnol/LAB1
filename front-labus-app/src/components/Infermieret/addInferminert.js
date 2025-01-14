import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { creaetInfermier } from '../../actions/InfermieretActions';

function AddInfermieret() {
    const { qytetiId, spitaliId, repartiId } = useParams();
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.errorReducerContent);
    const [infermierData, setInfermierData] = useState({
        emri: "",
        mbiemri: "",
        adress: "",
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setInfermierData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const newInfermier = {
            emri: infermierData.emri,
            mbiemri: infermierData.mbiemri,
            adress: infermierData.adress,
        };
        dispatch(creaetInfermier(qytetiId, spitaliId, repartiId, newInfermier));
    };

    return (
        <div className="row">
            <div className="col-md-10 m-auto">
                <h1 className="text-center">Create Infermier Form</h1>
                <hr />
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        className={`form-control form-control-lg mt-4${errors.emri ? " is-invalid" : ""}`}
                        placeholder="Infermier Name"
                        name="emri"
                        value={infermierData.emri}
                        onChange={onChange}
                        required
                    />
                    {errors.emri && <p className="invalid-feedback">{errors.emri}</p>}
                    <input
                        type="text"
                        className={`form-control form-control-lg mt-4${errors.mbiemri ? " is-invalid" : ""}`}
                        placeholder="Infermier Surname"
                        name="mbiemri"
                        value={infermierData.mbiemri}
                        onChange={onChange}
                        required
                    />
                    {errors.mbiemri && <p className="invalid-feedback">{errors.mbiemri}</p>}
                    <input
                        type="text"
                        className={`form-control form-control-lg mt-4${errors.adress ? " is-invalid" : ""}`}
                        placeholder="Infermier Address"
                        name="adress"
                        value={infermierData.adress}
                        onChange={onChange}
                        required
                    />
                    {errors.adress && <p className="invalid-feedback">{errors.adress}</p>}
                    <input type="submit" className="btn btn-danger mt-4" value="Create Infermier" />
                </form>
                {errors.general && <div className="alert alert-danger mt-4">{errors.general}</div>}
            </div>
        </div>
    );
}

export default AddInfermieret;
