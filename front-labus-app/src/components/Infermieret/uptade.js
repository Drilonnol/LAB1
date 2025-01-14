import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { creaetInfermier, getInfermieri } from "../../actions/InfermieretActions";

function UpdateInfermieret() {
  const { qytetiId, spitaliId ,repartiId,infermieretId} = useParams();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errorReducerContent);
  const infermierlist = useSelector(state => state.infermieretReducerContent.infermiert);

  const [spitaliData, setSpitaliData] = useState({
    id: "",
    emri: "",
    mbiemri: "",
    adress: "",
  });

  useEffect(() => {
    dispatch(getInfermieri(qytetiId,spitaliId,repartiId,infermieretId));
  }, [dispatch, qytetiId, spitaliId,repartiId,infermieretId]);

  useEffect(() => {
    if (infermierlist) {
      setSpitaliData({
        id: infermierlist.id,
        emri: infermierlist.emri,
        mbiemri: infermierlist.mbiemri,
        adress: infermierlist.adress,
      });
    }
  }, [infermierlist]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setSpitaliData((prevSpitaliData) => ({
      ...prevSpitaliData,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const updateSpitaliObject = {
      id: spitaliData.id,
      emri: spitaliData.emri,
      mbiemri: spitaliData.mbiemri,
      adress: spitaliData.adress,
    };
    dispatch(creaetInfermier(qytetiId,spitaliId,repartiId,updateSpitaliObject));
  };

  return (
    <div className="row">
      <div className="col-md-10 m-auto">
        <h1 className="text-center">Update Spitali Form</h1>
        <hr />
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className={`form-control form-control-lg mt-4${
              errors.id ? " is-invalid" : ""
            }`}
            placeholder="Spitali ID"
            name="id"
            value={spitaliData.id}
            disabled
          />
          <input
            type="text"
            className={`form-control form-control-lg mt-4${
              errors.emri ? " is-invalid" : ""
            }`}
            placeholder="Spitali Name"
            name="emri"
            value={spitaliData.emri}
            onChange={onChange}
          />
          {errors.emri && <p className="invalid-feedback">{errors.emri}</p>}
          <input
            type="text"
            className={`form-control form-control-lg mt-4${
              errors.mbiemri ? " is-invalid" : ""
            }`}
            placeholder="Spitali Address"
            name="mbiemri"
            value={spitaliData.mbiemri}
            onChange={onChange}
          />
          {errors.mbiemri && (
            <p className="invalid-feedback">{errors.mbiemri}</p>
          )}
          <input
            type="text"
            className={`form-control form-control-lg mt-4${
              errors.adress ? " is-invalid" : ""
            }`}
            placeholder="Spitali Email"
            name="adress"
            value={spitaliData.adress}
            onChange={onChange}
          />
          {errors.adress && <p className="invalid-feedback">{errors.adress}</p>}
          
          <input type="submit" className="btn btn-danger mt-4" value="Update" />
        </form>
      </div>
    </div>
  );
}

export default UpdateInfermieret;