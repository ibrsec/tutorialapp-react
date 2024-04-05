import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditModal = ({ editItem, getTutors }) => {


  const [title, setTitle] = useState( "");
  const [description, setDescription] = useState("");

    useEffect(() => {
        setTitle(editItem?.title)
        setDescription(editItem?.description)
    }, [editItem])




  const editTutor = async (id,newTutor) => {
    const URL = `${process.env.REACT_APP_BASE_URL}${id}/`;
    console.log(URL);
    try {
      const response = await axios.put(URL, newTutor);
      if (response.status !== 200) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Tutor couldn't be edited!!",
          showConfirmButton: false,
          timer: 1200,
        });
        throw new Error("Not 201@ Error", response.status);
      }
      console.log(response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tutor is edited successfully!!",
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Tutor couldn't be edited!!",
        showConfirmButton: false,
        timer: 1200,
      });
      console.log(error);
    }
    //update all tutors on the screen
    getTutors();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //get tutor infos from form as object
    const newTutor = { title , description  };
    console.log(newTutor);

    //post request with form info
if(newTutor.title != editItem?.title || 
    newTutor.description != editItem?.description){
        editTutor(editItem?.id,newTutor);
        
    //remove form inputs' content
    setTitle("");
    setDescription("");

    }else{
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "There is no change, can't edit!!",
            showConfirmButton: false,
            timer: 1200,
          });
 
    } 





   

    //call getTutor - it is happened in end of the put request
  };

  return (
    <div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Tutorial
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="py-4 " onSubmit={handleSubmit}>
                <div className="mb-3 text-start ">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control   "
                    id="exampleInputEmail1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control    "
                    id="exampleInputPassword1"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-success " 
                    data-bs-dismiss="modal">
                    Submit
                  </button>
                </div>
              </form>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
