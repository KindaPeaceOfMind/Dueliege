let hoverPLayerPosition = '';
function CellMouseHover(){
    if(!yourTurn){
        return
    }
    let cellId = event.target.classList[0];// берёт y-x наведённого объекта
    switch (action) {
        case 'Walk':
            renderTrajectory(cellId);
        break;
    }
}

function renderTrajectory(cellId) {
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