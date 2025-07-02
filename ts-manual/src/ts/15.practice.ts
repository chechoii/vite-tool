import type { Pokemon } from "./type";




const END_POINT = 'https://pokeapi.co/api/v2/pokemon/3';



// fetchData 함수를 만들고 타입을 지정해주세요.


async function fetchData(url:string):Promise<Pokemon>{
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


fetchData(END_POINT)

// 0702~


// createCard
function createCard({sprites,name}:Pick<Pokemon,'sprites'|'name'>):string{
  const tag = `
    <div class="card">
      <img src="${sprites['front_default']}" alt="${name}" />
      <h2${name}></h2>
    </div>
  `
  return tag
}



// renderCard
function renderCard(target:HTMLElement | null, data:Pokemon):void{

 /*  if(target){
    target.insertAdjacentHTML('beforeend', createCard(data));
  } */
//  target?.insertAdjacentHTML('beforeend', createCard(data));
 target && target.insertAdjacentHTML('beforeend', createCard(data));
  
}

//

function fetchPokemon(){
  const arr:Promise<Pokemon>[] = [];

  Array(10).fill(null).forEach((_,i)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`
    arr.push(fetch(url).then((res)=>res.json()))
  })

  return arr;
}

function createPokemonObject(arr:Promise<Pokemon>[]){
  let pokemon:unknown;

  Promise.all(arr).then((all)=>{
    pokemon = all.map((p)=>{
      return {
        name:p.name,
        image:p.sprites['front_default'],
      }
    })
  })
  return pokemon;
}

// const data = [{name:'', image:''},{name:'', image:''},{name:'', image:''},{name:'', image:''},{name:'', image:''},]

createPokemonObject(fetchPokemon())
















