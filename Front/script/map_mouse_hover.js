let hoverPLayerPosition = '';
function CellMouseHover(){
    if(!yourTurn){
        return
    }
    let cellId = event.target.classList[0];// берёт y-x наведённого объекта
    switch (action) {
        case 'Walk':
        case 'Идти':
            RenderWalkTrajectory(cellId);
        break;
        case 'Огненный шар':
        case 'FireBall':
            RenderFireBallTrajectory(cellId);
        break;
    }
}

function RenderWalkTrajectory(cellId) {
    if(!actionSubject || actionSubject.playerStats.stamina < CheckDistance(cellId, hoverPLayerPosition)){
        return
    }

    let start = hoverPLayerPosition.split('-');
    let trajectory = WalkComputing(cellId, hoverPLayerPosition);
    let hoverEffects = document.getElementsByClassName('hoverEffects')[0];
    hoverEffects.innerHTML = '';
    
    let now = [Number(start[0]), Number(start[1])];
    for(let i=0; i<trajectory.length; i++){
        now[0] += trajectory[i][0];
        now[1] += trajectory[i][1];
        let step = document.createElement('div');
        step.classList.add(now[0]+'-'+now[1],'playerStep');
        step.style.top  = 6+28*now[0]+'px';
        step.style.left = 12+48*now[1]+'px';
        step.addEventListener('click', ClickCell);
        hoverEffects.appendChild(step);
    }
}
function RenderFireBallTrajectory(cellId){
    //видимость и дистанция
    if(!actionSubject || !CheckCoordsVisibility(hoverPLayerPosition, cellId) || 
        actionSubject.playerStats.radius < CheckDistance(cellId, hoverPLayerPosition)){
        return
    }
    
    let hoverEffects = document.getElementsByClassName('hoverEffects')[0];
    hoverEffects.innerHTML = '';

    let cords = cellId.split('-');
    let trajectory = []; //[ [20,20],[21,21] ]
    for(let i=-1; i<=1; i++){
        for(let j=-1; j<=1; j++){
            trajectory.push([ (Number(cords[0])+i), (Number(cords[1])+j) ]);
        }
    }

    for(let i=0; i<trajectory.length; i++){
        let step = document.createElement('div');
        step.classList.add(trajectory[i][0]+'-'+trajectory[i][1],'fireStep');
        step.style.top  = 6+28*trajectory[i][0]+'px';
        step.style.left = 12+48*trajectory[i][1]+'px';
        step.addEventListener('click', ClickCell);
        hoverEffects.appendChild(step);
    }
}