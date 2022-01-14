let action = 0;
let actionSubject = false;
function ClickCell(){
    ShowSkills()
    if(action){
        ActionPerformer(this.id);
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
    }
}

function ClickHero(){
    ShowSkills(this);
    if(yourTurn){
        actionSubject = this.id
    }
}
function ClickSkill(){//Преобразование номера скилла в событие для ClickCell
	action = this.value;
}
