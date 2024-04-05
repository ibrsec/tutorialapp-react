import React, { useEffect, useState } from "react";
import TutorList from "../components/TutorList";
import AddTutor from "../components/AddTutor";
import axios from "axios";

const Home = () => {
    const [tutorials,setTutorials] = useState([]);
    const getTutors = async() => {
        const URL = process.env.REACT_APP_BASE_URL; 

        try{
            const response = await axios.get(URL);
            if(response.status != 200){
                throw new Error("NOT 200@ Error",response.status);
            }
            console.log(response.data);
            setTutorials(response.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=> {
        getTutors();

    },[])




  return (
    <div className="bg-dark" style={{minHeight:"100vh"}}>
      <AddTutor getTutors={getTutors}/>
      <TutorList tutorials={tutorials} getTutors={getTutors}/>
    </div>
  );
};

export default Home;
