"use strict";

function portal_sort(a, b) {
    if (a["portal_address"] > b["portal_address"]) {
        return 1;
    }
    else if (a["portal_address"] < b["portal_address"]) {
        return -1;
    }
    else {
        return 0;
    }
}

function loaded() {
    let headers = document.getElementsByTagName("h1")
    let h1 = headers.item(0)
    let docFrag = document.createDocumentFragment()
    for (let name in data) {
        let arr = data[name].VisitedSystems
        let h2 = document.createElement("h2")
        h2.appendChild(document.createTextNode(name))
        // 
        let table = renderTable(arr)
        docFrag.appendChild(h2)
        docFrag.appendChild(table)
    }
    h1.after(docFrag)
}

function renderTable(arr) {
    arr.sort(function(a,b){return a - b;})
    let table = document.createElement("table")
    table.classList.add("system_address")
    let thead = document.createElement("thead")
    table.appendChild(thead)
    let thr = document.createElement("tr")
    thead.appendChild(thr)
    let th = document.createElement("th")
    th.textContent = "Row"
    thr.appendChild(th)

    let th1 = document.createElement("th")
    th1.appendChild(document.createTextNode("Visited System Code"))
    thr.appendChild(th1)

    let th2 = document.createElement("th")
    th2.appendChild(document.createTextNode("Hex"))
    thr.appendChild(th2)

    let th3 = document.createElement("th")
    th3.appendChild(document.createTextNode("Portal Code"))
    thr.appendChild(th3)

    let th4 = document.createElement("th")
    th4.appendChild(document.createTextNode("Portal Address"))
    thr.appendChild(th4)

    th = document.createElement("th")
    th.appendChild(document.createTextNode("Coordinate data string"))
    thr.appendChild(th)

    let tbody = document.createElement("tbody")
    table.appendChild(tbody)
    var converted = []
    for (let i = 0; i < arr.length; i++) {
    }

    // number groups
    let groups = [
        { "size" : 1, "class" : "planetNumber"}, 
        { "size" : 3, "class" : "systemIndex" },
        { "size" : 2, "class" : "yDir" },
        { "size" : 3, "class" : "zDir" },
        { "size" : 3, "class" : "xDir" }
    ];

    function translateNumber(addr) {
        let hex = addr.toString(16).toUpperCase();
        hex = hex.padStart(16, '0')
        const len = hex.length

        let planetNumber= hex.substring(len - 11, 0)       // planet number
        let systemIndex = hex.substring(len - 8, len - 11) // system id
        let y=hex.substring(len - 3, len - 5)              // Y
        let z=hex.substring(len - 5, len - 8)              // Z
        let x=hex.substring(len, len - 3)                  // X

        let portal_address = planetNumber + systemIndex + y + z + x

        converted={ "addr": addr, "hex": hex, "portal_address": portal_address }

        return converted;
    }

    for (let i = 0; i < arr.length; i++) {
        converted=translateNumber(arr[i])

        let tr = document.createElement("tr")
        let parity = i % 2 == 0 ? "even" : "odd";
        tr.classList.add(parity);
        let td = document.createElement("td")
        td.classList.add("rowid")
        td.textContent = i + 1
        tr.appendChild(td)

        // display the numeric visited system code
        let td1 = document.createElement("td")
        td1.classList.add("addr")
        td1.appendChild(document.createTextNode(converted.addr))
        tr.appendChild(td1)

        // Convert to Hexidecimal
        let td2 = document.createElement("td")
        td2.classList.add("hex")
        td2.appendChild(document.createTextNode(converted.hex))
        tr.appendChild(td2)

        // Create fragment to duplicate DOM content
        let docFrag = document.createDocumentFragment()
        let start = 4;

        // Convert the hex into span groups
        let portalstring=""
        for (let i = 0; i < groups.length; i++ ) {
            let span = document.createElement("span")
            let value=converted.portal_address.substr(start, groups[i]["size"])
            portalstring = portalstring + value
            let text = document.createTextNode(value)
            span.appendChild(text)
            span.classList.add(groups[i]["class"])
            start = start + groups[i]["size"]
            docFrag.appendChild(span)
        }

        // put the string in a regular hex format
        let td3 = document.createElement("td")
        td3.classList.add("portal_code")
        td3.appendChild(docFrag.cloneNode(true))
        tr.appendChild(td3)

        // also make a copy for rengdering in the NMS Glyph font
        let td4 = document.createElement("td")
        td4.classList.add("portal_address")

        td4.appendChild(docFrag)
        tr.appendChild(td4)

        // convert to coordinate data string
        let planet = parseInt(portalstring.substr(0, 1), 16)
        let ssi = parseInt(portalstring.substr(1, 3), 16)
        let y = (parseInt(portalstring.substr(4, 2), 16) + 0x7F) % 0x100
        let z = (parseInt(portalstring.substr(6, 3), 16) + 0x7FF) % 0x1000
        let x = (parseInt(portalstring.substr(9, 3), 16) + 0x7FF) % 0x1000

        td = document.createElement("td")
        td.innerText = x.toString(16).toUpperCase().padStart(4, '0') + ':' +
            y.toString(16).toUpperCase().padStart(4, '0') + ':' +
            z.toString(16).toUpperCase().padStart(4, '0') + ':' +
            ssi.toString(16).toUpperCase().padStart(4, '0');

        tr.appendChild(td)
        tbody.appendChild(tr)
    }
    return table;
}