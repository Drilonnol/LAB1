
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpitaletList } from "../../actions/SpitaliAction";
import { getRepartis } from "../../actions/RepartiActions";
import { getAllQytetet } from "../../actions/QyteteAction";
import { createTakimi } from "../../actions/TakimetActions";
import { getMjektets } from "../../actions/MjekteAction";

function CreateTakimiS() {
  const dispatch = useDispatch();
  const userId= localStorage.getItem('userId');
  const pacinetlist = useSelector((state) => state.mjeketReducerContetnt.mjekets);
  const qytetilist = useSelector((state) => state.qytetiReducerContent.qytetets);
  const employeeList = useSelector((state) => state.spitaliReducerContent.spitalis);
  const repartilist = useSelector((state) => state.repartiReducerContent.reparts);
  const errors = useSelector((state) => state.errorReducerContent);

  const [employeeData, setEmployeeData] = useState({
    qytetiId: "",
    spitaliId: "",
    repartiId: "",
    mjekuId: "",
    description:"",
    acceptanceCriteria:"",
    status:"INPUT QUEUE",
    priority : 0,
  });

  useEffect(() => {
    dispatch(getAllQytetet());
  }, [dispatch]);

  useEffect(() => {
    if (employeeData.qytetiId) {
      dispatch(getSpitaletList(employeeData.qytetiId));
    }
  }, [dispatch, employeeData.qytetiId]);

  useEffect(() => {
    if (employeeData.qytetiId && employeeData.spitaliId) {
      dispatch(getRepartis(employeeData.qytetiId, employeeData.spitaliId));
    }
  }, [dispatch, employeeData.qytetiId, employeeData.spitaliId]);

  useEffect(() => {
    if (employeeData.qytetiId && employeeData.spitaliId && employeeData.repartiId) {
      dispatch(getMjektets(employeeData.qytetiId, employeeData.spitaliId, employeeData.repartiId));
    }
  }, [dispatch, employeeData.qytetiId, employeeData.spitaliId, employeeData.repartiId]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData((prevEmployeeData) => ({
      ...prevEmployeeData,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newTakimi = {
      repartiId: employeeData.repartiId,
      mjekuId: employeeData.mjekuId,
      description: employeeData.description,
      acceptanceCriteria: employeeData.acceptanceCriteria,
      status: employeeData.status,
      priority: employeeData.priority,
    };
    dispatch(createTakimi(employeeData.repartiId, employeeData.mjekuId,userId, newTakimi));
  };

  return (
    <div className="row">
      <div className="col-md-10 m-auto">
        <h1 className="text-center">Regjistro Takimin</h1>
        <hr />
        <form onSubmit={onSubmit}>
          <select
            name="qytetiId"
            value={employeeData.qytetiId}
            onChange={onChange}
            required
          >
            <option value="">Select city</option>
            {qytetilist.map((qyteti) => (
              <option key={qyteti.id} value={qyteti.id}>
                {qyteti.emri}
              </option>
            ))}
          </select>
          <hr />
          <select
            name="spitaliId"
            value={employeeData.spitaliId}
            onChange={onChange}
            required
          >
            <option value="">Select hospital</option>
            {employeeList.map((spitali) => (
              <option key={spitali.id} value={spitali.id}>
                {spitali.emri}
              </option>
            ))}
          </select>
          <hr />
          <select
            name="repartiId"
            value={employeeData.repartiId}
            onChange={onChange}
            required
          >
            <option value="">Select department</option>
            {repartilist.map((reparti) => (
              <option key={reparti.id} value={reparti.id}>
                {reparti.name}
              </option>
            ))}
          </select>
          <hr />
          <select
            name="mjekuId"
            value={employeeData.mjekuId}
            onChange={onChange}
            required
          >
            <option value="">Select mjekun</option>
            {pacinetlist.map((mjeku) => (
              <option key={mjeku.id} value={mjeku.id}>
                {mjeku.name}
              </option>
            ))}
          </select>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              placeholder="Task description"
              name="description"
              value={employeeData.description}
              onChange={onChange}
            />
            {errors.description && (<p className="invalid-feedback">{errors.description}</p>)}
          </div>
          <div className="form-group">
            <label>Acceptance Criteria:</label>
            <input
              type="text"
              className={`form-control ${errors.acceptanceCriteria ? "is-invalid" : ""}`}
              placeholder="Task acceptance Criteria"
              name="acceptanceCriteria"
              value={employeeData.acceptanceCriteria}
              onChange={onChange}
            />
            {errors.acceptanceCriteria && (<p className="invalid-feedback">{errors.acceptanceCriteria}</p>)}
          </div>
          <div className="form-group">
            <label>Priority:</label>
            <select
              className={`form-control ${errors.priority ? "is-invalid" : ""}`}
              name="priority"
              value={employeeData.priority}
              onChange={onChange}
            >
              <option value="">Select Priority</option>
              <option value={1}>HIGH</option>
              <option value={2}>MEDIUM</option>
              <option value={3}>LOW</option>
            </select>
            {errors.priority && (<p className="invalid-feedback">{errors.priority}</p>)}
          </div>
          <br />
          <button type="submit" className="btn btn-primary mt-8">Create Takimi</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTakimiS;


/*import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpitaletList } from "../../actions/SpitaliAction";
import { getRepartis } from "../../actions/RepartiActions";
import { getAllQytetet } from "../../actions/QyteteAction";

import { getMjektets } from "../../actions/MjekteAction";
import { createTakimi } from "../../actions/TakimetActions";

function CreateTakimiS() {
  const dispatch = useDispatch();
  const pacinetlist = useSelector((state) => state.mjeketReducerContetnt.mjekets);
  const qytetilist = useSelector((state) => state.qytetiReducerContent.qytetets);
  const employeeList = useSelector((state) => state.spitaliReducerContent.spitalis);
  const repartilist = useSelector((state) => state.repartiReducerContent.reparts);
  const errors = useSelector((state) => state.errorReducerContent);

  const [spital, setSpital] = useState({
    id: ""
  });
  const [employeeData, setEmployeeData] = useState({
    qytetiId: "",
    spitaliId: "",
    repartiId: "",
    mjekuId: "",
    description: "",
    acceptanceCriteria: "",
    status: "",
    priority: ""
  });
  
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
    dispatch(getMjektets(employeeData.qytetiId, employeeData.spitaliId, employeeData.repartiId, employeeData));
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
      repartiId: employeeData.repartiId,
      mjekuId:employeeData.mjekuId,
      description:employeeData.description,
      acceptanceCriteria:employeeData.acceptanceCriteria,
      status:employeeData.status,
      priority : employeeData.priority,
     
    }
    dispatch(createTakimi(employeeData.repartiId,employeeData.mjekuId, employeeData));
    
  };


  return (
    <div className="row">
      <div className="col-md-10 m-auto">
        <h1 className="text-center">Regjistro Takimin</h1>
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
          <select name="mjekuId"
            value={employeeData.mjekuId}
            onChange={onChange}
            required>
            <option value="">Select mjekun</option>
            {pacinetlist.map((mjeku) => (
              <option key={mjeku.id} value={mjeku.id}>
                {mjeku.name}
              </option>
            ))}
          </select>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              className={`form-control ${errors.description ? "is-invalid" : ""} `}
              placeholder="Task description"
              name="description"
              value={employeeData.description}
              onChange={onChange}
            />
            {errors.description && (<p className="invalid-feedback">{errors.description}</p>)}
          </div>
          <div className="form-group">
            <label>Acceptance Criteria:</label>
            <input
              type="text"
                className={`form-control ${errors.acceptanceCriteria ? "is-invalid" : "" }`}
              placeholder="Task acceptance Criteria"
              name="acceptanceCriteria"
              value={employeeData.acceptanceCriteria}
              onChange={onChange}
            />
             {errors.acceptanceCriteria && (<p className="invalid-feedback">{errors.acceptanceCriteria}</p>)}
          </div>
          <div className="form-group">
            <label>Priority:</label>
            <select
              className={`form-control ${errors.priority ? "is-invalid" : "" }`}
              name="priority"
              value={employeeData.priority}
              onChange={onChange}
            >
            <option value="">Select Priority</option>
              <option value={1}>HIGH</option>
              <option value={2}>MEDIUM</option>
              <option value={3}>LOW</option>
            </select>
            {errors.priority && (<p className="invalid-feedback">{errors.priority}</p>)}
          </div>
<br/>

          <button type="submit" className="btn btn-primary mt-8">Create Alergjia</button>
          
        </form>
      </div>
    </div>
  );
}

export default CreateTakimiS;*/