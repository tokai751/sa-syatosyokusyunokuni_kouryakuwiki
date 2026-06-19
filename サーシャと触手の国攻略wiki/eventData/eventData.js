let eventDatas

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        fetch("json/eventData.json").then(r => r.json()),
        ]).then(([events]) => {
            eventDatas = events
            loadEventData()
    });
});

function loadEventData(){
    const arrayContainer = document.querySelector('.arrayEventData');

    arrayContainer.innerHTML = '';
    let No = 0

    eventDatas.forEach(eventData =>{
        No += 1
        let name = eventData.name
        let firstText = eventData.firstText
        let secondText = eventData.secondText
        let options = ``
        let eventEffect = eventData.eventEffect
        
        for(num = 1; num <= eventData.option.length; num++)
        options = options + CreateOptionTable(eventData,num) + CreateOptionTextTable(eventData,num)
        
        let code = `
        <table align="center" class="table">
            <tr>
            <th style="width: 80px;">No.</th>
            <td style="width: 80px;">${eventData.id}</td>
            <th style="width: 90px;">イベント名</th>
            <td style="width: 550px;" colspan="3">${name}</td>
            </tr>

            <tr>
            <th style="width: 80px;">イベント<br>テキスト</th>
            <td style="width: 550px;" colspan="3">
            <div class="tableColumn">
                <details>
                    <summary class="preWrap">${firstText}</summary>
                    <div class="preWrap">${secondText}</div>
                    ${options}
                </details>
            </div>
            </td>
            </tr>
            <tr>
            <th>イベント<br>効果</th>
            <td style="width: 550px;" colspan="3" class="preWrap">${eventEffect}</td>
            </tr>
        </table>
        <br>
        `
        arrayContainer.insertAdjacentHTML('beforeend', code);
    })
}

function CreateOptionTable(eventData,num){
    let optionTable = `
    <br>
    <table class="eventTextTable">
    <tr>
    <th style="width: 150px;" rowspan="${eventData.option[num-1].length}">【選択肢${num}】</th>
    <td style="width: 150px;" class="getTd">${eventData.option[num-1][0]}</td>
    </tr>
    <tr>
    <td style="width: 150px;">${eventData.option[num-1][1]}</td>
    </tr>
    `
    for(i = 2; i < eventData.option[num-1].length; i++)
    optionTable = optionTable + `<tr>
    <td style="width: 150px;" class="getTd">${eventData.option[num-1][i]}</td>
    </tr>`    

    optionTable = optionTable + `</table>
    `
    return optionTable
}

function CreateOptionTextTable(eventData,num){
    let optionTextTable = `
    <br>
    <table class="eventTextTable">
    <tr>
    <th style="width: 150px;">【選択肢${num}】<br>${eventData.option[num-1][0]}</th>
    <td style="width: 560px;" class="preWrap">${eventData.optionText[num-1][0]}</td>
    </tr>
    </table>
    <br>
    <table class="eventTextTable">
    <tr>
    <th style="width: 150px;">【選択肢${num}】<br>${eventData.option[num-1][1]}</th>
    <td style="width: 560px;" class="preWrap">${eventData.optionText[num-1][1]}</td>
    </tr>
    </table>
    `
    for(i = 2; i < eventData.optionText[num-1].length; i++)
    optionTextTable = optionTextTable + `
    <br>
    <table class="eventTextTable">
    <tr>
    <th style="width: 150px;">【選択肢${num}】<br>${eventData.option[num-1][i]}</th>
    <td style="width: 560px;" class="preWrap">${eventData.optionText[num-1][i]}</td>
    </tr>
    </table>`
    return optionTextTable
}