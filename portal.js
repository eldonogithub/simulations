"use strict";

(function () { // Scoping function to avoid creating globals
    let galaxies = [
        "Euclid",
        "Hilbert Dimension",
        "Calypso",
        "Hesperius Dimension",
        "Hyades",
        "Ickjamatew",
        "Budullangr",
        "Kikolgallr",
        "Eltiensleen",
        "Eissentam",
        "Elkupalos",
        "Aptarkaba",
        "Ontiniangp",
        "Odiwagiri",
        "Ogtialabi",
        "Muhacksonto",
        "Hitonskyer",
        "Rerasmutul",
        "Isdoraijung",
        "Doctinawyra",
        "Loychazinq",
        "Zukasizawa",
        "Ekwathore",
        "Yeberhahne",
        "Twerbetek",
        "Sivarates",
        "Eajerandal",
        "Aldukesci",
        "Wotyarogii",
        "Sudzerbal",
        "Maupenzhay",
        "Sugueziume",
        "Brogoweldian",
        "Ehbogdenbu",
        "Ijsenufryos",
        "Nipikulha",
        "Autsurabin",
        "Lusontrygiamh",
        "Rewmanawa",
        "Ethiophodhe",
        "Urastrykle",
        "Xobeurindj",
        "Oniijialdu",
        "Wucetosucc",
        "Ebyeloof",
        "Odyavanta",
        "Milekistri",
        "Waferganh",
        "Agnusopwit",
        "Teyaypilny",
        "Zalienkosm",
        "Ladgudiraf",
        "Mushonponte",
        "Amsentisz",
        "Fladiselm",
        "Laanawemb",
        "Ilkerloor",
        "Davanossi",
        "Ploehrliou",
        "Corpinyaya",
        "Leckandmeram",
        "Quulngais",
        "Nokokipsechl",
        "Rinblodesa",
        "Loydporpen",
        "Ibtrevskip",
        "Elkowaldb",
        "Heholhofsko",
        "Yebrilowisod",
        "Husalvangewi",
        "Ovna'uesed",
        "Bahibusey",
        "Nuybeliaure",
        "Doshawchuc",
        "Ruckinarkh",
        "Thorettac",
        "Nuponoparau",
        "Moglaschil",
        "Uiweupose",
        "Nasmilete",
        "Ekdaluskin",
        "Hakapanasy",
        "Dimonimba",
        "Cajaccari",
        "Olonerovo",
        "Umlanswick",
        "Henayliszm",
        "Utzenmate",
        "Umirpaiya",
        "Paholiang",
        "Iaereznika",
        "Yudukagath",
        "Boealalosnj",
        "Yaevarcko",
        "Coellosipp",
        "Wayndohalou",
        "Smoduraykl",
        "Apmaneessu",
        "Hicanpaav",
        "Akvasanta",
        "Tuychelisaor",
        "Rivskimbe",
        "Daksanquix",
        "Kissonlin",
        "Aediabiel",
        "Ulosaginyik",
        "Roclaytonycar",
        "Kichiaroa",
        "Irceauffey",
        "Nudquathsenfe",
        "Getaizakaal",
        "Hansolmien",
        "Bloytisagra",
        "Ladsenlay",
        "Luyugoslasr",
        "Ubredhatk",
        "Cidoniana",
        "Jasinessa",
        "Torweierf",
        "Saffneckm",
        "Thnistner",
        "Dotusingg",
        "Luleukous",
        "Jelmandan",
        "Otimanaso",
        "Enjaxusanto",
        "Sezviktorew",
        "Zikehpm",
        "Bephembah",
        "Broomerrai",
        "Meximicka",
        "Venessika",
        "Gaiteseling",
        "Zosakasiro",
        "Drajayanes",
        "Ooibekuar",
        "Urckiansi",
        "Dozivadido",
        "Emiekereks",
        "Meykinunukur",
        "Kimycuristh",
        "Roansfien",
        "Isgarmeso",
        "Daitibeli",
        "Gucuttarik",
        "Enlaythie",
        "Drewweste",
        "Akbulkabi",
        "Homskiw",
        "Zavainlani",
        "Jewijkmas",
        "Itlhotagra",
        "Podalicess",
        "Hiviusauer",
        "Halsebenk",
        "Puikitoac",
        "Gaybakuaria",
        "Grbodubhe",
        "Rycempler",
        "Indjalala",
        "Fontenikk",
        "Pasycihelwhee",
        "Ikbaksmit",
        "Telicianses",
        "Oyleyzhan",
        "Uagerosat",
        "Impoxectin",
        "Twoodmand",
        "Hilfsesorbs",
        "Ezdaranit",
        "Wiensanshe",
        "Ewheelonc",
        "Litzmantufa",
        "Emarmatosi",
        "Mufimbomacvi",
        "Wongquarum",
        "Hapirajua",
        "Igbinduina",
        "Wepaitvas",
        "Sthatigudi",
        "Yekathsebehn",
        "Ebedeagurst",
        "Nolisonia",
        "Ulexovitab",
        "Iodhinxois",
        "Irroswitzs",
        "Bifredait",
        "Beiraghedwe",
        "Yeonatlak",
        "Cugnatachh",
        "Nozoryenki",
        "Ebralduri",
        "Evcickcandj",
        "Ziybosswin",
        "Heperclait",
        "Sugiuniam",
        "Aaseertush",
        "Uglyestemaa",
        "Horeroedsh",
        "Drundemiso",
        "Ityanianat",
        "Purneyrine",
        "Dokiessmat",
        "Nupiacheh",
        "Dihewsonj",
        "Rudrailhik",
        "Tweretnort",
        "Snatreetze",
        "Iwundaracos",
        "Digarlewena",
        "Erquagsta",
        "Logovoloin",
        "Boyaghosganh",
        "Kuolungau",
        "Pehneldept",
        "Yevettiiqidcon",
        "Sahliacabru",
        "Noggalterpor",
        "Chmageaki",
        "Veticueca",
        "Vittesbursul",
        "Nootanore",
        "Innebdjerah",
        "Kisvarcini",
        "Cuzcogipper",
        "Pamanhermonsu",
        "Brotoghek",
        "Mibittara",
        "Huruahili",
        "Raldwicarn",
        "Ezdartlic",
        "Badesclema",
        "Isenkeyan",
        "Iadoitesu",
        "Yagrovoisi",
        "Ewcomechio",
        "Inunnunnoda",
        "Dischiutun",
        "Yuwarugha",
        "Ialmendra",
        "Reponudrle",
        "Rinjanagrbo",
        "Zeziceloh",
        "Oeileutasc",
        "Zicniijinis",
        "Dugnowarilda",
        "Neuxoisan",
        "Ilmenhorn",
        "Rukwatsuku",
        "Nepitzaspru",
        "Chcehoemig",
        "Haffneyrin",
        "Uliciawai",
        "Tuhgrespod",
        "Iousongola",
    ]


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

    function portal_loaded(event) {
        console.log("page is fully loaded");
        let form1 = document.getElementById("signal-booster-form")
        form1.addEventListener("submit", submitForm)
        let clearButton = document.getElementById("clear-signal-booster")
        clearButton.addEventListener("click", clearData)

        let form2 = document.getElementById("visited-system-form")
        form2.addEventListener("submit", submitVisitedSystemForm)

        let form3 = document.getElementById("universal-address-form")
        form3.addEventListener("submit", submitUniversalAddressForm)

        let h1 = document.getElementById("portal-coordinates")
        let docFrag = document.createDocumentFragment()
        updateGalacticTable(form3, universalAddresses, "universalAddresses", "Universal Addresses")
        return;
        for (let name in data) {
            let arr = data[name].VisitedSystems
            let h2 = document.createElement("h2")
            h2.appendChild(document.createTextNode(name))
            // 
            let table = renderTable(arr, true)
            docFrag.appendChild(h2)
            docFrag.appendChild(table)
        }
        h1.after(docFrag)
    }

    function renderTable(arr, sort) {
        if (sort)
            arr.sort(function (a, b) { return a - b; })

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
            { "size": 1, "class": "planetNumber" },
            { "size": 3, "class": "systemIndex" },
            { "size": 2, "class": "yDir" },
            { "size": 3, "class": "zDir" },
            { "size": 3, "class": "xDir" }
        ];

        function translateNumber(addr) {
            let hex = addr.toString(16).toUpperCase();
            hex = hex.padStart(16, '0')
            const len = hex.length

            let planetNumber = hex.substring(len - 11, 0)       // planet number
            let systemIndex = hex.substring(len - 8, len - 11) // system id
            let systemIndexNumber = parseInt(systemIndex, 16)
            let valid
            if (systemIndexNumber == 0) {
                valid = "zero"
                systemIndexNumber = 1
                systemIndex = systemIndexNumber.toString(16).padStart(3, '0')
            }
            else if (systemIndexNumber > 0x2FF) {
                valid = "overflow"
                systemIndexNumber &= 0x2FF
                systemIndex = systemIndexNumber.toString(16).padStart(3, '0')
            }
            else {
                valid = "ok"
            }
            let z = hex.substring(len - 5, len - 8)              // Z
            let y = hex.substring(len - 3, len - 5)              // Y
            let x = hex.substring(len, len - 3)                  // X

            let portal_address = planetNumber + systemIndex + y + z + x

            let converted = { "addr": addr, "hex": hex, "portal_address": portal_address, "valid": valid }

            return converted;
        }

        for (let i = 0; i < arr.length; i++) {
            let converted = translateNumber(arr[i])

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
            let portalstring = ""
            for (let i = 0; i < groups.length; i++) {
                let span = document.createElement("span")
                let value = converted.portal_address.substr(start, groups[i]["size"])
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
            let planetHex = portalstring.substr(0, 1)
            let planet = parseInt(planetHex, 16)
            let ssiHex = portalstring.slice(1, 4)
            let ssi = parseInt(ssiHex, 16)

            let y = (parseInt(portalstring.substr(4, 2), 16) + 0x7F) % 0x100
            let z = (parseInt(portalstring.substr(6, 3), 16) + 0x7FF) % 0x1000
            let x = (parseInt(portalstring.substr(9, 3), 16) + 0x7FF) % 0x1000

            td = document.createElement("td")
            td.innerText = x.toString(16).toUpperCase().padStart(4, '0') + ':' +
                y.toString(16).toUpperCase().padStart(4, '0') + ':' +
                z.toString(16).toUpperCase().padStart(4, '0') + ':' +
                ssi.toString(16).toUpperCase().padStart(4, '0');
            td.classList.add("signal-booster-string")

            tr.appendChild(td)
            tr.classList.add(converted.valid)
            tbody.appendChild(tr)
        }
        return table;
    }

    function renderGalacticTable(arr, sort) {
        if (sort) {
            arr.sort(function (a, b) { return a.number - b.number; })
        }
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

        let th31 = document.createElement("th")
        th31.appendChild(document.createTextNode("Galaxy"))
        thr.appendChild(th31)

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
            { "size": 1, "class": "planetNumber" },
            { "size": 3, "class": "systemIndex" },
            { "size": 2, "class": "yDir" },
            { "size": 3, "class": "zDir" },
            { "size": 3, "class": "xDir" }
        ];

        function translateNumber(addr) {
            let hex = addr.toString(16).toUpperCase();
            hex = hex.padStart(16, '0')
            const len = hex.length

            let planetNumber = hex.substring(len - 11, 0)       // planet number
            let systemIndex = hex.substring(len - 8, len - 11) // system id
            let systemIndexNumber = parseInt(systemIndex, 16)
            let valid
            if (systemIndexNumber == 0) {
                valid = "zero"
                systemIndexNumber = 1
                systemIndex = systemIndexNumber.toString(16).padStart(3, '0')
            }
            else if (systemIndexNumber > 0x2FF) {
                valid = "overflow"
                systemIndexNumber &= 0x2FF
                systemIndex = systemIndexNumber.toString(16).padStart(3, '0')
            }
            else {
                valid = "ok"
            }
            let z = hex.substring(len - 5, len - 8)              // Z
            let y = hex.substring(len - 3, len - 5)              // Y
            let x = hex.substring(len, len - 3)                  // X

            let portal_address = planetNumber + systemIndex + y + z + x

            let converted = { "addr": addr, "hex": hex, "portal_address": portal_address, "valid": valid }

            return converted;
        }

        for (let i = 0; i < arr.length; i++) {
            let converted = translateNumber(arr[i].number)
            let galaxy = arr[i].galaxy
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
            let portalstring = ""
            for (let i = 0; i < groups.length; i++) {
                let span = document.createElement("span")
                let value = converted.portal_address.substr(start, groups[i]["size"])
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

            // add Galaxy Number
            let td31 = document.createElement("td")
            let span = document.createElement("span")
            span.innerText = galaxies[parseInt(galaxy, 16)]
            span.classList.add("galaxy-index")
            td31.classList.add("galaxy")
            td31.appendChild(span)
            tr.appendChild(td31)

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
            let planetHex = portalstring.substr(0, 1)
            let planet = parseInt(planetHex, 16)
            let ssiHex = portalstring.slice(1, 4)
            let ssi = parseInt(ssiHex, 16)

            let y = (parseInt(portalstring.substr(4, 2), 16) + 0x7F) % 0x100
            let z = (parseInt(portalstring.substr(6, 3), 16) + 0x7FF) % 0x1000
            let x = (parseInt(portalstring.substr(9, 3), 16) + 0x7FF) % 0x1000

            td = document.createElement("td")
            td.innerText = x.toString(16).toUpperCase().padStart(4, '0') + ':' +
                y.toString(16).toUpperCase().padStart(4, '0') + ':' +
                z.toString(16).toUpperCase().padStart(4, '0') + ':' +
                ssi.toString(16).toUpperCase().padStart(4, '0');
            td.classList.add("signal-booster-string")

            tr.appendChild(td)
            tr.classList.add(converted.valid)
            tbody.appendChild(tr)
        }
        return table;
    }
    let conversions = []

    function updateTable(target, arr, id, heading) {
        let div = document.createElement("div",)
        div.id = id
        let results = document.getElementById(id)

        let h2 = document.createElement("h2")
        h2.appendChild(document.createTextNode(heading))
        // 
        let table = renderTable(arr, false)
        div.appendChild(h2)
        div.appendChild(table)
        if (results == null) {
            target.appendChild(div)
        }
        else {
            results.replaceWith(div)
        }
    }

    function updateGalacticTable(target, arr, id, heading) {
        let div = document.createElement("div",)
        div.id = id
        let results = document.getElementById(id)

        let h2 = document.createElement("h2")
        h2.appendChild(document.createTextNode(heading))
        // 
        let table = renderGalacticTable(arr, false)
        div.appendChild(h2)
        div.appendChild(table)
        if (results == null) {
            target.appendChild(div)
        }
        else {
            results.replaceWith(div)
        }
    }

    function convert(event) {

        let portalInput = document.getElementById("signal-booster-string")

        let portalString = portalInput.value.toUpperCase()
        let portalStripped = portalString.replace(/[^0-9A-F]/g, '').slice(-16)
        console.log("input string=" + portalInput.value)
        console.log("portal string stripped=" + portalStripped)
        let portalStringPadded = portalStripped.padStart(16, '0')

        let planet = 0 // planet isn't provided with Signal Booster String

        let ssi = portalStringPadded.slice(-3)
        let ssiNumber = parseInt(ssi, 16)
        let offsetXZ = 0x1000 - 0x7FF
        let offsetY = 0x100 - 0x7F


        let z1 = portalStringPadded.slice(-8, -4)
        let z2 = ((parseInt(z1, 16) + offsetXZ) % 0x1000).toString(16).toUpperCase().padStart(3, '0')

        let y1 = portalStringPadded.slice(-11, -8)
        let y2 = ((parseInt(y1, 16) + offsetY) % 0x100).toString(16).toUpperCase().padStart(2, '0')

        let x1 = portalStringPadded.slice(0, 4)
        let x2 = ((parseInt(x1, 16) + offsetXZ) % 0x1000).toString(16).toUpperCase().padStart(3, '0')

        console.log(`original  planet=${planet}, ssi=${ssi}, y=${y1}, z=${z1}, x=${x1}`)
        console.log(`reordered planet=${planet}, ssi=${ssi}, z=${z2}, y=${y2}, x=${x2}`)

        let decodedString = `${planet}${ssi}${z2}${y2}${x2}`
        let decodedCode = parseInt(decodedString, 16)

        console.log(`decodedString=${decodedString}, decodedCode=${decodedCode}`)

        conversions.push(decodedCode)

        updateTable(event.target, conversions, "results", "Results")
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

    let numbers = []
    function convertVisitedSystemNumber(event) {
        let visitedSystem = document.getElementById("visited-system-string")

        let visitedSystemString = visitedSystem.value.toUpperCase()
        let visitedSystemStripped = visitedSystemString.replace(/[^0-9A-F]*/g, '')
        console.log("input string=" + visitedSystem.value)
        console.log("number string stripped=" + visitedSystemStripped)

        let visitedSystemNumber = parseInt(visitedSystemStripped, 16)
        numbers.push(visitedSystemNumber)
        console.log(`decodedString=${visitedSystemString}, decodedCode=${visitedSystemNumber}`)

        updateTable(event.target, numbers, "visitedSystems", "Visited Systems")
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

    function clearData(event) {
        try {
            console.log(`clearData called: conversions.length=${conversions.length}`)
            while (conversions.length) {
                let x = conversions.pop();
                console.log(`deleted x=${x}`)
            }
            let form1 = document.getElementById("signal-booster-form")

            updateTable(form1, conversions, "results", "Results")
        }
        catch (error) {
            console.log(error)
        }
    }

    let universalAddresses = JSON.parse(localStorage.getItem("universalAddresses") || "[]");

    function convertUniversalAddress(event) {
        let address = document.getElementById("universal-address-string")

        let addressString = address.value.toUpperCase()
        let addressStripped = addressString.replace(/[^0-9A-F]*/g, '').padStart(16, '0')
        console.log("input string=" + address.value)
        console.log("address string stripped=" + addressStripped)

        // It can be decoded as follows: [??][P][SSS][GG][YY][ZZZ][XXX] – 
        // (? = Unknown / P = Planet Index / S = Star System Index /G = Galaxy / Y = Height / Z = Width / X = Length)
        const regexp = /([0-9A-F]{2})([0-9A-F]{1})([0-9A-F]{3})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{3})([0-9A-F]{3})/
        let matches = addressStripped.match(regexp)

        for (let i = 0; i < matches.length; i++) {
            console.log(`m[${i}]=${matches[i]}`)
        }

        let visitedSystemAddress = matches[2] + matches[3] + matches[5] + matches[6] + matches[7]
        let galaxy = matches[4]
        console.log(`VisitedSystemAddress=${visitedSystemAddress}`)

        let visitedSystemNumber = {
            "number": parseInt(visitedSystemAddress, 16),
            "galaxy": galaxy
        }
        universalAddresses.push(visitedSystemNumber)
        updateGalacticTable(event.target, universalAddresses, "universalAddresses", "Universal Addresses")

        // Saving
        localStorage.setItem("universalAddresses", JSON.stringify(universalAddresses));
    }

    function submitUniversalAddressForm(event) {
        try {
            convertUniversalAddress(event);
        }
        catch (error) {
            console.log(error);
        }
        event.preventDefault();
        return false;
    }

    window.addEventListener("load", portal_loaded );

    console.log("Initializing...")
})();