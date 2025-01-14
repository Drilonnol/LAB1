import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteAlergjia } from '../../actions/AlergjiaActions';

function Alergjia({ alergjia, pacinetiId, repartiId }) { // Destructure props here
    const dispatch = useDispatch();

    const onDeleteTaskClick = (repartiId, pacinetiId, alergjiaId) => {
        console.log('qytetiId:', repartiId); // Debug: Log the qytetiId
        console.log('spitaliId:', pacinetiId); // Debug: Log the spitaliId
        console.log('repartiId:', alergjiaId); // Debug: Log the repartiId
        dispatch(deleteAlergjia(repartiId, pacinetiId, alergjiaId));
        window.location.reload();
    };

    return (
        <div className='container d-flex flex-row'>
            <div className='card card-body'>
                <div className='row'>
                    <div className='col-md-9'>
                        <div className='container'>
                            <h2>Emri: {alergjia.name}</h2>
                            <h2>Shkaktari: {alergjia.shkaktari}</h2>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <ul className='list-group d-flex flex-column'>

                            <Link to={""} className='list-group-item'>
                                Alergjia
                            </Link>
                            <Link to={`/updateAlergjiaForm/${repartiId}/${pacinetiId}/${alergjia.id}`} className='list-group-item'>
                                Update Alergjia
                            </Link>
                            <button
                                onClick={() => onDeleteTaskClick(repartiId,pacinetiId, pacinetiId)}
                                className='list-group-item list-group-item-action'
                                
                            >Delete Alergjia
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Alergjia;
/*import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteReparti } from '../../actions/RepartiActions';
function Reparti(props) {
    const dispatch = useDispatch();
    const {reparti} = props;
    const qytetiId = props.qytetiId;
    const spitaliId = props.spitaliId;
   

    const onDeleteTaskClik = (qytetiId,spitaliId,repartiId) =>{
        dispatch(deleteReparti(qytetiId,spitaliId,repartiId));
        console.log('qytetId:', qytetiId);  // Debug: Log the qytetId
        console.log('spitaliId:', spitaliId);  // Debug: Log the spitaliId
        console.log('repartiId:', repartiId);  // Debug: Log the repartiId
       // window.location.reload();
    }

    return (
        <div className='container d-flex flex-row'>
            <div className='card card-body'>
                <div className='row'>
                    <div className='col-md-9'>
                        <div className='container'>
                            <h2>{reparti.name}</h2>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <ul className='list-group d-flex flex-column'>
                            <Link to={`/employeeList/${reparti.id}`} className='list-group-item'>
                                Qyteti board
                            </Link>
                            <Link to={`/updateQytetiform/${reparti.id}`} className='list-group-item'>
                                Update board
                            </Link>
                            <button
                                onClick={() => onDeleteTaskClik(qytetiId, spitaliId, reparti.id)}
                                className='list-group-item list-group-item-action'
                            >
                                Delete board
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reparti;*/
