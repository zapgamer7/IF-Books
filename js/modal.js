let body = document.querySelector("body")

function criarModal(){
    body.innerHTML += `
    <div class="fade" onclick="closeModal()"></div>
    <div class="modal">
        <p>FODASE</p>
    </div>
    `
}

function closeModal(){
    let modal = document.querySelector(".modal")
    let fade = document.querySelector(".fade")

    modal.remove()
    fade.remove()
}