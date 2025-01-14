import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createTakimi, getTask } from "../../actions/TakimetActions";
import useAuthentication from "../../actions/auth";
function UpdateTask() {
    const { repartiId, mjketId, takimiId } = useParams();
    const dispatch = useDispatch();
    const task = useSelector((state) => state.takimReducerContent.takim);
    const errors = useSelector((state) => state.errorReducerContent);

    const [taskData, setTaskData] = useState({
       description: "",
       acceptanceCriteria: "",
        status: "",
        priority: 0,
        userId:"",
    });

    useEffect(() => {
        dispatch(getTask(repartiId, mjketId, takimiId));
    }, [dispatch, repartiId, mjketId, takimiId]);

    useEffect(() => {
    if (task) {
      setTaskData({
        ...taskData,
        id: takimiId,
        description: task.description,
        acceptanceCriteria: task.acceptanceCriteria,
        status: task.status,
        priority: task.priority,
        userId: task.userId,
      });
    }
  }, [task, takimiId]);

    const onChange = (event) => {
        const { name, value } = event.target;
        setTaskData((prevTaskData) => ({
            ...prevTaskData,
            [name]: value
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const updatedTask = {
            id: takimiId,
            description: taskData.description,
            acceptanceCriteria: taskData.acceptanceCriteria,
            status: taskData.status,
            priority: taskData.priority,
            userId: taskData.userId,
        };
        dispatch(createTakimi(repartiId, mjketId,taskData.userId, updatedTask));
    };
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
                <h2 className="text-center">Update Task</h2>
                <form className="form-control form-control-lg" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Description:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
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
                            className={`form-control ${errors.acceptanceCriteria ? "is-invalid" : ""}`}
                            placeholder="Task acceptance criteria"
                            name="acceptanceCriteria"
                            value={taskData.acceptanceCriteria}
                            onChange={onChange}
                        />
                        {errors.acceptanceCriteria && (<p className="invalid-feedback">{errors.acceptanceCriteria}</p>)}
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <select
                            className={`form-control ${errors.status ? "is-invalid" : ""}`}
                            name="status"
                            value={taskData.status}
                            onChange={onChange}
                        >
                            <option value="">Select Status</option>
                            <option value="INPUT QUEUE">INPUT QUEUE</option>
                            <option value="IN PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                        {errors.status && (<p className="invalid-feedback">{errors.status}</p>)}
                    </div>
                    <div className="form-group">
                        <label>Priority:</label>
                        <select
                            className={`form-control ${errors.priority ? "is-invalid" : ""}`}
                            name="priority"
                            value={taskData.priority}
                            onChange={onChange}
                        >
                            <option value="">Select Priority</option>
                            <option value="1">HIGH</option>
                            <option value="2">MEDIUM</option>
                            <option value="3">LOW</option>
                        </select>
                        {errors.priority && (<p className="invalid-feedback">{errors.priority}</p>)}
                    </div>
                    <div className="form-group">
                        <label>Id:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.userId ? "is-invalid" : ""}`}
                            placeholder="Task acceptance criteria"
                            name="userId"
                            value={taskData.userId}
                            onChange={onChange}
                            disabled
                        />
                        {errors.userId && (<p className="invalid-feedback">{errors.userId}</p>)}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateTask;