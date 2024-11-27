import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMjektets, creaetMjeket } from "../../actions/MjekteAction";
import useAuthentication from "../../actions/auth";

function UpdateMjeket() {
  const { qytetiId, spitaliId, repartiId, mjketId } = useParams();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errorReducerContent);
  const mjeketList = useSelector((state) => state.mjeketReducerContetnt.mjekets);

  const [mjeketData, setMjeketData] = useState({
    id: "",
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  console.log(qytetiId);
  console.log(spitaliId);
  console.log(repartiId);
  console.log(mjketId);


  useEffect(() => {
    dispatch(getMjektets(qytetiId, spitaliId, repartiId));
  }, [dispatch, qytetiId, spitaliId, repartiId]);

  useEffect(() => {
    if (mjeketList && mjeketList.length > 0) {
      const selectedMjek = mjeketList.find(mjek => mjek.id === Number(mjketId));
      if (selectedMjek) {
        console.log("Updating mjeketData with selectedMjek:", selectedMjek);
        setMjeketData({
          id: selectedMjek.id ?? "",
          name: selectedMjek.name ?? "",
          address: selectedMjek.address ?? "",
          email: selectedMjek.email ?? "",
          phoneNumber: selectedMjek.phoneNumber ?? "",
        });
      }
    }
  }, [mjeketList, mjketId]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setMjeketData((prevMjeketData) => ({
      ...prevMjeketData,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const updateMjekObject = {
      id: mjeketData.id,
      name: mjeketData.name,
      address: mjeketData.address,
      email: mjeketData.email,
      phoneNumber: mjeketData.phoneNumber,
    };
    dispatch(creaetMjeket(qytetiId, spitaliId, repartiId, updateMjekObject));
  };

  const isAuthenticated = useAuthentication();

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  if (isAuthenticated === false) {
    return window.location.href = "/";
  }

  return (
    <div className="row">
      <div className="col-md-10 m-auto">
        <h1 className="text-center">Update Mjeket Form</h1>
        <hr />
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className={`form-control form-control-lg mt-4${errors.id ? " is-invalid" : ""}`}
            placeholder="Mjeket ID"
            name="id"
            value={mjeketData.id}
            disabled
          />
          <input
            type="text"
            className={`form-control form-control-lg mt-4${errors.name ? " is-invalid" : ""}`}
            placeholder="Mjeket Name"
            name="name"
            value={mjeketData.name}
            onChange={onChange}
          />
          {errors.name && <p className="invalid-feedback">{errors.name}</p>}
          <input
            type="text"
            className={`form-control form-control-lg mt-4${errors.address ? " is-invalid" : ""}`}
            placeholder="Mjeket Address"
            name="address"
            value={mjeketData.address}
            onChange={onChange}
          />
          {errors.address && <p className="invalid-feedback">{errors.address}</p>}
          <input
            type="email"
            className={`form-control form-control-lg mt-4${errors.email ? " is-invalid" : ""}`}
            placeholder="Mjeket Email"
            name="email"
            value={mjeketData.email}
            onChange={onChange}
          />
          {errors.email && <p className="invalid-feedback">{errors.email}</p>}
          <input
            type="text"
            className={`form-control form-control-lg mt-4${errors.phoneNumber ? " is-invalid" : ""}`}
            placeholder="Mjeket Phone Number"
            name="phoneNumber"
            value={mjeketData.phoneNumber}
            onChange={onChange}
            required
          />
          {errors.phoneNumber && <p className="invalid-feedback">{errors.phoneNumber}</p>}
          <input type="submit" className="btn btn-danger mt-4" value="Update" />
        </form>
      </div>
    </div>
  );
}

export default UpdateMjeket;
