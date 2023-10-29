import React, { useEffect, useState, useRef } from 'react';
import './css/inputImages.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import ScriptImages from '../assets/js/script.images'
import LoaderImages from './loader.images';
import { useAuth } from '../../context/authContext';
import { getID_nwPost } from '../../context/auth.backend';


function Map() {
  const auth = useAuth();

  const [fileUrls, setFileUrls] = useState([]);
  const [loader, setLoader] = useState(false);
  const [id_post, setIDpost] = useState()

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [files, setFiles] = useState(null)
  const [fileName1, setFileName1] = useState("No selected file")
  const [fileName2, setFileName2] = useState("No selected file")
  const [fileName3, setFileName3] = useState("No selected file")
  const [fileName4, setFileName4] = useState("No selected file")
  const [fileName5, setFileName5] = useState("No selected file")
  
  useEffect(() => {
    if(!fileName1 && !fileName2 && !fileName3 && !fileName4 && !fileName5){
      setFiles(null);
    }
  }, [files])

  useEffect(() => {
    getID_nwPost().then((data) => {
        const id = data.response;
        setIDpost(id);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del id post:', error);
      });
  }, [])

  return (
      <div className='cont'>
        <div className='upload-images' onClick={() => document.querySelector(".input-field-img").click()}>
          <input id="input-field-img" type='file' accept='image/*' className='input-field-img' hidden multiple
            onChange={ async ({target: {files}}) => {
              files[0] && setFileName1(files[0].name)
              files[1] && setFileName2(files[1].name)
              files[2] && setFileName3(files[2].name)
              files[3] && setFileName4(files[3].name)
              files[4] && setFileName5(files[4].name)
              
              setFiles(files)
              const result = await auth.setPostImages(files, id_post)
              if(result){
                setFileUrls(result)
                const [ url1, url2, url3, url4, url5 ] = result; 
                
                setImage1(url1)
                setImage2(url2)
                setImage3(url3)
                setImage4(url4)
                setImage5(url5)
                
                setLoader(true)
              }
          }}/>
          {files ? 
            <div className='input-images'>
              {loader ? 
              <>
                {image1 ?
                    <div className='images'>
                      <img src={image1} alt={fileName1} />
                    </div>: <></>}
                {image2 ?
                    <div className='images'>
                      <img src={image2} alt={fileName2} />
                    </div>: <></>}
                {image3 ?    
                    <div className='images'>
                      <img src={image3} alt={fileName3} />
                    </div>: <></>}
                {image4 ?
                    <div className='images'>
                      <img src={image4} alt={fileName4} />
                    </div>: <></>}
                {image5 ?
                    <div className='images'>
                      <img src={image5} alt={fileName5} />
                    </div>: <></>}
              </>
              : <><LoaderImages/></>
              }
              
            </div>
          : <>
              <MdCloudUpload color='#1475cf' size={60} />
              <p>Browse Files to Upload</p>
            </>
          }
        </div>
        <section className='uploader-row'>
          <AiFillFileImage color='#1475cf' />
          <span className='upload-content'>
            {fileName1} -
            <MdDelete onClick={() => {
              setFileName1("No selected File")
              setImage1(null)
            }}/>
          </span>
        </section>
        <section className='uploader-row'>
          <AiFillFileImage color='#1475cf' />
          <span className='upload-content'>
            {fileName2} -
            <MdDelete onClick={() => {
              setFileName2("No selected File")
              setImage2(null)
            }}/>
          </span>
        </section>
        <section className='uploader-row'>
          <AiFillFileImage color='#1475cf' />
          <span className='upload-content'>
            {fileName3} -
            <MdDelete onClick={() => {
              setFileName3("No selected File")
              setImage3(null)
            }}/>
          </span>
        </section>
        <section className='uploader-row'>
          <AiFillFileImage color='#1475cf' />
          <span className='upload-content'>
            {fileName4} -
            <MdDelete onClick={() => {
              setFileName4("No selected File")
              setImage4(null)
            }}/>
          </span>
        </section>
        <section className='uploader-row'>
          <AiFillFileImage color='#1475cf' />
          <span className='upload-content'>
            {fileName5} -
            <MdDelete onClick={() => {
              setFileName5("No selected File")
              setImage5(null)
            }}/>
          </span>
        </section>
        <script src={ScriptImages}/>
      </div>
  );
};

export default Map;



