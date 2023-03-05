// API login
const login = async () => {
  try {
    // Hace un post a /login, pasando el usuario y contraseña
    const resp = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'usuario', password: 'contraseña' }),
    });
    //Obtiene la respuesta en formato json
    const data = await resp.json();
    // Si la respuesta no es ok, lanza el error indicado en "mensaje"
    if (!resp.ok) {
      throw new Error(data.mensaje);
    }
    // Si login esta ok, guarda el token en el localStorage
    localStorage.setItem('token', data.token);
    // Muestra el mensaje de exito
    console.log('Login correcto, token guardado');
  } catch (error) {
    // Si hay error, lo muestra en la consola
    console.error(error.message);
  }
};

// API logout
const logout = async () => {
  try {
    // Hace un post a /logout, pasando el token de autorización
    const resp = await fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //Bearer es el tipo de token que se usa, y el token se obtiene del localStorage
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    //Obtiene la respuesta en formato json
    const data = await resp.json();
    // Si la respuesta no es ok, lanza el error indicado en "mensaje"
    if (!resp.ok) {
      throw new Error(data.mensaje);
    }
    // Si logout esta ok, elimina el token del localStorage
    localStorage.removeItem('token');
    // Muestra el mensaje de exito
    console.log(data.mensaje);
  } catch (error) {
    // Si hay error, lo muestra en la consola
    console.error(error.message);
  }
};

// API CALL sumar
const sumar = async () => {
  try {
    // numero aleatorio entre 0 y 10
    const num1 = Math.trunc(Math.random() * 10);
    // numero aleatorio entre 0 y 10
    const num2 = Math.trunc(Math.random() * 10);
    // Hace un post a /sumar, pasando el token de autorización y los numeros a sumar
    const resp = await fetch('/sumar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //Bearer es el tipo de token que se usa, y el token se obtiene del localStorage
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ num1, num2 }),
    });
    //Obtiene la respuesta en formato json
    const data = await resp.json();
    // Si la respuesta no es ok, lanza el error indicado en "mensaje"
    if (!resp.ok) {
      throw new Error(data.mensaje);
    }
    // Si sumar esta ok, muestra el resultado
    console.log(`${num1} + ${num2} = ${data.resultado}`);
  } catch (error) {
    // Si hay error, lo muestra en la consola
    console.error(error.mensaje);
  }
};
