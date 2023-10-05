var map;
var directionsRenderer;
var final_location = document.getElementById('final_location');
let autocomplete;
let userLocation = null;
var descartesDisponíveis = [];
const descarteDisponivellat = 0;




class CenterControl {
    
    constructor(map) {
        this.controlDiv = document.createElement('div'); // bom ter conhecimento de DOM
        this.controlUI = document.createElement('div');
        this.controlText = document.createElement('div');

        this.controlDiv.style.width = '400px';
        this.controlDiv.style.marginTop = '10px';
        this.controlDiv.style.marginLeft = '80';


        this.controlDiv.appendChild(this.controlUI);

        this.controlUI.addEventListener('click', () => {
            // Criando uma div vazia
            var div = document.createElement('div');
            
            // Definindo os estilos da div
            div.style.width = '250px';
            div.style.height = '50px';
            div.style.backgroundColor = 'white';
            div.style.position = 'absolute'; // Posição absoluta em relação ao mapa
            div.style.top = '50px'; 
            div.style.left = '50px'; 

          
            document.getElementById('map').appendChild(div);
        });
        

    }
}

class MeuLocalControl {
    constructor(map) {
        this.controlDiv = document.createElement('div'); // bom ter conhecimento de DOM
        this.controlUI = document.createElement('div');
        this.controlText = document.createElement('div');

        this.controlUI.style.backgroundColor = '#fff';
        this.controlUI.style.border = '2px solid #ebebeb';
        this.controlUI.style.borderRadius = '50%';
        this.controlUI.style.padding = '3px';
        this.controlUI.style.cursor = 'pointer';
        this.controlUI.style.title = 'Meu local';
        this.controlUI.style.boxShadow = '1px 1px 3px black';
        this.controlUI.style.marginBottom = '70px';

        this.controlDiv.appendChild(this.controlUI);

        this.controlText.style.textAlign = 'center';
        this.controlText.style.color = '#333';
        this.controlText.innerHTML = '<img style="width: 30px;" src="../images/gps.png" />';

        this.controlUI.appendChild(this.controlText);

        this.controlUI.addEventListener('click', () => {
            getLocation();
            //map.setCenter(centerMap);
        });


    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocalização não é suportada nesse navegador.");
    }
}
 
function showPosition(position) {
    //fetchData();
    let descarteDisponivel = null;

    // Coordenadas de geolocalização
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const latlon = new google.maps.LatLng(lat, lon);

    userLocation = latlon;

    // Atualiza o mapa com as coordenadas
    updateMap(latlon);

    // Centraliza o mapa na posição atual
    map.setCenter(latlon);

    // Adiciona um marcador à posição atual
    new google.maps.Marker({
        position: latlon,
        map: map,
        title: 'Minha Localização',
        icon: '../images/mapSelectedIcon.svg',
        animation: google.maps.Animation.DROP,
        draggable: false
    });

    // Geocodifica as coordenadas
    const geocoder = new google.maps.Geocoder();
    geocodeLatLng(geocoder, lat, lon);

    // Verifica se a variável está definida
    if (typeof place !== 'undefined') {
        // Chama a função calculateRoute com as coordenadas
        calculateRoute(latlon, place);
    }

    
                                                                    //REALIZAR DENTRO DE UM BOTÃO
    
    const shorter_distance = 0;
    var actual_distance = 0;

                                                                    
    fetch("http://localhost:8080/descarte/getAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log(data);

        for (let index = 0; index < data.length; index++) {
            if(data[index].status != null){

                const numbertest = Number(data[index].status);
                console.log(typeof numbertest);
                console.log(numbertest);

                if(data[index].status == 1){
                    console.log(data[index].id);

                    actual_distance = calculateDistance(lat, lon, data[index].latitude, data[index].longitude);
                    
                    if(actual_distance < shorter_distance){
                        descartesDisponíveis[index] = data[index];
                    }
                
                    const valoresLatLng = new google.maps.LatLng(descarteDisponivel.latitude, descarteDisponivel.longitude);
                    //console.log(descarteDisponivel.latitude );
                }
            }else{
                continue;
            }
                console.log(descartesDisponíveis[index]);
                if(descarteDisponivel.latitude != null && descarteDisponivel.longitude != null){

                    new google.maps.Marker({
                        position: valoresLatLng,
                        map: map,
                        title: 'Minha Localização',
                        icon: '../images/coringa.svg',
                        animation: google.maps.Animation.DROP,
                        draggable: false
                    });
                }
            //descartesDisponíveis = data;
            }
        
        // You can process the data as needed here
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371; // RAIO DA TERRA EM KILOMETROS
  
    // CONVERTER A LATITUDE E LONGITUDE DE GRAUS PARA RADIANO 
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lon2Rad = (lon2 * Math.PI) / 180;
  
    // CALCULA A DIFERENÇA
    const latDiff = lat2Rad - lat1Rad;
    const lonDiff = lon2Rad - lon1Rad;
  
    // CALCULA A DISTANCIA USANDO A FORMULA DE HAVERSINE  
    const a =
      Math.sin(latDiff / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;
  
    return distance; // DISTANCIA EM KILOMETROS
  }

async function fetchData() {
    try {
      const response = await fetch('http://localhost:8080/getAll');
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      
      // You can work with the data here
      console.log(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }


function updateMap(latlon) {
    const myOptions = {
        center: latlon,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoom: 16,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#7c93a3"
                    },
                    {
                        "lightness": "-10"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#a0a4a5"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#62838e"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dde3e3"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#3f4a51"
                    },
                    {
                        "weight": "0.30"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#bbcacf"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "lightness": "0"
                    },
                    {
                        "color": "#bbcacf"
                    },
                    {
                        "weight": "0.50"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#a9b4b8"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "invert_lightness": true
                    },
                    {
                        "saturation": "-7"
                    },
                    {
                        "lightness": "3"
                    },
                    {
                        "gamma": "1.80"
                    },
                    {
                        "weight": "0.01"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a3c7df"
                    }
                ]
            }
        ]
    
    };

    map = new google.maps.Map(document.getElementById('map'), myOptions);

    // Adiciona outros controles e ouvintes de eventos 
    const centerControl = new CenterControl(map);
    const meuLocalControl = new MeuLocalControl(map);

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControl.controlDiv);
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(meuLocalControl.controlDiv);

}
 
function showError(error)
  {
  switch(error.code)
    {
    case error.PERMISSION_DENIED:
        alert("Usuário rejeitou a solicitação de Geolocalização.");
      break;
    case error.POSITION_UNAVAILABLE:
        alert("Localização indisponível.");
      break;
    case error.TIMEOUT:
        alert("O tempo da requisição expirou.");
      break;
    case error.UNKNOWN_ERROR:
        alert("Algum erro desconhecido aconteceu.");
      break;
    }
  }

function geocodeLatLng(geocoder, lat, lon) {
    const valor_pego = lat + ',' + lon;
    const cleanInput = valor_pego.replace(/[()]/g, '');

    const latlngStr = cleanInput.split(",", 2);

    try {
        if (latlngStr.length === 2 && !isNaN(parseFloat(latlngStr[0])) && !isNaN(parseFloat(latlngStr[1]))) {
            const latlng = {
                lat: parseFloat(latlngStr[0]),
                lng: parseFloat(latlngStr[1]),
            };

            geocoder.geocode({ location: latlng }).then((response) => {
                if (response.results[0]) {
                    const marker = new google.maps.Marker({
                        position: latlng,
                    });

                    var my_location = document.getElementById('my_location');
                    localAtual = response.results[0].formatted_address;
                    my_location.placeholder = localAtual;
                } else {
                    alert("No results found");
                }
            }).catch((e) => {
                console.error('Erro no geocodificador:', e);
                
            });
        } else {
            alert("Coordenadas inválidas");
        }
    } catch (error) {
        console.error('Erro inesperado no geocodificador:', error);
        
    }
}

  function abrirDetalhes(clickPosition) {
    alert(clickPosition);
  }

  function calculateRoute(destinationLocation) {
    console.log(userLocation);
    const directionsService = new google.maps.DirectionsService();

    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
    });

    try {
        const request = {
            travelMode: google.maps.TravelMode.DRIVING,
            origin: userLocation,
            destination: destinationLocation, // Coordenadas do destino selecionado
        };

        directionsService.route(request).then((response) => {
            directionsRenderer.setDirections(response);
        }).catch((error) => {
            console.error('Erro ao calcular a rota:', error);
            
        });
    } catch (error) {
        console.error('Erro inesperado ao calcular a rota:', error);
        
    }
}

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        final_location,
        {
            types: ['geocode'],
            componentRestrictions: { country: 'BR' },
            fields: ['place_id', 'geometry', 'name']
        });

    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
            const destinationLocation = place.geometry.location;
            calculateRoute(destinationLocation);
        } else {
            alert('Local não encontrado ou endereço indisponível.');
        }
    });
}

function initMap() {
    getLocation();
    initAutocomplete();

    var mapOptions = {
        center: {lat: -11.3300417, lng: -41.8788273},
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoom: 16,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#7c93a3"
                    },
                    {
                        "lightness": "-10"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#a0a4a5"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#62838e"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dde3e3"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#3f4a51"
                    },
                    {
                        "weight": "0.30"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#bbcacf"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "lightness": "0"
                    },
                    {
                        "color": "#bbcacf"
                    },
                    {
                        "weight": "0.50"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#a9b4b8"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "invert_lightness": true
                    },
                    {
                        "saturation": "-7"
                    },
                    {
                        "lightness": "3"
                    },
                    {
                        "gamma": "1.80"
                    },
                    {
                        "weight": "0.01"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a3c7df"
                    }
                ]
            }
        ]
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const centerControl = new CenterControl(map);
    const meuLocalControl = new MeuLocalControl(map);

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControl.controlDiv);
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(meuLocalControl.controlDiv);

    map.addListener('click', function(e) {
        var clickPosition = e.latLng;
        new google.maps.Marker({
            position: clickPosition,
            map: map,
            title: 'Adicionar descarte',
            icon: '../images/coringa.svg',
            animation: google.maps.Animation.DROP,
            draggable: false
        });

        abrirDetalhes(clickPosition);

        
    });

}


