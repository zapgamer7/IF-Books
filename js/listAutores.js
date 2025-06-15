var oldNome
var oldNacionalidade
var oldDataNascimento
async function requisicao() {
    let autoresList = document.getElementById("listAutor")

    autoresList.innerHTML = ""
    
    let resposta = await fetch("http://localhost:8080/autores")
    let dados = await resposta.json()

    dados.map(( e ) => {
        autoresList.innerHTML += `
            <div class="card">
                <div>
                    <p>Nome:</p>
                    <p class="id${e.id}">${e.nome}</p>
                </div>
                <div>
                    <p>Nacionalidade:</p>
                    <p class="id${e.id}">${e.nacionalidade}</p>
                </div>
                <div>
                    <p>Data De Nascimento:</p>
                    <p id="data" class="id${e.id}">${e.dataNascimento}</p>
                </div>

                <div class="options">
                    <div class="trash" id="id${e.id}" onclick="deleteAutor(${e.id})">
                    </div>
                    <div class="edit" id="ids${e.id}" onclick="editAutor(${e.id})">
                    </div>
                </div>
            </div>
        `
    })

    const campoData = document.getElementById("data");

    campoData.addEventListener("input", (e) => {
    let texto = campoData.innerText.replace(/\D/g, ""); // remove tudo que não for número

    if (texto.length > 8) texto = texto.substring(0, 8); // limita a 8 dígitos

    // Formata como dd/mm/yyyy
    if (texto.length >= 5) {
        texto = texto.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
    } else if (texto.length >= 3) {
        texto = texto.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }

    campoData.innerText = texto;

    // Mantém o cursor no fim
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(campoData);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    });
}

async function deleteAutor(id) {
    let resposta = await fetch(`http://localhost:8080/autores/${id}`,
    {
        method: "DELETE"
    })
    if(resposta.status == 204){
        console.log("usuario apagado")
        requisicao()
    }else{
        console.log("requisição falhou " + resposta.status)
    }
}

async function editAutor(id){
    let fieldTexts = document.querySelectorAll(`.id${id}`)
    let trash = document.getElementById(`id${id}`)
    let edit = document.getElementById(`ids${id}`)

    fieldTexts.forEach((e) => {
        e.setAttribute('contenteditable', 'true')
        e.classList.add("editableContent")
    })

    trash.classList.add("cancel")
    trash.classList.remove("trash")
    edit.classList.add("confirm")
    edit.classList.remove("edit")

    trash.setAttribute("onclick", `cancel(${id})`)
    edit.setAttribute("onclick", `confirmEdit(${id})`)
    
    oldNome = fieldTexts[0].textContent
    oldNacionalidade = fieldTexts[1].textContent
    oldDataNascimento = fieldTexts[2].textContent

    fieldTexts[0].focus()
}

async function cancel(id){
    let fieldTexts = document.querySelectorAll(`.id${id}`)
    let cancel = document.getElementById(`id${id}`)
    let confirm = document.getElementById(`ids${id}`)

    fieldTexts.forEach(e => {
        e.setAttribute('contenteditable', 'false')
        e.classList.remove("editableContent")
    });

    cancel.classList.add("trash")
    cancel.classList.remove("cancel")
    confirm.classList.add("edit")
    confirm.classList.remove("confirm")

    confirm.setAttribute("onclick", `editAutor(${id})`)
    cancel.setAttribute("onclick", `deleteAutor(${id})`)
    fieldTexts[0].textContent = oldNome
    fieldTexts[1].textContent = oldNacionalidade
    fieldTexts[2].textContent = oldDataNascimento

}

function dataEhValida(dataStr) {
    // Esperado: dd/mm/yyyy
    const partes = dataStr.split("/");
    if (partes.length !== 3) return false;

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; // Janeiro = 0
    const ano = parseInt(partes[2], 10);

    const data = new Date(ano, mes, dia);

    return (
        data.getFullYear() === ano &&
        data.getMonth() === mes &&
        data.getDate() === dia
    );
}

async function confirmEdit(id) {
    let fieldTexts = document.querySelectorAll(`.id${id}`)
    let nome = fieldTexts[0].textContent
    let nacionalidade = fieldTexts[1].textContent
    let data_nascimento = fieldTexts[2].textContent

    if(dataEhValida(data_nascimento) && nome && nacionalidade){
        let alteracao = await fetch(`http://localhost:8080/autores/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                nacionalidade: nacionalidade,
                dataNascimento: data_nascimento
            })
        })
        
        if (alteracao.status === 204) {
            requisicao()
            alert(`usuario ${nome} alterado com sucesso`)
        } else {
            console.error("Erro ao criar o usuário:", alteracao.status);
        }

    }else{
        alert("falta coisa ai amigão")
    }

}