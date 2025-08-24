const playerName = document.getElementById('playerName');
const playerAvatar = document.getElementById('playerAvatar');

let wincounter = localStorage.getItem('wincounter');
let lostcounter = localStorage.getItem('lostcounter');

window.addEventListener('load', () => { 
    playerName.textContent = localStorage.getItem('playerName');
    playerAvatar.src = localStorage.getItem('currentAvatar');
    enemyDice();
});

const enemyName = document.getElementById('enemyName');
const enemyAvatar = document.getElementById('enemyAvatar');
const playerHealth = document.getElementById('playerHealth');
const enemyHealth = document.getElementById('enemyHealth');
const attackOptions = document.getElementById('attackOptions');
const defenseOptions = document.getElementById('defenseOptions');
const defenseCheckboxes = document.querySelectorAll('input[name="defense"]');
const attackRadio = document.querySelectorAll('input[name="attack"]');
const attackButton = document.getElementById('attackButton');
const fightLog = document.getElementById('fightLogText');

const playerHealthBar = document.getElementById('playerHealthBarContainer');
const enemyHealthBar = document.getElementById('enemyHealthBarContainer');
const playerHealthBarValue = document.getElementById('playerHealthBar');
const enemyHealthBarValue = document.getElementById('enemyHealthBar');

const logMessagePlayerAttack = document.createElement('p');
const logMessageEnemyAttack = document.createElement('p');



let enemyRandom = 0;




const enemyDice = () => {
    const enemyDice = Math.floor(Math.random() * 3) + 1; 
    enemyAvatar.src = `assets/enemy${enemyDice}.webp`;
    if (enemyDice == 1) {
        enemyName.textContent = enemyStats[0].name;
        enemyRandom = 0;
    }
    else if (enemyDice == 2) {
        enemyName.textContent = enemyStats[1].name;
        enemyRandom = 1;
    }
    else if (enemyDice == 3) {
        enemyName.textContent = enemyStats[2].name;
        enemyRandom = 2;
    }
    logMessagePlayerAttack.textContent = `You are fighting ${enemyName.textContent}`;
    fightLog.appendChild(logMessagePlayerAttack);
}


const enemyStats = [
    { dmg: 20, critical: 10, numofattacks: 1, numofdefenses: 1, name: 'Elon Musk'},
    { dmg: 10, critical: 1, numofattacks: 1, numofdefenses: 5, name: 'Courage the Cowardly Dog'},   
    { dmg: 30, critical: 25, numofattacks: 2, numofdefenses: 3, name: 'Kaidou of the Beasts'}  
];

    
const playerStats =  {
        dmg: 20,
        critical: 15,
    };

const critRate = 1.5;

const maxDefenseChoices = 2;
document.addEventListener('DOMContentLoaded', function() { 
    defenseCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedBoxes = document.querySelectorAll('input[name="defense"]:checked');
            if (checkedBoxes.length > maxDefenseChoices) {
                this.checked = false;
                alert('You can only select 2 defense options!');
            }
        });
    });
});



const fightCalculation = () => {
    if (document.querySelectorAll('input[name="defense"]:checked').length !== 2 || document.querySelectorAll('input[name="attack"]:checked').length !== 1) {
        alert('You must select 2 defense options and 1 attack option!');
    } else {
    let playerAttack = null;
    attackRadio.forEach(radio => {
        if (radio.checked) {
            playerAttack = radio.value;
        }
    });
    let playerDefense = [];
    defenseCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            playerDefense.push(checkbox.value);
        }
    });
    const stats = enemyStats[enemyRandom];
    const attackRadioArray = Array.from(attackRadio);
    const enemyAttacks = [];
    for (let i = stats.numofattacks; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * attackRadioArray.length);
        let randomAttack = attackRadioArray[randomIndex];
        enemyAttacks.push(randomAttack.value); 
        attackRadioArray.splice(randomIndex, 1);
    }
    let enemyDefense = [];
    const defenseCheckboxesArray = Array.from(defenseCheckboxes);
    for (let i = stats.numofdefenses; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * defenseCheckboxesArray.length);
        let randomDefense = defenseCheckboxesArray[randomIndex];
        enemyDefense.push(randomDefense.value);
        defenseCheckboxesArray.splice(randomIndex, 1);
    }
    console.log('ataki', enemyAttacks);
    console.log(typeof enemyAttacks);
    console.log('playerDefense', playerDefense);
    console.log(enemyDefense);

    

    if (Math.floor(Math.random() * 101) < playerStats.critical) {
        enemyHealth.textContent = enemyHealth.textContent - playerStats.dmg * critRate;
        console.log('critical hit'); 
        enemyHealthBar.style.transform = `scaleX(${enemyHealth.textContent / 200})`;  
        logMessagePlayerAttack.innerHTML = `You done <span style="color: green;">critical hit</span> on ${enemyName.textContent} for <span style="color: red;">${playerStats.dmg * critRate} damage</span>`;
        fightLog.appendChild(logMessageEnemyAttack); 
    } else if (enemyDefense.includes(playerAttack)) {
        logMessagePlayerAttack.innerHTML = `The enemy <span style="color: orange;">defending ${enemyDefense}</span>, your attack is <span style="color: red;">blocked</span>`;
        fightLog.appendChild(logMessagePlayerAttack); 
        console.log('playerAttack is blocked');     
    } else {
        enemyHealth.textContent = enemyHealth.textContent - playerStats.dmg;
        console.log('normal hit');
        enemyHealthBar.style.transform = `scaleX(${enemyHealth.textContent / 200})`;
        logMessagePlayerAttack.innerHTML = `<span style="color: green;">You hit ${enemyName.textContent}</span> for <span style="color: red;">${playerStats.dmg} damage</span>, since enemy is defending ${enemyDefense}`;
        fightLog.appendChild(logMessagePlayerAttack); 
    }

    if (Math.floor(Math.random() * 101) < enemyStats[enemyRandom].critical) {
        playerHealth.textContent = playerHealth.textContent - enemyStats[enemyRandom].dmg * critRate;
        console.log('critical hit', enemyStats[enemyRandom].dmg * critRate);
        playerHealthBar.style.transform = `scaleX(${playerHealth.textContent / 200})`;   
        logMessageEnemyAttack.innerHTML = `Enemy done <span style="color: green;">critical hit</span> on you for <span style="color: red;">${enemyStats[enemyRandom].dmg * critRate} damage</span>`;
        fightLog.appendChild(logMessageEnemyAttack); 
    } else if (enemyAttacks.every(attack => playerDefense.includes(attack))) {
        console.log('enemyAttack is blocked');
        logMessageEnemyAttack.innerHTML = `Enemy is attacking <span style="color: red;">${enemyAttacks}</span>, you <span style="color: green;">blocked it</span>`;
        fightLog.appendChild(logMessageEnemyAttack); 
    } else {
            playerHealth.textContent = playerHealth.textContent - enemyStats[enemyRandom].dmg;
            console.log('normal hit', enemyStats[enemyRandom].dmg);
            playerHealthBar.style.transform = `scaleX(${playerHealth.textContent / 200})`;
            logMessageEnemyAttack.innerHTML = `Enemy hit you for <span style="color: red;">${enemyStats[enemyRandom].dmg} damage</span>, attacking <span style="color: red;">${enemyAttacks}</span>`;
            fightLog.appendChild(logMessageEnemyAttack); 
        }
        
    if (enemyHealth.textContent <= 0) {
        enemyHealth.textContent = 0;
        attackButton.disabled = true;
        console.log('wincounter', wincounter);
        localStorage.setItem('wincounter', (wincounter*1) + 1);
        enemyHealthBar.classList.add("hidden");
        fightLog.innerHTML = '';
        logMessagePlayerAttack.innerHTML = `<span style="color: green;">You win!</span>`;
        fightLog.appendChild(logMessagePlayerAttack);
    }
    if (playerHealth.textContent <= 0) {
        playerHealth.textContent = 0;
        attackButton.disabled = true;
        console.log('lostcounter', lostcounter);
        console.log(typeof lostcounter);
        localStorage.setItem('lostcounter', (lostcounter*1) + 1);
        playerHealthBar.classList.add("hidden");
        fightLog.innerHTML = '';
        logMessageEnemyAttack.innerHTML = `<span style="color: red;">You lose :(</span>`;
        fightLog.appendChild(logMessageEnemyAttack);
    } else if (enemyHealth.textContent == 0 && playerHealth.textContent == 0) {
        attackButton.disabled = true;
        playerHealthBar.classList.add("hidden");
        enemyHealthBar.classList.add("hidden");
        fightLog.innerHTML = '';
        logMessageEnemyAttack.innerHTML = `<span style="color: orange;">Its a draw!</span>`;
        fightLog.appendChild(logMessageEnemyAttack);
    }
}
}




attackButton.addEventListener('click', fightCalculation);

//TODO
//Добавить уникальность зон
//Добавить пробитие защиты