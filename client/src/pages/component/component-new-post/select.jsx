// import SelectInput from "@mui/material/Select/SelectInput";
import React, { useEffect, useState } from "react";
import { 
  getAllRegiones, 
  getAllComId, 
  getCoordRgns, 
  getID_nwPost, 
  getCtgs, 
  getSbctgs, 
  getDfct 
} from "../../../context/auth.backend";

function SelectInputs({errorIdregion, errorIdcomuna, errorIdcategoria, errorIdsubCategoria, errorIddificultad, onMapCenterChange, onSelectChange}){
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);
  const [options4, setOptions4] = useState([]);
  const [options5, setOptions5] = useState([]);

  const [id_post, setIDpost] = useState()
  const [mapCenter, setMapCenter] = useState([-35.426944, -71.665556]); // Coordenadas de Santiago, Chile
  const [id_ct, setId_ct] = useState();
  const [id_sb_ct, setId_Sb_Ct] = useState();
  const [id_dfct, setId_dfct] = useState();
  const [id_region, setID_region] = useState();
  const [id_comuna, setID_comuna] = useState();

  useEffect(() => {
    getAllRegiones()
      .then((data) => {

        const arrayRg = data.response;
        const mappedOptions = arrayRg.map((item) => (
          <option key={item[0]} value={item[0]}>
            {item[1]} {/* Ajusta esto según tus datos */}
          </option>
        ));

        setOptions4(mappedOptions);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del reg select:', error);
      });
    getCtgs()
      .then((data) => {

        const arrayRg = data.response;
        const mappedOptions = arrayRg.map((item) => (
          <option key={item[0]} value={item[0]}>
            {item[1]} {/* Ajusta esto según tus datos */}
          </option>
        ));

        setOptions1(mappedOptions);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del cat select:', error);
      });


    getID_nwPost().then((data) => {
        const id = data.response;
        setIDpost(id);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del id post:', error);
      });
  }, []);

  useEffect(() => {
    if(!id_region) return;

    getAllComId(id_region)
      .then((data) => {
        const arrayCm = data.response;
        const mappedOptions = arrayCm.map((item) => (
          <option key={item[0]} value={item[0]}>
            {item[1]}
          </option>
        ));

        setOptions5(mappedOptions);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del com select:', error);
      });

    getCoordRgns(id_region).then((data) => {
      const ar_coords = data.response;
      const coords = [ar_coords[0], ar_coords[1]];
      console.log(coords)
      setMapCenter(coords);
    }).catch((error) => {
        console.error('Error al obtener los datos de las coordenadas:', error);
      });

  }, [id_region]);

  useEffect(() => {
    if(!id_ct) return;

    getSbctgs(id_ct)
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
        console.error('Error al obtener los datos del sb_ct select:', error);
      });

    getDfct(id_ct)
      .then((data) => {
        const arrayCm = data.response;
        const mappedOptions = arrayCm.map((item) => (
          <option key={item[0]} value={item[0]}>
            {item[1]}
          </option>
        ));

        setOptions3(mappedOptions);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del dificutl select:', error);
      });

  }, [id_ct]);

  useEffect(() => {
    if (mapCenter){
      onMapCenterChange(mapCenter)
    }
  }, [mapCenter]);

  useEffect(() => {
    if ( id_post && id_ct && id_sb_ct && id_dfct && id_region && id_comuna ) {
      onSelectChange( { id_post, id_ct, id_sb_ct, id_dfct, id_region, id_comuna })
    }
  }, [id_post, id_ct, id_sb_ct, id_dfct, id_region, id_comuna]);

  

  return (
    <>
      <div className="field email-field">
        <div className="input-field">
          <select value={id_region} onChange={(e) => setID_region(e.target.value)}>
            <option value="">Selecciona una Región</option>
            {options4}
          </select>
        </div>
        {errorIdregion &&
          <span className="error email-error">
            <i className="bx bx-error-circle error-icon"></i>
            <p className="error-text">El campo de Region no puede estar vacio</p>
          </span>
        }
      </div>
      <div className="field email-field">
        <div className="input-field">
          <select value={id_comuna} onChange={(e) => setID_comuna(e.target.value)}>
            <option value="">Selecciona una Comuna</option>
            {options5}
          </select>
        </div>
        {errorIdcomuna &&
          <span className="error email-error">
            <i className="bx bx-error-circle error-icon"></i>
            <p className="error-text">El campo de Comuna no puede estar vacio</p>
          </span>
        }
      </div>
      <div className="field email-field">
        <div className="input-field">
          <select value={id_ct} onChange={(e) => setId_ct(e.target.value)}>
            <option value="">Selecciona una Categoria</option>
            {options1}
          </select>
        </div>
        {errorIdcategoria &&
          <span className="error email-error">
            <i className="bx bx-error-circle error-icon"></i>
            <p className="error-text">El campo de Categoria no puede estar vacio</p>
          </span>
        }
      </div>
      <div className="field email-field">
        <div className="input-field">
          <select value={id_sb_ct} onChange={(e) => setId_Sb_Ct(e.target.value)}>
            <option value="">Selecciona una SubCategoria</option>
            {options2}
          </select>
        </div>
        {errorIdsubCategoria &&
          <span className="error email-error">
            <i className="bx bx-error-circle error-icon"></i>
            <p className="error-text">El campo de SubCategoria no puede estar vacio</p>
          </span>
        }
      </div>
      <div className="field email-field">
        <div className="input-field">
          <select value={id_dfct} onChange={(e) => setId_dfct(e.target.value)}>
            <option value="">Selecciona una Dificultad</option>
            {options3}
          </select>
        </div>
        {errorIddificultad &&
          <span className="error email-error">
            <i className="bx bx-error-circle error-icon"></i>
            <p className="error-text">El campo de Dificultad no puede estar vacio</p>
          </span>
        }
      </div>
    </>
  )
}

export default SelectInputs;
