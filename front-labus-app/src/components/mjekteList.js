import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Mjekt from './Mjkete/mjket';
import useAuthentication from '../actions/auth';
import { getMjektets } from '../actions/MjekteAction';


function MjketList() {
    const { qytetiId ,spitaliId,repartiId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMjektets(qytetiId ,spitaliId,repartiId));
    }, [dispatch,qytetiId ,spitaliId,repartiId]);

    const mjketlist = useSelector((state) => state.mjeketReducerContetnt.mjekets);
    const isAuthenticated = useAuthentication();  
    if (isAuthenticated === null) {
        return <p>Loading...</p>;
      }
    
      if (isAuthenticated === false) {
        return window.location.href="/";
      }
    if (!Array.isArray(mjketlist)) {
        return <div>No data available</div>;
    }

    return (
        <div className="container">
            <Link to={`/addMjeket/${qytetiId}/${spitaliId}/${repartiId}`} className="btn btn-danger">
                Create Employee
            </Link>
            <hr />
            {mjketlist.map((mjeket) => (
                <Mjekt
                    key={mjeket.id}
                    mjeket={mjeket}
                     qytetiId={qytetiId} // Pass qytetiId here
                    spitaliId={spitaliId} 
                    repartiId={repartiId}// Pass spitaliId here
                />
            ))}
        </div>
    );
}

export default MjketList;
