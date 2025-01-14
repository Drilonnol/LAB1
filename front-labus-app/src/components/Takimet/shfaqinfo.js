import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '../../actions/TakimetActions';
import { useParams } from 'react-router-dom';

function ShfaqInfoTak() {
    const { repartiId, mjketId, takimiId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTask(repartiId, mjketId, takimiId));
    }, [dispatch, repartiId, mjketId, takimiId]);

    const takim = useSelector((state) => state.takimReducerContent.takim);
    const employee = takim?.employee;
    const spitali = employee?.reparti?.spitali;
    const qyteti = spitali?.qyteti;

    const handleFetchTaskInfo = () => {
        if (repartiId && mjketId && takimiId) {
            dispatch(getTask(repartiId, mjketId, takimiId));
        }
    };

    return (
        <div className="card bg-light mb-3">
            <div className="card-body">
                <div className="employee-info">
                    <h5 className="card-title">Mjeku i Takmit</h5>
                    {employee ? (
                        <div className="employee-details">
                            <h6>Name: {employee.name}</h6>
                            <h6>Address: {employee.address}</h6>
                            <h6>Email: {employee.email}</h6>
                            <h6>Phone Number: {employee.phoneNumber}</h6>
                            {spitali && (
                                <>
                                    <h3>Hospital Information</h3>
                                    <h6>Hospital Name: {spitali.emri}</h6>
                                    <h6>Hospital Address: {spitali.adressa}</h6>
                                    <h6>Hospital Phone Number: {spitali.phoneNumber}</h6>
                                    <h6>Hospital Email: {spitali.email}</h6>
                                </>
                            )}
                            {qyteti && (
                                <>
                                    <h3>City Information</h3>
                                    <h6>City Name: {qyteti.emri}</h6>
                                </>
                            )}
                        </div>
                    ) : (
                        <p>No employee information available.</p>
                    )}
                </div>
                <button onClick={handleFetchTaskInfo} className="btn btn-primary mt-3">Fetch Task Info</button>
            </div>
        </div>
    );
}

export default ShfaqInfoTak;
