let formLivro = document.getElementById("formLivro")
formLivro.onsubmit = (e) => {
    e.preventDefault();

    addLivro()
}

async function autoreSelect(){
    let autoresSelectForm = document.getElementById("autor")
    let autores = await fetch("http://localhost:8080/autores/")
    autores = await autores.json()

    autoresSelectForm.innerHTML = ""
    autores.forEach(e => {
        autoresSelectForm.innerHTML += `
        <option value="${e.id}">${e.nome}</option>
        `
        
    });
}

async function autoreSelectModal(){
    let autoresSelectForm = document.getElementById("autor-modal")
    let autores = await fetch("http://localhost:8080/autores/")
    autores = await autores.json()

    autoresSelectForm.innerHTML = ""
    autores.forEach(e => {
        console.log(e)
        autoresSelectForm.innerHTML += `
        <option value="${e.id}">${e.nome}</option>
        `
        
    });
}

async function addLivro() {
    let nomeField = document.getElementById("nomeLivro")
    let editoraField = document.getElementById("editora")
    let resumoField = document.getElementById("resumo")
    let autorField = document.getElementById("autor")
    
    let nome = nomeField.value
    let editora = editoraField.value
    let resumo = resumoField.value
    let autorID = autorField.value

    let resposta = await fetch("http://localhost:8080/livros/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            editora: editora,
            resumo: resumo,
            autor: {
                id: autorID
            }
        })
    });

    if (resposta.status === 200) {
        console.log("Livro criado com sucesso");
        alert(`livro ${nome} criado com sucesso`)
    } else {
        console.error("Erro ao criar o usuário:", resposta.status);
    }

}

