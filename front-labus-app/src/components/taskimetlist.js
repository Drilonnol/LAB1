import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAuthentication from '../actions/auth';
import Task from './Takimet/takimi';
import { Link } from 'react-router-dom';
import { getTakimiList } from '../actions/TakimetActions';
function TaskList() {
    const { repartiId, mjketId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTakimiList(repartiId, mjketId));
    }, [dispatch, repartiId, mjketId]); // Added dependencies to useEffect
 
    const taskList = useSelector((state) => state.takimReducerContent.takims);
    let inputQueue = [];
    let inProgress = [];
    let done = [];
    const isAuthenticated = useAuthentication(); 
    if (isAuthenticated === null) {
        return <p>Loading...</p>;
      }
    
      if (isAuthenticated === false) {
        return window.location.href="/";
      }
    if (Array.isArray(taskList)) {
        for(const task of taskList){
          if (task.status === "INPUT QUEUE"){
            inputQueue.push(task)
          }
            if(task.status === "DONE"){
                done.push(task)
            }
            if(task.status === "IN PROGRESS"){
                inProgress.push(task)
            }
        }
    } else {
        console.log("taskList nuk është një array.");
        // Veprimet e nevojshme për të trajtuar rastin kur taskList nuk është një array
    }
    return (
        // JSX for your component
        <div className='container'>
          <Link to={`/addTask/${repartiId}/${mjketId}`} className='btn btn-danger'> Create Task</Link>
          <hr></hr>
          <div className='row'>
            <div className='col-md-4'>
              <div className='card text-center'>
                 <div className='card-header bg-primary text-white'>
                        <h3>INPUT QUEUE</h3>
                        <div className='card-body'>
  {inputQueue.map((task) =>(<Task key={task.id} repartiId={repartiId} mjketId={mjketId} task={task} />))}
</div>

    
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card text-center'>
                 <div className='card-header bg-primary text-white'>
                        <h3>IN PROGRESS</h3>
                        <div className='card-body'>
{inProgress.map((task) =>(<Task key={task.id} repartiId={repartiId} mjketId={mjketId} task={task} />))}
</div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card text-center'>
                 <div className='card-header bg-primary text-white'>
                        <h3>DONE</h3>
                        <div className='card-body'>
  {done.map((task) =>(<Task key={task.id} repartiId={repartiId} mjketId={mjketId} task={task} />))}
</div>
                </div>
              </div>
            </div>
          </div>
        </div>



    );
}export default TaskList