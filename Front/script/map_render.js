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

		//Ставим спрайт стены на южной границе клетки
		if(map[map.sizeX*i+j].type == 'wall'){//Если клетка - стена
			//Ставим спрайт стены на восточной границе клетки
			if (map[map.sizeX*(i-1)+j].type != 'wall'){//Если севернее нет другой стены
				let wall1 = document.createElement('div');
				wall1.style.width = '46px';
				wall1.style.height = '36px';
				wall1.style.backgroundColor = 'red';
				wall1.style.position = 'absolute';
				wall1.style.left = 48*j-12+'px';
				wall1.style.top = 28*i-36+'px';
				wall1.addEventListener('mouseover', ()=>{//Функция для выключения стены при наведении
					wall1.style.display='none';
					setTimeout(()=>{wall1.style.display=''},3000);
				});
				wall1.id = i+'-'+j+'-wall1';
				wall1.classList.add('wall1', i+'-'+j);

				table.appendChild(wall1);
				wall1.addEventListener('click', ClickCell);
			}
			if (1){//map[map.sizeX*i+j+1].type != 'wall'){//Если восточнее нет другой стены
				let wall2 = document.createElement('div');
				wall2.style.width = '26px';
				wall2.style.height = '22px';
				wall2.style.backgroundColor = 'green';
				wall2.style.position = 'absolute';
				wall2.style.left = (48*j+22)+'px';
				wall2.style.top = 28*i-15+'px';
				wall2.style.transform = 'rotateZ(-90deg) skewX(-58deg)';
				wall2.id = i+'-'+j+'-wall2';
				wall2.classList.add('wall2', i+'-'+j);

				table.appendChild(wall2);
				wall2.addEventListener('click', ClickCell);
			}
			if (1){//map[map.sizeX*i+j-1].type != 'wall'){//Если западнее нет другой стены
				let wall2 = document.createElement('div');
				wall2.style.width = '26px';
				wall2.style.height = '22px';
				wall2.style.backgroundColor = 'green';
				wall2.style.position = 'absolute';
				wall2.style.left = (48*j-24)+'px';
				wall2.style.top = 28*i-15+'px'; 
				wall2.style.transform = 'rotateZ(-90deg) skewX(-58deg)';
				wall2.id = i+'-'+j+'-wall2';
				wall2.classList.add('wall2', i+'-'+j);

				table.appendChild(wall2);
				wall2.addEventListener('click', ClickCell);
			}
			if (1){
				let wall1 = document.createElement('div');
				wall1.style.width = '46px';
				wall1.style.height = '36px';
				wall1.style.backgroundColor = 'red';
				wall1.style.position = 'absolute';
				wall1.style.left = 48*j-12+'px';
				wall1.style.top = 28*i-8+'px'; 
				wall1.id = i+'-'+j+'-wall1';
				wall1.classList.add('wall1', i+'-'+j);

				table.appendChild(wall1);
				wall1.addEventListener('click', ClickCell);
			}
			if (1){//Потолок
				let wall2 = document.createElement('div');
				wall2.style.width = '28px';
				wall2.style.height = '46px';
				wall2.style.backgroundColor = 'green';
				wall2.style.position = 'absolute';
				wall2.style.left = (48*j-14)+'px';
				wall2.style.top = 28*i-45+'px';
				wall2.style.transform = 'rotateZ(-90deg)';

				wall2.addEventListener('mouseover', ()=>{//Функция для выключения стены при наведении
					if (map[map.sizeX*(i-1)+j].type != 'wall'){
						wall2.style.display='none';
						setTimeout(()=>{wall2.style.display=''},1000);
					}
				});
				wall2.classList.add('wall2', i+'-'+j);

				table.appendChild(wall2);
				wall2.addEventListener('click', ClickCell);
			}
		}
	}
}