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

    console.log(arrayToys)
    console.log(arrayMeds)
    



    let array1 = arrayMeds.filter(e =>e.precio < 400)
    array1.map(e=> e.categoria="-400")
    let array2 = arrayMeds.filter(e =>e.precio > 400 && e.precio < 1000)
    array2.map(e=>e.categoria="400-1000")
    let array3 = arrayMeds.filter(e=> e.precio >= 1000)
    array3.map(e=>e.categoria="+1000")

    let arrayWithCategory= array1.concat(array2).concat(array3)
    console.log(arrayWithCategory)

    console.log(array1)
    console.log(array2)
    console.log(array3)
    
    //checkbox dinamicos xd
    var checkboxes = document.getElementById("categorias")
    let check=arrayWithCategory.map(e=>e.categoria)
    let checkFilt= new Set(check)
    let arrayCheckFilt= [...checkFilt]
    console.log(arrayCheckFilt)

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
            <label class="form-check-label" for="inlineCheckbox1">${element}</label>
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
        console.log(dataEnd)
    }
    filter()

    function shopCards(array){
        let template=""
        array.forEach(element => {
            template += `
    <div class="col pb-3" >                    
    <div class="card h-100">
        <img src="${element.imagen}" class="card-img-top" alt="" />
        <div class="card-body">
            <h5 class="card-title"> ${element.nombre} </h5>
            <p class="card-text">${element.descripcion}</p>
        </div>
        <div class="card-footer d-flex align-items-center justify-content-between">
            <small class="text"> Price: $${element.precio}</small>
            <a id="stock" class="btn boton-rosita  btn-sm"> stock: ${element.stock} </a>
            <a class="btn boton-rosita  btn-sm"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
            </svg> </a>
        </div>
    </div>
    </div>
    `
        }) 
        shopConteiner.innerHTML=template
    }
    
    
}
getData()