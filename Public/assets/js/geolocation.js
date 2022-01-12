function initLocationProcedure() {
    initializeMap();

    if (navigator.geolocation) {

        // Timer with setInterval
        var timer = setInterval(function () {
            navigator.geolocation.getCurrentPosition(setCurrentPosition, locError);
        }, 30000);

    } else {
        // tell the user if a browser doesn't support this amazing API
        alert("Your browser does not support the Geolocation API!");
    }
}