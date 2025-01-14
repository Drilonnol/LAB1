
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteQyteti } from '../../actions/QyteteAction';
import { verifikimi } from '../../actions/SingupAction';
function User(props) {
    const { user } = props;
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    /*const onDelete = (id) => {
        dispatch(deleteQyteti(id));
        window.location.reload(); 
    };*/

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
                            <h1>{user.id}</h1>
                            <h2>Emri: {user.fullName}</h2>
                            <h2>Email: {user.email}</h2>
                            <h2>{user.password}</h2>
                            <h2>Roli: {user.role}</h2>
                            <h2>Mobile: {user.mobile}</h2>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <ul className='list-group d-flex flex-column'> 
                            <Link to={`/employeeList/${user.id}`} className='list-group-item'>Spitalet board</Link>
                            <Link to={`/updateQytetiform/${user.id}`} className='list-group-item'>Update board</Link>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
//<Link to='' onClick={() => onDelete(user.id)} className='list-group-item'>Delete board</Link>
export default User;


