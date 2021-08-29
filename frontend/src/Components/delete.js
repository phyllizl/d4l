import React, {useState, useEffect} from "react"

const Delete = ({url, allAppointments, doctors}) => {

    const [docDelete, setDocDelete] = useState([]);
    const [patients, setPatients] = useState([]);
    const [patientDelete, setPatientDelete] = useState([]);

    //get list of patients
    useEffect(() => {
        const getPatients = async () => {
            const response = await fetch(url + 'patients');
            const data = await response.json();
            setPatients(data);
          }
          getPatients()
    }, [])

    //get request for all appointments of a specific patient
    const handleSubmit4 = (event) => {
        event.preventDefault()
        let patientID = (event.target.value)
        console.log(patientID);

        //get all the appointments of a particular patient
        const getPatientAppointments = async (patientID) => {
            const response = await fetch(`${url}appointments/?patient=${patientID}`);
            const data = await response.json();
            setPatientDelete(data)
            console.log(patientDelete)
        } 
        getPatientAppointments(patientID);
    }

    const handleSubmit3 = (event) => {
        event.preventDefault()
        let doctorID = (event.target.value)

        const getDoctorAppointments = async (doctorID) => {
            const response = await fetch(`${url}appointments/?doctor=${doctorID}`);
            const data = await response.json();
            setDocDelete(data)
            console.log(docDelete)
        } 
        getDoctorAppointments(doctorID);
    }

    const handleClick = (event) => {
        event.preventDefault();
        let appointmentID = event.target.value;

        const deleteAppointment = async (appointmentID) => {
            const response = await fetch(url + 'appointments/' + appointmentID + "/", {
              method: "delete",
            });
        }
        deleteAppointment(appointmentID);
        
    }

    return (
        <div>
            <h1>Delete An Appointment</h1>

            <h3>by patient</h3>
            <form onChange={handleSubmit4}>
                <select id="pname" name="pname">
                        <option value='null' selected disabled>Select an Option</option>
                        {patients.map((ele) => {
                            return(
                                <option key={ele.id} value={ele.id}>{ele.name}</option>
                            )
                        })}
                </select><br></br>
            </form>
            <div>
                {patientDelete.map((ele) => {
                    return (
                        <ul>
                            <li key={ele.id}>{ele.appointment_datetime}</li>
                            <button value={ele.id} onClick={handleClick}>delete</button>
                        </ul>
                    )
                })}
            </div>

            <h3>by doctor</h3>
            <form>
                <select id="doctors" name="doctors" onChange={handleSubmit3}>
                    <option value='null' selected disabled>Select an Option</option>
                    {doctors.map((ele) => {
                        return(
                            <option key={ele.id} value={ele.id}>{ele.name}</option>
                        )
                    })}
                </select>
            </form>
            <div>
                {docDelete.map((ele) => {
                    return (
                        <ul>
                            <li key={ele.id}>{ele.appointment_datetime}</li>
                            <button value={ele.id} onClick={handleClick}>delete</button>
                        </ul>
                    )
                })}
            </div>
        </div>
    )
}

export default Delete;