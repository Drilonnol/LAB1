import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteQyteti } from '../../actions/QyteteAction';
import { verifikimi } from '../../actions/SingupAction';
function Qyteti(props) {
    const { qytet } = props;
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const onDelete = (id) => {
        dispatch(deleteQyteti(id));
        window.location.reload(); 
    };

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setIsAuthenticated(false);
        } else {
            dispatch(verifikimi(token)).then(response => {
                setIsAuthenticated(response.status);
            });
        }
    }, [dispatch]);

    if (isAuthenticated === null) {
        return <p>Loading...</p>;
    }

    if (isAuthenticated === false) {
        return window.location.href="/";
    }

    return (
        <div className='container d-flex flex-row'>
            <div className='card card-body'>
                <div className='row'>
                    <div className='col-md-9'>
                        <div className='container'>
                            <h1>{qytet.id}</h1>
                            <h2>{qytet.emri}</h2>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <ul className='list-group d-flex flex-column'> 
                            <Link to={`/employeeList/${qytet.id}`} className='list-group-item'>Spitalet board</Link>
                            <Link to={`/uptadeQytetiform/${qytet.id}`} className='list-group-item'>Update board</Link>
                            <Link to="" onClick={() => onDelete(qytet.id)} className='list-group-item'>Delete board</Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Qyteti;









































//----------------------------------

/*import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteQyteti } from '../../actions/QyteteAction';
import axios from 'axios';

function Qyteti(props) {
    const { qytet } = props;
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const onDelete = (id) => {
        dispatch(deleteQyteti(id));
        window.location.reload(); 
    };

    const verifyToken = async (token) => {
        try {
            const response = await axios.post(
                'http://localhost:8083/auth/verifyToken',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Token verification failed:', error);
            return false;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setIsAuthenticated(false);
        } else {
            verifyToken(token).then(isValid => {
                setIsAuthenticated(isValid);
            });
        }
    }, []);

    if (isAuthenticated === null) {
        return <p>Loading...</p>;
    }

    if (isAuthenticated === false) {
        return <p>Unauthorized. Please <Link to="/signin">sign in</Link>.</p>;
    }

    return (
        <div className='container d-flex flex-row'>
            <div className='card card-body'>
                <div className='row'>
                    <div className='col-md-9'>
                        <div className='container'>
                            <h1>{qytet.id}</h1>
                            <h2>{qytet.emri}</h2>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <ul className='list-group d-flex flex-column'> 
                            <Link to={`/employeeList/${qytet.id}`} className='list-group-item'>Spitalet board</Link>
                            <Link to={`/updateQytetiform/${qytet.id}`} className='list-group-item'>Update board</Link>
                            <Link to='' onClick={() => onDelete(qytet.id)} className='list-group-item'>Delete board</Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Qyteti;*//*import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteQyteti } from '../../actions/QyteteAction';

function Qyteti(props) {
    const { qytet } = props;
    const dispatch = useDispatch();

    const onDelete = (id) => {
        dispatch(deleteQyteti(id));
        window.location.reload(); 
    }

    return (
        <div className='container d-flex flex-row'>
            <div className='card card-body'>
                <div className='row'>
                    <div className='col-md-9'>
                        <div className='container'>
                            <h1>{qytet.id}</h1>
                            <h2>{qytet.emri}</h2>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <ul className='list-group d-flex flex-column'> 
                            <Link to={`/employeeList/${qytet.id}`} className='list-group-item'>Spitalet board</Link>
                            <Link to={`/uptadeQytetiform/${qytet.id}`} className='list-group-item'>Update board</Link>
                            <Link to='' onClick={() => onDelete(qytet.id)} className='list-group-item'>Delete board</Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Qyteti;*/
