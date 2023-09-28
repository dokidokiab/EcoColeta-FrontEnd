var map;
var directionsRenderer;
var job_location = document.getElementById('job_location');
let autocomplete;
let userLocation = null;

class CenterControl {
    constructor(map) {
        this.controlDiv = document.createElement('div'); // bom ter conhecimento de DOM
        this.controlUI = document.createElement('div');
        this.controlText = document.createElement('div');

        this.controlDiv.style.width = '400px';
        this.controlDiv.style.marginTop = '10px';
        this.controlDiv.style.marginLeft = '80';

        this.controlUI.style.backgroundColor = '#145f3c';
        this.controlUI.style.border = '2px solid #ebebeb';
        this.controlUI.style.borderRadius = '8px';
        this.controlUI.style.padding = '4px';
        this.controlUI.style.cursor = 'pointer';
        this.controlUI.style.title = 'Centralizar mapa';
        this.controlUI.style.width = '100%';

        this.controlDiv.appendChild(this.controlUI);

        this.controlText.style.fontSize = '16px';
        this.controlText.style.textAlign = 'center';
        this.controlText.style.lineHeight = '20px';
        this.controlText.style.color = '#FFFFFF';
        this.controlText.style.width = '100%';
        this.controlText.innerHTML = 'Selecionar';

        this.controlUI.appendChild(this.controlText);

        this.controlUI.addEventListener('click', () => {
            // Crie uma div vazia
            var div = document.createElement('div');
            
            // Definindo os estilos da div
            div.style.width = '250px';
            div.style.height = '50px';
            div.style.backgroundColor = 'white';
            div.style.position = 'absolute'; // Posição absoluta em relação ao mapa
            div.style.top = '50px'; // Ajuste a posição vertical conforme necessário
            div.style.left = '50px'; // Ajuste a posição horizontal conforme necessário

            // Adicione a div ao elemento do mapa
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
        this.controlText.innerHTML = '<img style="width: 30px;" src="/img/gps.png" />';

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
        icon: '/img/point.png',
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
        // Restante das opções do mapa aqui
    };

    map = new google.maps.Map(document.getElementById('map'), myOptions);

    // Adicione outros controles e ouvintes de eventos conforme necessário
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
            icon: {
                url: '/img/coringa.png', // URL da imagem do ícone
                scaledSize: new google.maps.Size(64, 64), // Tamanho personalizado
            },
            animation: google.maps.Animation.DROP,
            draggable: false
        });

        abrirDetalhes(clickPosition);
    });
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
                // Aqui você pode mostrar uma mensagem de erro ao usuário ou tomar outras medidas apropriadas.
            });
        } else {
            alert("Coordenadas inválidas");
        }
    } catch (error) {
        console.error('Erro inesperado no geocodificador:', error);
        // Lidar com o erro de maneira apropriada, como mostrar uma mensagem de erro ao usuário.
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
            origin: userLocation, // Sua localização atual (centerMap)
            destination: destinationLocation, // Coordenadas do destino selecionado
        };

        directionsService.route(request).then((response) => {
            directionsRenderer.setDirections(response);
        }).catch((error) => {
            console.error('Erro ao calcular a rota:', error);
            // Trate o erro de acordo com suas necessidades
        });
    } catch (error) {
        console.error('Erro inesperado ao calcular a rota:', error);
        // Lidar com o erro de maneira apropriada
    }
}

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        job_location,
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
            icon: '/img/coringa.png',
            animation: google.maps.Animation.DROP,//BOUNCE
            draggable: false
        });

        abrirDetalhes(clickPosition);

        
    });

}


