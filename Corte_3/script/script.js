const ingredientType = "application/ing"
const input = document.getElementById("input")
const taskDesk = document.getElementById("task_desk")
document.body.onload = addTask
const isIngredient = (ev)=> ev.dataTransfer.types.includes(ingredientType)
function ingDragStart(ev){
  ev.dataTransfer.setData(ingredientType,ev.target.src)
  ev.dataTransfer.setData("text/plain",ev.target.id)
}
function dishDragEnter(ev){
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
    //console.log(`${id_ing}, ${ID_pedido}`)
    let ingrediente = ev.dataTransfer.getData(ingredientType).split("/").pop()
    let ing_html_id = ev.dataTransfer.getData("text/plain")
    let ing_html = document.getElementById(ing_html_id)
    //console.log(ingrediente)
    ID_pedido = parseInt(ID_pedido)
    
    if (id_ing === "molde"){
      let result = pedidos[ID_pedido-1].checkMolde(ingrediente)
      if (result === Pedido._true){
        ev.target.parentElement.classList.add("check_ingredient")
        ing_html.style.opacity = "0"
      }else if (result === Pedido.done){
        ev.target.parentElement.classList.add("check_ingredient")
        console.log(`Pedido ${ID_pedido} Terminado`)
      }else {
        console.log("noes")
        ev.target.classList.remove("drop-active")
      }
    }else if(id_ing === "crema"){
      let result = pedidos[ID_pedido-1].checkCrema(ingrediente)
      if (result === Pedido._true){
        ev.target.parentElement.classList.add("check_ingredient")
        ing_html.style.opacity = "0"
      }else if (result === Pedido.done){
        ev.target.parentElement.classList.add("check_ingredient")
        console.log(`Pedido ${ID_pedido} Terminado`)
      }else {
        ev.target.classList.remove("drop-active")
      }
    }else if(id_ing === "topping"){
      let result = pedidos[ID_pedido-1].checkTopping(ingrediente)
      if (result === Pedido._true){
        ev.target.parentElement.classList.add("check_ingredient")
        ing_html.style.opacity = "0"
      }else if (result === Pedido.done){
        ev.target.parentElement.classList.add("check_ingredient")
        console.log(`Pedido ${ID_pedido} Terminado`)
      }else {
        ev.target.classList.remove("drop-active")
      }
    }
  }
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


function addTask(){
  //setTimeout(addTask,10000)
  console.log("Pedido creado")
  let next_pedido = Pedido.crear()
  input.appendChild(next_pedido.renderizar())
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
                <label ondragenter="dishDragEnter(event) ondragleave="dishDragLeave(event)">
                    <img class="ingredient_blueprint" src="./images/${this.crema}">
                    <div id="crema-${this.ID}" class="drop-zone" ondragover="dragOver(event)" ondrop="dishDrop(event)"></div>
                </label>
                <label ondragenter="dishDragEnter(event) ondragleave="dishDragLeave(event)">
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