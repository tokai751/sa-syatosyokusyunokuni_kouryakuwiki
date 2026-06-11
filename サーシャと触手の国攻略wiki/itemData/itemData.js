const selectItemTypeButtons = document.querySelectorAll(".selectItemTypeButton");

document.addEventListener("DOMContentLoaded", () => {
    loadItemData(1);
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

  fetch("json/Item.json")
    .then(response => response.json())
    .then(data => {
    arrayContainer.innerHTML = '';
    let No = 0
    data.forEach(el => {
    
    if(el.itemTypeId !== typeId)
    return

    No += 1
    let name = el.name
    let price = el.price
    let itemType = el.itemType
    let description = el.description
    let get = el.get
      
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
        <td style="width: 650px;" colspan="7">${description}</td>
        </tr>

        <tr>
        <th>入手方法</th>
        <td style="width: 650px;" colspan="7">${get}</td>
        </tr>
        
    </table>

    <br>
    `

    arrayContainer.insertAdjacentHTML('beforeend', code);
    });
  });
}

function loadWeaponData(typeId) {
  selectItemTypeButtons.forEach(b => b.style.color = "black");
  selectItemTypeButtons[typeId-1].style.color = "rgb(185, 8, 8)";
  
  const arrayContainer = document.querySelector('.arrayItemData');

  fetch("json/Weapon.json")
    .then(response => response.json())
    .then(data => {
    arrayContainer.innerHTML = '';
    let No = 0
    data.forEach(el => {

    if(el.itemTypeId !== typeId)
    return

    No += 1
    let name = el.name
    let attribute = el.attribute
    let price = el.price
    let itemType = el.itemType
    let attack = el.params[2]
    let defense = el.params[3]
    let magicAttack = el.params[4]
    let magicDefense = el.params[5]
    let agile = el.params[6]
    let luck = el.params[7]
    let description = el.description
    let get = el.get
      
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
    <td style="width: 650px;" colspan="11">${description}</td>
    </tr>

    <tr>
    <th>入手方法</th>
    <td style="width: 650px;" colspan="11">${get}</td>
    </tr>

    </table>

    <br>
    `

    arrayContainer.insertAdjacentHTML('beforeend', code);
    });
  });
}

function loadArmorData(typeId) {
  selectItemTypeButtons.forEach(b => b.style.color = "black");
  selectItemTypeButtons[typeId-1].style.color = "rgb(185, 8, 8)";
  
  const arrayContainer = document.querySelector('.arrayItemData');

  fetch("json/Armor.json")
    .then(response => response.json())
    .then(data => {
    arrayContainer.innerHTML = '';
    let No = 0
    data.forEach(el => {

        
    if(el.itemTypeId !== typeId)
    return

    No += 1
    let name = el.name
    let attribute = el.attribute
    let price = el.price
    let itemType = el.itemType
    let attack = el.params[2]
    let defense = el.params[3]
    let magicAttack = el.params[4]
    let magicDefense = el.params[5]
    let agile = el.params[6]
    let luck = el.params[7]
    let description = el.description
    let get = el.get
      
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
    <td style="width: 650px;" colspan="11">${description}</td>
    </tr>

    <tr>
    <th>入手方法</th>
    <td style="width: 650px;" colspan="11">${get}</td>
    </tr>

    </table>

    <br>
    `

    arrayContainer.insertAdjacentHTML('beforeend', code);
    });
  });
}