function loaded() {
    arr=data["VisitedSystems"]
    headers=document.getElementsByTagName("h1")
    h1=headers.item(0)
    console.log("start: " + arr.length)
    table=document.createElement("table")
    table.setAttribute("class", "system_address")
    thead=document.createElement("thead")
    table.appendChild(thead)
    thr=document.createElement("tr")
    thead.appendChild(thr)

    th1=document.createElement("th")
    th1.appendChild(document.createTextNode("Visited System Code"))
    thr.appendChild(th1)

    th2=document.createElement("th")
    th2.appendChild(document.createTextNode("Hex"))
    thr.appendChild(th2)

    th3=document.createElement("th")
    th3.appendChild(document.createTextNode("Portal Address"))
    thr.appendChild(th3)

    tbody=document.createElement("tbody")
    table.appendChild(tbody)
    h1.after(table)
    for (let i = 0; i < arr.length; i++) {
        tr=document.createElement("tr")
        td1=document.createElement("td")
        const hex = arr[i].toString(16).toUpperCase();
        const len= hex.length
        const portal_address="1" + hex.substring(len-8, len-11) + hex.substring(len-3,len-5) + hex.substring(len-5, len-8) + hex.substring(len,len-3)
        console.log(arr[i] + ": " + hex);
        td1.appendChild(document.createTextNode(arr[i]))
        tr.appendChild(td1)

        td2=document.createElement("td")
        td2.appendChild(document.createTextNode(hex))
        tr.appendChild(td2)

        td3=document.createElement("td")
        td3.appendChild(document.createTextNode(portal_address))
        tr.appendChild(td3)

        tbody.appendChild(tr)
    }
}