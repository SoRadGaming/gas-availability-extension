function getData(address, callback) {
    console.log("Getting Data");
    console.log(address);
    // Code Categorise
    var houseNumber = address.split(" ")[0];
    var CalculatingStreetName = address.split(" ").slice(1).join(" ");
    var streetName = CalculatingStreetName.split(",")[0].split(" ").slice(0, -1).join(" ");
    var streetType = CalculatingStreetName.split(",")[0].split(" ").slice(-1);
    var suburbOrPlaceOrLocality = CalculatingStreetName.split(",")[1].trim();
    var postcode = address.split(" ").slice(-1)[0];
    var stateOrTerritory = stateTranslate(address.split(" ").slice(-2)[0]);

    // Debugging
    console.log("houseNumber: " + houseNumber);
    console.log("streetName: " + streetName);
    console.log("streetType: " + streetType);
    console.log("suburbOrPlaceOrLocality: " + suburbOrPlaceOrLocality);
    console.log("postcode: " + postcode);
    console.log("stateOrTerritory: " + stateOrTerritory);

    const url = "https://jemena-gas-network-api.onrender.com/api?" + "houseNumber=" + houseNumber + "&streetName=" + streetName + "&streetType=" + streetType + "&suburbOrPlaceOrLocality=" + suburbOrPlaceOrLocality + "&postCode=" + postcode + "&stateOrTerritory=" + stateOrTerritory;

    $.ajax({
        url: url,
        method: "GET",
    }).then(function (response) {
        var data = JSON.parse(response);
        console.log("Cost: " + data.OfferExclGST);
        console.log("ExceptionCode: " + data.ExceptionCode);
        callback(data);
    });
}

function stateTranslate(stateName) {
    switch (stateName) {
        case "ACT":
            stateName = "Australian Capital Territory";
            break;
        case "NSW":
            stateName = "New South Wales";
            break;
        case "NT":
            stateName = "Northern Territory";
            break;
        case "QLD":
            stateName = "Queensland";
            break;
        case "SA":
            stateName = "South Australia";
            break;
        case "TAS":
            stateName = "Tasmania";
            break;
        case "VIC":
            stateName = "Victoria";
            break;
        case "WA":
            stateName = "Western Australia";
            break;
    }
    return stateName;
}
