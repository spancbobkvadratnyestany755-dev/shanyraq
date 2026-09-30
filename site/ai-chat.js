'use strict';
(() => {
  let busy=false;
  const history=[];
  const note=$('.composer-note');
  note.textContent='OpenAI · анализ демоданных · 750 м';
  const status=$('.assistant-head .status');
  if(status)status.textContent='ИИ подключается к локальному серверу';
  fetch('/api/status').then(r=>r.json()).then(s=>{if(status)status.textContent=s.configured?'OpenAI · ключ задан, проверка при первом вопросе':'Нужно ввести ключ при запуске';}).catch(()=>{if(status)status.textContent='Сервер недоступен'});
  const switcher=addSourceSwitch;
  addSourceSwitch=function(){switcher();const box=$('#sourceSwitch');if(box){box.querySelectorAll('button').forEach(b=>b.hidden=true);const p=box.querySelector('p');if(p)p.textContent='Для ИИ используются вымышленные точки в радиусе 750 м.'}};
  surroundingsMode='demo';
  function context(){
    const summarize=x=>{
      const points=demoPlaces(x).filter(p=>distance(p.coords,coords(x))<=750);
      const counts={};for(const p of points)counts[p.group]=(counts[p.group]||0)+1;
      return {id:x.id,title:x.title,kind:x.kind,deal:x.deal,price:x.price,area:x.area,district:x.district,rooms:x.rooms,floor:x.floor,floors:x.floors,condition:x.condition,features:x.features,rating:x.rating,latitude:x.latitude,longitude:x.longitude,demo_nearby_counts:counts};
    };
    return {data_source:'fictional_demo',radius_m:750,selected_id:selected?.id||null,visible_ids:rows.map(x=>x.id),listings:demoRows.map(summarize),selected_points:selected?demoPlaces(selected).map(p=>({name:p.tags.name,category:p.group,distance_m:Math.round(distance(p.coords,coords(selected)))})).filter(p=>p.distance_m<=750):[]};
  }
  chat=async function(text){
    text=text.trim();if(!text||busy)return;
    if(text.length>3000){message('Сократите вопрос до 3000 символов.');return}
    busy=true;message(text,true);
    const pending=document.createElement('div');pending.className='bubble';pending.textContent='ИИ изучает объявления и демоокружение…';pending.setAttribute('role','status');$('#messages').append(pending);
    note.textContent='Ждём ответ OpenAI…';
    const selectedAtStart=selected?.id||null;
    try{
      const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,history,context:context()}),signal:AbortSignal.timeout(70000)});
      const data=await response.json();if(!response.ok)throw Error(data.error||'Ошибка сервера');
      let applied=false;
      if((selected?.id||null)===selectedAtStart){
        if(data.listing_id){const x=demoRows.find(x=>x.id===data.listing_id);if(x){openDetail(x);applied=true}}
        if(data.highlight&&Object.hasOwn(groups,data.highlight)&&selected){category=data.highlight;drawPlaces();applied=true}
      }
      message(data.answer);
      if(data.highlight&&applied)message('На карте выбрана категория: '+groups[data.highlight][0]+'. Демо-точки · 750 м.');
      history.push({role:'user',content:text},{role:'assistant',content:data.answer});if(history.length>8)history.splice(0,history.length-8);
      suggestions(['Проанализируй выбранный объект','Какие конкуренты рядом?','Какие есть альтернативы?']);
    }catch(error){message('ИИ не ответил: '+(error.name==='TimeoutError'?'время ожидания истекло. Повторите вопрос.':error.message));}
    finally{pending.remove();busy=false;note.textContent='OpenAI · анализ демоданных · 750 м'}
  };
  const baseOpen=openDetail;
  openDetail=function(x){baseOpen(x);const area=$('#analysisOutput');if(area){area.textContent='Для анализа этого объекта и демоточек нажмите кнопку ниже. Каждый запрос обращается к OpenAI.';const b=document.createElement('button');b.className='primary';b.textContent='Анализ с ИИ';b.onclick=()=>{const query='Проанализируй выбранный объект «'+x.title+'» и окружение в радиусе 750 м'+(idea!=='all'?'. Интересующий формат: '+groups[idea][0]:'')+'. Назови плюсы, ограничения и альтернативы.';close('detailOverlay');chat(query)};area.after(b)}};
  // Keep the exact numeric overview; natural-language analysis is requested explicitly.
  analyse=function(){if(!selected)return '';const counts={};for(const p of demoPlaces(selected))counts[p.group]=(counts[p.group]||0)+1;const text='Демоокружение · 750 м\n'+Object.entries(counts).map(([k,n])=>groups[k][0]+': '+n).join('\n')+'\nДля выводов нажмите «Анализ с ИИ».';const output=$('#analysisOutput');if(output)output.textContent=text;return text};
  message('Теперь здесь настоящий ИИ. Выберите карточку и спросите о квартире, конкурентах или бизнесе. Я получаю параметры и демоточки, а не реальные измерения проходимости.');
})();
