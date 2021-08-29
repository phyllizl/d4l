import React, {useEffect, useState} from "react";

const Fix = ({url, doctors}) => {

    const [patients, setPatients] = useState([])

    //get all patients in database
    useEffect(() => {
        const getPatients = async () => {
            const response = await fetch(url + 'patients');
            const data = await response.json();
            setPatients(data);
          }
          getPatients()
    }, [])

    //create a new patient.
    const handleNewPatient = (event) => {
        event.preventDefault();
        let pname = event.target.elements.pname.value;
        let psex = event.target.elements.psex.value;
        let page = event.target.elements.page.value;
        
        //create a patient object to follow patient model in models.py
        const newPatient = {
            name: pname,
            sex: psex,
            age: parseInt(page),
        };

        //make post request to server to create new patient
        const postNewPatient = async (newPatient) => {
            const response = await fetch(`${url}patients/`, {
                method: "POST",
                body: JSON.stringify(newPatient),
                headers: {"Content-Type": "application/json"},
            });
            return response;
        };
        postNewPatient(newPatient);
    }

    //handle submit to fix appointment. We need to follow the Appointments model. We need (1) doctor_id, (2) patient object, (3) appointment_datetime
    const handleSubmit = (event) => {
        event.preventDefault();
        let patientID = event.target.elements.pname.value
        
        //We need to get the specific patient's data to add to the request. So we create a search function that will comb through our patients state (contains all patients in database), and return the specific patient (object) => this will contain all the information we need to make the post request. 
        const searchPatient = (id, arr, first, last) => {
            if (first > last) {
                return ('not found');
            }
            let middleIndex = Math.floor((first + last) / 2)
            if (id = arr[middleIndex].id) {
                return arr[middleIndex]
            }
            else if (id < arr[middleIndex].id) {
                return searchPatient(id, arr, first, middleIndex - 1)
            }
            else if (id > arr[middleIndex].id) {
                return searchPatient(id, arr, middleIndex + 1, last)
            }
        }

        let patient = searchPatient(patientID, patients, 0, patients.length - 1);
        let doctor = event.target.elements.dname.value;
        let time = (event.target.elements.time.value).slice(0, -3)
        let datetime = `${event.target.elements.date.value} ${time}` ;
        
        //create the body to post. This must match the database format.
        let appointmentInfo = {
            doctor: doctor,
            patient: patient,
            appointment_datetime: datetime,
        }

        //make post request to create new appointment
        const postNewAppointment = async (appointmentInfo) => {
            const response = await fetch(`${url}appointments/`, {
                method: "POST",
                body: JSON.stringify(appointmentInfo),
                headers: {"Content-Type": "application/json"},
            });
            return response;
        };
        postNewAppointment(appointmentInfo);
    }

    return (
        <div>
        {/* If a patient is new, we register him/her first */}
        <h1>New Patient? Register Here: </h1>
        <form onSubmit={handleNewPatient}>
            <label for="pname">Patient's name:</label><br></br>
            <input type="text" id="pname" name="pname"></input><br></br>
            <label for="page">Patient's age:</label><br></br>
            <input type="text" id="page" name="page"></input><br></br>
            <label for="psex">Patient's sex:</label><br></br>
            <select id="psex" name="psex">
                    <option value='null' selected disabled>Select an Option</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
            </select><br></br>
            <input type="submit"/>
        </form>

        {/* Create a form to fix an appointment. */}
        <h1>Fix An Appointment</h1>
        <form onSubmit={handleSubmit}>
            <label for="pname">Patient's name:</label><br></br>
            <select id="pname" name="pname">
                    <option value='null' selected disabled>Select an Option</option>
                    {patients.map((ele) => {
                        return(
                            <option key={ele.id} value={ele.id}>{ele.name}</option>
                        )
                    })}
            </select><br></br>
            
            <label for="dname">Doctor's name:</label><br></br>
            <select id="dname" name="dname">
                    <option value='null' selected disabled>Select an Option</option>
                    {doctors.map((ele) => {
                        return(
                            <option key={ele.id} value={ele.id}>{ele.name}</option>
                        )
                    })}
            </select><br></br>
            
            <label for="date">Date:</label><br></br>
            <input type="text" id="date" name="date" placeholder="YYYY-MM-DD"></input><br></br>
            
            {/* time option will be limited to opening hours. The backend will prevent duplicates */}
            <label for="time">Time:</label><br></br>
            <select id="time" name="time">
                    <option value='null' selected disabled>Select a 1-hr slot</option>
                    <option value="08:00:00+08:00">8am</option>
                    <option value="09:00:00+08:00">9am</option>
                    <option value="10:00:00+08:00">10am</option>
                    <option value="11:00:00+08:00">11am</option>
                    <option value="12:00:00+08:00">12pm</option>
                    <option value="13:00:00+08:00">1pm</option>
                    <option value="14:00:00+08:00">2pm</option>
                    <option value="15:00:00+08:00">3pm</option>
            </select><br></br>

            <input type="submit"/>
        </form>

        </div>
    )
}

export default Fix;