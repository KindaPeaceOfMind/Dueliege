let hoverPLayerPosition = '';
function CellMouseHover(){
    cellId = this.classList[0];// берёт y-x наведённого объекта
    cells = document.getElementsByClassName(cellId);//ищет всю клетку (по координатам)
    // for(let i=0; i<cells.length; i++){ // красит
    //     cells[i].style.borderColor = '#00f';
    // }
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