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

function portal_loaded() {
    let form1=document.getElementById("signal-booster-form")
    form1.addEventListener("submit", submitForm )

    let form2=document.getElementById("visited-system-form")
    form2.addEventListener("submit", submitVisitedSystemForm )

    let h1 = document.getElementById("portal-coordinates")
    let docFrag = document.createDocumentFragment()
    return;
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
        let z=hex.substring(len - 5, len - 8)              // Z
        let y=hex.substring(len - 3, len - 5)              // Y
        let x=hex.substring(len, len - 3)                  // X

        let portal_address = planetNumber + systemIndex + y + z + x

        let converted={ "addr": addr, "hex": hex, "portal_address": portal_address }

        return converted;
    }

    for (let i = 0; i < arr.length; i++) {
        let converted=translateNumber(arr[i])

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
        /*
            Var name:	              Scanner ID	X	    Y	    Z	    Solar System Index
            Substring	              HUKYA	        046A	0081	0D6D	0038
            range for game values	  (4-5 letters)	0..FFF	0..FF	0..FFF	1..2FF
        */
        let planet = parseInt(portalstring.substr(0, 1), 16)
        let ssi = parseInt(portalstring.substr(1, 3), 16)
        if ( ssi == 0 || ssi > 0x2FF ) {
            tr.classList.add("invalid")
        }
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
let conversions=[]

function convert(event) {

    let portalInput=document.getElementById("signal-booster-string")

    let portalString=portalInput.value.toUpperCase()
    let portalStripped=portalString.replace(/[^0-9A-F]/g, '').slice(-16)
    console.log("input string=" + portalInput.value)
    console.log("portal string stripped=" + portalStripped)
    let portalStringPadded=portalStripped.padStart(16, '0')

    let planet = 0 // planet isn't provided with Signal Booster String

    let ssi = portalStringPadded.slice(-3)
    let ssiNumber = parseInt(ssi, 16)
    if ( ssiNumber == 0 || ssiNumber > 0x2FF ) {
        console.log(`SSI is invalid: ${ssi}`)
        return
    }
    let offsetXZ = 0x1000 - 0x7FF
    let offsetY = 0x100 - 0x7F


    let z1 = portalStringPadded.slice(-8, -4)
    let z2 = ((parseInt(z1, 16) + offsetXZ ) % 0x1000).toString(16).toUpperCase().padStart(3, '0')

    let y1 = portalStringPadded.slice(-11, -8)
    let y2 = ((parseInt(y1, 16) + offsetY ) % 0x100).toString(16).toUpperCase().padStart(2, '0')

    let x1 = portalStringPadded.slice(0, 4)
    let x2 = ((parseInt(x1, 16) + offsetXZ ) % 0x1000).toString(16).toUpperCase().padStart(3, '0')

    console.log(`original  planet=${planet}, ssi=${ssi}, y=${y1}, z=${z1}, x=${x1}`)
    console.log(`reordered planet=${planet}, ssi=${ssi}, z=${z2}, y=${y2}, x=${x2}`)

    let decodedString=`${planet}${ssi}${z2}${y2}${x2}`
    let decodedCode=parseInt(decodedString, 16)

    console.log(`decodedString=${decodedString}, decodedCode=${decodedCode}`)

    conversions.push(decodedCode)

    let div = document.createElement("div", )
    div.id='results'
    let results = document.getElementById("results")

    let h2 = document.createElement("h2")
    h2.appendChild(document.createTextNode("Results"))
    // 
    let table = renderTable(conversions)
    div.appendChild(h2)
    div.appendChild(table)
    if ( results == null  ) {
        event.target.appendChild(div)
    }
    else {
        results.replaceWith(div)
    }
}

function submitForm(event) {
    try {
        convert(event);
    }
    catch (error) {
        console.log(error);
    }
    event.preventDefault();
    return false;
}

let numbers=[]
function convertVisitedSystemNumber(event) {
    let visitedSystem=document.getElementById("visited-system-string")

    let visitedSystemString=visitedSystem.value.toUpperCase()
    let visitedSystemStripped=visitedSystemString.replace(/[^0-9A-F]*/g, '')
    console.log("input string=" + visitedSystem.value)
    console.log("number string stripped=" + visitedSystemStripped)

    let visitedSystemNumber = parseInt(visitedSystemStripped, 16)
    numbers.push(visitedSystemNumber)
    console.log(`decodedString=${visitedSystemString}, decodedCode=${visitedSystemNumber}`)

    let div = document.createElement("div", )
    div.id='visitedSystems'
    let visitedSystems = document.getElementById("visitedSystems")

    let h2 = document.createElement("h2")
    h2.appendChild(document.createTextNode("Visited Systems"))
    // 
    let table = renderTable(numbers)
    div.appendChild(h2)
    div.appendChild(table)
    if ( visitedSystems == null  ) {
        event.target.appendChild(div)
    }
    else {
        visitedSystems.replaceWith(div)
    }
}

function submitVisitedSystemForm(event) {
    try {
        convertVisitedSystemNumber(event);
    }
    catch (error) {
        console.log(error);
    }
    event.preventDefault();
    return false;
}