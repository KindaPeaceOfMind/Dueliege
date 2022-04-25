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
skillMenu.style.zIndex = 1;
skillMenu.classList = 'skillMenu';
document.getElementsByClassName('body')[0].appendChild(skillMenu);



//При щелчке на персонажа отображаются его скиллы
function ShowSkills(player){
	while(pastSkill = document.getElementsByClassName('skills')[0]){
		pastSkill.outerHTML='';
	}
	if(player){
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
			div.value = 'ChangeTurn';
			div.innerHTML = 'ChangeTurn';
			div.classList.add('skills');
			div.addEventListener('click', ClickChangeTurn);
			document.body.appendChild(div);
		}
		let i = 0;
		for (let stat in player.playerStats){
			let div = document.createElement('div');
			div.style.textAlignLast = 'left';
			div.style.top = 15+15*i+'px';
			div.style.left = 15+'px';
			div.style.position = 'fixed';
			div.classList.add('skills');
			div.innerHTML = stat+': '+player.playerStats[stat];
			if(stat=='status'){
				for(let condition in player.playerStats.status){
					div.innerHTML += condition+': '+player.playerStats.status[condition]
				}
			}
			
			
			document.body.appendChild(div);

			i++;
		}
		if(player.team == sessionParams.login && yourTurn){
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