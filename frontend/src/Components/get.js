import React, { useEffect, useState } from "react";
import Fix from "./fix";
import Delete from "./delete";

const Get = ({url, allAppointments}) => {

    //get appointment by doctor_id. 
    const [doctors, setDoctors] = useState([]);
    const [doctorAppointments, setDoctorAppointments] = useState([]);

    //fetch all the doctors in database
    useEffect(() => {
        const getDoctors = async () => {
          const response = await fetch(url + 'doctors');
          const data = await response.json();
          //set doctors state to hold all doctors in database
          setDoctors(data);
        }
        getDoctors()
    }, [])

    //on submit, get all appointments filtered by doctor_id
    const handleSubmit = (event) => {
        event.preventDefault()
        //this is the specific doctor we want
        let doctorID = (event.target.value)

        //this will put the specific doctor_id as a params - fetch call made for specific doctor's appointments 
        const getDoctorAppointments = async (doctorID) => {
            const response = await fetch(`${url}appointments/?doctor=${doctorID}`);
            const data = await response.json();
            setDoctorAppointments(data)
        } 
        getDoctorAppointments(doctorID);
    }

    return (
        <div>
            <form>
                {/* List of doctors in database */}
                <label for="doctors">Choose Doctor:</label>
                <select id="doctors" name="doctors" onChange={handleSubmit}>
                    <option value='null' selected disabled>Select an Option</option>
                    {doctors.map((ele) => {
                        return(
                            <option key={ele.id} value={ele.id}>{ele.name}</option>
                        )
                    })}
                </select>
            </form>
            {/* Details of the specific doctor's appointments */}
            <div>
                {doctorAppointments.map((ele) => {
                    return (
                        <div>
                            <ul>
                                Patient: <br></br>
                                <li>{ele.patient.name} </li>
                                <li>{ele.patient.sex}</li>
                                <li>{ele.patient.age}</li>
                                <li>Date and Time: {ele.appointment_datetime}</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
            <Fix url={url} doctors={doctors} />
            <Delete url={url} doctors={doctors} allAppointments={allAppointments} doctorAppointments={doctorAppointments} />
            
        </div>
    )
}

export default Get;