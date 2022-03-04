let action = 0;
let actionSubject = false;
function ClickCell(){
    let hoverEffects = document.getElementsByClassName('hoverEffects')[0];
    hoverEffects.innerHTML = '';
    hoverPLayerPosition = false;
    ShowSkills();
    if(action){
        ActionPerformer(this.classList[0]);
        turnPoster(sessionParams.login, actionSubject, action, this.id)
    }
    action = 0;
    actionSubject = false;
}
function ActionPerformer(cellId) {
    switch (action) {
        case 0:
            Empty();
        break;
        case 'Empty':
            Empty();
        break;
        case 'ExplosionWave':
            ExplosionWave(cellId);
        break
        case 'Place':
            Place(cellId);
        break
        case 'Walk':
            Walk(cellId, actionSubject);
        break
    }
}

function ClickHero(){
    ShowSkills(this);
    if(yourTurn){
        actionSubject = this;
    }
}
function ClickSkill(){
	action = this.value;// Действие для ClickCell
    hoverPLayerPosition = actionSubject.classList[0];
}
