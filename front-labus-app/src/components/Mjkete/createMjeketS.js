import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { creaetMjeket } from "../../actions/MjekteAction";
import { getSpitaletList } from "../../actions/SpitaliAction";
import { getRepartis } from "../../actions/RepartiActions";
import { getAllQytetet } from "../../actions/QyteteAction";

function CreateMjeketS() {
  const dispatch = useDispatch();
/*kodi burimor 3 */
  const qytetilist = useSelector((state) => state.qytetiReducerContent.qytetets);
  const employeeList = useSelector((state) => state.spitaliReducerContent.spitalis);
  const repartilist = useSelector((state) => state.repartiReducerContent.reparts);
  const errors = useSelector((state) => state.errorReducerContent);

  const [spital, setSpital] = useState({
    id: ""
  });
  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {
    dispatch(getAllQytetet());
  }, [dispatch]);

  useEffect(() => {
    if(employeeData.qytetiId){
    dispatch(getSpitaletList(employeeData.qytetiId));
  }
  }, [dispatch,employeeData.qytetiId]);

  useEffect(() => {
    if (employeeData.qytetiId && employeeData.spitaliId) {
      dispatch(getRepartis(employeeData.qytetiId, employeeData.spitaliId));
    }
  }, [dispatch, employeeData.qytetiId, employeeData.spitaliId]);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "qytetiId") {
      setSpital({ id: "" }); // Update the hospital state if city changes
    }
    setEmployeeData((prevEmployeeData) => ({
      ...prevEmployeeData,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newEmployee = {
      qytetiId: employeeData.qytetiId,
      spitaliId: employeeData.spitaliId,
      repartiId: employeeData.repartiId,
      name: employeeData.name,
      address: employeeData.address,
      email: employeeData.email,
      phoneNumber: employeeData.phoneNumber,
    }
    dispatch(creaetMjeket(employeeData.qytetiId, employeeData.spitaliId, employeeData.repartiId, employeeData));
  };

  return (
    <div className="row">
      <div className="col-md-10 m-auto">
        <h1 className="text-center">Register Mjeket</h1>
        <hr />
        <form onSubmit={onSubmit}>
          <select name="qytetiId"
            value={employeeData.qytetiId}
            onChange={onChange}
            required>
            <option value="">Select city</option>
            {qytetilist.map((qyteti) => (
              <option key={qyteti.id} value={qyteti.id}>
                {qyteti.emri}
              </option>
            ))}
          </select>
<hr/>

          <select name="spitaliId"
            value={employeeData.spitaliId}
            onChange={onChange}
            required>
            <option value="">Select hospital</option>
            {employeeList.map((spitali) => (
              <option key={spitali.id} value={spitali.id}>
                {spitali.emri}
              </option>
            ))}
          </select>
<hr/>

          <select name="repartiId"
            value={employeeData.repartiId}
            onChange={onChange}
            required>
            <option value="">Select department</option>
            {repartilist.map((reparti) => (
              <option key={reparti.id} value={reparti.id}>
                {reparti.name}
              </option>
            ))}
          </select>
<hr/>

          <input
            type="text"
            className={`form-control form-control-lg mt-4${errors.name ? " is-invalid" : ""}`}
            placeholder="Employee Name"
            name="name"
            value={employeeData.name}
            onChange={onChange}
            required
          />
          {errors.name && <p className="invalid-feedback">{errors.name}</p>}
          <input
            type="text"
            className={`form-control form-control-lg mt-4${errors.address ? " is-invalid" : ""}`}
            placeholder="Employee Address"
            name="address"
            value={employeeData.address}
            onChange={onChange}
            required
          />
          {errors.address && <p className="invalid-feedback">{errors.address}</p>}
          <input
            type="email"
            className={`form-control form-control-lg mt-4${errors.email ? " is-invalid" : ""}`}
            placeholder="Employee Email"
            name="email"
            value={employeeData.email}
            onChange={onChange}
            required
          />
          {errors.email && <p className="invalid-feedback">{errors.email}</p>}
          <input
            type="text"
            className={`form-control form-control-lg mt-4${errors.phoneNumber ? " is-invalid" : ""}`}
            placeholder="Employee Phone Number"
            name="phoneNumber"
            value={employeeData.phoneNumber}
            onChange={onChange}
            required
          />
          {errors.phoneNumber && <p className="invalid-feedback">{errors.phoneNumber}</p>}
          <button type="submit" className="btn btn-primary mt-4">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateMjeketS;
