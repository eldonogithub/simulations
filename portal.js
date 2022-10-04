"use strict";

function portal_sort(a,b) {
    if ( a["portal_address"] > b["portal_address"] ) {
        return 1;
    }
    else if ( a["portal_address"] < b["portal_address"] ) {
        return -1;
    }
    else {
        return 0;
    }
}

function loaded() {
    let headers=document.getElementsByTagName("h1")
    let h1=headers.item(0)
    let docFrag=document.createDocumentFragment()
    for ( let name in data ) {
        let arr=data[name].VisitedSystems
        let h2 = document.createElement("h2")
        h2.appendChild(document.createTextNode(name))
        let table=renderTable(arr)
        docFrag.appendChild(h2)
        docFrag.appendChild(table)
    }
    h1.after(docFrag)
}

function renderTable(arr) {
    arr.sort(portal_sort)

    let table=document.createElement("table")
    table.setAttribute("class", "system_address")
    let thead=document.createElement("thead")
    table.appendChild(thead)
    let thr=document.createElement("tr")
    thead.appendChild(thr)

    let th1=document.createElement("th")
    th1.appendChild(document.createTextNode("Visited System Code"))
    thr.appendChild(th1)

    let th2=document.createElement("th")
    th2.appendChild(document.createTextNode("Hex"))
    thr.appendChild(th2)

    let th3=document.createElement("th")
    th3.appendChild(document.createTextNode("Portal Code"))
    thr.appendChild(th3)

    let th4=document.createElement("th")
    th4.appendChild(document.createTextNode("Portal Address"))
    thr.appendChild(th4)

    let tbody=document.createElement("tbody")
    table.appendChild(tbody)
    var converted = []
    for (let i = 0; i < arr.length; i++) {
        let hex = arr[i].toString(16).toUpperCase();
        hex=hex.padStart(16,'0')
        const len= hex.length
        let portal_address=hex.substring(len-11,0) + hex.substring(len-8, len-11) + hex.substring(len-3,len-5) + hex.substring(len-5, len-8) + hex.substring(len,len-3)
        converted.push({ "addr" : arr[i], "hex" : hex, "portal_address" : portal_address } )
    }
    
    converted.sort(portal_sort)

    for (let i = 0; i < converted.length; i++) {
        let tr=document.createElement("tr")
        let td1=document.createElement("td")
        td1.setAttribute("class", "addr")
        td1.appendChild(document.createTextNode(converted[i].addr))
        tr.appendChild(td1)

        let td2=document.createElement("td")
        td2.setAttribute("class", "hex")
        td2.appendChild(document.createTextNode(converted[i].hex))
        tr.appendChild(td2)

        let td3=document.createElement("td")
        td3.setAttribute("class", "portal_code")
        let c= String.fromCharCode(converted[i].portal_address.charCodeAt(4) - 1);
        converted[i].portal_address=converted[i].portal_address.substr(0,3) + c + converted[i].portal_address.substr(5)
        td3.appendChild(document.createTextNode(converted[i].portal_address))
        tr.appendChild(td3)

        let td4=document.createElement("td")
        td4.setAttribute("class", "portal_address")
        td4.appendChild(document.createTextNode(converted[i].portal_address.substr(-12)))
        tr.appendChild(td4)

        tbody.appendChild(tr)
    }
    return table;
}