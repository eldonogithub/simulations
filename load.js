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

addrRegex = /address/i;

function findAddresses(obj, n = 0, prefix = [], inAddr=[]) {
    console.log(`n=${n}`)
    let i = 0;
    var properties = Object.keys(obj);

    let tab = "";
    for (i = 0; i < n; i++)
        tab += "\t";

    for (i = 0; i < properties.length; i++) {
        const key = properties[i];
        console.log(`key=${key}`)
        value = obj[key]
        prefix.push(key)
        state = inAddr.length>0 ? inAddr[inAddr.length-1] : 0;
        state = state || key.search(addrRegex) != -1 
        inAddr.push(state)
        if (typeof (value) == "object") {
            findAddresses(value, n + 1, prefix, inAddr);
        }
        else if (state) {
            ctx = ""
            prefix.forEach(function itemToString(value, index, arr) {
                console.log(`ctx=${ctx}, property=${value}`)

                if (Number.isInteger(value)) {
                    ctx += "[" + value + "]";
                    return;
                }

                if (index == 0)
                    ctx += value;
                else
                    ctx += `.${value}`;
            }
            )
            console.log(ctx + "(" + typeof (value) + ") : " + value);
        }
        inAddr.pop()
        prefix.pop()
    }
}

var data

function processFile(text) {
    data = JSON.parse(text)

    findAddresses(data);
}

function readJson(file, processFile) {
    const reader = new FileReader();
    reader.onload = (evt) => {
        console.log("loaded file")
        processFile(evt.target.result);
    };
    reader.readAsText(file.files[0]);
}

function loadFile() {
    let fileName = document.getElementById("json-file-input");

    console.log("filename=" + fileName.value)
    readJson(fileName, processFile)

    return false;
}

function handleGoButton(event) {
    console.log("handlGoButton")
    data = {
        "address": [1, 2, 3, 4, 5]
    }
    findAddresses(data);
}

function loaded() {
    goButton = document.getElementById("test-button")
    goButton.addEventListener("mouseup", handleGoButton)
    console.log("loaded")
}