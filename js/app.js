var cargarPagina = function(){
  obtenerUbicacion();
};
var obtenerUbicacion = function(){
  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(mostrarPosicion);
	} else {
		alert("Actualice su navegador");
	}
}
var mostrarPosicion = function (posicion) {
	// console.log(posicion);
	var coordenadas = {
		lat: posicion.coords.latitude,
		lng: posicion.coords.longitude
	};
	mostrarMapa(coordenadas);
};

var mostrarMapa = function (coordenadas) {
	var map = new google.maps.Map($('.map')[0], {
      zoom: 17,
      center: coordenadas
    });
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: map
    });
}
$(document).ready(cargarPagina);
