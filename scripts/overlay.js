//Criação do mapa personalizado
class OverlayMap{
    constructor(tileSize){
        this.tileSize = tileSize;
    }

    getTile(coord, zoom, ownerDocument){
        var div = ownerDocument.createElement('div');
        div.style.width = this.tileSize.width+'px';
        div.style.height = this.tileSize.width+'px';
        div.style.fontSize = '10px';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '1px';
        div.style.borderColor = '#333';
        return div;

    }


}
 

var map;

function initMap(){
    var initOptions = {
        center: {lat: -11.2999, lng:-41.8568},
        zoom: 15,
    }; 

    map = new google.maps.Map(document.getElementById('map'), initOptions);
    map.overlayMapTypes.insertAt(0, new OverlayMap(new google.maps.Size(256, 256)));
}
