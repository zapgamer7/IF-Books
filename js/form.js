var form = document.querySelector("#formAutor");

async function addAutor(nome, nacionalidade, data_nascimento) {
    let resposta = await fetch("http://localhost:8080/autores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            nacionalidade: nacionalidade,
            dataNascimento: data_nascimento
        })
    });

    if (resposta.status === 200) {
        console.log("Usuário criado com sucesso");
        alert(`usuario ${nome} criado com sucesso`)
    } else {
        console.error("Erro ao criar o usuário:", resposta.status);
    }
}

form.onsubmit = (e) => {
    e.preventDefault();

    const dataStr = document.getElementById("dataNascimento").value;
    const nome = document.getElementById("nome").value;
    const nacionalidade = document.getElementById("nacionalidade").value;

    if (dataStr) {
        const [ano, mes, dia] = dataStr.split("-");
        const date = new Date(ano, mes - 1, dia);
        const dataFormatada = new Intl.DateTimeFormat("pt-BR").format(date); // DD/MM/AAAA

        console.log("Data formatada:", dataFormatada);

        addAutor(nome, nacionalidade, dataFormatada);
    } else {
        console.warn("Data não selecionada");
    }
};
