//document.body.onload = addTask
function drag_enter(ev){
  console.log(ev)
  ev.target.classList.add("drop-active")
}
function drag_leave(ev){
  ev.target.classList.remove("drop-active")
}
function drag_over(ev){
  ev.preventDefault();
}
function drop(ev){
  console.log(ev)
  ev.preventDefault();
  /*TODO Comparar informacion de llegada con informacion del pedidido
    puede hacerce con el ID del lugar del drop (ingrediente-ID_pedidio)
    y separar por ingrediente y pedidio, por que el drop solo sucede en una drop zone
    y estas estan limitadas
  */
  add_ing(ev)
}
function add_ing(ev){
  ev.target.offsetParent.classList.add("check_ingredient")
}

let ing = 0
function showIng(ev){
  console.log(ev)
  let ings = ev.target.getElementsByTagName("img")
  ings[ing].classList.add("show")

}


function addTask(){
    let ts = createTaskHtml("c2");
    let th = createHtmlElement(ts);
    let task_desk = document.getElementById("task_desk");
    task_desk.append(th)
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

/**
 * 
 * @param {String} id 
 * @returns {String}
 */
function createTaskHtml(id){
    return `<div class="task" id=${id}>
    <img class="cupcake_blueprint" src="./images/placeholder.png">
    <label><input type="checkbox" class="cup_check">Cup</label>
    <label><input type="checkbox" class="bread_check">Bread</label>
    <label><input type="checkbox" class="topping_check">Topping</label>
    </div>`
}

function moveTasks(ev){
    let task_desk = document.getElementById("task_desk")
    if (ev.target.checked){
      let el = task_desk.getElementsByClassName("task");
      for(let i = 0; i<el.length; i++){
        el[i].style.right = "100%"
      }
    }else {
      let el = task_desk.getElementsByClassName("task");
      for(let i = 0; i<el.length; i++){
        el[i].style.right = "0"
      }
    }
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

class Fruta extends Ingrediente {
  static choices = ["FRUTA1.png", "FRUTA2.png", "FRUTA3.png", "FRUTA4.png", "FRUTA5.png", "TOPPING1.png", "TOPPING2.png", "TOPPING3.png"]
  /**
   * 
   * @returns {String} Fruta src
   */
  static get_one(){
    return Fruta.choices[super.get_one(Fruta.choices.length)]
  }
}

let pedidos = []
class Pedido {
  static next_id = 0
  static crear() {
    let p = new Pedido()
    pedidos.push(p)
    return p
  }
  static done = 2
  static _true = 1
  constructor(){
    this.ID = ++Pedido.next_id
    this.seleccionarIngredientes()
    this.check_molde = false
    this.check_crema = false
    this.check_fruta = false
  }
  seleccionarIngredientes(){
    this.molde = Molde.get_one()
    this.crema = Crema.get_one()
    this.fruta = Fruta.get_one() 
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
   * @param {String} option Fruta a verificar
   * @returns Código de verificación o falso
   */
  checkFruta(option){
    if (option === this.fruta){
      this.check_fruta = true
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
    return this.check_molde && this.check_crema && this.check_fruta
  }
  /**
   * 
   * @returns Pedido como Nodo Html
   */
  renderizar(){
    let html = `<div class="task" id="${this.ID}"><!--Terminado esto-->
                <div class="cupcake_blueprint">
                    <img src="./images/${this.molde}">
                    <img src="./images/${this.crema}">
                    <img src="./images/${this.fruta}">
                </div>
                <label ondragenter="drag_enter(event)" ondragleave="drag_leave(event)" >
                    <img class="ingredient_blueprint" src="./images/${this.molde}">
                    <div id="molde-${this.ID}" class="drop-zone" ondragover="drag_over(event)" ondrop="drop(event)"></div>
                </label>
                <label ondragenter="drag_enter(event)">
                    <img class="ingredient_blueprint" src="./images/${this.crema}">
                    <div id="crema-${this.ID}" class="drop-zone" ondragover="drag_over(event)" ondrop="drop(event)"></div>
                </label>
                <label ondragenter="drag_enter(event)">
                    <img class="ingredient_blueprint" src="./images/${this.fruta}">
                    <div id="fruta-${this.ID}" class="drop-zone" ondragover="drag_over(event)" ondrop="drop(event)"></div>
                </label>
            </div>`
    return createHtmlElement(html)
  }
}