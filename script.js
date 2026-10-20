const formulario = document.querySelector("#form-livro");
const lista = document.querySelector("#lista-livros");

const janela = document.querySelector("#janela-livro");
const abrirCadastro = document.querySelector("#abrir-cadastro");

abrirCadastro.addEventListener("click", function () {
  indiceEmEdicao = null;
  formulario.reset();

  document.querySelector("#titulo-janela").textContent =
    "Adicionar livro";

  formulario.querySelector('button[type="submit"]').textContent =
    "Adicionar livro";

  document.querySelector("#cancelar-edicao").hidden = true;

  janela.showModal();
});

const livros = JSON.parse(localStorage.getItem("livros")) || [];
let indiceEmEdicao = null;

function mostrarLivros() {
  lista.textContent = "";

  livros.forEach(function (livro, indice) {
    const item = document.createElement("li");

    if (livro.imagem) {
  const capa = document.createElement("img");

  capa.addEventListener("error", function () {
  console.log("Não foi possível carregar:", livro.imagem);
});

capa.addEventListener("load", function () {
  console.log("Capa carregada:", livro.titulo);
});

  capa.src = livro.imagem;
  capa.alt = "Capa do livro " + livro.titulo;
  capa.className = "capa-livro";

  item.appendChild(capa);
}

const dados = document.createElement("p");

dados.textContent =
  livro.titulo + " — " + livro.autor + " — " + livro.status;

const nota = livro.avaliacao || 0;
const estrelas = document.createElement("p");

estrelas.textContent = nota > 0
  ? "★".repeat(nota) + "☆".repeat(5 - nota)
  : "Sem avaliação";

const comentario = document.createElement("p");

comentario.textContent =
  livro.comentario || "Sem comentário";

item.appendChild(dados);
item.appendChild(estrelas);
item.appendChild(comentario);

const botaoExcluir = document.createElement("button");

botaoExcluir.textContent = "Excluir";
botaoExcluir.type = "button";

botaoExcluir.addEventListener("click", function () {
  const confirmou = confirm(
    "Deseja excluir o livro " + livro.titulo + "?"
  );

  if (confirmou) {
    livros.splice(indice, 1);
indiceEmEdicao = null;
formulario.reset();
janela.close();

formulario.querySelector('button[type="submit"]').textContent =
  "Adicionar livro";

document.querySelector("#cancelar-edicao").hidden = false;
document.querySelector("#cancelar-edicao").textContent = "Cancelar";
    localStorage.setItem("livros", JSON.stringify(livros));

    mostrarLivros();
  }
});
const botaoEditar = document.createElement("button");

botaoEditar.textContent = "Editar";
botaoEditar.type = "button";

botaoEditar.addEventListener("click", function () {
  indiceEmEdicao = indice;
document.querySelector("#cancelar-edicao").hidden = false;
  formulario.querySelector('button[type="submit"]').textContent =
    "Salvar alterações";
  document.querySelector("#titulo").value = livro.titulo;
  document.querySelector("#autor").value = livro.autor;
  document.querySelector("#status").value = livro.status;
  document.querySelector("#imagem").value = livro.imagem || "";
  document.querySelector("#comentario").value =
    livro.comentario || "";

  document.querySelectorAll(
    'input[name="avaliacao"]'
  ).forEach(function (opcao) {
  
  opcao.checked = Number(opcao.value) === livro.avaliacao;
  });

 document.querySelector("#titulo-janela").textContent =
  "Editar livro";

janela.showModal();
document.querySelector("#titulo").focus();

});

item.appendChild(botaoEditar);

item.appendChild(botaoExcluir);

lista.appendChild(item);
  });
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

const imagem = document.querySelector("#imagem").value;
const comentario = document.querySelector("#comentario").value;

const opcaoSelecionada = document.querySelector(
  'input[name="avaliacao"]:checked'
);

const avaliacao = opcaoSelecionada
  ? Number(opcaoSelecionada.value)
  : 0;

  const titulo = document.querySelector("#titulo").value;
  const autor = document.querySelector("#autor").value;
  const status = document.querySelector("#status").value;

 const livro = {
  titulo: titulo,
  autor: autor,
  status: status,
  imagem: imagem,
  comentario: comentario,
  avaliacao: avaliacao
};

  if (indiceEmEdicao === null) {
  livros.push(livro);
} else {
  livros[indiceEmEdicao] = livro;
}

  localStorage.setItem("livros", JSON.stringify(livros));

    mostrarLivros();
  formulario.reset();
  janela.close();
  indiceEmEdicao = null;

  formulario.querySelector('button[type="submit"]').textContent =
    "Adicionar livro";

  document.querySelector("#cancelar-edicao").hidden = true;
});

// O clique em Cancelar fica fora do evento submit.
document.querySelector("#cancelar-edicao")
  .addEventListener("click", function () {
    indiceEmEdicao = null;
    formulario.reset();
    janela.close();

    formulario.querySelector('button[type="submit"]').textContent =
      "Adicionar livro";

document.querySelector("#cancelar-edicao").hidden = false;
document.querySelector("#cancelar-edicao").textContent = "Cancelar";
  });

mostrarLivros();