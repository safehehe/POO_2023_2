const ingredientType = "application/ing"
const input = document.getElementById("input")
const taskDesk = document.getElementById("task_desk")
const output = document.getElementById("output")
const outputTime = document.getElementById("time")
const outputCount = document.getElementById("tasks-done")
document.body.onload = setup
const isIngredient = (ev)=> ev.dataTransfer.types.includes(ingredientType)
function ingDragStart(ev){
  ev.dataTransfer.setData(ingredientType,ev.target.src)
  ev.dataTransfer.setData("text/plain",ev.target.id)
}
function dishDragEnter(ev){
  console.log(ev.target)
  if (isIngredient(ev)){
    ev.target.classList.add("drop-active")
  }
}
function dishDragLeave(ev){
  if (isIngredient(ev)){
    ev.target.classList.remove("drop-active")
  }
}
function dragOver(ev){
  ev.preventDefault();
}

function dishDrop(ev){
  ev.preventDefault();
  if (isIngredient(ev)){
    console.log(ev)
    let [id_ing, ID_pedido] = ev.target.id.split("-")
    let target = ev.target
    //console.log(`${id_ing}, ${ID_pedido}`)
    let ingrediente = ev.dataTransfer.getData(ingredientType).split("/").pop()
    //console.log(ingrediente)
    ID_pedido = parseInt(ID_pedido)
    const make_check = ()=>{
        target.parentElement.classList.add("check_ingredient")
        console.log(`Pedido ${ID_pedido} Terminado`)
        let p_done = document.getElementById(ID_pedido)
        setTimeout(()=>{
          output.appendChild(p_done)
          outputCountUpdate()
        },1500)
    }
    if (id_ing === "molde"){
      let result = pedidos[ID_pedido-1].checkMolde(ingrediente)
      if (result === Pedido._true){
        target.parentElement.classList.add("check_ingredient")
      }else if (result === Pedido.done){
        make_check()
      }else {
        console.log("noes")
        target.classList.remove("drop-active")
      }
    }else if(id_ing === "crema"){
      let result = pedidos[ID_pedido-1].checkCrema(ingrediente)
      if (result === Pedido._true){
        target.parentElement.classList.add("check_ingredient")
      }else if (result === Pedido.done){
        make_check()
      }else {
        target.classList.remove("drop-active")
      }
    }else if(id_ing === "topping"){
      let result = pedidos[ID_pedido-1].checkTopping(ingrediente)
      if (result === Pedido._true){
        target.parentElement.classList.add("check_ingredient")
      }else if (result === Pedido.done){
        make_check()
      }else {
        target.classList.remove("drop-active")
      }
    }
  }
}

function outputCountUpdate(){
  outputCount.innerText = `Task done: ${output.childElementCount - 2}`
}
//todo Terminar el agragar ingrediente para usar la clase, mejorar la llegada de pedidos y ya

const taskType = "application/task"
const isTask = (ev) => ev.dataTransfer.types.includes(taskType)
function taskDragStart(ev){
  ev.dataTransfer.setData(taskType,ev.target.id)
}
function deskDragEnter(ev){
  //console.log(ev)
  if (isTask(ev) && taskDesk.childElementCount<3){
    taskDesk.appendChild(Pedido.renderizarBorder())
  }
}

function deskDragLeave(ev){
  if (isTask(ev) && taskDesk.childElementCount<3){
    taskDesk.removeChild(Pedido.renderizarBorder())
  }
}

function deskDrop(ev){
  ev.preventDefault()
  if (taskDesk.childElementCount<3 && isTask(ev)){
    let ID_pedido = ev.dataTransfer.getData(taskType)
    console.log(ID_pedido)
    let pedido = document.getElementById(ID_pedido)
    pedido.draggable = false
    if (isTask(ev)){
      taskDesk.removeChild(Pedido.renderizarBorder())
      taskDesk.appendChild(pedido)
    }
  }
}


let ing = 0
function showIng(ev){
  //console.log(ev)
  let ings = ev.target.getElementsByTagName("img")
  ings[ing].classList.add("show")

}
function setup(){
  //Add moldes
  let selector_moldes = document.getElementById("cup-selector")
  for (let index = 0; index < Molde.choices.length; index++) {
    const choice = Molde.choices[index];
    let img_html = createHtmlElement(`<img id="${choice}" class="show" src="./images/${choice}">`)
    setTimeout(()=>selector_moldes.appendChild(img_html), 700*index)
  }
  //Add cremas
  let selector_crema = document.getElementById("cream-selector")
  for (let index = 0; index < Crema.choices.length; index++) {
    const choice = Crema.choices[index];
    let img_html = createHtmlElement(`<img id="${choice}" class="show" src="./images/${choice}">`)
    setTimeout(()=>selector_crema.appendChild(img_html), 700*index)
  }

  //Add topping
  let selector_topping = document.getElementById("topping-selector")
  for (let index = 0; index < Topping.choices.length; index++) {
    const choice = Topping.choices[index];
    let img_html = createHtmlElement(`<img id="${choice}" class="show" src="./images/${choice}">`)
    setTimeout(()=>selector_topping.appendChild(img_html),700*index)
  }
  addTask()
  timer()
}

function addTask(){
  setTimeout(addTask,8000)
  console.log("Pedido creado")
  let next_pedido = Pedido.crear()
  input.appendChild(next_pedido.renderizar())
}

let time_seconds = 0
let time_minutes = 0
function timer(){
  setTimeout(timer, 500)
  ++time_seconds
  if (time_seconds % 60 == 0){
    ++time_minutes
  }
  outputTime.innerText = `Time playing: ${time_minutes}:${time_seconds}`
}

/**
 * 
 * @param {String} html 
 * @returns {Element}
 */
function createHtmlElement(html){
    let a = document.createElement("template");
    a.innerHTML = html
    return a.content.firstChild;
}




const random_choice = (len_choices)=>Math.floor(Math.random()*len_choices)
//Clases
class Ingrediente {
  /**
   * 
   * @param {Number} len 
   * @returns Index
   */
  static get_one(len) {
    return random_choice(len)
  }
}

class Molde extends Ingrediente {
  static choices =  ["MOLDE1.png", "MOLDE2.png", "MOLDE3.png", "MOLDE4.png", "MOLDE5.png", "MOLDE6.png", "MOLDE7.png", "MOLDE8.png"]
  /**
   * 
   * @returns {String} Molde src
   */
  static get_one(){
    return Molde.choices[super.get_one(Molde.choices.length)]
  }
}

class Crema extends Ingrediente {
  static choices = ["CREMA1.png", "CREMA2.png", "CREMA3.png", "CREMA4.png", "CREMA5.png", "CREMA6.png", "CREMA7.png", "CREMA8.png"]
  /**
   * 
   * @returns {String} Crema src
   */
  static get_one(){
    return Crema.choices[super.get_one(Crema.choices.length)]
  }
}

class Topping extends Ingrediente {
  static choices = ["FRUTA1.png", "FRUTA2.png", "FRUTA3.png", "FRUTA4.png", "FRUTA5.png", "TOPPING1.png", "TOPPING2.png", "TOPPING3.png"]
  /**
   * 
   * @returns {String} Topping src
   */
  static get_one(){
    return Topping.choices[super.get_one(Topping.choices.length)]
  }
}

let pedidos = []
class Pedido {
  static next_id = 0 //todo restaurar a cero
  static crear() {
    let p = new Pedido()
    pedidos.push(p)
    return p
  }
  static done = 2
  static _true = 1
  static border_render = undefined
  constructor(){
    this.ID = ++Pedido.next_id
    this.seleccionarIngredientes()
    this.check_molde = false
    this.check_crema = false
    this.check_topping = false
  }
  seleccionarIngredientes(){
    this.molde = Molde.get_one()
    this.crema = Crema.get_one()
    this.topping = Topping.get_one() 
  }
  /**
   * 
   * @param {String} option Molde a verificar
   * @returns Código de verificación o falso
   */
  checkMolde(option){
    if (option === this.molde){
      this.check_molde = true
      if (this.checkDone()){
        return Pedido.done
      }
      return Pedido._true
    }
    return false
  }
  /**
   * 
   * @param {String} option Crema a verificar
   * @returns Código de verificación o falso
   */
  checkCrema(option){
    if (option === this.crema){
      this.check_crema = true
      if (this.checkDone()){
        return Pedido.done
      }
      return Pedido._true
    }
    return false
  }
  /**
   * 
   * @param {String} option Topping a verificar
   * @returns Código de verificación o falso
   */
  checkTopping(option){
    if (option === this.topping){
      this.check_topping = true
      if (this.checkDone()){
        return Pedido.done
      }
      return Pedido._true
    }
    return false
  }
  /**
   * 
   * @returns Si el pedido ya está completo
   */
  checkDone(){
    return this.check_molde && this.check_crema && this.check_topping
  }
  /**
   * 
   * @returns Pedido como Nodo Html
   */
  renderizar(){
    let html = `<div class="task" id="${this.ID}" draggable="true" ondragstart="taskDragStart(event)">
                <div class="cupcake_blueprint" draggable="false">
                    <img src="./images/${this.molde}" draggable="false">
                    <img src="./images/${this.crema}" draggable="false">
                    <img src="./images/${this.topping}" draggable="false">
                </div>
                <label ondragenter="dishDragEnter(event)" ondragleave="dishDragLeave(event)" >
                    <img class="ingredient_blueprint" src="./images/${this.molde}">
                    <div id="molde-${this.ID}" class="drop-zone" ondragover="dragOver(event)" ondrop="dishDrop(event)"></div>
                </label>
                <label ondragenter="dishDragEnter(event)" ondragleave="dishDragLeave(event)">
                    <img class="ingredient_blueprint" src="./images/${this.crema}">
                    <div id="crema-${this.ID}" class="drop-zone" ondragover="dragOver(event)" ondrop="dishDrop(event)"></div>
                </label>
                <label ondragenter="dishDragEnter(event)" ondragleave="dishDragLeave(event)">
                    <img class="ingredient_blueprint" src="./images/${this.topping}">
                    <div id="topping-${this.ID}" class="drop-zone" ondragover="dragOver(event)" ondrop="dishDrop(event)"></div>
                </label>
            </div>`
    return createHtmlElement(html)
  }
  static renderizarBorder(){
    if (Pedido.border_render==undefined){
      let html = '<div id="border-task"></div>'
      Pedido.border_render = createHtmlElement(html)
    }
    return Pedido.border_render
  }
}