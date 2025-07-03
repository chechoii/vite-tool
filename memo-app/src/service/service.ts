import { renderMemo, type MemoData } from "../card";
import {main} from "../main";
import gsap from "gsap";
import type { Tables } from "../supabase/database.types";
// import type { Database, Tables } from "../supabase/database.types";
import { supabase } from "../supabase/supabase";

export async function fetchMemo(){

  const {data, error} = await supabase.from('memo').select();

  main.innerHTML = '';

  // let a:Tables<'memo'>['priority']


  data && data.forEach((d)=>{
    renderMemo(main,d);
  })
}


export async function deleteMemo(id:number){
   const {data,error} = await supabase.from('memo').delete().eq('id', Number(id)).select();

   fetchMemo();
   console.log(data);
}

export async function insertMemo({title, description, priority}:Pick<Tables<'memo'>, 'title' | 'description' | 'priority'>){
  const {error} = await supabase.from('memo').insert({
    title,
    description,
    priority
  })

 

  fetchMemo()

  const tl = gsap.timeline()
      .to('#dialog', {autoAlpha:0, duration:0.2})
      .to('.pop', {y:'100%', ease:'power3.inOut'})
  
}