let action = 1;
function ClickCell(){
    actions = {     //Actions Switch - Наше активное действие -> момент анимации
        0: ()=>{},
        1: ExplosionWave,
        2: Place
    }
    actions[action](this.id);
}
// Написать функции для скиллов
// Функция разрушения стены
// Функция нанесения урона
// Функция скилла
// 
// 
// 

function ClickHero(){
    ShowSkills(this);

    console.log(this.id);
    console.log(map.PlayersLocation[this.id]);
}
function ClickSkill(){//Преобразование номера скилла в событие для ClickCell
	action = this.value;
    console.log(this)
}
function ClickChangeTurn(){}
