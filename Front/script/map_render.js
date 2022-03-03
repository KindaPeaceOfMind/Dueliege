//Получили вот такой массив карты: 
//    3x2
//   [{},{},{},
//    {},{},{}]
//  25x35  
let map = [];
map.sizeX = 25;//Размер
map.sizeY = 35;

//Спавн Игроков
map.PlayersLocation = {
	'p1':[4,22],
	'p2':[2,15],
	'p3':[1,1],
	'p4':[0,2]
};

for(let i=0; i<map.sizeY; i++){//Заполнили карту пустотой
    for(let j=0; j<map.sizeX; j++){
        map.push(
			{'type':''}
		);
    }
}
//Клетка = {type, img [, поверхность, баффы, ловушки, ...]}

//Создали стенку на 34 строке
for(let j=1; j<map.sizeX-4; j++){
	map[map.sizeX*33+j] = {'type':'wall', 'img':'img1'};
}
for(let i=1; i<map.sizeY-1; i++){
	map[map.sizeX*i+1] = {'type':'wall', 'img':'img1'};
}

//Серверная часть
////////////////////////////////////////////////////////////////////////////////////////////
//Клиентская часть

//Получили карту fetch(){} => map

///Рендер карты с атрибутами     //строка-столб
let body = document.querySelector('.body');
let table = document.createElement('table');

let tableEffects = document.createElement('div');//div для эффектов на таблице
tableEffects.classList.add('tableEffects');
table.appendChild(tableEffects);

for (let i = 0; i < map.sizeY; i++)//Строка
{
	let tr = document.createElement('tr');
	for (let j = 0; j < map.sizeX; j++)//Столбец
	{
		let td = document.createElement('td');
		
		AttributeGetter(td, map[i*map.sizeX+j]);//Запихнули в каждый td атрибуты полученной карты

		tr.appendChild(td);
		td.id = i + "-" + j; //ID i-j
		td.classList.add(i + "-" + j);
		td.addEventListener('click', ClickCell);
		td.addEventListener('mouseover', CellMouseHover);
	}
	table.appendChild(tr);
}
body.appendChild(table);
//Создали таблицу в HTML
//Клетка = {type, img [, поверхность, баффы, ловушки, ...]}

function AttributeGetter(td, mapCell){//Даёт td все атрибуты объекта mapCell
	for(attr in mapCell){
		td.setAttribute(attr, mapCell[attr]);
	}
}

//Создание стен
for(let i=0; i<map.sizeY; i++){
    for(let j=0; j<map.sizeX; j++){
		if(map[map.sizeX*i+j].type == 'wall'){//Если клетка - стена
			WallCreate(i,j,'StoneBricks.png')
		}
	}
}

/**
 * Создаёт стены и потолок на клетке по координатам y-x
 * с текстурой image
 */
function WallCreate(y,x,image) {
	//Восток
	let wall1 = document.createElement('div');
	wall1.style.width = '26px';
	wall1.style.height = '22px';
	wall1.style.backgroundImage = 'url("media/sprites/objects/walls/'+image+'")';
	wall1.style.position = 'absolute';
	wall1.style.left = (48*x+22)+'px';
	wall1.style.top = 28*y-15+'px';
	wall1.style.transform = 'rotateZ(-90deg) skewX(-58deg)';
	wall1.id = y+'-'+x+'-wall1';
	wall1.classList.add(y+'-'+x,'wall1');
	table.appendChild(wall1);
	wall1.addEventListener('click', ClickCell);
	wall1.addEventListener('mouseover', CellMouseHover);
	//Юг
	let wall2 = document.createElement('div');
	wall2.style.width = '46px';
	wall2.style.height = '36px';
	wall2.style.backgroundImage = 'url("media/sprites/objects/walls/'+image+'")';
	wall2.style.position = 'absolute';
	wall2.style.left = 48*x-12+'px';
	wall2.style.top = 28*y-8+'px';
	wall2.id = y+'-'+x+'-wall2';
	wall2.classList.add(y+'-'+x,'wall2');
	table.appendChild(wall2);
	wall2.addEventListener('click', ClickCell);
	wall2.addEventListener('mouseover', CellMouseHover);
	//Крыша
	let wall3 = document.createElement('div');
	wall3.style.width = '28px';
	wall3.style.height = '46px';
	wall3.style.backgroundImage = 'url("media/sprites/objects/walls/'+image+'")';
	wall3.style.position = 'absolute';
	wall3.style.left = (48*x-14)+'px';
	wall3.style.top = 28*y-45+'px';
	wall3.style.transform = 'rotateZ(-90deg)';
	//Функция для выключения на секунду при наведении
	wall3.addEventListener('mouseover', ()=>{
		if (map[map.sizeX*(y-1)+x].type != 'wall'){
			wall3.style.display='none';
			setTimeout(()=>{wall3.style.display=''},1000);
		}
	});
	wall3.id = y+'-'+x+'-wall3';
	wall3.classList.add(y+'-'+x,'wall3');
	table.appendChild(wall3);
	wall3.addEventListener('click', ClickCell);
	wall3.addEventListener('mouseover', CellMouseHover);
}