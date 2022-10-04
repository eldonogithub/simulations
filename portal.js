function loaded() {
    arr=data["VisitedSystems"]
    headers=document.getElementsByTagName("h1")
    h1=headers.item(0)
    console.log("start: " + arr.length)
    div=document.createElement("div")
    h1.after(div)
    for (let i = 0; i < arr.length; i++) {
        const hex = (arr[i]).toString(16);
        console.log(arr[i] + ": " + hex);
        br=document.createElement("br")
        div.appendChild(arr[i] + ": " + hex, br)
    }
}