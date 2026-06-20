const selectDungeonButtons = document.querySelectorAll(".selectDungeonButton");
let curDungeonId = 0

let baseStatus
let exStatus
let levelUpExp
let dungeon

let itemData
let weaponData
let armorData

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        fetch("json/baseEnemyStatus.json").then(r => r.json()),
        fetch("../itemData/json/Item.json").then(r => r.json()),
        fetch("../itemData/json/Weapon.json").then(r => r.json()),
        fetch("../itemData/json/Armor.json").then(r => r.json()),
    ]).then(([base,items, weapons, armors]) => {
        baseStatus = base.baseStatus
        exStatus = base.exStatus
        levelUpExp = base.levelUpExp
        dungeon = base.dungeon
        itemData = items
        weaponData = weapons
        armorData = armors
        loadEnemyStatusData(0)
    });
});


document.getElementById("level").addEventListener("input", function() {
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("searchCondition").addEventListener("input", function() {
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("AllButton").addEventListener("click", function() {
    curDungeonId = 0
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("ForestButton").addEventListener("click", function() {
    curDungeonId = 1
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("MountainButton").addEventListener("click", function() {
    curDungeonId = 2
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("DesertButton").addEventListener("click", function() {
    curDungeonId = 3
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("SnowfieldButton").addEventListener("click", function() {
    curDungeonId = 4
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("CemeteryButton").addEventListener("click", function() {
    curDungeonId = 5
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("VolcanoButton").addEventListener("click", function() {
    curDungeonId = 6
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("CoalMineButton").addEventListener("click", function() {
    curDungeonId = 7
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("UnderwaterButton").addEventListener("click", function() {
    curDungeonId = 8
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("BlackShipButton").addEventListener("click", function() {
    curDungeonId = 9
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("WorkshopButton").addEventListener("click", function() {
    curDungeonId = 10
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("RoyalCapitalButton").addEventListener("click", function() {
    curDungeonId = 11
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("Tower").addEventListener("click", function() {
    curDungeonId = 12
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("UndergroundClub").addEventListener("click", function() {
    curDungeonId = 13
    loadEnemyStatusData(curDungeonId)
});

document.getElementById("Principality").addEventListener("click", function() {
    curDungeonId = 14
    loadEnemyStatusData(curDungeonId)
});


function loadEnemyStatusData(dungeonId){
  let inputLevel = Number(document.getElementById("level").value);
  let inputSearchCondition = document.getElementById("searchCondition").value

 console.log(inputSearchCondition)
  selectDungeonButtons.forEach(b => b.style.color = "black");
  selectDungeonButtons[dungeonId].style.color = "rgb(185, 8, 8)";

  const arrayContainer = document.querySelector('.arrayEnemyStatusData');  

  let enemyLevel = Math.floor(inputLevel / 2 + 1)

  fetch("json/enemy.json")
    .then(response => response.json())
    .then(data => {
        arrayContainer.innerHTML = '';
        let No = 0
        data.forEach(el => {
            if(el.dungeonId !== dungeonId && dungeonId !== 0)
            return

            No += 1
            let name = el.name
            let attackAttribute = el.attackAttribute
            let Weakness = el.Weakness
            let Resistance = el.Resistance

            let hp = Math.round(el.params[0] / 100 * (el.enemyType <= 2 ? baseStatus[0][enemyLevel] : baseStatus[0][enemyLevel]) +  (el.enemyType <= 2 ? exStatus[0][el.dungeonId] : 0))
            let mp = Math.round(el.params[1] / 100 * (el.enemyType <= 2 ? baseStatus[1][enemyLevel] : baseStatus[1][enemyLevel]) + (el.enemyType <= 2 ? exStatus[1][el.dungeonId] : 0))
            let attack = Math.round(el.params[2] / 100 * (el.enemyType <= 2 ?baseStatus[2][enemyLevel] : baseStatus[2][enemyLevel]) + (el.enemyType <= 2 ? exStatus[2][el.dungeonId] : 0))
            let defense = Math.round(el.params[3] / 100 * (el.enemyType <= 2 ? baseStatus[3][enemyLevel] : baseStatus[3][enemyLevel]) + (el.enemyType <= 2 ? exStatus[3][el.dungeonId] : 0))
            let magicAttack = Math.round(el.params[4] / 100 * (el.enemyType <= 2 ? baseStatus[4][enemyLevel] : baseStatus[4][enemyLevel]) + (el.enemyType <= 2 ? exStatus[4][el.dungeonId] : 0))
            let magicDefense = Math.round(el.params[5] / 100 * (el.enemyType <= 2 ? baseStatus[5][enemyLevel] : baseStatus[5][enemyLevel]) + (el.enemyType <= 2 ? exStatus[5][el.dungeonId] : 0))
            let agile = Math.round(el.params[6] / 100 * (el.enemyType <= 2 ? baseStatus[6][enemyLevel] : baseStatus[6][enemyLevel]) + (el.enemyType <= 2 ? exStatus[6][el.dungeonId] : 0))
            let luck = Math.round(el.params[7] / 100 * (el.enemyType <= 2 ? baseStatus[7][enemyLevel] : baseStatus[7][enemyLevel]) + (el.enemyType <= 2 ? exStatus[7][el.dungeonId] : 0))
    
            let exp = Math.round(el.exp /100 * (levelUpExp[enemyLevel] / 2 + 1))
            let gold = Math.round(el.gold / 100 * enemyLevel * enemyLevel * 25)
            let description = el.description
            
            let dropItemRate1 = 100 / el.dropItems[0].denominator
            let dropItem1 = loadDropItem(el.dropItems[0])
            let dropItemRate2 = 100 / el.dropItems[1].denominator
            let dropItem2 = loadDropItem(el.dropItems[1])
            let dropItemRate3 = 100 / el.dropItems[2].denominator
            let dropItem3 = loadDropItem(el.dropItems[2])

            if(el.enemyType === 0) enemyType = "通常"
            else if(el.enemyType === 1) enemyType = "ボス"
            else if(el.enemyType === 2) enemyType = "ハーピィイベント"
            else if(el.enemyType === 3) enemyType = "ヘッジボルグイベント"
            else if(el.enemyType === 4) enemyType = "ハートクイーン<イベント"

            if(name.indexOf(inputSearchCondition) === -1 && dropItem1.indexOf(inputSearchCondition) === -1 && dropItem2.indexOf(inputSearchCondition) === -1 && dropItem3.indexOf(inputSearchCondition) === -1)
            return

            let code = `
            <table align="center" class="table">
                <tr>
                <th style="width: 70px;">No.</th>
                <td style="width: 70px;">${No}</td>
                <th style="width: 70px;">名前</th>
                <td style="width: 160px;" colspan="3">${name}</td>
                <th style="width: 70px;">出現場所</th>
                <td style="width: 70px;">${dungeon[el.dungeonId]}</td>
                <th style="width: 70px;" >出現条件</th>
                <td style="width: 70px;" colspan="3">${enemyType}</td>
                </tr>

                <tr>
                <th style="width: 70px;">弱点</th>
                <td style="width: 70px;">${Weakness}</td>
                <th style="width: 70px;">耐性</th>
                <td style="width: 70px;">${Resistance}</td>
                <th style="width: 70px;">HP</th>
                <td style="width: 70px;">${hp}</td>
                <th style="width: 70px;">MP</th>
                <td style="width: 70px;">${mp}</td>
                <th style="width: 70px;">攻撃力</th>
                <td style="width: 70px;">${attack}</td>
                <th style="width: 70px;">防御力</th>
                <td style="width: 70px;">${defense}</td>
                </tr>

                <tr>
                <th style="width: 70px;">魔法力</th>
                <td style="width: 70px;">${magicAttack}</td>
                <th style="width: 70px;">魔法防御</th>
                <td style="width: 70px;">${magicDefense}</td>
                <th style="width: 70px;">俊敏</th>
                <td style="width: 70px;">${agile}</td>
                <th style="width: 70px;">運</th>
                <td style="width: 70px;">${luck}</td>
                <th style="width: 70px;">経験値</th>
                <td style="width: 70px;">${exp}</td>
                <th style="width: 70px;">お金</th>
                <td style="width: 70px;">${gold}</td>
                </tr>

                <tr>
                <th style="width: 70px;">説明</th>
                <td style="width: 770px;" colspan="11" class="preWrap">${description}</td>
                </tr>

                <tr>
                <th style="width: 70px;">ドロップ[${Number(dropItemRate1.toFixed(2))}%]</th>
                <td style="width: 210px;" colspan="3">${dropItem1}</td>
                <th style="width: 70px;">ドロップ[${Number(dropItemRate2.toFixed(2))}%]</th>
                <td style="width: 210px;" colspan="3">${dropItem2}</td>
                <th style="width: 70px;">ドロップ[${Number(dropItemRate3.toFixed(2))}%]</th>
                <td style="width: 210px;" colspan="3">${dropItem3}</td>
                </tr>
            </table>

            <br>
            `  
        arrayContainer.insertAdjacentHTML('beforeend', code);
        });
    });

    function loadDropItem(dropItemData){
        if(dropItemData.kind === 1){
            let index = itemData.findIndex(item => item.id === dropItemData.dataId)
            return itemData[index].name
        }
        else if(dropItemData.kind === 2){
            let index = weaponData.findIndex(weapon => weapon.id === dropItemData.dataId)
            return weaponData[index].name
        }
        else if(dropItemData.kind === 3){
            let index = armorData.findIndex(armor => armor.id === dropItemData.dataId)
            return armorData[index].name
        }
        else 
            return ""
    };
}
