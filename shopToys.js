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
    



    let array1 = arrayToys.filter(e =>e.precio < 400)
    array1.map(e=> e.categoria="-400")
    let array2 = arrayToys.filter(e =>e.precio > 400 && e.precio < 1000)
    array2.map(e=>e.categoria="400-1000")
    let array3 = arrayToys.filter(e=> e.precio >= 1000)
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
var checkBox = document.querySelectorAll(".filter")
checkBox.forEach(check => {check.addEventListener("change", (evento)=>{
    let checked=evento.target.checked
    if(checked){
        dataCheck.push(evento.target.value)
        filter()
    }
    else{
        dataCheck = dataCheck.filter(uncheck => uncheck !== evento.target.value)
        filter()
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
    <div class="col pb-3">                    
    <div class="card h-100">
        <img src="${element.imagen}" class="card-img-top" alt="" />
        <div class="card-body">
            <h5 class="card-title"> ${element.nombre} </h5>
            <p class="card-text">${element.descripcion}</p>
        </div>
        <div class="card-footer d-flex align-items-center justify-content-between">
            <small class="text"> Price:${element.precio}</small>
            <a href="" class="btn boton-rosita btn-sm">See More</a>
        </div>
    </div>
    </div>
    `
        })
        shopConteiner.innerHTML=template
    }
}
getData()












/* template += `                    
<div class="card h-100">
    <img src="https://cdn.shopify.com/s/files/1/0406/8003/0364/products/product-image-1291332388_445a8917-102c-4afe-879b-6f5f37c1a676_1024x1024.jpg?v=1592521690" class="card-img-top" alt="" />
    <div class="card-body">
        <h5 class="card-title"> Juguete interactivo IQ Treat Ball</h5>
        <p class="card-text">Description: Esta pelota estimula el pensamiento de su mascota haciendo que tenga que encontrar la forma de jugar con ella para poder recibir su premio. Puede ser utilizada tanto por perros como por gatos y favorece el tiempo de ingesta para mejorar la digestión de los mismo </p>
    </div>
    <div class="card-footer d-flex align-items-center justify-content-between">
        <small class="text"> Price: $5 </small>
        <a href="" class="btn boton-rosita btn-sm">See More</a>
    </div>
</div>
` */