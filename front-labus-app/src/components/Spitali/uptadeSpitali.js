import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEmployee, createEmployee } from "../../actions/SpitaliAction";
import useAuthentication from "../../actions/auth";
function UpdateSpitali() {
  const { qytetiId, spitaliId } = useParams();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errorReducerContent);
  const spitali = useSelector((state) => state.spitaliReducerContent.spitali);

  const [spitaliData, setSpitaliData] = useState({
    id: "",
    emri: "",
    adressa: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    dispatch(getEmployee(qytetiId, spitaliId));
  }, [dispatch, qytetiId, spitaliId]);

  useEffect(() => {
    if (spitali) {
      setSpitaliData({
        id: spitali.id,
        emri: spitali.emri,
        adressa: spitali.adressa,
        email: spitali.email,
        phoneNumber: spitali.phoneNumber,
      });
    }
  }, [spitali]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setSpitaliData((prevSpitaliData) => ({
      ...prevSpitaliData,
      [name]: value,
    }));
  };
  
  const onSubmit = (event) => {
    event.preventDefault();
    const updateSpitaliObject = {
      id: spitaliData.id,
      emri: spitaliData.emri,
      adressa: spitaliData.adressa,
      email: spitaliData.email,
      phoneNumber: spitaliData.phoneNumber,
    };
    dispatch(createEmployee(qytetiId, updateSpitaliObject));
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
        <h1 className="text-center">Update Spitali Form</h1>
        <hr />
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className={`form-control form-control-lg mt-4${
              errors.id ? " is-invalid" : ""
            }`}
            placeholder="Spitali ID"
            name="id"
            value={spitaliData.id}
            disabled
          />
          <input
            type="text"
            className={`form-control form-control-lg mt-4${
              errors.emri ? " is-invalid" : ""
            }`}
            placeholder="Spitali Name"
            name="emri"
            value={spitaliData.emri}
            onChange={onChange}
          />
          {errors.emri && <p className="invalid-feedback">{errors.emri}</p>}
          <input
            type="text"
            className={`form-control form-control-lg mt-4${
              errors.adressa ? " is-invalid" : ""
            }`}
            placeholder="Spitali Address"
            name="adressa"
            value={spitaliData.adressa}
            onChange={onChange}
          />
          {errors.adressa && (
            <p className="invalid-feedback">{errors.adressa}</p>
          )}
          <input
            type="email"
            className={`form-control form-control-lg mt-4${
              errors.email ? " is-invalid" : ""
            }`}
            placeholder="Spitali Email"
            name="email"
            value={spitaliData.email}
            onChange={onChange}
          />
          {errors.email && <p className="invalid-feedback">{errors.email}</p>}
          <input
            type="text"
            className={`form-control form-control-lg mt-4${
              errors.phoneNumber ? " is-invalid" : ""
            }`}
            placeholder="Spitali Phone Number"
            name="phoneNumber"
            value={spitaliData.phoneNumber}
            onChange={onChange}
            required
          />
          {errors.phoneNumber && (
            <p className="invalid-feedback">{errors.phoneNumber}</p>
          )}
          <input type="submit" className="btn btn-danger mt-4" value="Update" />
        </form>
      </div>
    </div>
  );
}

export default UpdateSpitali;