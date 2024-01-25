let tarefasPendentes = [];
let tarefasConcluidas = [];
const entradaTarefa = document.getElementById("adicionar");

const adicionarTarefa = () => {
  const textoTarefa = entradaTarefa.value.trim();
  if (textoTarefa !== "") {
    tarefasPendentes.push(textoTarefa);
    renderizarTarefasPendentes();
    entradaTarefa.value = "";
    entradaTarefa.focus();
  } else {
    alert("Informe uma tarefa!");
    entradaTarefa.focus();
  }
};

const renderizarTarefasPendentes = () => {
  const listaPendente = document.getElementById("listaPendente");
  const tarefasExistem = listaPendente.querySelectorAll("li");

  tarefasExistem.forEach((tarefa) => tarefa.remove());

  for (let i = 0; i < tarefasPendentes.length; i++) {
    const textoTarefa = tarefasPendentes[i];
    const novaTarefa = document.createElement("span");
    novaTarefa.innerHTML = `
        <li> • ${textoTarefa}
    <div>
        <i class="fa-solid fa-square-check" onclick='completarTarefa(${i})'></i>
        <i class="fa-solid fa-pen" onclick='editarTarefa(${i})'></i>
        <i class="fa-solid fa-trash" onclick="excluirTarefa('pendente', ${i})"></i>
        </div>
        </li>
        `;
    listaPendente.appendChild(novaTarefa);
  }
};

function editarTarefa(indice){
        const textoTarefa = prompt('Edite a tarefa:', tarefasPendentes[indice]);
        if(textoTarefa !== null){
            tarefasPendentes[indice] = textoTarefa;
            renderizarTarefasPendentes();
        }
}

function completarTarefa(indice){
        const textoTarefa = tarefasPendentes[indice];
        tarefasPendentes.splice(indice, 1);
        tarefasConcluidas.push(textoTarefa);
        renderizarTarefasPendentes();
        renderizarTarefasConcluidas();
}

function excluirTarefa(tipoLista, indice){
    if(tipoLista === 'pendente'){
        tarefasPendentes.splice(indice, 1);
        renderizarTarefasPendentes();
    }else if(tipoLista === 'concluida'){
        tarefasConcluidas.splice(indice, 1);
        renderizarTarefasConcluidas()
    }
}

function renderizarTarefasConcluidas(){
    const listaCompleta = document.getElementById('listaCompleta');
    const tarefasExistem = listaCompleta.querySelectorAll('li');

    tarefasExistem.forEach(tarefa => tarefa.remove());

    for(let i=0; i<tarefasConcluidas.length; i++){
        const textoTarefa = tarefasConcluidas[i];
        const novaTarefa = document.createElement('span');
        novaTarefa.innerHTML = `
        <li> <s>• ${textoTarefa}</s>
        <div>
        <i class="fa-solid fa-trash" onclick="excluirTarefa('concluida', ${i})"></i>
        </div>
        </li>
        `;
        listaCompleta.appendChild(novaTarefa)
    }
}

document.getElementById("btn").addEventListener("click", adicionarTarefa);
document.getElementById("adicionar").addEventListener("keyup", function (evento) {
  if (evento.key === "Enter") {
    adicionarTarefa();
  }
});
