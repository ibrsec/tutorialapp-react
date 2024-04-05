import axios from "axios";
import React, { useState } from "react";
import Swal from 'sweetalert2';

const AddTutor = ({getTutors}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const postTutor = async (newTutor) => {
    const URL = process.env.REACT_APP_BASE_URL;
    console.log(URL);
    try {
      const response = await axios.post(URL, newTutor);
      if (response.status !== 201) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Tutor couldn't be added!!",
          showConfirmButton: false,
          timer: 1200
        });
        throw new Error("Not 201@ Error", response.status);
      }
      console.log(response);
      //warn user for success message
    
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Tutor is added successfully!!",
      showConfirmButton: false,
      timer: 1200
    });

    } catch (error) {

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Tutor couldn't be added!!",
        showConfirmButton: false,
        timer: 1200
      });
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //get tutor infos from form as object
    const newTutor = {title,description};
    console.log(newTutor);

    //post request with form info
    postTutor(newTutor);

    //remove form inputs' content
    setTitle("");
    setDescription("");

    


    //call getTutor
    getTutors();

  };

  return (
    <section className="bg-dark">
      <form className="container py-4 text-success" onSubmit={handleSubmit}>
        <h1>Add Your Tutorial</h1>
        <div className="mb-3  ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control bg-success border-0"
            id="exampleInputEmail1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control  bg-success border-0"
            id="exampleInputPassword1"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your description"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddTutor;
