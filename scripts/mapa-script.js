var map;
let autocomplete;
const centerMap = {lat: -11.3034028, lng: -41.8501411};
var job_location = document.getElementById('job_location');

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
            map.panTo(centerMap);
            //map.setCenter(centerMap);
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

class SelecionarLocalControl {
    constructor(map) {
        this.controlDiv = document.createElement('div'); // bom ter conhecimento de DOM
        this.controlUI = document.createElement('div');
        this.controlText = document.createElement('div');

        this.controlDiv.style.marginTop = '46%';
        this.controlDiv.style.marginLeft = '230px';

        this.controlUI.style.title = 'Marcar local';
        this.controlUI.style.marginBottom = '190px';

        this.controlDiv.appendChild(this.controlUI);

        this.controlText.innerHTML = '<img style="width: 64px;" src="../images/pin.png" />';

        this.controlUI.appendChild(this.controlText);

    }
}

function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{alert("Geolocalização não é suportada nesse browser.");}
  }
 
function showPosition(position)
  {
  lat=position.coords.latitude;
  lon=position.coords.longitude;
  latlon=new google.maps.LatLng(lat, lon)
  mapholder=document.getElementById('map')
 
  var myOptions={
  center:latlon,
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  zoom: 16,
  navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},
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
  var map=new google.maps.Map(document.getElementById("map"),myOptions);
  var marker=new google.maps.Marker({
    position:latlon,
    map:map,
    title:"Você está Aqui!",
    icon: '../images/mapSelectedIcon.svg'
});

    const centerControl = new CenterControl(map);
    const meuLocalControl = new MeuLocalControl(map);
    const selecionarLocalControl = new SelecionarLocalControl(map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControl.controlDiv);
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(meuLocalControl.controlDiv);
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(selecionarLocalControl.controlDiv);
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

  function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        job_location,
        {
            types:['(cities)'],
            componentRestrictions:{'country':['BR']},
            fields: ['place_id', 'geometry', 'name']
        });
}

function initMap() {
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
    const selecionarLocalControl = new SelecionarLocalControl(map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControl.controlDiv);
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(meuLocalControl.controlDiv);
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(selecionarLocalControl.controlDiv); 
}







