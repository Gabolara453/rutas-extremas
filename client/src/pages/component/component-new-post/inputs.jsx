import React, { useEffect, useState } from "react";

function InputsPosts({onInputChange}){
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
    </>
  )
}

export default InputsPosts;
