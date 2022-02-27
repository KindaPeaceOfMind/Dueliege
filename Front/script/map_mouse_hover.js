function CellMouseHover(){
    cellId = this.classList[0];
    cells = document.getElementsByClassName(cellId);
    for(let i=0; i<cells.length; i++){
        cells[i].style.borderColor = '#00f';
    }
}
function WalkTrajectory(playerId){
}