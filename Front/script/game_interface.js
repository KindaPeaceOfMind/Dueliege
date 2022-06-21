let skillMenu = document.createElement('div');
skillMenu.innerHTML = 
'<svg width="325" height="505">'+
	'<linearGradient id="linear-gradient">'+
		'<stop offset="0%" stop-color="gold"/>'+
		'<stop offset="100%" stop-color="teal"/>'+
  	'</linearGradient>'+
	'<polygon points="4,5 305,5 4,488" fill="orange" stroke="red" stroke-width="5"></polygon>'+
'</svg>';
skillMenu.style.position = 'fixed';
skillMenu.classList = 'skillMenu';
document.getElementsByClassName('body')[0].appendChild(skillMenu);



/**При щелчке на персонажа отображаются его скиллы. 
 * Если не передан игрок () - очищает интерфейс
*/
function ShowSkills(player){
	while(pastSkill = document.getElementsByClassName('skills')[0]){
		pastSkill.outerHTML='';
	}
	if(player){
		// Кнопка смены хода
		if(yourTurn){
			let div = document.createElement('div');
			div.style.position = 'fixed';
			div.style.bottom = '0px';
			div.style.backgroundColor = 'orange';
			div.style.left = '0px';
			div.style.border = '3px solid red';
			div.style.borderRadius = '10px';
			div.style.height = '80px';
			div.style.width = '80px';
			div.style.padding = '0 15px';
			div.style.display = 'flex';
			div.style.justifyContent = 'center';
			div.style.alignItems = 'center';
			div.value = 'Конец хода';
			div.innerHTML = 'Конец хода';
			div.classList.add('skills');
			div.addEventListener('click', ClickChangeTurn);
			document.body.appendChild(div);
		}
		// Статусы
		let i = 0;
		for (let stat in player.playerStats){
			if(stat=='skills'){ continue }
			let div = document.createElement('div');
			div.style.textAlignLast = 'left';
			div.style.top = 15+40*i+'px';
			div.style.left = 15+'px';
			div.style.position = 'fixed';
			div.style.padding = '5px';
			div.style.fontSize = '34px';
			div.classList.add('skills');
			div.classList.add('status_'+stat);
			div.innerHTML = stat+': '+player.playerStats[stat];
			if(stat=='status'){
				for(let condition in player.playerStats.status){
					// status: fire: Длительность
					div.innerHTML += condition+': '+player.playerStats.status[condition]
				}
			}
			
			
			document.body.appendChild(div);

			i++;
		}
		// Скиллы снизу
		if(player.team == sessionParams.login && yourTurn){
			i = 0;
			for (skill in player.playerStats.skills){
				let div = document.createElement('div');
				div.style.position = 'fixed';
				div.style.bottom = '0px';
				div.style.backgroundColor = 'orange';
				div.style.right = (85+40)*i+'px';
				div.style.border = '3px solid red';
				div.style.borderRadius = '10px';
				div.style.height = '80px';
				div.style.width = '80px';
				div.style.padding = '0 20px';
				div.style.display = 'flex';
				div.style.justifyContent = 'center';
				div.style.alignItems = 'center';
				div.style.cursor = 'pointer';
				
				div.style.fontSize = '20px';
				div.style.textAlign = '-webkit-center';

				div.classList.add('skills');
				
				div.value = player.playerStats.skills[skill];
				div.innerHTML = player.playerStats.skills[skill];
				div.addEventListener('click', ClickSkill);
				document.body.appendChild(div);
				i++;
			}
		}
	}
}