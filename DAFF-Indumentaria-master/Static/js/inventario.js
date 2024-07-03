const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
async function showProductos(){
    let productos =  await fetchData(BASEURL+'/api/productos/', 'GET');
    const tableProductos = document.querySelector('#list-table-productos tbody');
    tableProductos.innerHTML='';
    productos.forEach((producto, index) => {
      let tr = `<tr>
                    <td>${producto.tipo}</td>
                    <td>${producto.modelo}</td>
                    <td>${producto.color}</td>
                    <td>${producto.talle}</td>
                    <td>${producto.precio}</td>                   
                    <td>
                      <button class="btn-inv" type=button onclick='updateProducto(${producto.id_producto})'><i class="fas fa-pencil-alt"></i></button>
                      <button class="btn-inv" type=button onclick='deleteProducto(${producto.id_producto})'><i class="fa fa-trash"></i></button>
                    </td>
                  </tr>`;
      tableProductos.insertAdjacentHTML("beforeend",tr);
    });
  }


/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */
async function saveProducto(){
    const idProducto = document.querySelector('#id-producto').value;
    const tipo = document.querySelector('#tipo').value;
    const modelo = document.querySelector('#modelo').value;
    const color = document.querySelector('#color').value;
    const talle = document.querySelector('#talle').value;
    const precio = document.querySelector('#precio').value;

    //VALIDACION DE FORMULARIO
    if (!tipo || !modelo || !color || !talle || !precio) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    // Crea un objeto con los datos de la película
    const productoData = {
        tipo: tipo,
        modelo: modelo,
        color: color,
        talle: talle,
        precio: precio
    };
  let result = null;
  // Si hay un idMovie, realiza una petición PUT para actualizar la película existente
  if(idProducto!==""){
    result = await fetchData(`${BASEURL}/api/productos/${idProducto}`, 'PUT', productoData);
  }else{
    // Si no hay idMovie, realiza una petición POST para crear una nueva película
    result = await fetchData(`${BASEURL}/api/productos/`, 'POST', productoData);
  }
  
  const formProducto = document.querySelector('#form-producto');
  formProducto.reset();
  document.getElementById('tipo').value = '';
  document.getElementById('modelo').value = '';
  document.getElementById('color').value = '';
  document.getElementById('talle').selectedIndex = 0; // Seleccionar la opción por defecto
  document.getElementById('precio').value = '';
  document.getElementById('id-producto').value = ''; // Resetear el campo oculto
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showProductos();
  
}
  
/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteProducto(id){
  Swal.fire({
      title: "¿Está seguro de eliminar el producto?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
  }).then(async (result) => {
      if (result.isConfirmed) {
          try {
              let response = await fetchData(`${BASEURL}/api/productos/${id}`, 'DELETE');
              showProductos();
              Swal.fire(response.message, "", "success");
          } catch (error) {
              console.error("Error al eliminar el producto:", error);
              Swal.fire("Error", "No se pudo eliminar el producto", "error");
          }
      }
  });
}
/**
 * Function que permite cargar el formulario con los datos de la pelicula 
 * para su edición
 * @param {number} id Id de la pelicula que se quiere editar
 */
async function updateProducto(id){
    //Buscamos en el servidor la pelicula de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/productos/${id}`, 'GET');
    const idProducto = document.querySelector('#id-producto');
    const tipo = document.querySelector('#tipo');
    const modelo = document.querySelector('#modelo');
    const color = document.querySelector('#color');
    const talle = document.querySelector('#talle');
    const precio = document.querySelector('#precio');
    
    idProducto.value = response.id_producto;
    tipo.value = response.tipo;
    modelo.value = response.modelo;
    color.value = response.color;
    talle.value = response.talle;
    precio.value = response.precio;
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const btnSaveProducto = document.querySelector('#btn-save-producto');
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveProducto.addEventListener('click',saveProducto);
    showProductos();
});
  