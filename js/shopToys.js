let data
var shopConteiner= document.getElementById('cards');



async function getData(){
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
    .then(response => response.json())
    .then(json => data=json)

    let dataShop= data.response
    let shopArray= dataShop.filter(e => e.nombre)

    let arrayToys= shopArray.filter(e => e.tipo === "Juguete")
    let arrayMeds= shopArray.filter(e => e.tipo === "Medicamento")

    
    var id = 1
    arrayToys.map(eventos => eventos.id = id++)


    
    


    console.log(arrayToys)


    let arrayLowPrice = arrayToys.filter(e =>e.precio < 400)
    arrayLowPrice.map(e=> e.categoria="-$400")
    let arrayMidPrice = arrayToys.filter(e =>e.precio > 400 && e.precio < 1000)
    arrayMidPrice.map(e=>e.categoria="$400-$1000")
    let arrayHighPrice = arrayToys.filter(e=> e.precio >= 1000)
    arrayHighPrice.map(e=>e.categoria="+$1000")

    let arrayWithCategory= arrayLowPrice.concat(arrayMidPrice).concat(arrayHighPrice)


    
    //checkbox dinamicos xd
    var checkboxes = document.getElementById("categorias")
    let check=arrayWithCategory.map(e=>e.categoria)
    let checkFilt= new Set(check)
    let arrayCheckFilt= [...checkFilt]

    // ANCHOR OK LOS FILTRINIOS
    function checkBoxCreator(){  
        box= `
        <div class="form-check form-check-inline">
            <form class="d-flex">
                <input class="form-control me-2" type="search" name="search" id="search" placeholder="Search" aria-label="Search" />
            </form>
        </div>`
        arrayCheckFilt.forEach(element => {
            box += `<div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="checkBox" value="${element}">
            <label class="form-check-label" for="inlineCheckbox1"><b>${element}</b></label>
        </div>`
        })
        checkboxes.innerHTML=box;
    }
    checkBoxCreator()


// Escuchador de eventos check
let dataCheck=[]
var checkBox = document.querySelectorAll(".form-check-input")
checkBox.forEach(check => {check.addEventListener("click", (evento)=>{
    let checked=evento.target.checked
    if(checked){
        dataCheck.push(evento.target.value)
        filter()
        console.log(dataCheck);

    }
    else{
        dataCheck = dataCheck.filter(uncheck => uncheck !== evento.target.value)
        filter()
        console.log(dataCheck);
        
    }
})})


// Escuchador de eventos text OK
let textSearch=""
var searchInput =document.querySelector("#search")
searchInput.addEventListener("keyup", (evento)=>{
    textSearch= evento.target.value
    filter()
    })



    function filter(){
        let dataEnd = []
        if (dataCheck.length > 0 && textSearch !== "") {
            dataCheck.map(event => {
                dataEnd.push(...arrayWithCategory.filter(evento => evento.nombre.toLowerCase().includes(textSearch.trim().toLowerCase())  &&
                    evento.categoria == event))
            })
        }
        else if (dataCheck.length > 0 && textSearch === "") {
            dataCheck.map(event => dataEnd.push(...arrayWithCategory.filter(evento => evento.categoria == event)))
        }
        else if (dataCheck.length == 0 && textSearch !== "") {
            dataEnd.push(...arrayWithCategory.filter(evento => evento.nombre.toLowerCase().includes(textSearch.trim().toLowerCase())))
        }
        else { dataEnd.push(...arrayWithCategory) }
        
        
        shopCards(dataEnd)
    }
    filter()

    function shopCards(array){
        
        let template=""
        array.forEach(element => {
            template += `
            <div class="col pb-3 cards" >                    
        <div class="card h-100">
            <img src="${element.imagen}" class="card-img-top" alt="" />
            <div class="card-body">
                <h5 class="card-title"> ${element.nombre} </h5>
                <p class="card-textm"><details><summary>Ver mas...</summary><p>${element.descripcion}</p></details></p>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <small class="text text-success fs-5 fw-bolder"> Precio: $${(new Intl.NumberFormat('de-DE').format(element.precio))}</small>
                <a id="stock" class="btn boton-rosita  btn-sm fw-bolder"> Stock: ${element.stock > 5 ? element.stock : element.stock} </a>
                
                <button class="btn btn-outline-success button" onClick="getID('${element._id}')" id="${element._id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg>
              </button>
              
        </div>
    </div>
    ${element.stock > 5 ? "" : `<p class="alert-danger text-center"><b>Ultima(s) ${element.stock} unidad(es)!</b></p>`}
    </div>
            `

    
        }) 
        shopConteiner.innerHTML=template
        init();
    }
    
    }getData();
    //AGREGAR DATOS A LOCAL STORAGE
    
    var favorites = JSON.parse(localStorage.getItem("favoritos")) || [];
    
    var addfavorite;
    function getID(event) {
      favorites.push(event);
      const unicoFav = new Set(favorites);
      var addfavorite = [...unicoFav];
    
      localStorage.setItem("favoritos", JSON.stringify(addfavorite));
      localStorage.setItem("cargaControl", "Secargo");
      init();
    }


    let cantidad = document.getElementById("cantidad")

    //cantidad.addEventListener("change", e => (console.log("hola")))
    
