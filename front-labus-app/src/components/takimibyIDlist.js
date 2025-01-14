import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTakmiById } from "../actions/TakimetActions";
import TaskID from "./Takimet/takimiByID";
import { Link, useParams } from "react-router-dom";

function TakimiByIdList() {
    const dispatch = useDispatch();
    const {userProfileId}=useParams();
   // const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userProfileId) {
            dispatch(getTakmiById(userProfileId));
        }
    }, [dispatch, userProfileId]);

    const taskList = useSelector((state) => state.takimReducerContent.meetings.meetings);

    let inputQueue = [];
    let inProgress = [];
    let done = [];

    if (Array.isArray(taskList)) {
        for (const task of taskList) {
            if (task.status === "INPUT QUEUE") {
                inputQueue.push(task);
            } else if (task.status === "DONE") {
                done.push(task);
            } else if (task.status === "IN PROGRESS") {
                inProgress.push(task);
            }
        }
    } else {
        console.log("taskList nuk është një array.");
        // Veprimet e nevojshme për të trajtuar rastin kur taskList nuk është një array
    }

    return (
        <div className='container'>
            <hr></hr>

            <div className='row'>
                <div className='col-md-4'>
                    <div className='card text-center'>
                        <div className='card-header bg-primary text-white'>
                            <h3>INPUT QUEUE</h3>
                        </div>
                        <div className='card-body'>
                            {inputQueue.map((task) => (<TaskID key={task.id} repartiId={task.employee.reparti.id} mjketId={task.employee.id} userId={userProfileId} task={task} />))}
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card text-center'>
                        <div className='card-header bg-primary text-white'>
                            <h3>IN PROGRESS</h3>
                        </div>
                        <div className='card-body'>
                            {inProgress.map((task) => (<TaskID key={task.id} repartiId={task.employee.reparti.id} mjketId={task.employee.id} userId={userProfileId} task={task} />))}
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card text-center'>
                        <div className='card-header bg-primary text-white'>
                            <h3>DONE</h3>
                        </div>
                        <div className='card-body'>
                            {done.map((task) => (<TaskID key={task.id} repartiId={task.employee.reparti.id} mjketId={task.employee.id} userId={userProfileId} task={task} />))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TakimiByIdList;