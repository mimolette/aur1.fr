

$().ready(function() {


    var maLatitude;		/*Variable gobale contenant la latitude*/
	var maLongitude;	/*Variable gobale contenant la longitude*/

	if (navigator.geolocation) {
        /*navigator.geolocation.getCurrentPosition(showPosition);*/
    }
	else {
        console.log("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
    }
});

	function showPosition(position){

		maLatitude= encodeURIComponent(position.coords.latitude);
		maLongitude= encodeURIComponent(position.coords.longitude);

        // envoi d'un requete au serveur
        var xhrMeteo = new XMLHttpRequest();
        var donnees = new FormData();
        donnees.append('lat', maLatitude);
        donnees.append('lon', maLongitude);

        xhrMeteo.open("POST", "/section/meteo");

        xhrMeteo.addEventListener('load', function() {
            // on recupère la réponse
            var reponse = JSON.parse(xhrMeteo.responseText).meteo;

            if (!reponse) {
                console.log("aucunes données météo");
                /* Traitement à envisager ici en cas de problème de données
                    météo */
            } else {
                //console.log(reponse);
                // on introduit les données de météo sur la page
                // le titre
                $("#titre_meteo").text("La météo à " + reponse.city.name + " ("+ reponse.city.country  +")");
                // jour1
                $("#jour1_temp").text(reponse.jour1.current_temp + "°C");
                $("#jour1_description").text(reponse.jour1.description);
                $("#jour1_humidite").text(reponse.jour1.humidite + "%");
                $("#jour1_vent").text(reponse.jour1.vent + " km/h");
                $("#jour1_date").text(reponse.jour1.date);
                $("#jour1_icon").attr({"src" : "../images/icones_meteo/" + reponse.jour1.icon + ".png"});

                // jour2
                $("#jour2_temp_min").text(reponse.jour2.temp.min + "°C");
                $("#jour2_temp_max").text(reponse.jour2.temp.max + "°C");
                $("#jour2_description").text(reponse.jour2.description);
                $("#jour2_humidite").text(reponse.jour2.humidite + "%");
                $("#jour2_vent").text(reponse.jour2.vent + " km/h");
                $("#jour2_date").text(reponse.jour2.date);
                $("#jour2_icon").attr({"src" : "../images/icones_meteo/" + reponse.jour2.icon + ".png"});

                // jour3
                $("#jour3_temp_min").text(reponse.jour3.temp.min + "°C");
                $("#jour3_temp_max").text(reponse.jour3.temp.max + "°C");
                $("#jour3_description").text(reponse.jour3.description);
                $("#jour3_humidite").text(reponse.jour3.humidite + "%");
                $("#jour3_vent").text(reponse.jour3.vent + " km/h");
                $("#jour3_date").text(reponse.jour3.date);
                $("#jour3_icon").attr({"src" : "../images/icones_meteo/" + reponse.jour3.icon + ".png"});
            }

        }, false);


        xhrMeteo.send(donnees);
    }
