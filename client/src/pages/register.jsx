import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, addDays } from 'date-fns';
import "./css/register.css"
import { useAuth } from "../context/authContext";
import { registerUser, getAllRegiones, getAllComId } from "../context/auth.backend";

export function Register() {
  const navigate = useNavigate();

  const auth = useAuth()

  const displyNme = auth.userName;
  const emil = auth.email;
  const accessTkn = auth.accesstkn;
  const u_id = auth.id;

  const [data, setData] = useState(null);

  const [usernme, setUsername] = useState("");
  const [fech_nci, setFechaNaci] = useState("");
  const [age, setAge] = useState(null);
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [regn, setRegion] = useState("");
  const [comna, setComuna] = useState("");


  // const [res, setRes] = useState("");

  useEffect(() => {
    
    getAllRegiones()
      .then((data) => {
        
        const arrayRg = data.response;
        const mappedOptions = arrayRg.map((item) => (
          <option key={item[0]} value={item[0]}>
            {item[1]} 
          </option>
        ));

        setOptions1(mappedOptions);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del primer select:', error);
      });

  }, []);

  useEffect(() => {
    if(!regn) return;

    getAllComId(regn)
      .then((data) => {
        const arrayCm = data.response;
        const mappedOptions = arrayCm.map((item) => (
          <option key={item[0]} value={item[0]}>
            {item[1]}
          </option>
        ));

        setOptions2(mappedOptions);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del segundo select:', error);
      });

  }, [regn]);


  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const correctedDate = addDays(selectedDate, 1);
    const formattedDate = format(correctedDate, 'dd/MM/yyyy');
    setFechaNaci(formattedDate.toString());

    const today = new Date();
    const birthDate = new Date(correctedDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      // id_region = parseInt(region);
      // id_comuna = parseInt(comuna)
      await registerUser(
          u_id, usernme, displyNme, emil, fech_nci, regn, comna, accessTkn
      ).then((data) => {
          if( data.success === true ) {
            alert("Usuario Registrado Correctamente");
            navigate("/home");
          } else {
            alert(data.msg)
            navigate("/register")
          }
        }).catch((error) => {
        console.error('Error al obtener los datos del segundo select:', error);
      });
      
    } catch (error){
      console.error(error)
      setData(error);
    }
  }

  return (
      <div className="section-container-rg">

        <form className="form-rgs" onSubmit={handleRegister}>
          <h3 className="tittle">Register</h3>
          <div className="field email-field">
            <div className="input-field">
              <label>Nombre de Usuario:</label>
              <input name='username' placeholder='Ingresa un nombre de usuario' onChange={(e) => setUsername(e.target.value)} className="..." type="text" required/>
              {/*<label className="input-group_label">ingresa un nombre de usuario</label>*/}
            </div>
          </div>
         <div className="field email-field">
            <div className="input-field">
              <label>Fecha de Nacimiento</label>
              <input name='fecha' placeholder='Fecha de Nacimiento' onChange={handleDateChange} className="input-rg" type="date"/>
            </div>
          </div>
          <div className="field email-field">
            <div className="input-field">
              <label>Región</label>
              <select value={regn} onChange={(e) => setRegion(e.target.value)}>
                <option value="">Selecciona una Región</option>
                {options1}
              </select>
            </div>
          </div>
          <div className="field email-field">
            <div className="input-field">
              <label>Comuna</label>
              <select value={comna} onChange={(e) => setComuna(e.target.value)}>
                <option value="">Selecciona una Comuna</option>
                {options2}
              </select>
            </div>
          </div>
          <div className="field email-field">
            <div className="input-field">
              <button onClick={(e) => handleRegister(e)} className="button-rg">submit</button>
            </div>
          </div>
        </form>
      </div>
    
  )
};

export default Register;
