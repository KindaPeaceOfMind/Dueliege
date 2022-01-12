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
skillMenu.classList= 'skillMenu';
document.getElementsByClassName('body')[0].appendChild(skillMenu);



//При щелчке на персонажа отображаются его скиллы
function ShowSkills(player){
	skillMenu = document.getElementsByClassName('skillMenu')[0];
	skillMenu.innerHTML='<svg width="325" height="505">'+
	'<linearGradient id="linear-gradient">'+
		'<stop offset="0%" stop-color="gold"/>'+
		'<stop offset="100%" stop-color="teal"/>'+
  	'</linearGradient>'+
	'<polygon points="4,5 305,5 4,488" fill="orange" stroke="red" stroke-width="5"></polygon>'+
'</svg>';
	let i = 0;
	for (stat in player.playerStats){
		let div = document.createElement('div');
		div.style.textAlignLast = 'left';
		div.style.top = 15+15*i+'px';
		div.style.left = 15+'px';
		div.style.position = 'fixed';
		div.innerHTML = stat+': '+player.playerStats[stat];
		skillMenu.appendChild(div);

		i++;
	}
	if(player.team == sessionParams.login){
		i = 0;
		for (skill in player.playerStats.skills){
			let div = document.createElement('div');
			div.style.position = 'fixed';
			div.style.bottom = '0px';
			div.style.backgroundColor = 'orange';
			div.style.right = 85*i+'px';
			div.style.border = '3px solid red';
			div.style.borderRadius = '10px';
			div.style.height = '80px';
			div.style.width = '80px';

			div.value = i;
			div.innerHTML = player.playerStats.skills[skill];
			div.addEventListener('click', ClickSkill);
			skillMenu.appendChild(div);
			i++;
		}
	}
	
}