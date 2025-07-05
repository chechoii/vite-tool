import { renderMemo, type MemoData } from "../card";
import { main } from "../main";
import gsap from "gsap";
import type { Tables } from "../supabase/database.types";
// import type { Database, Tables } from "../supabase/database.types"
import { supabase } from "../supabase/supabase";


export async function fetchMemo() {
  const { data, error } = await supabase
  .from("memo")
  .select()
  .order('position',{ascending:true})

  main.innerHTML = "";
  // let a:Database['public']['Tables']['memo']['Row']
  // let a:Tables<'memo'>['priority']

  data &&
    data.forEach((d) => {
      renderMemo(main, d);
    });
}

export async function deleteMemo(id: number) {
  const response = await supabase.from("memo").delete().eq("id", id).select();

  fetchMemo();
  sortMemo();
}

export async function insertMemo({
  title,
  description,
  priority,
  position
}: Pick<Tables<"memo">,'title'|'description'|'priority'|'position'>) {


  const {error} = await supabase.from('memo').insert({
    title,
    description,
    priority,
    position
  })


  fetchMemo()

  const tl = gsap.timeline()
  .to('.pop',{y:'100%', ease:'power3.inOut'})
  .to('#dialog',{autoAlpha:0,duration:0.2})


}

export function sortMemo(){

  const sortedItems = document.querySelectorAll('article');

  sortedItems.forEach(async(item,index)=>{
    const { error } = await supabase
    .from('memo')
    .update({position:index})
    .eq('id',+item.dataset.id!)

    console.log( error );
    
  })
  
}