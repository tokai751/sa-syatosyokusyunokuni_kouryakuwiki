const headerContainer = document.querySelector('.header');

document.addEventListener("DOMContentLoaded", () => {
  console.log("ページ読み込み完了！");
    let code = ``

    if(location.pathname.endsWith("enemyStatusData.html"))
    code += `<button class="headerButton" onclick="location.href='enemyStatusData.html'" style="color: rgb(185, 8, 8);">敵ステータス</button>`
    else
    code += `<button class="headerButton" onclick="location.href='../enemyStatusData/enemyStatusData.html'">敵ステータス</button>`

    if(location.pathname.endsWith("itemData.html"))
    code += `<button class="headerButton" onclick="location.href='itemData.html'" style="color: rgb(185, 8, 8);">アイテム</button>`
    else
    code += `<button class="headerButton" onclick="location.href='../itemData/itemData.html'">アイテム</button>`
    
    if(location.pathname.endsWith("eventData.html"))
    code += `<button class="headerButton" onclick="location.href='eventData.html'" style="color: rgb(185, 8, 8);">ランダムイベント</button>`
    else
    code += `<button class="headerButton" onclick="location.href='../eventData/eventData.html'">ランダムイベント</button>`

    headerContainer.insertAdjacentHTML('beforeend', code);
});