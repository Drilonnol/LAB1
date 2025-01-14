import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpitaletList } from "../../actions/SpitaliAction";
import { getRepartis } from "../../actions/RepartiActions";
import { getAllQytetet } from "../../actions/QyteteAction";
import { createAlergjia } from "../../actions/AlergjiaActions";
import { getPacinets } from "../../actions/PacinetActions";

function CreateAlergjiaS() {
  const dispatch = useDispatch();
  const pacinetlist = useSelector((state) => state.pacinetReducerContent.pacinets)
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


  useEffect(() => {
    if(employeeData.qytetiId && employeeData.spitaliId && employeeData.repartiId){
    dispatch(getPacinets(employeeData.qytetiId, employeeData.spitaliId, employeeData.repartiId, employeeData));
    }
}, [dispatch,employeeData.qytetiId, employeeData.spitaliId, employeeData.repartiId, employeeData]);

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
      pacientId:employeeData.pacientId,
      name: employeeData.name,
      shkaktari: employeeData.shkaktari,
     
    }
    dispatch(createAlergjia(employeeData.repartiId,employeeData.pacientId, employeeData));
  };


  return (
    <div className="row">
      <div className="col-md-10 m-auto">
        <h1 className="text-center">Regjistro Alergjine</h1>
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
          <hr />

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
          <hr />

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
          <hr />
          <select name="pacientId"
            value={employeeData.pacientId}
            onChange={onChange}
            required>
            <option value="">Select department</option>
            {pacinetlist.map((pacient) => (
              <option key={pacient.id} value={pacient.id}>
                {pacient.name}
              </option>
            ))}
          </select>
          <input
         type="text"
        className={`form-control form-control-lg mt-4${errors.emri 
        || errors.name ? " is-invalid" : ""}`}
       placeholder="Employee name"
       name="name"
      value={employeeData.name}
      onChange={onChange}
    //required
></input>
{errors.name && <p className="invalid-feedback">{errors.name}</p>}
<input
    type="text"
    className={`form-control form-control-lg mt-4${errors.shkaktari 
        || errors.shkaktari? " is-invalid" : ""}`}
    placeholder="Employee address"
    name="shkaktari"
    value={employeeData.shkaktari}
    onChange={onChange}
    //required
></input>
{errors.shkaktari && <p className="invalid-feedback">{errors.shkaktari}</p>}
<br/>

          <button type="submit" className="btn btn-primary mt-8">Create Alergjia</button>
          
        </form>
      </div>
    </div>
  );
}

export default CreateAlergjiaS;