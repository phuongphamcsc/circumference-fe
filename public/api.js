 // Call api
 async function getPi() {
    const inputDigits = document.getElementById("iptDigits");
    const digitsValue = parseInt(inputDigits.value);
    console.log('digits=', digitsValue);

    // checkDigits
    const alertError = document.getElementById("lblError");
    // verify empty digits
    if (inputDigits.value === "") {
        alertError.innerText = "Please provide a valid digits.";
        alertError.style.display = "block";
        return;
    }
    // verify digits < 0
    if(digitsValue < 0){
        alertError.innerText = "Please provide a digits greater than or equal to 0.";
        alertError.style.display = "block";
        return;
    }
    alertError.style.display = "none";
    console.log("End verify digits.");

    // call api
    console.log(typeof digitsValue);
    const url = `https://pi-spigot.herokuapp.com/pi/${digitsValue}`;
    const urlCircum = `https://pi-spigot.herokuapp.com/circum`;
    const btnCalculatePi = document.getElementById("btnCalculatePi");
    btnCalculatePi.disabled = true;
    console.log("Start call api pi.");
    const data = await callApi(url);
    console.log("End call api pi.");
    
    // display pi result
    document.getElementById('txtPi').innerText = data.pi;

    console.log("Start call api circum.");
    const dataCircum = await callApi(urlCircum);
    console.log("End call api circum.");
    btnCalculatePi.disabled = false;

    // display circum result
    document.getElementById('txtCircum').innerText = dataCircum.circum;
}

async function callApi(url) {
    return new Promise((resolve) => {
        fetch(url).then(rs => {
            return rs.json()
        }).then(data => {
            resolve(data)
        });
    })
}