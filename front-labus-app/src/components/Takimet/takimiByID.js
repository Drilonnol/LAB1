import React from "react";
import { Link } from "react-router-dom";

function TaskID({ task, repartiId, mjketId, userId }) {
    let priorityAsString;
    let headerClassName;

    if (task.priority === 1) {
        headerClassName = "bg-danger text-light";
        priorityAsString = "HIGH";
    } else if (task.priority === 2) {
        headerClassName = "bg-warning text-light";
        priorityAsString = "MEDIUM";
    } else if (task.priority === 3) {
        headerClassName = "bg-info text-light";
        priorityAsString = "LOW";
    }

    return (
        <div className="card mb-4 bg-light">
            <div className={`card-header text-primary ${headerClassName}`}>
                <h3>ID: {task.id} -- Priority: {priorityAsString}</h3>
            </div>
            <div className="card-body">
                <p>{task.description}</p>
                <p>{task.acceptanceCriteria}</p>
                <Link to={`/updateTask/${repartiId}/${mjketId}/${task.id}`} className="btn btn-primary">UPDATE</Link>
                <hr></hr>
                <Link to={`/info/${repartiId}/${mjketId}/${task.id}`} className="btn btn-primary">INFO</Link>
            </div>
        </div>
    );
}

export default TaskID;