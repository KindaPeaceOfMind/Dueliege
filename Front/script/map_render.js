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
	'p1':[31,3],
	'p2':[31,21],
	'p3':[3,3],
	'p4':[3,21]
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

function pointWalls(x,y){
	function wallAtts(){
		this.type='wall';
		// this.img='img1';
	}
	map[map.sizeX*x+y] = new wallAtts;
}
for(let j=5; j<map.sizeX-5; j++){
	pointWalls(12,j)
	pointWalls(34-12,j)
	pointWalls(9,j)
	pointWalls(34-9,j)
	
}
for(let i=13; i<map.sizeY-13; i++){
	pointWalls(i,18)
	pointWalls(i,13)
	pointWalls(i,11)
}
for(let i=0; i<map.sizeY; i++){
	if(i>0 && i<7){
		pointWalls(15,i)
		pointWalls(34-15,i)
	}
}

//Серверная часть
////////////////////////////////////////////////////////////////////////////////////////////
//Клиентская часть

//Получили карту fetch(){} => map

///Рендер карты с атрибутами     //строка-столб
let body = document.querySelector('.body');
let table = document.createElement('table');


for (let i = 0; i < map.sizeY; i++)//Строка
{
	let tr = document.createElement('tr');
	for (let j = 0; j < map.sizeX; j++)//Столбец
	{
		let td = document.createElement('td');
		td.id = i + "-" + j; //ID y-x
		td.classList.add(i + "-" + j);
		td.addEventListener('click', ClickCell);
		td.addEventListener('mouseover', CellMouseHover);
		tr.appendChild(td);

		AttributeGetter(td, map[i*map.sizeX+j]);//Запихнули в каждый td атрибуты полученной карты
			function AttributeGetter(td, mapCell){//Даёт td все атрибуты объекта mapCell
				for(attr in mapCell){
					td.setAttribute(attr, mapCell[attr]);
					if(attr=='type' && mapCell[attr] == 'wall'){
						td.hp = 10;
					}
				}
			}
	}
	table.appendChild(tr);
}
body.appendChild(table);
//Создали таблицу в HTML
//Клетка = {type, img [, поверхность, баффы, ловушки, ...]}


let tableEffects = document.createElement('div');//div для эффектов на таблице
tableEffects.classList.add('tableEffects');
table.appendChild(tableEffects);

let hoverEffects = document.createElement('div');
hoverEffects.classList.add('hoverEffects');
tableEffects.appendChild(hoverEffects);


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