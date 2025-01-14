import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPacinet, creaetPacient } from "../../actions/PacinetActions";
import useAuthentication from "../../actions/auth";
function UpdatePacienti() {
  const { qytetiId, spitaliId ,repartiId,pacientId} = useParams();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errorReducerContent);
  const pacient = useSelector((state) => state.pacinetReducerContent.pacinet);

  const [spitaliData, setSpitaliData] = useState({
    id: "",
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
    gjinia:"",
  });

  useEffect(() => {
    dispatch(getPacinet(qytetiId,spitaliId,repartiId,pacientId));
  }, [dispatch, qytetiId, spitaliId,repartiId,pacientId]);

  useEffect(() => {
    if (pacient) {
      setSpitaliData({
        id: pacient.id,
        name: pacient.name,
        address: pacient.address,
        email: pacient.email,
        phoneNumber: pacient.phoneNumber,
        gjinia: pacient.gjinia,
      });
    }
  }, [pacient]);

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
      name: spitaliData.name,
      address: spitaliData.address,
      email: spitaliData.email,
      phoneNumber: spitaliData.phoneNumber,
      gjinia: spitaliData.gjinia,
    };
    dispatch(creaetPacient(qytetiId,spitaliId,repartiId,updateSpitaliObject));
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
              errors.name ? " is-invalid" : ""
            }`}
            placeholder="Spitali Name"
            name="name"
            value={spitaliData.name}
            onChange={onChange}
          />
          {errors.name && <p className="invalid-feedback">{errors.name}</p>}
          <input
            type="text"
            className={`form-control form-control-lg mt-4${
              errors.address ? " is-invalid" : ""
            }`}
            placeholder="Spitali Address"
            name="address"
            value={spitaliData.address}
            onChange={onChange}
          />
          {errors.address && (
            <p className="invalid-feedback">{errors.address}</p>
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

          <input
            type="text"
            className={`form-control form-control-lg mt-4${
              errors.gjinia ? " is-invalid" : ""
            }`}
            placeholder="Spitali Phone Number"
            name="gjinia"
            value={spitaliData.gjinia}
            onChange={onChange}
            required
          />
          {errors.gjinia && (
            <p className="invalid-feedback">{errors.gjinia}</p>
          )}
          <input type="submit" className="btn btn-danger mt-4" value="Update" />
        </form>
      </div>
    </div>
  );
}

export default UpdatePacienti;