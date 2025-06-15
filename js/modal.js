let body = document.querySelector("body")

function criarModal() {
    const fade = document.createElement("div")
    fade.classList.add("fade")
    fade.addEventListener("click", closeModal)
  
    const modal = document.createElement("div")
    modal.classList.add("modal")
  
    document.body.appendChild(fade)
    document.body.appendChild(modal)
}
  

function closeModal(){
    let modal = document.querySelector(".modal")
    let fade = document.querySelector(".fade")

    modal.remove()
    fade.remove()
}