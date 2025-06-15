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
}

function formEditLivro(id){
    criarModal()
    let modal = document.querySelector(".modal")
    modal.innerHTML = `
        <form action="" id="formLivro">
            <h2 style="text-align: center; margin-bottom: 10px;">Form de alteração de usuario</h2>
            <div class="form-item">
                <label for="nomeLivro">Nome</label>
                <input type="text" name="nome" id="nomeLivro" placeholder="Digite seu nome">
            </div>
            <div class="form-item">
                <label for="editora">Editora</label>
                <input type="text" name="editora" id="editora" placeholder="Digite sua editora">
            </div>
            <div class="form-item"> 
                <label for="resumo">Resumo</label>
                <input type="text" name="resumo" id="resumo" placeholder="Digite sua data de nascimento">
            </div>
            <div class="form-item">
                <label for="autor-modal"></label>
                <select name="autor" id="autor-modal">
                    <option value="cauan">cauan</option>
                    <option value="teste">teste</option>
                </select>
            </div>

            <input type="submit" value="Adicionar">
        </form>
    `

    autoreSelectModal()
}

