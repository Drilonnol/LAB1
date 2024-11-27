import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQyteti,getQyteti } from '../../actions/QyteteAction';
import { useParams } from 'react-router-dom';
import useAuthentication from "../../actions/auth";
function UpdateQyteti() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const qyteti = useSelector((state) => state.qytetiReducerContent.qytet);
  const errors = useSelector((state) => state.errorReducerContent);
  const [data, setData] = useState({
    id: id,
    emri: ''
  });

  useEffect(() => {
    dispatch(getQyteti(id));
    setData((initialState) => ({
      ...initialState,
      id: qyteti.id,
      emri: qyteti.emri || ''
    }));
  }, [dispatch, id, qyteti.emri, qyteti.id]);

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
    dispatch(createQyteti(updateDepartment));
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
              value={id}
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

export default UpdateQyteti;
