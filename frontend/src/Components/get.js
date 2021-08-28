import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import Fix from "./fix";

const Get = ({url, allAppointments}) => {

    //url=localhost
    //allappointments=8 appointment objects

    //get appointment by doctor id. 
    //(url + 'appointments')
    const history = useHistory();
    const [doctors, setDoctors] = useState([]);
    const [doctorAppointments, setDoctorAppointments] = useState([]);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const getDoctors = async () => {
          const response = await fetch(url + 'doctors');
          const data = await response.json();
          setDoctors(data);
        }
        getDoctors()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        let doctorID = (event.target.value)

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
        </div>
    )
}

export default Get;