import axios from "axios";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import EditModal from "./EditModal";

const TutorList = ({ tutorials, getTutors }) => {
  //? delete api function
  const deleteTutor = async (id) => {
    const URL = `${process.env.REACT_APP_BASE_URL}${id}/`;
    try {
      const response = await axios.delete(URL);
      if (response.status != 204) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Tutor couldn't be deleted!!",
          showConfirmButton: false,
          timer: 1200,
        });
        throw new Error("Not 204@ Error", response.status);
      }
      console.log(response);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Tutor couldn't be deleted!!",
        showConfirmButton: false,
        timer: 1200,
      });
      console.log(error);
    }

    //update tutors
    getTutors();
  };

  //? call api in handleDelete
  const handleDelete = (id) => {
    //invoke delete api
    deleteTutor(id);

    //give success message
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Tutor is deleted successfully!!",
      showConfirmButton: false,
      timer: 1200,
    });

    //update tutor is invoked in end of the delete api function
  };

  //TODO - edit
  //open a model for edit input forms -ok
  //create a state for editItem -ok
  const [editItem,setEditItem] = useState(); 
  //make input arangements for edit -ok
  //make put request when user confirms the edit -ok

  return (
    <section className="py-4 bg-dark px-2">
      <table className="table table-success  table-hover  container rounded-3 ">
        <thead className="table-info">
          <tr className="text-start">
            <th scope="col">#id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">#Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {tutorials?.map((item) => {
            const { id, title, description } = item;
            return (
              <tr key={id} className="text-start">
                <th scope="row">{id}</th>
                <td>{title}</td>
                <td>{description}</td>
                <td className="">
                  <FaRegEdit
                    className="me-2 text-info "
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={()=>setEditItem(item)}
                  />
                  <RiDeleteBin7Fill
                    className="text-danger"
                    type="button"
                    onClick={() => handleDelete(id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <EditModal editItem={editItem} getTutors={getTutors}/>
    </section>
  );
};

export default TutorList;
