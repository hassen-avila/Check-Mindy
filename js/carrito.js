let guardado = [];
let toDisplayFavorite = [];


let array = [];
let response = "https://apipetshop.herokuapp.com/api/articulos";


async function getData() {
  await fetch(response)
    .then((respuesta) => respuesta.json())
    .then((json) => {
      data = json.response;
      data.map((api) => {
        array.push({
          id: api._id,
          nombre: api.nombre,
          descripcion: api.descripcion,
          precio: api.precio,
          stock: api.stock,
          imagen: api.imagen,
          tipo: api.tipo,
        });
      });
    });

  init();
  
  function cardCarrito(toDisplayFavorite) {
    let htmlCarrito = "";
    let precioToltal = 0
    toDisplayFavorite.forEach((element) => {
      htmlCarrito += `
      <div class="col pb-3 cards" >                    
          <div class="card h-100">
              <img src="${element.imagen}" class="card-img-top" alt="" />
              <div class="card-body colorCards">
                  <h5 class="card-title"> ${element.nombre} </h5>
                  <p class="card-textm"><details><summary>Ver mas...</summary><p>${element.descripcion}</p></details></p>
              </div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                  <small class="text text-success fs-5 fw-bolder"> Precio: $${(new Intl.NumberFormat('de-DE').format(element.precio))}</small>
                  <a id="stock" class="btn boton-rosita  btn-sm btn-sm fw-bolder"> Stock: ${element.stock > 5 ? element.stock : element.stock} </a>
                </button>
                <button class=" mb-2 btn btn-outline-danger button" onClick="removeItem('${element.id}')"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"  class="bi bi-cart-dash" viewBox="0 0 16 16">
                <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"/>
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
          </div>
      </div>
      ${element.stock > 5 ? "" : `<p class="alert-danger text-center"><b>Ultima(s) ${element.stock} unidad(es)!</b></p>`}
      </div> 
      `;
       
    });

    if(htmlCarrito.length > 0) {
      document.getElementById("mainCardsFavorite").innerHTML = htmlCarrito;

    } else {
      document.getElementById("mainCardsFavorite").innerHTML = `<h3 class="text-center">No tenes items en el carrito</h3>`;

    }
    
  }
  cardCarrito(toDisplayFavorite);
  console.log(toDisplayFavorite);

  let dataprecio = toDisplayFavorite.map(e=> e.precio)
   console.log(dataprecio)

  const reducer = (accumulator, curr) => accumulator + curr;
  let sumaDeArticulos=dataprecio.reduce(reducer)
  console.log(sumaDeArticulos);

  
    document.getElementById("sumaCarrito").innerHTML=`
    <h3 class="text-center">Costo de tu carrito</h3>
    <h3 class="text-center">Tu compra tiene un costo de $${(new Intl.NumberFormat('de-DE').format(sumaDeArticulos))}</h3>`

}

getData();







async function init(){
        var dataLocal = JSON.parse(localStorage.getItem('favoritos'))
        if (dataLocal !=null) {
            guardado = dataLocal
        }else{
             guardado=[]
        }
    
        var badge=""
       
        badge =
        `
        <a class="nav-link" href="../pages/carrito.html"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"  class="bi bi-basket" viewBox="0 0 16 16">
        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
        </svg>
        
        <span class=" top-10 start-100 translate-middle badge rounded-pill bg-danger">${guardado.length}
        </a>              
        <span class="visually-hidden">unread mensajes</span>
        </span>

        
        `
        document.getElementById("favoritos").innerHTML= badge

        guardado.map((idGuardado) => {
            toDisplayFavorite.push(...array.filter((api) => api.id == idGuardado));
        });

    }
    init()
    function clearId() { //elimina todo
        localStorage.clear();
        window.location.reload();
        init();
      }
      //Remover el item cargado
 
      function removeItem(event) {
        guardado = guardado.filter((idguardado) => idguardado != event);
        localStorage.setItem("favoritos", JSON.stringify(guardado));
        localStorage.removeItem("favoritos")
        console.log(localStorage.setItem("favoritos", JSON.stringify(guardado)))
        console.log(guardado)
        console.log(event)
        
        window.location.reload();
        init();
      }
     
      //Imprimir las cards en el carrito
      let alerta = document
        .getElementById("finalizacompra")
        .addEventListener("click", function () {
          alert("Gracias por comprar. Su pedido llegará pronto.");
        });

        let alertaContact = document
        .getElementById("submit")
        .addEventListener("click", alert("Gracias por contactarnos. Se ha enviado correctamente"))


        /////////////////////////////////////////////////////////////////////////
      //   function carrito(art){
      //     let arrayCarrito = JSON.parse(localStorage.getItem("carrito"))
      //     idArticulo = arrayCarrito.map(e=>e.id)
      //     if (idArticulo.indexOf(art) !== -1) {
      //         arrayCarrito.splice(idArticulo.indexOf(art),1)
      //     }
      
      //     localStorage.setItem('carrito', JSON.stringify(arrayCarrito))
      //     getDatafromAPI()
      // }
      // ese  o este
      // // Boton de borrar
      // const miBoton = document.createElement('button');
      //  miBoton.classList.add('btn', 'btn-danger', 'mx-5');
      // miBoton.textContent = 'X';
      //  miBoton.style.marginLeft = '1rem';
      // miBoton.dataset.item = item;
      //      miBoton.addEventListener('click', borrarItemCarrito);
      
      //  // Mezcla nodos
      //                                     miNodo.appendChild(miBoton);
      //                                     DOMcarrito.appendChild(miNodo);
      // * Evento para borrar un elemento del carrito
      //                             */
      //                             function borrarItemCarrito(evento) {
      //                                 // Obtengo el producto ID que hay en el boton pulsado
      //                                 const id = evento.target.dataset.item;
      //                                 // Borra todos los productos
      //                                 carrito = carrito.filter((carritoId) => {
      //                                     return carritoId !== id;
      //                                 });
      //                                 // volvemos a renderizar
      //                                 renderizarCarrito();
      //                                 // Actualiza el LocalStorage
      //                                 guardarCarritoEnLocalStorage();
      
      //                             }