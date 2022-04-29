// busca os elementos da estrutura HTML via seletor DOM e atribui a constantes
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

// variável que armazena os itens presentes no banco de funcionários
let itens

// variável que armazena os indexes dos itens para possibilitar edição
let id

// função que habilita a tela de inserção/edição de itens(funcionários) na tabela
function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  // quando acontecer um click fora da caixa de edição ela se torna inativa e desaparece
  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    id = index
  } else {
    sNome.value = ''
    sFuncao.value = ''
    sSalario.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}


// deleta um elemento através do método splice que remove um item do array no index indicado, após isso carrega a tabela novamente
function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

// função que cria dinamicamente elementos na tabela de funcionários e será apresentado em tela
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

// botão salvar que pode tanto executar uma inserção ou mesmo edição de item no banco de funcionários 
btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
  } else {
    itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}


// função que será executada assim que a página for carregada, exibindo os itens presentes do storage
function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

// funcção que busca itens no banco (dbfunc) do local storage e retorna um array vazio caso não conste nada armazenado
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []

// função que armzena itens dentro do local storage
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()