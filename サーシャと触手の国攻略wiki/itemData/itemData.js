const selectItemTypeButtons = document.querySelectorAll(".selectItemTypeButton");

let itemDatas
let weaponDatas
let armorDatas
let enemyDatas
let as
let bs

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        fetch("json/Item.json").then(r => r.json()),
        fetch("json/Weapon.json").then(r => r.json()),
        fetch("json/Armor.json").then(r => r.json()),
        fetch("json/a.json").then(r => r.json()),
        fetch("json/b.json").then(r => r.json()),
        fetch("../enemyStatusData/json/enemy.json").then(r => r.json()),
    ]).then(([items, weapons, armors,a,b,enemys]) => {
        itemDatas = items
        weaponDatas = weapons
        armorDatas = armors
        enemyDatas = enemys
        as = a
        bs = b
        loadItemData(1) // ← ここなら安全
    });
});

document.getElementById("displayItemButton").addEventListener("click", function () {
  loadItemData(1);
});

document.getElementById("displayWeaponButton").addEventListener("click", function () {
  loadWeaponData(2);
});

document.getElementById("displayShieldButton").addEventListener("click", function () {
  loadArmorData(3);
});

document.getElementById("displayOrnamentButton").addEventListener("click", function () {
  loadArmorData(4)
});

document.getElementById("displayEngravingButton").addEventListener("click", function () {
  loadArmorData(5)
});

document.getElementById("displayDivineArtifactButton").addEventListener("click", function () {
  loadArmorData(6)
});

document.getElementById("displayOrbButton").addEventListener("click", function () {
  loadArmorData(7)
});

document.getElementById("displayFamiliarButton").addEventListener("click", function () {
  loadArmorData(8)
});

document.getElementById("displayImportantButton").addEventListener("click", function () {
  loadItemData(9);
});


function loadItemData(typeId) {
  selectItemTypeButtons.forEach(b => b.style.color = "black");
  selectItemTypeButtons[typeId-1].style.color = "rgb(185, 8, 8)";

  const arrayContainer = document.querySelector('.arrayItemData');

    arrayContainer.innerHTML = '';
    let No = 0
    itemDatas.forEach(itemData => {
    
    if(itemData.itemTypeId !== typeId)
    return

    No += 1
    let name = itemData.name
    let price = itemData.price
    let itemType = itemData.itemType
    let description = itemData.description

    let drop = WriteDropEnemy(itemData)
    let get = ""

    if(itemData.get.kind === 0 | itemData.process === 0)
    { console.log(itemData.get.length)
      for(let i = 0; i <itemData.get.length; i++)
      {
        get = get + WriteGet(itemData,i)
        get = get + `<br>`
      }
    }
    else{
      get = get + WriteGet(itemData,0)

      let needItems = {items:[],weapons:[],armors:[],gold:0,desirePt:0,strengthPt:0}
      needItems = CalculateItems(itemData, needItems,1,0)

      let diagram = ``
      diagram = CreateDiagram(itemData,needItems,diagram,1,0)
      
      get = `
      <details class="diagram">
        <summary>
          ${get}
        </summary>
        <div class="mermaid">
            %%{init: {'themeVariables': { 'fontSize': '12px'}}}%%
            graph LR
            ${diagram}
        </div>
      </details>
      `
    } 
      
    let code = `  
    <table align="center" class="table">
        <tr>
        <th>No.</th>
        <td>${No}</td>
        <th>名前</th>
        <td style="width: 170px;">${name}</td>
        <th>価格</th>
        <td style="width: 70px;">${price}</td>
        <th>アイテム</th>
        <td style="width: 90px;">${itemType}</td>
        </tr>

        <tr>
        <th>説明</th>
        <td style="width: 800px;" colspan="7" class="preWrap">${description}</td>
        </tr>

        <tr>
        <th>ドロップ</th>
        <td style="width: 800px;" colspan="7" class="getTd">${drop}</td>
        </tr>

        <tr>
        <th>入手方法</th>
        <td style="width: 800px;" colspan="7" class="getTd">${get}</td>
        </tr>
        
    </table>

    <br>
    `

    arrayContainer.insertAdjacentHTML('beforeend', code);
    const details = arrayContainer.querySelectorAll('.diagram');
    const detail = details[details.length - 1];
    if (!detail) return;
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        const mer = detail.querySelector('.mermaid');
        setTimeout(() => {
          mermaid.init(undefined, [mer]);
          mer.style.visibility = 'visible'; // ← 描画後に表示
        }, 30);
      }
    });
  });
}

function loadWeaponData(typeId) {
  selectItemTypeButtons.forEach(b => b.style.color = "black");
  selectItemTypeButtons[typeId-1].style.color = "rgb(185, 8, 8)";
  
  const arrayContainer = document.querySelector('.arrayItemData');

    arrayContainer.innerHTML = '';
    let No = 0
    weaponDatas.forEach(weaponData => {

    if(weaponData.itemTypeId !== typeId)
    return

    No += 1
    let name = weaponData.name
    let attribute = weaponData.attribute
    let price = weaponData.price
    let itemType = weaponData.itemType
    let attack = weaponData.params[2]
    let defense = weaponData.params[3]
    let magicAttack = weaponData.params[4]
    let magicDefense = weaponData.params[5]
    let agile = weaponData.params[6]
    let luck = weaponData.params[7]
    let description = weaponData.description

    let drop = WriteDropEnemy(weaponData)
    let get = ""
    if(weaponData.get.kind === 0 | weaponData.process === 0)
    {
      for(let i = 0; i < weaponData.get.length; i++)
      {
        get = get + WriteGet(weaponData,i)
        get = get + `<br>`
      }
    }
    else{
      for(let i = 0; i < weaponData.get.length; i++)
      {
        get = get + WriteGet(weaponData,i)
        get = get + `<br>`
      }
      let needItems = {items:[],weapons:[],armors:[],gold:0,desirePt:0,strengthPt:0}
      needItems = CalculateItems(weaponData, needItems,1,0)

      let diagram = ``
      diagram = CreateDiagram(weaponData,needItems,diagram,1,0)

      get = `
      <details class="diagram">
        <summary>
          ${get}
        </summary>
        <div class="mermaid">
            %%{init: {'themeVariables': { 'fontSize': '12px'}}}%%
            graph LR
            ${diagram}
        </div>
      </details>
      `
    }  
    
      
    let code = `    
    <table align="center" class="table">

    <tr>
    <th>No.</th>
    <td>${No}</td>
    <th>名前</th>
    <td style="width: 170px;" colspan="3">${name}</td>
    <th>属性</th>
    <td>${attribute}</td>
    <th>価格</th>
    <td style="width: 70px;">${price}</td>
    <th>アイテム</th>
    <td>${itemType}</td>
    </tr>

    <tr>
    <th>攻撃力</th>
    <td>${attack}</td>
    <th>防御力</th>
    <td>${defense}</td>
    <th>魔法力</th>
    <td>${magicAttack}</td>
    <th>魔法防御</th>
    <td>${magicDefense}</td>
    <th>敏捷性</th>
    <td>${agile}</td>
    <th>運</th>
    <td>${luck}</td>
    </tr>

    <tr>
    <th>説明</th>
    <td style="width: 800px;" colspan="11" class="preWrap">${description}</td>
    </tr>

    <tr>
    <th>ドロップ</th>
    <td style="width: 800px;" colspan="11" class="getTd">${drop}</td>
    </tr>

    <tr>
    <th>入手方法</th>
    <td style="width: 800px;" colspan="11" class="getTd">${get}</td>
    </tr>

    </table>

    <br>
    `

    arrayContainer.insertAdjacentHTML('beforeend', code);
    const details = arrayContainer.querySelectorAll('.diagram');
    const detail = details[details.length - 1];
    if (!detail) return;
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        const mer = detail.querySelector('.mermaid');
        setTimeout(() => {
          mermaid.init(undefined, [mer]);
          mer.style.visibility = 'visible'; // ← 描画後に表示
        }, 30);
      }
    });
  });
}

function loadArmorData(typeId) {
  selectItemTypeButtons.forEach(b => b.style.color = "black");
  selectItemTypeButtons[typeId-1].style.color = "rgb(185, 8, 8)";
  
  const arrayContainer = document.querySelector('.arrayItemData');

    arrayContainer.innerHTML = '';
    let No = 0
    armorDatas.forEach(armorData => {
        
    if(armorData.itemTypeId !== typeId)
    return

    No += 1
    let name = armorData.name
    let attribute = armorData.attribute
    let price = armorData.price
    let itemType = armorData.itemType
    let attack = armorData.params[2]
    let defense = armorData.params[3]
    let magicAttack = armorData.params[4]
    let magicDefense = armorData.params[5]
    let agile = armorData.params[6]
    let luck = armorData.params[7]
    let description = armorData.description
    
    let drop = WriteDropEnemy(armorData)
    let get = ""
    if(armorData.get.kind === 0 | armorData.process === 0)
    {
      for(let i = 0; i < armorData.get.length; i++)
      {
        get = get + WriteGet(armorData,i)
        get = get + `<br>`
      }
    }
    else{
      for(let i = 0; i < armorData.get.length; i++)
      {
        get = get + WriteGet(armorData,i)
        get = get + `<br>`
      }
      let needItems = {items:[],weapons:[],armors:[],gold:0,desirePt:0,strengthPt:0}
      needItems = CalculateItems(armorData, needItems,1,0)

      let diagram = ``
      diagram = CreateDiagram(armorData,needItems,diagram,1,0)

      get = `
      <details class="diagram">
        <summary>
          ${get}
        </summary>
        <div class="mermaid">
            %%{init: {'themeVariables': { 'fontSize': '12px'}}}%%
            graph LR
            ${diagram}
        </div>
      </details>
      `
    }  
      
    let code = `    
    <table align="center" class="table">

    <tr>
    <th>No.</th>
    <td>${No}</td>
    <th>名前</th>
    <td style="width: 170px;" colspan="3">${name}</td>
    <th>属性</th>
    <td>${attribute}</td>
    <th>価格</th>
    <td style="width: 70px;">${price}</td>
    <th>アイテム</th>
    <td>${itemType}</td>
    </tr>

    <tr>
    <th>攻撃力</th>
    <td>${attack}</td>
    <th>防御力</th>
    <td>${defense}</td>
    <th>魔法力</th>
    <td>${magicAttack}</td>
    <th>魔法防御</th>
    <td>${magicDefense}</td>
    <th>敏捷性</th>
    <td>${agile}</td>
    <th>運</th>
    <td>${luck}</td>
    </tr>

    <tr>
    <th>説明</th>
    <td style="width: 650px;" colspan="11" class="preWrap">${description}</td>
    </tr>
  
    <tr>
    <th>ドロップ</th>
    <td style="width: 650px;" colspan="11" class="getTd">${drop}</td>
    </tr>

    <tr>
    <th>入手方法</th>
    <td style="width: 650px;" colspan="11" class="getTd">${get}</td>
    </tr>

    </table>

    <br>
    `

    arrayContainer.insertAdjacentHTML('beforeend', code);
    const details = arrayContainer.querySelectorAll('.diagram');
    const detail = details[details.length - 1];
    if (!detail) return;
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        const mer = detail.querySelector('.mermaid');
        setTimeout(() => {
          mermaid.init(undefined, [mer]);
          mer.style.visibility = 'visible'; // ← 描画後に表示
        }, 30);
      }
    });
  });
}

const progress_list = ["","【森クリア】","【山クリア】","【砂漠クリア】","【雪原クリア】","【墓地クリア】","【火山クリア】","【炭鉱クリア】","【海底クリア】","【黒船クリア】","【工房クリア】","【王都クリア】","【淫魔の塔クリア】","【闇クラブクリア】","【公国クリア】","","","","","","","【斬鉄剣レシピ】","【ミスリル商】","【クローム商】","【オリハルコン商】","【アイアンドリル】","【ミスリルドリル】","【クロームドリル】"]
const getPlace_list = ["","【交易店 購入】","【交易店 交換】","【交易店 秘密の品】","【交易店 性欲PT】","","","","","","","【ギルド スキル】","【ギルド ドーピングアイテム】","","","","","","","","","ボス討伐して帰還[1～3]","【ランダムイベント 謎の少女】助けを断り続けて、犯される。　※入手は一回限り","","","","","","","","","【初めての商店街イベント】","【森クリア後】","【山クリア後】","【砂漠クリア後】","【雪原クリア後】","【墓地クリア後】","【火山クリア後】","【炭鉱クリア後】","【海底クリア後】","【黒船クリア後】","【工房クリア後】","","","","","","","","","","【初めてのギルドイベント】","【森クリア後】","【山クリア後】","【砂漠クリア後】","【雪原クリア後】","【墓地クリア後】","【火山クリア後】","【炭鉱クリア後】","【海底クリア後】","【黒船クリア後】","【工房クリア後】","","","","","","","","","","【交易店 魔物娘 森】","【交易店 魔物娘 山】","【交易店 魔物娘 砂漠】","【交易店 魔物娘 雪原】","【交易店 魔物娘 墓地】","【交易店 魔物娘 火山】","【交易店 魔物娘 炭鉱】","【交易店 魔物娘 海底】","【交易店 魔物娘 黒船】","【交易店 魔物娘 工房】"]

function WriteDropEnemy(itemData)
{ 
  let drop = ""
  let locations = ["","【森】","【山】","【砂漠】","【雪原】","【墓地】","【火山】","【炭鉱】","【海底】","【黒船】","【工房】","【王都】","【淫魔の塔】","【闇クラブ】","【公国】"]
  let isLocations = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
  let isFirst = true
  let isDrop = false 
  enemyDatas.forEach(enemyData => {
    for(const item of enemyData.dropItems)
    {
      if(item.dataId == itemData.id)
      { 
        if(!isLocations[enemyData.dungeonId])
        { 
          isDrop = true
          if(!isFirst)
          drop = drop + "<br>"

          drop = drop + locations[enemyData.dungeonId] + " "
          isLocations[enemyData.dungeonId] = true

          isFirst = false
        }
        drop = `${drop}${enemyData.name}[${Number((100 / item.denominator).toFixed(2))}%]　 `
        
      }
    }
  })

  if(isDrop)
  drop = `<details>
        <summary>詳細</summary>
        ${drop}
        </details>
        `
  return drop
}

function WriteGet(itemData,num)
{ 
  getData = itemData.get[num]
  let get = ""
  if(getData.kind === 0) return get
  else
  { 
    get = get + progress_list[getData.progress] + getPlace_list[getData.kind]
    getData.weapons.forEach(el => {
      let index = weaponDatas.findIndex(weapon => weapon.id === el.id)
      get = get + "　" + weaponDatas[index].name + "×"+ el.count
    })

    getData.armors.forEach(el => {
      let index = armorDatas.findIndex(armor => armor.id === el.id)
      get = get + "　" + armorDatas[index].name + "×" + el.count
    })

    getData.items.forEach(el => {
      let index = itemDatas.findIndex(item => item.id === el.id)
      get = get + "　"+ itemDatas[index].name + "×" + el.count
    })

    if(getData.gold > 0)
    get = get + "　" + getData.gold + "G"
    if(getData.desirePt > 0)
    get = get + "　性欲ポイント " + getData.desirePt + "PT"
    if(getData.strengthPt > 0)
    get = get + "　強化ポイント " + getData.strengthPt + "PT"

    return get
  }
}

function CalculateItems(itemData,needItems,count,num){
  if(itemData.process === 0)
  return needItems

  itemData.get[num].items.forEach(el => { 
      let index = itemDatas.findIndex(item => item.id === el.id)
      needItems = CalculateItems(itemDatas[index],needItems,el.count*count,num) 
  })

  itemData.get[num].weapons.forEach(el => { 
      let index = weaponDatas.findIndex(weapon => weapon.id === el.id)
      needItems = CalculateItems(weaponDatas[index],needItems,el.count*count,num) 
  })

  itemData.get[num].armors.forEach(el => { 
      let index = armorDatas.findIndex(armor => armor.id === el.id)
      needItems = CalculateItems(armorDatas[index],needItems,el.count*count,num) 
  })


  itemData.get[num].items.forEach(el => {
    let index = needItems.items.findIndex(item => item.id === el.id)
    if(index === -1)
    {
      needItems.items.push({id:el.id,count:el.count * count})
    }
    else
    {
      needItems.items[index].count = needItems.items[index].count + el.count * count
    }
  })

  itemData.get[num].weapons.forEach(el => {
    let index = needItems.weapons.findIndex(weapon => weapon.id === el.id)
    if(index === -1)
    {
      needItems.weapons.push({id:el.id,count:el.count * count})
    }
    else
    {
      needItems.weapons[index].count = needItems.weapons[index].count + el.count * count
    }
  })

  itemData.get[num].armors.forEach(el => {
    let index = needItems.armors.findIndex(armor => armor.id === el.id)
    if(index === -1)
    {
      needItems.armors.push({id:el.id,count:el.count * count})
    }
    else
    {
      needItems.armors[index].count = needItems.armors[index].count + el.count * count
    }
  })

  needItems.gold = needItems.gold + itemData.get[num].gold*count
  needItems.desirePt = needItems.desirePt + itemData.get[num].desirePt*count
  needItems.strengthPt = needItems.strengthPt + itemData.get[num].strengthPt*count

  return needItems
}

function CreateDiagram(itemData,needItems,diagram,count,num){
  itemData.get[num].weapons.forEach(el => {//必要な武器
    let needWeaponIndex = GetIdIndex(weaponDatas,el.id)
    let needWeapon = weaponDatas[needWeaponIndex]
    let allNeedCount = needItems.weapons[GetIdIndex(needItems.weapons,el.id)].count
    console.log(allNeedCount)
    if(needWeapon.process === 0)
    { 
      let addCode = `${needWeapon.name.replace(/[【】・()Ⅱ]/g, "")}["${needWeapon.name}×${allNeedCount}"] --> |"×${el.count*count}"| ${itemData.name.replace(/[【】・()Ⅱ]/g, "")}["${itemData.name}×${count}"]
      `
      if(!diagram.includes(addCode))
      diagram = diagram + `${needWeapon.name.replace(/[【】・()Ⅱ]/g, "")}["${needWeapon.name}×${allNeedCount}"] --> |"×${el.count*count}"| ${itemData.name.replace(/[【】・()Ⅱ]/g, "")}["${itemData.name}×${count}"]
      `
    }
    else
    { 

      diagram = CreateDiagram(needWeapon,needItems,diagram,allNeedCount,num)
      let addCode = `${needWeapon.name.replace(/[【】・()Ⅱ]/g, "")}["${needWeapon.name}×${allNeedCount}"] --> |"×${el.count*count}"| ${itemData.name.replace(/[【】・()Ⅱ]/g, "")}["${itemData.name}×${count}"]
      `
      if(!diagram.includes(addCode))
      diagram = diagram + `${needWeapon.name.replace(/[【】・()Ⅱ]/g, "")}["${needWeapon.name}×${allNeedCount}"] --> |"×${el.count*count}"| ${itemData.name.replace(/[【】・()Ⅱ]/g, "")}["${itemData.name}×${count}"]
      `
    }
  })

  itemData.get[num].armors.forEach(el => {//必要な防具
    let needArmorIndex = GetIdIndex(armorDatas,el.id)
    let needArmor= armorDatas[needArmorIndex]
    let allNeedCount = needItems.armors[GetIdIndex(needItems.armors,el.id)].count
    console.log(allNeedCount)
    if(needArmor.process === 0)
    { 
      let addCode = `${needArmor.name.replace(/[【】・()Ⅱ]/g, "")}["${needArmor.name}×${allNeedCount}"] --> |"×${el.count*count}"| ${itemData.name.replace(/[【】・()Ⅱ]/g, "")}["${itemData.name}×${count}"]  
      `
      if(!diagram.includes(addCode))
      diagram = diagram + `${needArmor.name.replace(/[【】・()Ⅱ]/g, "")}["${needArmor.name}×${allNeedCount}"] --> |"×${el.count*count}"| ${itemData.name.replace(/[【】・()Ⅱ]/g, "")}["${itemData.name}×${count}"]  
      `
    }
    else
    { 
      diagram = CreateDiagram(needArmor,needItems,diagram,allNeedCount,num)
      let addCode = `${needArmor.name.replace(/[【】・()Ⅱ]/g, "")}["${needArmor.name}×${allNeedCount}"] --> |"×${el.count*count}"| ${itemData.name.replace(/[【】・()Ⅱ]/g, "")}["${itemData.name}×${count}"]
      `
      if(!diagram.includes(addCode))
      diagram = diagram + `${needArmor.name.replace(/[【】・()Ⅱ]/g, "")}["${needArmor.name}×${allNeedCount}"] --> |"×${el.count*count}"| ${itemData.name.replace(/[【】・()Ⅱ]/g, "")}["${itemData.name}×${count}"]
      `
    }
  })

  itemData.get[num].items.forEach(el => {//必要なアイテム
    let needItemIndex = GetIdIndex(itemDatas,el.id)
    let needItem = itemDatas[needItemIndex]
    let allNeedCount = needItems.items[GetIdIndex(needItems.items,el.id)].count
    console.log(allNeedCount)
    if(needItem.process === 0)
    { 
      let addCode = `${needItem.name.replace(/[【】・()Ⅱ]/g, "")}["${needItem.name}×${allNeedCount}"] --> |"×${el.count*count}"| ${itemData.name.replace(/[【】・()Ⅱ]/g, "")}["${itemData.name}×${count}"]
      `
      if(!diagram.includes(addCode))
      diagram = diagram + `${needItem.name.replace(/[【】・()Ⅱ]/g, "")}["${needItem.name}×${allNeedCount}"] --> |"×${el.count*count}"| ${itemData.name.replace(/[【】・()Ⅱ]/g, "")}["${itemData.name}×${count}"]
      `
    }
    else
    { 
      diagram = CreateDiagram(needItem,needItems,diagram,allNeedCount,num)
      let addCode =  `${needItem.name.replace(/[【】・()Ⅱ]/g, "")}[${needItem.name}×${allNeedCount}] --> |×${el.count*count}| ${itemData.name.replace(/[【】・()Ⅱ]/g, "")}[${itemData.name}×${count}]
      `
      if(!diagram.includes(addCode))
      diagram = diagram + `${needItem.name.replace(/[【】・()Ⅱ]/g, "")}[${needItem.name}×${allNeedCount}] --> |×${el.count*count}| ${itemData.name.replace(/[【】・()Ⅱ]/g, "")}[${itemData.name}×${count}]
      `
    }
  })

  if(itemData.get[num].gold > 0)
  { 
    let addCode = `${needItems.gold}G[${needItems.gold}G] --> |${itemData.get[num].gold*count}G| ${itemData.name.replace(/[【】・()]/g, "")}[${itemData.name}×${count}] 
    `
    if(!diagram.includes(addCode))
    diagram = diagram + `${needItems.gold}G[${needItems.gold}G] --> |${itemData.get[num].gold*count}G| ${itemData.name.replace(/[【】・()]/g, "")}[${itemData.name}×${count}] 
    `
  }

  return diagram
}

function GetIdIndex(datas,id){//与えたidに対応するデータリストのインデックスを返す
  return datas.findIndex(data => data.id === id)
}