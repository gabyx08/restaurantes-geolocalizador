var arregloRestaurantes = [
  {
    nombre: "Zapote",
    direccion: "Calle Guanajuato 138, Cuauhtémoc, Roma Nte., 06700 Ciudad de México, CDMX",
    latitud: 19.416378,
    longitud: -99.16085,
    comida: "mediterránea",
    foto: "http://lorempixel.com/100/100/food/6"
  },
  {
     nombre: "El Japonez",
     direccion: "Av. Vicente Suarez 42A, Cuauhtemoc, Hipódromo Condesa, 06170 Ciudad de México, CDMX",
     latitud: 19.4111767,
     longitud: -99.1749857,
     comida: "japonesa",
     foto: "http://lorempixel.com/100/100/food/6"
   },
   {
     nombre: "Fonda Mexicana",
     direccion: "Avenida Montevideo 279, Gustavo A. Madero, Lindavista",
     latitud: 19.4901029,
     longitud: -99.1309569,
     comida: "mexicana",
     foto: "http://lorempixel.com/100/100/food/6"
   },
   {
     nombre: "El Cardenal",
     direccion: "Av. de la Paz Núm. 32, Alvaro Obregon, San Ángel, 01000 Ciudad de México, CDMX",
     latitud: 19.34692,
     longitud: -99.1887497,
     comida: "mexicana",
     foto: "http://lorempixel.com/100/100/food/6"
   },
   {
    nombre: "Falafelito",
    direccion: "Av. México 105, Hipódromo Condesa, 06100, CDMX.",
    latitud: 19.4102471,
    longitud:-99.1704605,
    comida: "Vegana",
    foto: "http://lorempixel.com/100/100/food/6"
  }];

   var plantillaDatosRestaurante = '<div class="card horizontal">'+
     '<div class="card-image">'+
       '<img src=_foto_>'+
     '</div>'+
     '<div class="card-stacked">'+
       '<div class="card-content">'+
         '<h5 class="header">_NombreRestaurante_</h2>'+
         '<p>_direccion_</p>'+
         '<p>Tipo de comida: _comida_</p>'+
       '</div>'+
     '</div>'+
   '</div>';
   //---------------------------------------------//
var cargarPagina = function(){
  obtenerUbicacion();
  mostrarRestaurantes(arregloRestaurantes);
  $("#busqueda").submit(filtrarRestaurantes);
};
var obtenerUbicacion = function(){
  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(mostrarPosicion);
	} else {
		alert("Actualice su navegador");
	}
}
var mostrarPosicion = function (posicion) {
	//console.log(posicion);
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

var mostrarRestaurantes= function (restaurantes) {
  console.log(restaurantes)
	var plantillaFinal = "";
	arregloRestaurantes.forEach(function (restaurante) {
		plantillaFinal += plantillaDatosRestaurante.replace("_NombreRestaurante_", restaurante.nombre)
      .replace("_comida_", restaurante.comida)
			.replace("_direccion_", restaurante.direccion)
			.replace("_foto_", restaurante.foto);
	});
	$("#restaurantes").html(plantillaFinal);
};

var filtrarRestaurantes = function (e) {
	e.preventDefault();
	var criterioBusqueda = $("#search").val().toLowerCase();
	var restaurantesFiltrados = arregloRestaurantes.filter(function (restaurante) {
		return restaurante.nombre.toLowerCase().indexOf(criterioBusqueda) >= 0;
	});
  console.log(restaurantesFiltrados)
	mostrarRestaurantes(restaurantesFiltrados);
};

$(document).ready(cargarPagina);
