import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Map from "./component/map";
import { getAllRegiones, getAllComId, getCoordRgns, getID_nwPost, getCtgs, getSbctgs, getDfct, nwPost } from "../context/auth.backend";
import NavbarUser from "./component/navbar.Users";
import DropFileInput from "./component/input.images";
import ScriptForm from "./assets/js/script.form"
import "./css/newPost.css"
import Slidenavuser from "./component/slidenavuser";

export default function NewPost() {

  const navigate = useNavigate();
  const auth = useAuth();
  
  const [status, setStatus] = useState();

  const [files, setFiles] = useState([]);

  const [fileUrls, setFileUrls] = useState([]);
  const [id_post, setIDpost] = useState()

  const [clickedPosition, setClickedPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState([-35.426944, -71.665556]); // Coordenadas de Santiago, Chile

  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);
  const [options4, setOptions4] = useState([]);
  const [options5, setOptions5] = useState([]);

  const id = auth.id;
  const [id_ct, setId_ct] = useState();
  const [id_sb_ct, setId_Sb_Ct] = useState();
  const [titulo, setTitulo] = useState();
  const [descp1, setDesc1] = useState();
  const [descp2, setDesc2] = useState();
  const [descp3, setDesc3] = useState();
  const [descp4, setDesc4] = useState();
  const [descp5, setDesc5] = useState();
  const [id_dfct, setId_dfct] = useState();
  const [id_region, setID_region] = useState();
  const [id_comuna, setID_comuna] = useState();
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [img4, setImg4] = useState();
  const [img5, setImg5] = useState();
  const [coordx, setCoordx] = useState();
  const [coordy, setCoordy] = useState();

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
    if(!fileUrls) return;
    console.log("file", fileUrls)

    const [ url1, url2, url3, url4, url5 ] = fileUrls;
    setImg1(url1);
    setImg2(url2);
    setImg3(url3);
    setImg4(url4);
    setImg5(url5);
    

  }, [fileUrls])


  const handleFileChange = async (event) => {
    const filesUp = event.target.files;
    const fileList = [];

    for (let i = 0; i < filesUp.length; i++) {
      fileList.push(filesUp[i]);
    }
    setFiles(fileList); 
    const result = await auth.setPostImages(files, id_post);
    setFileUrls(result)
    
    
  };

  const handleClickCoord = (valor) => {
    setClickedPosition(valor);
    const { lat, lng } = valor;
    setCoordx(lat);
    setCoordy(lng);
    console.log("new_post_coord:", valor)
    console.log(`Coordenadas seleccionadas: Latitud ${lat}, Longitud ${lng}`);
  }

  const onFileChange = (files) => {
    console.log(files);
  }
  

  const handleNewPost = async (event) => {
    event.preventDefault();
    
    console.log(id, id_ct, id_sb_ct, titulo, descp1, descp2, descp3, descp4, 
      descp5, id_dfct, id_region, id_comuna, img1, img2, img3, img4, 
      img5, coordx, coordy)
    await nwPost(
      id, id_ct, id_sb_ct, titulo, descp1, descp2, descp3, descp4, 
      descp5, id_dfct, id_region, id_comuna, img1, img2, img3, img4, 
      img5, coordx, coordy)
      .then((data) => {
        if( data.success === true ) {
          alert("Post Registrado Correctamente");
          navigate("/home");
        } else {
          console.log(data)
          alert("Faltan campos por seleccionar y rellenar, vuelve a ingresarlos e intentalo de nuevo")
          // const arrayEr = 
          // data.map((item) => {
          //   // console.log(item.msg)
          //   alert(`${item.msg} in ${item.path}`)
          // })
          // alert(arrayEr)
          navigate("/user/newPost")
        }
      }).catch((error) => {
        console.error('Error al obtener los datos del post:', error.data);
      });

  }


  return (
    <div>
      <div className="public">
      <div className="public_nav">
        <Slidenavuser />
      </div>
      <section className="hero">
        <div className="container-nw">
          <form className="form" onSubmit={handleNewPost}>
            <header>NewPost</header>
            <div className="hero-content">
              <div className="left">
                <Map mapCnter={mapCenter} ClickCoord={handleClickCoord} />
                <div className="field email-field">
                  <span className="error email-error">
                    <i className="bx bx-error-circle error-icon"></i>
                    <p className="error-text">Please enter a valid email</p>
                  </span>
                </div>
                <div className="field email-field">
                  <div >
                    <DropFileInput onFileChange={(files) => onFileChange(files)} />
                  </div>
                  <span className="error email-error">
                    <i className="bx bx-error-circle error-icon"></i>
                    <p className="error-text">Please enter a valid email</p>
                  </span>
                </div>
              </div>

              <div className="right">
                <div className="field email-field">
                  <div className="input-field">
                    <select value={id_region} onChange={(e) => setID_region(e.target.value)}>
                      <option value="">Selecciona una Región</option>
                      {options4}
                    </select>
                  </div>
                  <span className="error email-error">
                    <i className="bx bx-error-circle error-icon"></i>
                    <p className="error-text">Please enter a valid email</p>
                  </span>
                </div>
                <div className="field email-field">
                  <div className="input-field">
                    <select value={id_comuna} onChange={(e) => setID_comuna(e.target.value)}>
                      <option value="">Selecciona una Comuna</option>
                      {options5}
                    </select>
                  </div>
                  <span className="error email-error">
                    <i className="bx bx-error-circle error-icon"></i>
                    <p className="error-text">Please enter a valid email</p>
                  </span>
                </div>
                <div className="field email-field">
                  <div className="input-field">
                    <select value={id_ct} onChange={(e) => setId_ct(e.target.value)}>
                      <option value="">Selecciona una Categoria</option>
                      {options1}
                    </select>
                  </div>
                  <span className="error email-error">
                    <i className="bx bx-error-circle error-icon"></i>
                    <p className="error-text">Please enter a valid email</p>
                  </span>
                </div>
                <div className="field email-field">
                  <div className="input-field">
                    <select value={id_sb_ct} onChange={(e) => setId_Sb_Ct(e.target.value)}>
                      <option value="">Selecciona una SubCategoria</option>
                      {options2}
                    </select>
                  </div>
                  <span className="error email-error">
                    <i className="bx bx-error-circle error-icon"></i>
                    <p className="error-text">Please enter a valid email</p>
                  </span>
                </div>
                <div className="field email-field">
                  <div className="input-field">
                    <select value={id_dfct} onChange={(e) => setId_dfct(e.target.value)}>
                      <option value="">Selecciona una Dificultad</option>
                      {options3}
                    </select>
                  </div>
                  <span className="error email-error">
                    <i className="bx bx-error-circle error-icon"></i>
                    <p className="error-text">Please enter a valid email</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="content-input">
              <div className="field email-field">
                <div className="input-field">
                  <input type="text" name='titulo' placeholder='Titulo' onChange={(e) => setTitulo(e.target.value)} className="email"/>
                </div>
                <span className="error email-error">
                  <i className="bx bx-error-circle error-icon"></i>
                  <p className="error-text">Please enter a valid email</p>
                </span>
              </div>
              <div className="field email-field">
                <div className="input-field">
                  <input type="textarea" name='descp1' placeholder='Descripción 1' onChange={(e) => setDesc1(e.target.value)} className=""/>
                </div>
                <span className="error email-error">
                  <i className="bx bx-error-circle error-icon"></i>
                  <p className="error-text">Please enter a valid email</p>
                </span>
              </div>
              <div className="field email-field">
                <div className="input-field">
                  <input type="textarea" name='descp2' placeholder='Descripción 2' onChange={(e) => setDesc2(e.target.value)} className=""/>
                </div>
                <span className="error email-error">
                  <i className="bx bx-error-circle error-icon"></i>
                  <p className="error-text">Please enter a valid email</p>
                </span>
              </div>
              <div className="field email-field">
                <div className="input-field">
                  <input type="textarea" name='descp3' placeholder='Descripción 3' onChange={(e) => setDesc3(e.target.value)} className=""/>
                </div>
                <span className="error email-error">
                  <i className="bx bx-error-circle error-icon"></i>
                  <p className="error-text">Please enter a valid email</p>
                </span>
              </div>
              <div className="field email-field">
                <div className="input-field">
                  <input type="textarea" name='descp4' placeholder='Descripción 4' onChange={(e) => setDesc4(e.target.value)} className=""/>
                </div>
                <span className="error email-error">
                  <i className="bx bx-error-circle error-icon"></i>
                  <p className="error-text">Please enter a valid email</p>
                </span>
              </div>
              <div className="field email-field">
                <div className="input-field">
                  <input type="textarea" name='descp5' placeholder='Descripción 5' onChange={(e) => setDesc5(e.target.value)} className=""/>
                </div>
                <span className="error email-error">
                  <i className="bx bx-error-circle error-icon"></i>
                  <p className="error-text">Please enter a valid email</p>
                </span>
              </div>
              
              
            </div>
            <div className="input-field button">
              <input onClick={(e) => handleNewPost(e)} type="submit" value="Submit Now" />
            </div>
          </form>
        </div>
      </section>
      <script  src={ScriptForm}></script>
    </div>
    </div>
  )
}
