async function listarLivros(){
    let listArea = document.getElementById("listBook")
    let requisicao = await fetch("http://localhost:8080/livros")
    let result = await requisicao.json()
    listArea.innerHTML = ""

    result.forEach(e => {
        listArea.innerHTML += `
            <div class="card-book">
                <div class="desc">
                    <p>nome:</p>
                    <p>${e.nome}</p>
                </div>
                <div class="desc">
                    <p>editora:</p>
                    <p>${e.editora}</p>
                </div>
                <div class="desc">
                    <p>nome do autor:</p>
                    <p>${e.autor.nome}</p>
                </div>
                <p class="info" onclick="listarLivro(${e.id})">clique para ver mais informações</p>

                <div class="options">
                    <div class="trash" onclick="deleteLivro(${e.id})">
                        <img src="trash.svg" alt="" width="25px">
                    </div>
                    <div class="edit" onclick="formEditLivro(${e.id})">
                        <img src="pen.svg" alt="" height="25px">
                    </div>
                </div>
            </div>
        `
    });
}

async function listarLivro(id) {
    let livro = await fetch(`http://localhost:8080/livros/${id}`)
    livro = await livro.json()
    criarModal()
    let modal = document.querySelector(".modal")
    modal.innerHTML = `
    <div class="desc">
        <p>nome:</p>
        <p>${livro.nome}</p>
    </div>
    <div class="desc">
        <p>Editora:</p>
        <p>${livro.editora}</p>
    </div>
    <div class="desc">
        <p>Resumo:</p>
        <p>${livro.resumo}</p>
    </div>
    <div class="desc">
        <p>nome do autor:</p>
        <p>${livro.autor.nome}</p>
    </div>
    <div class="desc">
        <p>nacionalidade do autor:</p>
        <p>${livro.autor.nacionalidade}</p>
    </div>
    <div class="desc">
        <p>data de nascimento do autor:</p>
        <p>${livro.autor.dataNascimento}</p>
    </div>
    `
}

async function deleteLivro(id) {
    let resposta = await fetch(`http://localhost:8080/livros/${id}`,
    {
        method: "DELETE"
    })
    if(resposta.status == 204){
        console.log("usuario apagado")
        requisicao()
    }else{
        console.log("requisição falhou " + resposta.status)
    }

    listarLivros()
}

async function editarLivro(id, nome, editora, resumo, id_autor){
    let alteracao = await fetch(`http://localhost:8080/livros/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            editora: editora,
            resumo: resumo,
            autor: {
                id: id_autor
            }
        })
    })

    if(alteracao.status == 204){
        alert("alteração feita com sucesso")
        listarLivros()
    }else{
        console.log("alteração não foi feita devido ao erro: " + alteracao.status)
    }
}

async function formEditLivro(id){
    let livro = await fetch(`http://localhost:8080/livros/${id}`)
    livro = await livro.json()
    criarModal()
    let modal = document.querySelector(".modal")

    modal.innerHTML = `
        <form action="" id="formLivroEdit">
            <h2 style="text-align: center; margin-bottom: 10px;">Form de alteração do livro <i>${livro.nome}</i></h2>
            <div class="form-item">
                <label for="nomeLivroModal">Nome</label>
                <input type="text" name="nome" id="nomeLivroModal" value="${livro.nome}"  placeholder="Digite seu nome">
            </div>
            <div class="form-item">
                <label for="editoraModal">Editora</label>
                <input type="text" name="editora" id="editoraModal" value="${livro.editora}" placeholder="Digite sua editora">
            </div>
            <div class="form-item"> 
                <label for="resumoModal">Resumo</label>
                <input type="text" name="resumo" id="resumoModal" value="${livro.resumo}" placeholder="Digite sua data de nascimento">
            </div>
            <div class="form-item">
                <label for="autor-modal"></label>
                <select name="autor" id="autor-modal">
                </select>
            </div>

            <input type="submit" value="Adicionar">
        </form>
    `

    await autoreSelectModal()

    document.querySelector("#autor-modal").value = livro.autor.id;

    let formUpdate = document.getElementById("formLivroEdit")
    formUpdate.addEventListener("submit", (e) => {
        e.preventDefault()
        let nome = document.getElementById("nomeLivroModal").value
        let editora = document.getElementById("editoraModal").value
        let resumo = document.getElementById("resumoModal").value
        let autorID = document.getElementById("autor-modal").value

        editarLivro(id, nome, editora, resumo, autorID)
    })
}

