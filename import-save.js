function printObjectData(obj, n = 0) {
    let i = 0;
    var properties = Object.keys(obj);

    let tab = "";
    for (i = 0; i < n; i++)
        tab += "\t";

    for (i = 0; i < properties.length; i++) {
        if (typeof (obj[properties[i]]) == "object") {
            console.log(tab + properties[i] + ":");
            printObjectData(obj[properties[i]], n + 1);
        }
        else
            console.log(tab + properties[i] + " : " + obj[properties[i]]);
    }
}

// addrRegex = /address|visitedsystems/i;
addrRegex = /visitedsystems/i;

function findAddresses(obj, n = 0, prefix = [], inAddr = [], addresses = []) {
    let i = 0;
    var properties = Object.keys(obj);

    let tab = "";
    for (i = 0; i < n; i++)
        tab += "\t";

    for (i = 0; i < properties.length; i++) {
        const key = properties[i];
        value = obj[key]
        prefix.push(key)
        state = inAddr.length > 0 ? inAddr[inAddr.length - 1] : 0;
        state = state || key.search(addrRegex) != -1
        inAddr.push(state)
        if (typeof (value) == "object") {
            findAddresses(value, n + 1, prefix, inAddr, addresses);
        }
        else if (state) {
            ctx = ""
            prefix.forEach(function itemToString(value, index, arr) {
                if (Number.isInteger(parseInt(value))) {
                    ctx += "[" + value + "]";
                    return;
                }

                if (index == 0)
                    ctx += value;
                else
                    ctx += `.${value}`;
            }
            )
            addresses.push(value);

        }
        inAddr.pop()
        prefix.pop()
    }
    return addresses;
}

function portal_loaded() {
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

var data
function processFile(reader) {
    data = JSON.parse(reader.result)

    addresses = findAddresses(data);

    let table = renderTable(addresses)

    let h2 = document.createElement("h2")
    h2.appendChild(document.createTextNode("Addresses"))

    let docFrag = document.createDocumentFragment()
    docFrag.appendChild(h2)
    docFrag.appendChild(table)
    bodies = document.getElementsByTagName("body")
    if (bodies.length == 0) {
        console.error("no body found")
        return;
    }
    body = bodies.item(0)
    body.appendChild(docFrag)

}

function processFiles(file, processFile) {
    reader = new FileReader();
    reader.onload = (evt) => {
        console.log(`loaded file`)
        processFile(evt.target);
    };
    if (file.files.length == 0) {
        console.log("no file specified")
        return;
    }
    for (let i = 0; i < file.files.length; i++) {
        reader.readAsText(file.files[i]);
    }
}

function loadFile() {
    let fileName = document.getElementById("json-file-input");

    console.log("filename=" + fileName.value)
    processFiles(fileName, processFile)

    inputFile = document.getElementById("json-file-input")
    inputFile.classList.add("off")
    return false;
}

function handleGoButton(event) {
    console.log("handlGoButton")
    data = {
        "visitedsystems": [1, 2, 3, 4, 5]
    }
    findAddresses(data);
}

function loadFileButton(event) {
    inputFile = document.getElementById("json-file-input")
    inputFile.click()
}

function updateInputFile(event) {
    inputFile = document.getElementById("json-file-input")
    inputFile.classList.remove("off")
}

function import_save() {
    console.log("import_save")
    goButton = document.getElementById("test-button")
    goButton.addEventListener("mouseup", handleGoButton)
    fileButton = document.getElementById("select-file-button")
    fileButton.addEventListener('click', loadFileButton)
    inputFile = document.getElementById("json-file-input")
    inputFile.addEventListener('change', updateInputFile);
}