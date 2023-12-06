import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Map from "./component/component-new-post/map";
import { nwPost } from "../context/auth.backend";
// import NavbarUser from "./component/navbar.Users";
import LoaderPost from "./component/component-new-post/loader.post";
import InputsPosts from "./component/component-new-post/inputs";
import SelectInputs from "./component/component-new-post/select";
import DropFileInput from "./component/component-new-post/input.images";
import ScriptForm from "./assets/js/script.form"
import "./css/newPost.css"
import Slidenavuser from "./component/slidenavuser";

export default function NewPost() {
  const openLoeader = () => {
        setLoeaderPost(true)
    }

    const closeLoader = () => {
        setLoeaderPost(false)
    }

  const navigate = useNavigate();
  const auth = useAuth();
  
  // const [status, setStatus] = useState();

  const [ loeaderPost, setLoeaderPost ] = useState(false)
  const [files, setFiles] = useState([]);

  const [fileUrls, setFileUrls] = useState([]);

  const [mapCenter, setMapCenter] = useState([-35.426944, -71.665556]); // Coordenadas de Santiago, Chile

  const [id_post, setIDpost] = useState()
  
  const [errorid_ct, setErrorId_ct] = useState();
  const [errorid_sb_ct, setErrorId_Sb_Ct] = useState();
  const [errortitulo, setErrorTitulo] = useState();
  const [errordescp1, setErrorDesc1] = useState();
  const [errorid_dfct, setErrorId_dfct] = useState();
  const [errorid_region, setErrorID_region] = useState();
  const [errorid_comuna, setErrorID_comuna] = useState();
  const [errorimg1, setErrorImg1] = useState();
  const [errorCoord, setErrorCoord] = useState();

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


  const handleInputChange = (valores) => {
    setTitulo(valores.titulo);
    setDesc1(valores.descp1);
    setDesc2(valores.descp2);
    setDesc3(valores.descp3);
    setDesc4(valores.descp4);
    setDesc5(valores.descp5);
    // console.log(titulo,descp1,descp2,descp3,descp4,descp5)
  }

  const handleMapCenterChange = (valor) => {
    setMapCenter(valor)
  }

  const handleSelectChange = (valores) => {
    // console.log(valores)
    setIDpost( valores.id_post);
    setId_ct(valores.id_ct);
    setId_Sb_Ct(valores.id_sb_ct);
    setId_dfct(valores.id_dfct);
    setID_region(valores.id_region);
    setID_comuna(valores.id_comuna);
    // console.log(id_post, id_ct, id_sb_ct, id_dfct, id_region, id_comuna)
  }

  const handleClickCoord = (valor) => {
    const { lat, lng } = valor;
    setCoordx(lat);
    setCoordy(lng);
    console.log("new_post_coord:", valor)
  }

  const onFileChange = async (files) => {
    console.log(files);
    setFiles(files); 
  }
  

  const handleNewPost = async (event) => {
    event.preventDefault();
    
    openLoeader()
    if(files.length < 1) {
      setErrorImg1(true);
      closeLoader()
    }
    if(!id_ct){
      setErrorId_ct(true);
      closeLoader()
    }
    if(!id_sb_ct){
      setErrorId_Sb_Ct(true);
      closeLoader()
    }
    if(!titulo){
      setErrorTitulo(true);
      closeLoader()
    }
    if(!descp1){
      setErrorDesc1(true);
      closeLoader()
    }
    if(!id_dfct){
      setErrorId_dfct(true);
      closeLoader()
    }
    if(!id_region){
      setErrorID_region(true);
      closeLoader()
    }
    if(!id_comuna){
      setErrorID_comuna(true);
      closeLoader()
    }
    if(!coordx && !coordy){
      setErrorCoord(true);
      closeLoader()
    }else {
      const result = await auth.setPostImages(files, id_post);
      setFileUrls(result)
      console.log("newPost: ",fileUrls)
      const [ url1, url2, url3, url4, url5 ] = fileUrls;
      setImg1(url1);
      setImg2(url2);
      setImg3(url3);
      setImg4(url4);
      setImg5(url5);

      console.log(id, id_ct, id_sb_ct, titulo, descp1, descp2, descp3, descp4, 
          descp5, id_dfct, id_region, id_comuna, img1, img2, img3, img4, 
          img5, coordx, coordy)

      await nwPost(
        id, id_ct, id_sb_ct, titulo, descp1, descp2, descp3, descp4, 
        descp5, id_dfct, id_region, id_comuna, img1, img2, img3, img4, 
        img5, coordx, coordy)
        .then((data) => {
          if( data.success === true ) {
            closeLoader()
            alert("Post Registrado Correctamente");
            navigate("/home");
          } else {
            auth.elimanarCarpetaID(id_post);
            closeLoader()
            console.log(data)
            alert("Faltan campos por seleccionar y rellenar, vuelve a ingresarlos e intentalo de nuevo")
            
          }
        }).catch((error) => {
          auth.elimanarCarpetaID(id_post);
          console.error('Error al obtener los datos del post:', error);
      });

      
    }
  }
  

  return (
    <div>
      <div className="public">
        <div className="public_nav">
          <Slidenavuser />
        </div>
        <section className="hero">
          
          { loeaderPost === true ? <LoaderPost  />
          :<div className="container-nw">
            <form className="form" onSubmit={handleNewPost}>
              <header>Crear Nueva Publicación</header>
                <div className="content-input">
                  <InputsPosts 
                    errorTitulo={errortitulo}
                    errorDescp1={errordescp1}
                    onInputChange={handleInputChange} />
                </div>
              <div className="hero-content">
                <div className="hero-select-map">
                  <div className="left">
                    <SelectInputs  
                        errorIdregion={errorid_region}
                        errorIdcomuna={errorid_comuna}
                        errorIdcategoria={errorid_ct}
                        errorIdsubCategoria={errorid_sb_ct}
                        errorIddificultad={errorid_dfct}
                        onMapCenterChange={handleMapCenterChange} 
                        onSelectChange={handleSelectChange}/>
                  </div>
                  <div className="right">
                    <div className="map-input">
                      <Map 
                          mapCnter={mapCenter} 
                          ClickCoord={handleClickCoord} />
                    </div>
                    <div className="field email-field">
                      {errorCoord &&
                        <span className="error email-error">
                          <i className="bx bx-error-circle error-icon"></i>
                          <p className="error-text">Debes Seleccionar un punto en el mapa</p>
                        </span>
                      }
                    </div>
                  </div>
                </div>
                <div className="hero-input">
                  <div className="field email-field">
                    <div  >
                      <DropFileInput 
                          onFileChange={(files) => onFileChange(files)} />
                    </div>
                    {errorimg1 &&
                      <span className="error email-error">
                        <i className="bx bx-error-circle error-icon"></i>
                        <p className="error-text">Debes Ingresar una imagen como minimo</p>
                      </span>
                    }
                  </div>
                </div>
              </div>
              <div className="input-field button">
                <input onClick={(e) => handleNewPost(e)} type="submit" value="Submit Now" />
              </div>
            </form>
          </div>
          }
        </section>
        <script  src={ScriptForm}></script>
      </div>
    </div>
  )
}
