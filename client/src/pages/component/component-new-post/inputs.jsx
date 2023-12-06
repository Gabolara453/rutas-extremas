import React, { useEffect, useState } from "react";

function InputsPosts({errorTitulo, errorDescp1,onInputChange}){

  const [titulo, setTitulo] = useState();
  const [descp1, setDesc1] = useState();
  const [descp2, setDesc2] = useState();
  const [descp3, setDesc3] = useState();
  const [descp4, setDesc4] = useState();
  const [descp5, setDesc5] = useState();

  useEffect(() => {
    if( titulo && descp1 && descp2 && descp3 && descp4 && descp5 ) {
      onInputChange( {titulo, descp1, descp2, descp3, descp4, descp5} );
    }
  }, [titulo, descp1, descp2, descp3, descp4, descp5])

  return (
    <>
      <div className="field email-field">
        <div className="input-field">
          <input type="text" name='titulo' placeholder='Titulo' onChange={(e) => setTitulo(e.target.value)} className="email"/>
        </div>
        {errorTitulo && 
          <span className="error">
            <i className="bx bx-error-circle error-icon"></i>
            <p className="error-text">El campo Titulo no puede estar vacio</p>
          </span>
        }
      </div>
      <div className="field">
        <div className="textarea-field">
          <textarea type="textarea" name='descp1' placeholder='Descripción 1' onChange={(e) => setDesc1(e.target.value)} className=""/>
        </div>
        {errorDescp1 &&
          <span className="error">
            <i className="bx bx-error-circle error-icon"></i>
            <p className="error-text">El campo Descripción no puede estar vacio</p>
          </span>
        }
      </div>
      <div className="field">
        <div className="textarea-field">
          <textarea type="textarea" name='descp2' placeholder='Descripción 2' onChange={(e) => setDesc2(e.target.value)} className=""/>
        </div>
      </div>
      <div className="field">
        <div className="textarea-field">
          <textarea type="textarea" name='descp3' placeholder='Descripción 3' onChange={(e) => setDesc3(e.target.value)} className=""/>
        </div>
      </div>
      <div className="field">
        <div className="textarea-field">
          <textarea type="textarea" name='descp4' placeholder='Descripción 4' onChange={(e) => setDesc4(e.target.value)} className=""/>
        </div>
      </div>
      <div className="field">
        <div className="textarea-field">
          <textarea type="textarea" name='descp5' placeholder='Descripción 5' onChange={(e) => setDesc5(e.target.value)} className=""/>
        </div>
      </div>
    </>
  )
}

export default InputsPosts;
