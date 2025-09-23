const COOKIE_NAME = "todos";
function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days*24*60*60*1000);
  document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/";
}
function getCookie(name) {
  const target = name + "=";
  return document.cookie.split(";").map(c=>c.trim()).reduce((acc,c)=>{
    if (c.indexOf(target) === 0) acc = decodeURIComponent(c.substring(target.length));
    return acc;
  }, "");
}


let todos = []; 
const listEl = document.getElementById("ft_list");
const newBtn = document.getElementById("new_btn");


function loadTodos() {
  try {
    const raw = getCookie(COOKIE_NAME);
    todos = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(todos)) todos = [];
  } catch { todos = []; }
}
function saveTodos() { setCookie(COOKIE_NAME, JSON.stringify(todos)); }


function renderTodos() {
  listEl.innerHTML = "";
  todos.forEach(t => {
    const div = document.createElement("div");
    div.className = "todo";
    div.textContent = t.text;
    div.dataset.id = t.id;
    div.addEventListener("click", onDelete);
    
    listEl.insertBefore(div, listEl.firstChild);
  });
}

function addTodo(text) {
  const trimmed = (text || "").trim();
  if (!trimmed) return;
  todos.unshift({ id: Date.now().toString(), text: trimmed }); 
  saveTodos(); renderTodos();
}
function onDelete(e) {
  const id = e.currentTarget.dataset.id;
  const t = todos.find(x => x.id === id);
  if (confirm(`Remove this TO DO?\n\n${t?.text ?? ""}`)) {
    todos = todos.filter(x => x.id !== id);
    saveTodos(); renderTodos();
  }
}

newBtn.addEventListener("click", () => {
  const txt = prompt("New TO DO");
  addTodo(txt);
});

loadTodos();
renderTodos();
