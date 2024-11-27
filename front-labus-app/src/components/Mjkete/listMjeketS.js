import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpitaletList } from "../../actions/SpitaliAction";
import { getRepartis } from "../../actions/RepartiActions";
import { getAllQytetet } from "../../actions/QyteteAction";


function ListMjeketS() {
  const dispatch = useDispatch();

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
    // Handle form submission logic here
  };

  return (
    <div className="row">
      <div className="col-md-10 m-auto">
        <h1 className="text-center">Serch Mjeket</h1>
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

          <a href={`/mjeketList/${employeeData.qytetiId}/${employeeData.spitaliId}/${employeeData.repartiId}`} className="btn btn-primary mt-4">
            Register
          </a>
        </form>
      </div>
    </div>
  );
}

export default ListMjeketS;