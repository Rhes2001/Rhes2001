document.querySelector("#salvar").addEventListener("click", cadastrar)

let despesas = []

window.addEventListener("load", () => {
 despesas = JSON.parse(localStorage.getItem("despesas")) || []
 atualizar()
})

document.querySelector("#busca").addEventListener("keyup", ()=> {
 let busca = document.querySelector("#busca").value
 let despesasFiltradas = despesas.filter((despesa) =>{
 return despesa.fornecedor.toLowerCase().includes(busca.toLowerCase())
 })
 filtrar(despesasFiltradas)
})

function filtrar(despesas){
 document.querySelector("#tarefas").innerHTML = ""
 despesas.forEach((despesa) =>{
 document.querySelector("#tarefas").innerHTML 
 += createCard(despesa)
 })
}

function atualizar(){
 document.querySelector("#tarefas").innerHTML = ""
 localStorage.setItem("despesas", JSON.stringify(despesas))
 despesas.forEach((despesa) =>{
 document.querySelector("#tarefas").innerHTML 
 += createCard(despesa)
 })
}

function cadastrar(){
 const fornecedor = document.querySelector("#titulo").value
 const valor = document.querySelector("#descricao").value
 const categoria = document.querySelector("#categoria").value
 const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))

 const despesa = {
 id: Date.now(),
 fornecedor,
 valor,
 categoria,
 concluida: false
 }
 
 if (!validar(despesa.fornecedor, document.querySelector("#titulo"))) return
 if (!validar(despesa.valor, document.querySelector("#descricao"))) return
 
 despesas.push(despesa) 
 
 atualizar()

 modal.hide()

}

function validar(valor, campo){
 if(valor == ""){
 campo.classList.add("is-invalid")
 campo.classList.remove("is-valid")
 return false
 }

 campo.classList.remove("is-invalid")
 campo.classList.add("is-valid")
 return true
 
}

function apagar(id){

 despesas = despesas.filter((despesa) => {
 return despesa.id != id
 })
 atualizar()
 
}

function concluir(id){
 let despesaEncontrada = despesas.find((despesa) => {
 return despesa.id == id
 })
 despesaEncontrada.concluida = true
 atualizar()
}

function createCard(despesa){
 let disabled = despesa.concluida ? "disabled" : ""

 return `
 <div class="card mt-3">
 <div class="card-body">
 <h5 class="card-title">fornecedor: ${despesa.fornecedor}</h5>
 <p class="card-text">Valor: ${despesa.valor}</p>
 <p class="card-text">Categoria: ${despesa.categoria}</p>
 <button ${disabled} onclick="concluir(${despesa.id})" class="btn btn-success">Concluir</button>
 <button onclick="apagar(${despesa.id})" class="btn btn-danger">Apagar</button>
 </div>
 </div>
 `
}
