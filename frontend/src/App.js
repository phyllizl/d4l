import './App.css';
import React, {useState, useEffect} from "react";
import Get from "./Components/get";

function App() {

  const [allAppointments, setAllAppointments] = useState(null);

  const url = "http://localhost:8000/";

  useEffect(() => {
    const getAppointments = async () => {
      const response = await fetch(url + 'appointments');
      const data = await response.json();
      setAllAppointments(data);
    }
    getAppointments()
  }, [])

  return (
    <div className="App">
      <Get url={url} allAppointments={allAppointments}/>
    </div>
  );
}

export default App;
