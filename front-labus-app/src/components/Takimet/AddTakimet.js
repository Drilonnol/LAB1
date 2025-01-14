import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createTakimi } from "../../actions/TakimetActions";
import useAuthentication from "../../actions/auth";

function AddTask() {
  
    const {repartiId} = useParams();
    const {mjketId} = useParams();
    const dispatch = useDispatch();
    const userId= localStorage.getItem('userId');
    const errors = useSelector((state) => state.errorReducerContent);
    const [taskData , setTaskData] = useState({
         description:"",
         acceptanceCriteria:"",
         status:"INPUT QUEUE",
         priority : 0,
    });

  const onChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prevEmployeeData) => ({
        ...prevEmployeeData,
        [name]: value,
    }));
  };
  const onSubmit = (event) =>{
    event.preventDefault();
    const newTask = {
        description: taskData.description,
        acceptanceCriteria:taskData.acceptanceCriteria,
        status:taskData.status,
        priority : taskData.priority,

    };
    dispatch(createTakimi(repartiId,mjketId,userId,newTask));
  }
  const isAuthenticated = useAuthentication(); 
  if (isAuthenticated === null) {
      return <p>Loading...</p>;
    }
  
    if (isAuthenticated === false) {
      return window.location.href="/";
    }
  return (
    <div className="container">
      <div className="col-md-10 m-auto">
        <h2 className="text-center">Create new Task</h2>
       <form className="Form-control from-control-lg" onSubmit={onSubmit}>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              className={`form-control ${errors.description ? "is-invalid" : ""} `}
              placeholder="Task description"
              name="description"
              value={taskData.description}
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
              value={taskData.acceptanceCriteria}
              onChange={onChange}
            />
             {errors.acceptanceCriteria && (<p className="invalid-feedback">{errors.acceptanceCriteria}</p>)}
          </div>
          <div className="form-group">
            <label>Priority:</label>
            <select
              className={`form-control ${errors.priority ? "is-invalid" : "" }`}
              name="priority"
              value={taskData.priority}
              onChange={onChange}
            >
            <option value="">Select Priority</option>
              <option value={1}>HIGH</option>
              <option value={2}>MEDIUM</option>
              <option value={3}>LOW</option>
            </select>
            {errors.priority && (<p className="invalid-feedback">{errors.priority}</p>)}
          </div>
          <button type="submit" className="btn btn-primary">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;