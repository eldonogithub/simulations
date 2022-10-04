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
    arr=data2["VisitedSystems"]
    arr.sort(portal_sort)

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
    th3.appendChild(document.createTextNode("Portal Code"))
    thr.appendChild(th3)

    th4=document.createElement("th")
    th4.appendChild(document.createTextNode("Portal Address"))
    thr.appendChild(th4)

    tbody=document.createElement("tbody")
    table.appendChild(tbody)
    h1.after(table)
    var converted = []
    for (let i = 0; i < arr.length; i++) {
        const hex = arr[i].toString(16).toUpperCase();
        const len= hex.length
        const portal_address=hex.substring(len-11,len-12) + hex.substring(len-8, len-11) + hex.substring(len-3,len-5) + hex.substring(len-5, len-8) + hex.substring(len,len-3)
        converted.push({ "addr" : arr[i], "hex" : hex, "portal_address" : portal_address } )
    }
    
    converted.sort(portal_sort)

    for (let i = 0; i < converted.length; i++) {
        tr=document.createElement("tr")
        td1=document.createElement("td")
        console.log(converted[i].addr + ": " + converted[i].hex);
        td1.appendChild(document.createTextNode(converted[i].addr))
        tr.appendChild(td1)

        td2=document.createElement("td")
        td2.appendChild(document.createTextNode(converted[i].hex))
        tr.appendChild(td2)

        td3=document.createElement("td")
        td3.appendChild(document.createTextNode(converted[i].portal_address))
        tr.appendChild(td3)

        td4=document.createElement("td")
        td4.setAttribute("class", "portal_address")
        td4.appendChild(document.createTextNode(converted[i].portal_address))
        tr.appendChild(td4)

        tbody.appendChild(tr)
    }
}