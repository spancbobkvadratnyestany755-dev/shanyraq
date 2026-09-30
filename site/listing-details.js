'use strict';
const propertySpecs=[
['Студия с уютной кухней','apartment-studio',32,1,3,9,2018,'Косметический', 'Балкон, мебель, кондиционер'],
['Офис для команды у метро','business-office',72,3,2,5,2016,'Готов к работе','Переговорная, интернет, парковка'],
['Лофт с высокими потолками','apartment-loft',68,2,5,7,2020,'Дизайнерский','Потолки 3,4 м, гардеробная'],
['Магазин с витринным фасадом','business-retail',58,1,1,9,2019,'Чистовая отделка','Отдельный вход, витрины, 15 кВт'],
['Кирпичный дом с садом','house-brick',124,4,1,1,2012,'Хорошее состояние','Участок 6 соток, сад, навес'],
['Студия для занятий и курсов','business-studio',96,2,2,4,2021,'Свежий ремонт','Зал 65 м², санузел, раздевалка'],
['Семейная квартира с обеденной зоной','apartment-family',87,3,4,12,2017,'Современный','Два санузла, лоджия, детская'],
['Склад с удобной разгрузкой','business-warehouse',180,2,1,1,2015,'Рабочее состояние','Ворота 3 м, подъезд, 30 кВт'],
['Квартира с тёплым интерьером','apartment-classic',54,2,3,5,1988,'Обновлённый','Раздельная кухня, балкон'],
['Светлый кабинет для консультаций','business-office',38,2,3,6,2011,'Косметический','Зона ожидания, лифт, интернет'],
['Современный дом с террасой','house-modern',186,5,1,2,2023,'Новый ремонт','Участок 8 соток, терраса, гараж'],
['Небольшой магазин у жилого квартала','business-retail',43,1,1,7,2009,'Требует обновления','Отдельный вход, санузел, 10 кВт'],
['Квартира с панорамными окнами','apartment-modern',112,3,11,16,2024,'Премиальный','Два санузла, гардеробная, паркинг'],
['Зал для творческой мастерской','business-studio',83,2,2,3,2006,'Базовая отделка','Мокрая точка, большие окна'],
['Компактная квартира для одного','apartment-studio',29,1,2,9,2014,'Хорошее состояние','Мебель, техника, лифт'],
['Тёплый склад для интернет-магазина','business-warehouse',145,2,1,2,2013,'Рабочее состояние','Отопление, охрана, зона упаковки'],
['Коттедж с тихим двориком','house-cottage',95,3,1,1,2010,'Косметический','Участок 5 соток, двор, кладовая'],
['Офис с отдельной переговорной','business-office',104,4,4,8,2022,'Готов к работе','Лифт, кондиционеры, кухня'],
['Просторная квартира в стиле лофт','apartment-loft',76,2,6,8,2021,'Дизайнерский','Кухня-гостиная, высокие потолки'],
['Торговая площадь для шоурума','business-retail',92,2,1,10,2020,'Чистовая отделка','Два входа, витрины, 20 кВт'],
['Трёхкомнатная квартира для семьи','apartment-family',93,3,7,12,2019,'Современный','Детская, лоджия, закрытый двор'],
['Помещение для салона по записи','business-studio',64,3,1,6,2018,'Хорошее состояние','Мокрые точки, отдельный вход'],
['Дом для большой семьи','house-brick',152,5,1,1,2008,'Требует обновления','Участок 9 соток, сад, мастерская'],
['Склад с небольшой офисной зоной','business-warehouse',240,3,1,1,2017,'Рабочее состояние','Разгрузка, офис 24 м², 40 кВт'],
['Двухкомнатная квартира с балконом','apartment-classic',61,2,4,5,1994,'Обновлённый','Отдельная кухня, кладовая'],
['Офис для старта своего дела','business-office',46,2,2,4,2004,'Базовый ремонт','Интернет, два кабинета'],
['Квартира с видом на горы','apartment-modern',128,4,14,18,2025,'Премиальный','Панорамные окна, два санузла'],
['Угловое помещение для магазина','business-retail',118,3,1,12,2023,'Новая отделка','Угловая витрина, склад, 25 кВт'],
['Двухэтажный дом с зелёным двором','house-modern',214,6,1,2,2022,'Современный','Участок 10 соток, терраса, гараж'],
['Пространство для йоги и танцев','business-studio',132,3,2,5,2020,'Свежий ремонт','Зал 90 м², душевые, вентиляция'],
['Небольшая студия после ремонта','apartment-studio',36,1,8,10,2021,'Новый ремонт','Мебель, техника, вид на двор'],
['Склад для локальной доставки','business-warehouse',310,3,1,1,2011,'Требует обновления','Двое ворот, подъезд, 50 кВт'],
['Квартира с просторной гостиной','apartment-family',101,4,5,9,2016,'Хорошее состояние','Кухня 15 м², две лоджии'],
['Офис для небольшой студии','business-office',57,2,3,7,2015,'Современный','Кондиционер, лифт, зона отдыха'],
['Одноэтажный дом с участком','house-cottage',108,4,1,1,2014,'Хорошее состояние','Участок 7 соток, веранда, сад']
];
const ratingKeys=['Состояние','Планировка','Удобства','Расположение','Цена'];
demoRows.forEach((x,i)=>{const [title,asset,area,rooms,floor,floors,year,condition,features]=propertySpecs[i];const house=asset.startsWith('house-');const criteria=ratingKeys.map((_,j)=>Number((2.4+((i*7+j*11)%27)/10).toFixed(1)));Object.assign(x,{title,asset,area,rooms,floor,floors,year,condition,features,propertyType:house?'Дом':x.kind==='home'?'Квартира':'Помещение',ratingCriteria:criteria,rating:Number((criteria.reduce((a,b)=>a+b,0)/5).toFixed(1))});x.description=`${title}. ${area} м², ${rooms} ${x.kind==='business'?'зоны':'комн.'}. ${house?floors+' этаж(а)':floor+' этаж из '+floors}. Год постройки: ${year}. Состояние: ${condition.toLowerCase()}.\n${features}.\n${x.kind==='business'?'Проверьте пригодность помещения для вашего формата бизнеса.':'Планировка и удобства показаны для знакомства с сервисом.'}\nДемонстрационное объявление: все параметры и цена вымышлены. Фото создано ИИ и не изображает объект по указанному адресу.`});
photoUrl=x=>'assets/'+x.asset+'.png';
function scoreLabel(x){return x.rating.toFixed(1)+' / 5.0'}
const baseRender=render;
render=function(){baseRender();document.querySelectorAll('#cards [data-id]').forEach(card=>{const x=rows.find(x=>x.id===card.dataset.id);if(!x)return;const tag=card.querySelector('.tag');tag.textContent=x.propertyType.toUpperCase();const photo=card.querySelector('.photo');const badge=document.createElement('span');badge.className='rating-badge';badge.textContent='★ '+scoreLabel(x);badge.title='Демонстрационная оценка Shanyraq. Не отзывы пользователей.';photo.append(badge);const ai=document.createElement('span');ai.className='ai-photo-label';ai.textContent='Фото создано ИИ';photo.append(ai);const meta=document.createElement('p');meta.className='listing-meta';meta.textContent=`${x.rooms} ${x.kind==='business'?'зоны':'комн.'} · ${x.propertyType==='Дом'?x.floors+' эт.':x.floor+'/'+x.floors+' этаж'} · ${x.condition}`;card.querySelector('.address').after(meta);const image=card.querySelector('img');if(image)image.alt=x.title+' — изображение создано ИИ';})};
const baseDetails=openDetail;
openDetail=function(x){baseDetails(x);const panel=document.createElement('section');panel.className='property-specs';const entries=[['Тип',x.propertyType],['Площадь',x.area+' м²'],[x.kind==='business'?'Зоны':'Комнаты',x.rooms],['Этажность',x.propertyType==='Дом'?x.floors+' этаж(а)':x.floor+' из '+x.floors],['Год постройки',x.year],['Состояние',x.condition]];panel.innerHTML=`<div class="rating-summary"><strong>★ ${scoreLabel(x)}</strong><span>Оценка Shanyraq · демо</span></div><dl>${entries.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl><p>${esc(x.features)}</p><details><summary>Из чего складывается оценка?</summary><p>Среднее пяти вымышленных критериев по шкале 1.0–5.0. Это пример работы рейтинга, а не экспертиза и не отзывы жильцов.</p>${ratingKeys.map((k,j)=>`<div class="score-row"><span>${k}</span><meter min="1" max="5" value="${x.ratingCriteria[j]}"></meter><b>${x.ratingCriteria[j].toFixed(1)}</b></div>`).join('')}</details><small>Изображение создано ИИ. Параметры объекта вымышлены.</small>`;$('#detailBody .detail-grid > div').insertBefore(panel,$('#detailBody .price'));};
const baseLoad=loadListings;
loadListings=async function(){await baseLoad();if($('#sort').value==='rating'){rows.sort((a,b)=>b.rating-a.rating);render()}};
const option=document.createElement('option');option.value='rating';option.textContent='Сначала с высокой оценкой';$('#sort').append(option);
const previousChat=chat;
chat=async function(text){const t=text.toLowerCase();if(/оценк|рейтинг|балл/.test(t)){message(text,true);if(/почему|из чего|рассчит/.test(t)&&selected){answer(`${selected.title}: ${scoreLabel(selected)}.\n`+ratingKeys.map((k,i)=>k+': '+selected.ratingCriteria[i].toFixed(1)).join('\n')+'\nИтог — среднее этих пяти демо-критериев, а не реальные отзывы.');return}$('#sort').value='rating';await loadListings();if(rows.length)openDetail(rows[0]);answer(rows.length?'В текущей подборке наибольшая демонстрационная оценка у «'+rows[0].title+'»: '+scoreLabel(rows[0])+'. Открыл карточку с характеристиками.':'Подборка пуста. Сбросьте фильтры.',['Почему такая оценка?','Сравни варианты','Другой вариант']);return}if(/характерист|сколько комнат|какой этаж|какая площадь/.test(t)){message(text,true);if(!ensureSelection())return;answer(selected.description,['Почему такая оценка?','Другой вариант']);return}await previousChat(text)};
const ratingStyle=document.createElement('style');ratingStyle.textContent='.rating-badge{position:absolute;top:12px;right:12px;background:#fff;color:#185b49;padding:7px 10px;border-radius:9px;font-size:13px;font-weight:800;box-shadow:0 2px 12px #0002}.ai-photo-label{position:absolute;bottom:10px;left:10px;background:#172e29b8;color:white;border-radius:5px;padding:4px 7px;font-size:10px}.photo .match{display:none}.listing-meta{font-size:12px;line-height:1.6;color:#587067;margin:8px 0}.property-specs{margin:14px 0 20px}.rating-summary{display:flex;gap:12px;align-items:center;background:#edf6ef;padding:13px;border-radius:12px}.rating-summary strong{font-size:22px;color:#185b49}.rating-summary span{font-size:12px}.property-specs dl{display:grid;grid-template-columns:1fr 1fr;gap:14px}.property-specs dt{color:#718178;font-size:12px}.property-specs dd{margin:5px 0;font-size:14px;font-weight:600}.property-specs details{padding:12px;background:#f4f6f3;border-radius:10px;margin:14px 0}.property-specs summary{cursor:pointer;font-weight:600;font-size:13px}.property-specs details p,.property-specs small{font-size:12px;line-height:1.6;color:#65796e}.score-row{display:grid;grid-template-columns:1fr 75px 28px;gap:8px;align-items:center;font-size:12px;margin:8px 0}.score-row meter{width:75px}';document.head.append(ratingStyle);
loadListings();
