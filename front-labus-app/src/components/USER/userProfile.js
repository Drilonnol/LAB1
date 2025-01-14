
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecializimi } from '../../actions/SpecializimiActions';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../../actions/userActions';
import profilephoto from '../../images/profilephoto.jpg';
import { getTakmiById } from '../../actions/TakimetActions';
const UserProfile = () => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId'); 
    const errors = useSelector(state => state.errorReducerContent);

    useEffect(() => {
        
            dispatch(getUser(userId));
    }, [dispatch, userId]);
    const userProfile = useSelector(state => state.useReducerContent.user);

    const onClick = () =>{
        dispatch(getTakmiById(userId));
    } 

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
     
            <h1>Profili </h1>
            {userProfile ? (
                <div>
                <div style={{ border: '1px solid black', padding: '20px', borderRadius: '10px', width: '120%', marginTop: '20px', marginLeft: '20%' }}>
                <img src={profilephoto} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%', display: 'block', marginLeft: '20%' }} />
                <h2>Emri:{userProfile.id}</h2>
                    <h2>Emri:{userProfile.fullName}</h2>
                    <h2>Email: {userProfile.email}</h2>
                    <h2>{userProfile.password}</h2>
                    <h2>Roli: {userProfile.role}</h2>
                    <h2>Mobile: {userProfile.mobile}</h2>
                </div>
                </div>
            ) : (
                <p>Nuk u gjet asnjë specializim për këtë mjek.</p>
            )}
           <Link to={`/takimet/${userProfile.id}`}  Click={() => onClick()}> Shiko Takimet</Link>
        </div>
    );
};

export default UserProfile;
