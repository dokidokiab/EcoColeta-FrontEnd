//let h2 = document.querySelector('h2');

function success(pos){
    console.log(pos.coords.latitude, pos.coords.longitude);
    //h2.textContent = `Latitude:${pos.coords.latitude}, Longitude:${pos.coords.longitude}`;

    var map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 20);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();

}

function error(err){
    console.log(err);
}

var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
})

/*
function GetMap()
    {
        var map = new Microsoft.Maps.Map('#myMap', {
            zoom: 60
        });
        
         var pin = new Microsoft.Maps.Pushpin(map.getCenter(), {
            icon: 'images/mapSelectedIcon.svg',
            anchor: new Microsoft.Maps.Point(12, 39)
        });

        map.entities.push(pin);

        Microsoft.Maps.Events.addHandler(map, 'click',getLatlng ); 
    }


function getLatlng(e) { 
    
        if (e.targetType == "map") {
        
            var point = new Microsoft.Maps.Point(e.getX(), e.getY());
            var locTemp = e.target.tryPixelToLocation(point);
            var location = new Microsoft.Maps.Location(locTemp.latitude, locTemp.longitude);
            var newPin = new Microsoft.Maps.Pushpin(location, {
                icon: 'images/coletaIcon.svg',
                anchor: new Microsoft.Maps.Point(12, 39)
            });

            
            e.entities.push(newPin);

        }
    }

    /*
function descartar()
    {

    }*/