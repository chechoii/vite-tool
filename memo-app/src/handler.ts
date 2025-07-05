import gsap from "gsap";
import { main } from "./main";
import { deleteMemo, insertMemo, sortMemo } from "./service/service";
import type { Tables } from "./supabase/database.types";
// import { supabase } from "./supabase/supabase";

/* 

1. supabase를 사용해서 DELETE 통신을 하자! 
2. 이벤트 위임 처리 (삭제 버튼을 클릭하면 article의 data-id를 가져오기)
3. supabase .eq(id:가져온ID)

*/




let draggingEl:HTMLElement | null = null;

export function handleDragStart(e:DragEvent){
  const target = e.target as HTMLElement;
  const memo = target.closest('.memo');

  if(memo && e.dataTransfer){

    draggingEl = memo as HTMLElement;
    e.dataTransfer!.effectAllowed = 'move';

    memo.classList.add('dragging');
  }
}

/* 드래그 중이지 않은 엘리먼트를 찾아서 현재 마우스의 위치에 따라 드래그 중이지 않은 엘리먼트의 크기의 절반을 마우스가 넘었다면 그 엘리먼트를 대체하는  */
function getDragAfterElement(container:HTMLElement,y:number):HTMLElement | null{
  const draggableElements = [...container.querySelectorAll('.memo:not(.dragging)')] as HTMLElement[];

  return draggableElements.reduce((closest,child)=>{
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    
    if(offset < 0 && offset > closest.offset){
      return {offset, element:child}
    }else{
      return closest;
    }
  },{offset: -Infinity, element: null as HTMLElement | null}).element;
}

export function handleDragOver(e:DragEvent){
  e.preventDefault();

  const afterElement = getDragAfterElement(main,e.clientY);

  if(!draggingEl) return;

  if(afterElement === null){
    main.appendChild(draggingEl)
  }else{
    main.insertBefore(draggingEl,afterElement)
  }
  
}

export function handleDragEnd(){
  
  if(draggingEl){
    draggingEl.classList.remove('dragging');
    draggingEl = null;
  }

  sortMemo()

}

export async function handleDelete(e:MouseEvent){
  const target = e.target as Element;

  const btn = target.closest('button');
  const article = target.closest('article');

  if(!(btn && article)) return;


  const id = article.dataset.id;

  if(confirm('정말 지울거야..?')){

      deleteMemo(Number(id))
    }
}

export function handleOpenPop(){
  
  const tl = gsap.timeline()
  .to('#dialog',{autoAlpha:1,duration:0.2})
  .to('.pop',{y:0, ease:'power3.inOut'})
  
}

export function handleCreate(e:MouseEvent){
  e.preventDefault();
  

  const title = document.querySelector('#title') as HTMLInputElement;
  const description = document.querySelector('#description') as HTMLInputElement;
  const priority = document.querySelector('#priority') as HTMLSelectElement;

  // title값
  // description값
  // priority값

  insertMemo({
    title:title.value,
    description:description.value,
    priority:priority.value as Tables<'memo'>['priority'],
    position: document.querySelectorAll('article').length

  })

  title.value = '';
  description.value = '';
  priority.value = 'high';
  
}

export function handleClosePop(){
  
    
  const tl = gsap.timeline()
  .to('.pop',{y:'100%', ease:'power3.inOut'})
  .to('#dialog',{autoAlpha:0,duration:0.2})
  
}