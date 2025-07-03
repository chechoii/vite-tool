import { handleClosePop, handleCreate, handleDelete, handleDragEnd, handleDragOver, handleDragStart, handleOpenPop } from "./handler";
import { fetchMemo } from "./service/service";
import "/src/style.css"




// fetchMemo

export const main = document.querySelector("main") as HTMLElement;
const create = document.querySelector('.create') as HTMLButtonElement;
const done = document.querySelector('.done') as HTMLButtonElement;
const close = document.querySelector(".close") as HTMLButtonElement;


window.addEventListener('DOMContentLoaded', ()=>{
  fetchMemo();
})

main.addEventListener('dragstart', handleDragStart);
main.addEventListener('dragover', handleDragOver);
main.addEventListener('dragend', handleDragEnd);
main.addEventListener('click', handleDelete);

create.addEventListener('click', handleOpenPop);
done.addEventListener('click', handleCreate);
close.addEventListener('click', handleClosePop);



