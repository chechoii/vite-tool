/* 

1. todolist 구조를 가진 태그를 만들어서 화면에 렌더링 해주세요.
2. css module을 사용해 스타일링을 해주세요.
3. 생성된 DOM 요소를 잡아 submit 이벤트 바인딩(handleSubmit) 해주세요.
4. input의 value값을 가져와주세요.
5. render 함수를 만들어 아이템을 appendChild를 사용해 랜더링 해주세요.

*/
import { loadStorage } from "./storage";
import { addTodo, deleteTodo, toggleTodo, updateTodo } from "./todo";
import type { Todo, TodoList } from "./type";
import S from "/src/style.module.css";
// console.log(S);

// 1️⃣ HTML 생성 및 삽입
const tag = `
  <div class="${S.container}">
        <form>
          <label for="todo">할 일 :</label>
          <input type="text" id="todo" />
          <button type="submit">추가</button>
        </form>
        <hr />
        <ul id="renderPlace">


        </ul>
  </div>
`

document.querySelector("#app")?.insertAdjacentHTML("beforeend", tag);

// 2️⃣ 폼 요소, 리스트 요소, input 요소 잡기
const input = document.querySelector("#todo") as HTMLInputElement;
const list = document.querySelector("#renderPlace") as HTMLUListElement;
const form = document.querySelector("form") 

// 3️⃣ 할 일 추가 (handleSubmit)
function handleSubmit(e:SubmitEvent){
  e.preventDefault();
  const value = input.value.trim();
  if(!value) return;
  addTodo(value)
  input.value = '';
  // console.log("submit~")
  // console.log(input.value)
  render()
}


// 삭제 버튼을 클릭했을 때 데이터 삭제
// 1. 버튼을 선택합니다.
// 2. 버튼에 클릭 이벤트 바인딩
// 3. 선택 항목 제거 (filter)
// 4. 스토리지 저장
// 5. 리렌더링

/* function handleDelete(e){
  const target = e.target;
  if(target.classList.contains("delete")){
    const li = target.closest("li");
    const id = li.dataset.id;
    if(!id) return;


  }
} */

// todos 데이터를 2개 이상 추가해서 리스트 렌더링 바꿔주세요.

// 4️⃣ 렌더링 함수 (render)
function render(){

  const todos:TodoList = loadStorage();

  list.innerHTML = '';

  todos.forEach((todo:Todo) => {
    const li = document.createElement("li");
    li.dataset.id = String(todo.id);
    li.innerHTML = `
    <input name="checkbox" type="checkbox" ${todo.completed ? "checked" : ""} />
    <span contenteditable="true">${todo.content}</span>
    <button type="button" class="delete">삭제</button>
  `

  // console.log(li);
  list.appendChild(li)

  /* after : 삭제버튼 여기서 만들기!!! */
  const btn = li.querySelector('button')!;
  const checkbox = li.querySelector('input[type="checkbox"]')!;
  const span = li.querySelector('span')!;

  btn.addEventListener("click", () => {

    const id = todo.id;
    // console.log(todo.id);
    deleteTodo(id);
    render();
  })

  checkbox.addEventListener("change", ()=>{
    const id = todo.id;
    // 배열을 반환 => 기존 데이터 배열 (해당 id 아이템을 찾아서 completed를 !completed로 )
    /* todos.map(todo => 
      todo.id === id ? {...todo, completed:!todo.completed} : todo
    ) */

      toggleTodo(id);
      render()
  })

  span.addEventListener('blur', () => { // input창의 focus를 out : blur
    // span의 글자 가져오기 (textContent)
    // updateTodo()
    // render()
    const newContent = span.textContent?.trim() || "";
    if(newContent && newContent !== todo.content){
      updateTodo(todo.id, newContent)
      render()
    }
    /* const textContent = span.textContent?.trim();
    if(!textContent) return;
    updateTodo(todo.id, textContent);
    render(); */

  })

  })

}

// 5️⃣ 최초 렌더링 + submit 이벤트 바인딩
render()
form?.addEventListener("submit", handleSubmit);
// list.addEventListener("click", handleDelete);