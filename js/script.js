var crudAreas = [
    document.querySelector("#addAutor"),
    document.querySelector("#listAutor"),
    document.querySelector("#addBook"),
    document.querySelector("#listBook")
]

var active = 0

function aparecer(crudArea){
    if(crudAreas[crudArea].classList[0] == "hidden"){
        crudAreas[crudArea].classList.add("active")  
        crudAreas[crudArea].classList.remove("hidden")

        crudAreas[active].classList.add("hidden")
        crudAreas[active].classList.remove("active")
        
        active = crudArea
    }
}