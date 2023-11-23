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
  add_ing(ev)
}
function add_ing(ev){
  ev.target.offsetParent.classList.add("check_ingredient")
}
function addTask(){
    let ts = createTaskHtml("c2");
    let th = createHtmlElemnt(ts);
    let task_desk = document.getElementById("task_desk");
    task_desk.append(th)
}

/**
 * 
 * @param {String} html 
 * @returns {Element}
 */
function createHtmlElemnt(html){
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