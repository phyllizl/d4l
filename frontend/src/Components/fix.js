import React, {useEffect, useState} from "react";

const Fix = ({url, doctors}) => {

    const [patients, setPatients] = useState([])

    useEffect(() => {
        const getPatients = async () => {
            const response = await fetch(url + 'patients');
            const data = await response.json();
            setPatients(data);
          }
          getPatients()
    }, [])

    const handleNewPatient = (event) => {
        event.preventDefault();
        let pname = event.target.elements.pname.value;
        let psex = event.target.elements.psex.value;
        let page = event.target.elements.page.value;
        
        const newPatient = {
            name: pname,
            sex: psex,
            age: parseInt(page),
        };
        console.log('newpatient', newPatient)

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

    const handleSubmit = (event) => {
        
        let dname = event.target.elements.dname.value;
        console.log( dname);

        
    }

    return (
        <div>
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