import {StorageKey , type TodoList} from "./type";


export function saveStorage(todos:TodoList):void{
     localStorage.setItem(StorageKey.TODOS, JSON.stringify(todos));
}

// loadStorage 함수를 만들고 storage안에 있는 데이터를 꺼낼 수 있게
// 꺼낸 데이터를 화면에 렌더링 해주세요.

export function loadStorage():TodoList{
    const data = localStorage.getItem(StorageKey.TODOS);
    return data ? JSON.parse(data) : [];
}
