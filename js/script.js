const crudAreas = [
    document.querySelector("#addAutor"),
    document.querySelector("#listAutor"),
    document.querySelector("#addBook"),
    document.querySelector("#listBook"),
    document.querySelector("#contact")
  ];
  
  let active = 0;
  
  function aparecer(index) {
    const novoAtivo = crudAreas[index];
    const anteriorAtivo = crudAreas[active];
  
    // Evita erro se o índice for inválido ou o elemento não existir
    if (!novoAtivo || novoAtivo === anteriorAtivo) return;
  
    anteriorAtivo.classList.remove("active");
    anteriorAtivo.classList.add("hidden");
  
    novoAtivo.classList.remove("hidden");
    novoAtivo.classList.add("active");
  
    active = index;
  }
  