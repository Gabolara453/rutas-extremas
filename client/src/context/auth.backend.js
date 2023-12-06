

export async function userExists( id_u ) {
  const response = await fetch('/auth/check-User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usr: id_u}),
        mode: 'cors'
      })
      .then(response => response.json().then(data => data)
      .catch(error => {
        console.error('Error:', error);
      }
    )
  )
  const data = await response;
  if (response.status > 300) { 
    const errors = data.errors;
    return errors;
  } else {
    return data;
  }
}

export async function public_infoUser( id ) {
  const response = await fetch(`/users/get-public-info-user`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: id
      }
    ),
    mode: 'cors'
    
  });
  const data = await response.json();
  if (response.status > 300) { 
    const errors = data.errors;
    return errors;
  } else {
    return data;
  }
}

export async function infoUser( u_id ) {
  const response = await fetch(`/users/get-info-user`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id_user: u_id
      }
    ),
    mode: 'cors'
    
  });
  const data = await response.json();
  if (response.status > 300) { 
    const errors = data.errors;
    return errors;
  } else {
    return data;
  }
}


export async function registerUser( u_id, usernme, displyNme, emil, age, fech_nci, photURL, regn, comna, accessTkn ) {
  const response = await fetch(`/users/register`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id_user: u_id,
        username: usernme,
        displayName: displyNme,
        email: emil,
        edad: age,
        fecha_naci: fech_nci,
        photoURL: photURL,
        region: regn,
        comuna: comna,
        accessToken: accessTkn
      }
    ),
    mode: 'cors'
    
  });
  const data = await response.json();
  if (response.status > 300) { 
    const errors = data.errors;
    return errors;
  } else {
    return data;
  }
}

export async function login_User( u_id, accessTkn ) {
  const response = await fetch('/auth/login', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id_user: u_id, accessToken: accessTkn}),
    mode: 'cors'
  })
  const data = await response.json();
  if (response.status > 300) { 
    const errors = data.errors;
    return errors;
  } else {
    return data;
  }
}

export async function logout_User( u_id ) {
  const response = await fetch('/auth/logout', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id_user: u_id }),
    mode: 'cors'
  });
  const data = await response.json();
  if (response.status > 300) { 
    const errors = data.errors;
    return errors;
  } else {
    return data;
  }
}

export async function get_Post() {
  try {
    const response = await fetch(`/posts/Posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
    });
    const data = await response.json();
    if (response.status > 300) { 
      const errors = data.errors;
      return errors;
    } else {
      return data;
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error; // Puedes manejar el error aquí o pasarlo al componente que llama a esta función
  }
}

export async function get_Posted(_id) {
  try {
    const response = await fetch(`/posts/Posted`, {
        method: 'POST',
        body: JSON.stringify({ id: _id }),
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
    });
    const data = await response.json();
    if (response.status > 300) { 
      const errors = data.errors;
      return errors;
    } else {
      return data;
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error; // Puedes manejar el error aquí o pasarlo al componente que llama a esta función
  }
}

export async function getID_nwPost() {
  try {
    const response = await fetch(`/posts/getID-post`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (response.status > 300) { 
      const errors = data.errors;
      return errors;
    } else {
      return data;
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error; // Puedes manejar el error aquí o pasarlo al componente que llama a esta función
  }
}

export async function nwPost(id, id_ct, id_sb_ct, titulo, descp1, descp2, descp3, descp4, descp5, id_dfct, id_region, id_comuna, img1, img2, img3, img4, img5, coordx, coordy) {
  try {
    const response = await fetch(`/posts/new-Post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_user: id,
          id_ct: id_ct,
          id_sb_ct: id_sb_ct,
          titulo: titulo,
          descp1: descp1,
          descp2: descp2,
          descp3: descp3,
          descp4: descp4,
          descp5: descp5,
          id_dificult: id_dfct,
          id_region: id_region,
          id_comuna: id_comuna, 
          img1: img1, 
          img2: img2, 
          img3: img3, 
          img4: img4, 
          img5: img5, 
          coord_x: coordx, 
          coord_y: coordy
        }),
        mode: 'cors'

    });
    
    const data = await response.json();
    if (response.status > 300) { 
      const errors = data.errors;
      return errors;
    } else {
      return data;
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error; // Puedes manejar el error aquí o pasarlo al componente que llama a esta función
  }
}



export async function getAllRegiones() {
  try {
    const response = await fetch(`/auth/get-Regiones`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (response.status > 300) { 
      const errors = data.errors;
      return errors;
    } else {
      return data;
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error; // Puedes manejar el error aquí o pasarlo al componente que llama a esta función
  }
} 

export async function getAllComId(id_region) {
  try {
    const response = await fetch(`/auth/get-Comunas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_rg: id_region}),
        mode: 'cors'
    });
    const data = await response.json();
    if (response.status > 300) { 
      const errors = data.errors;
      return errors;
    } else {
      return data;
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error; // Puedes manejar el error aquí o pasarlo al componente que llama a esta función
  }
} 

export async function getCoordRgns(id_region) {
  try {
    const response = await fetch(`/auth/get-crd-rg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_rg: id_region}),
        mode: 'cors'
    });
    const data = await response.json();
    if (response.status > 300) { 
      const errors = data.errors;
      return errors;
    } else {
      return data;
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error; // Puedes manejar el error aquí o pasarlo al componente que llama a esta función
  }
}

export async function getCtgs() {
  try {
    const response = await fetch(`/auth/get-ctg`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
    });
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    const data = await response.json();
    if (response.status > 300) { 
      const errors = data.errors;
      return errors;
    } else {
      return data;
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error; // Puedes manejar el error aquí o pasarlo al componente que llama a esta función
  }
}


export async function getSbctgs(id_ctgr) {
  try {
    const response = await fetch(`/auth/get-sbctg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_ct: id_ctgr}),
        mode: 'cors'
    });
    const data = await response.json();
    if (response.status > 300) { 
      const errors = data.errors;
      return errors;
    } else {
      return data;
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error; // Puedes manejar el error aquí o pasarlo al componente que llama a esta función
  }
}


export async function getDfct(id_ctgr) {
  try {
    const response = await fetch(`/auth/get-dfct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_ct: id_ctgr}),
        mode: 'cors'
    });
    const data = await response.json();
    if (response.status > 300) { 
      const errors = data.errors;
      return errors;
    } else {
      return data;
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error; // Puedes manejar el error aquí o pasarlo al componente que llama a esta función
  }
}
