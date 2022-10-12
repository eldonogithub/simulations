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
        let table = renderTable(arr)
        docFrag.appendChild(h2)
        docFrag.appendChild(table)
    }
    h1.after(docFrag)
}

function renderTable(arr) {
    arr.sort(portal_sort)

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
        let hex = arr[i].toString(16).toUpperCase();
        hex = hex.padStart(16, '0')
        const len = hex.length
        let portal_address = hex.substring(len - 11, 0) + hex.substring(len - 8, len - 11) + hex.substring(len - 3, len - 5) + hex.substring(len - 5, len - 8) + hex.substring(len, len - 3)
        converted.push({ "addr": arr[i], "hex": hex, "portal_address": portal_address })
    }

    converted.sort(portal_sort)

    var groups = [1, 3, 2, 3, 3];

    for (let i = 0; i < converted.length; i++) {
        let tr = document.createElement("tr")
        let parity = i % 2 == 0 ? "even" : "odd";
        tr.classList.add(parity);
        let td = document.createElement("td")
        td.classList.add("rowid")
        td.textContent = i + 1
        tr.appendChild(td)

        let td1 = document.createElement("td")
        td1.classList.add("addr")
        td1.appendChild(document.createTextNode(converted[i].addr))
        tr.appendChild(td1)

        let td2 = document.createElement("td")
        td2.classList.add("hex")
        td2.appendChild(document.createTextNode(converted[i].hex))
        tr.appendChild(td2)

        let docFrag = document.createDocumentFragment()
        let start = 4;
        let portalstring=""
        for (const size of groups) {
            let span = document.createElement("span")
            let value=converted[i].portal_address.substr(start, size)
            portalstring = portalstring + value
            let text = document.createTextNode(value)
            span.appendChild(text)
            start = start + size
            docFrag.appendChild(span)
        }

        let td3 = document.createElement("td")
        td3.classList.add("portal_code")
        td3.appendChild(docFrag.cloneNode(true))
        tr.appendChild(td3)

        let td4 = document.createElement("td")
        td4.classList.add("portal_address")

        td4.appendChild(docFrag)
        tr.appendChild(td4)

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