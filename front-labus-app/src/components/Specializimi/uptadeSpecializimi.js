import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpecializimi, updatespecializimi } from '../../actions/SpecializimiActions';
import useAuthentication from "../../actions/auth";
function UptadeSpecializimii() {
  const dispatch = useDispatch();
  const { specializimiId } = useParams();
  const qyteti = useSelector((state) => state.specializimiReducerContent.specializimis);
  const errors = useSelector((state) => state.errorReducerContent);
  const [data, setData] = useState({

    id: '',
    emri: ''
  });

  useEffect(() => {
    dispatch(getSpecializimi(specializimiId));
    setData((initialState) => ({
      ...initialState,
      id: qyteti.id,    
      emri: qyteti.emri || ''
    }));
  }, [dispatch, specializimiId, qyteti.emri, qyteti.id]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const updateDepartment = {
      id: data.id,
      emri: data.emri
    };
    dispatch(updatespecializimi(specializimiId,updateDepartment));
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
        <h5 className="text-center">Update Qyteti Form</h5>
        <hr />
        <form onSubmit={onSubmit} className="d-flex flex-column">
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Qyteti ID"
              name="id"
              value={specializimiId}
              disabled
            />
            <br />
            <input
              type="text"
              className={`form-control form-control-lg ${errors.emri ? 'is-invalid' : ''}`}
              placeholder="Qyteti Name"
              name="emri"
              value={data.emri}
              onChange={onChange}
            />
            {errors.emri && <p className="invalid-feedback">{errors.emri}</p>}
          </div>
          <input type="submit" className="btn btn-primary btn-block mt-4" />
        </form>
      </div>
    </div>
  );

}

export default UptadeSpecializimii;