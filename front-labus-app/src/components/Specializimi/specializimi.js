import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecializimi } from '../../actions/SpecializimiActions';
import { useParams } from 'react-router-dom';
import CreatespecializimiButton from './buttonB';
import Uupdatespecializimi from './buttonA';
const SpecializimiComponent = () => {
    const { mjketId } = useParams();
    const dispatch = useDispatch();
    const specializimi = useSelector(state => state.specializimiReducerContent.specializimis);
    const errors = useSelector(state => state.errorReducerContent);
    

    useEffect(() => {
            dispatch(getSpecializimi(mjketId));
    }, [dispatch, mjketId]);

    return (
        <div>
     
            <CreatespecializimiButton/>
           <Uupdatespecializimi/>
            {errors && <p style={{ color: 'red' }}>{errors.message}</p>}
            <h1>Specializimi i Mjekut</h1>
            {specializimi ? (
                <div>
                    <h2>Specializimi</h2>
                    <p>ID: {specializimi.id}</p>
                    <p>Emri: {specializimi.emri}</p>
                </div>
            ) : (
                <p>Nuk u gjet asnjë specializim për këtë mjek.</p>
            )}
        </div>
    );
};

export default SpecializimiComponent;
