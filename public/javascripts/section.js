$(document).ready(function() {

    /* survol du lien de retour a l'index */
    $(".main_return img").mouseover(function(e) {
        var newSrc = $(this).attr("src").replace("Retour_acceuil", "Retour_acceuil_hover");
        $(this).attr("src", newSrc);
    });

    $(".main_return img").mouseout(function(e) {
        var newSrc = $(this).attr("src").replace("Retour_acceuil_hover", "Retour_acceuil");
        $(this).attr("src", newSrc);
    });

});
