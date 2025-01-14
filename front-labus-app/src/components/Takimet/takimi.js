import React from "react";
import { useDispatch } from "react-redux";
import { deleteTakimi } from "../../actions/TakimetActions";

import { Link } from "react-router-dom";

function Task(props){
    const {task} = props;
    const repartiId = props.repartiId;
    const mjketId = props.mjketId;
    const dispatch = useDispatch();
 let priorityAsString
 let headerClassName;




        const onDeleteTaskClik = (repartiId,mjketId,taskId) =>{
            dispatch(deleteTakimi(repartiId,mjketId,taskId));
            const confirmed = window.confirm('A jeni të sigurt që dëshironi të rishfaqni faqen?');
            if (confirmed) {
                window.location.reload(); // Rishfaq faqen nëse përdoruesi konfirmon
            }
        } 

 if(task.priority === 1){
    headerClassName = "bg-danger text-light";
    priorityAsString = "HIGH";
 }
 if(task.priority === 2){
    headerClassName = "bg-warning text-light";
    priorityAsString="MEDIUM"
 }
 if(task.priority === 3){
    headerClassName="bg-info text-light";
    priorityAsString = "LOW"
 }
    return(
        <div className="card mb-4 bg-light">
            <div className={`card-header text-primary ${headerClassName}`}>
            <h3>ID: {task.id} -- Priority: {priorityAsString}</h3>
            </div>
            <div className="card-body">
                <p>{task.description}</p>
                <p>{task.acceptanceCriteria}</p>
                <Link to={`/updateTask/${repartiId}/${mjketId}/${task.id}`} className="btn btn-primary">UPDATE</Link>
                <Link to="#" className="btn btn-danger" onClick={() => onDeleteTaskClik(repartiId,mjketId,task.id)}>DELETE</Link>


            </div>
        </div>
    )
}export default Task; 
