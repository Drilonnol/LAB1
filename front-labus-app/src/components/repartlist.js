import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRepartis } from '../actions/RepartiActions';
import Reparti from './Reparti/reparti';
import useAuthentication from '../actions/auth';
function RepartiList() {
    const { qytetiId, spitaliId } = useParams();
    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(getRepartis(qytetiId, spitaliId));
    }, [dispatch, qytetiId, spitaliId]);

    const repartilist = useSelector((state) => state.repartiReducerContent.reparts);
    const isAuthenticated = useAuthentication();  
    if (isAuthenticated === null) {
        return <p>Loading...</p>;
      }
    
      if (isAuthenticated === false) {
        return window.location.href="/";
      }
    return (
        <div className="container">
            <Link to={`/createRepartiForm/${qytetiId}/${spitaliId}`} className="btn btn-danger">
                Create Employee
            </Link>
            <hr />
            {repartilist.map((reparti) => (
                <Reparti
                    key={reparti.id}
                    reparti={reparti}
                    qytetiId={qytetiId} // Pass qytetiId here
                    spitaliId={spitaliId} // Pass spitaliId here
                />
            ))}
        </div>
    );
}

export default RepartiList;