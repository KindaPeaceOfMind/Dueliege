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
    WalkComputing(cellId, hoverPLayerPosition);
}