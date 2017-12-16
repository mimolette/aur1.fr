$(document).ready(function() {

    function valid_vide(elt) {
        if (elt.val().length) {
            elt.next("span").css("visibility", "hidden");
            elt.css("border-color", "#b6bab0");
            elt.parent().prev("div").css("background-color", "#bef773");
        } else {
            elt.next("span").css("visibility", "visible");
            elt.css("border-color", "#e0594a");
            elt.parent().prev("div").css("background-color", "#e0594a");
        }
    }

    function valid_mail(elt) {
        var regexMail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
        //console.log("valeur mail testé = " + elt.val());
        if (regexMail.test(elt.val())) {
            elt.next("span").css("visibility", "hidden");
            elt.css("border-color", "#b6bab0");
            elt.parent().prev("div").css("background-color", "#bef773");
        } else {
            elt.next("span").css("visibility", "visible");
            elt.css("border-color", "#e0594a");
            elt.parent().prev("div").css("background-color", "#e0594a");
            if (!elt.val()) {
                elt.next("span").text("*Champ obligatoire");
            } else {
                elt.next("span").text("*Champ incorrect");
            }
        }
    }

    function valid_tel(elt) {
        var regexTel = /^(0[1-68])(?:[ _.-]?(\d{2})){4}$/;
        //console.log("valeur Tel testé = " + elt.val());
        if (regexTel.test(elt.val())) {
            elt.next("span").css("visibility", "hidden");
            elt.css("border-color", "#b6bab0");
            elt.parent().prev("div").css("background-color", "#bef773");
        } else {
            elt.next("span").css("visibility", "visible");
            elt.css("border-color", "#e0594a");
            elt.parent().prev("div").css("background-color", "#e0594a");
            if (!elt.val()) {
                elt.next("span").text("*Champ obligatoire");
            } else {
                elt.next("span").text("*Champ incorrect");
            }
        }
    }

    // =========================================================================
    // 1) TEST ====> sur des event keyup
    // test formulaire champ vide : Nom
    $("#contact_nom").keyup(function(e) {
        valid_vide($(this));
    });

    // test formulaire champ vide : Nom
    $("#contact_societe").keyup(function(e) {
        valid_vide($(this));
    });

    // test formulaire champ vide : Sujet
    $("#contact_sujet").keyup(function(e) {
        valid_vide($(this));
    });

    // test formulaire champ vide : Message
    $("#contact_message").keyup(function(e) {
        valid_vide($(this));
    });

    // test formulaire champ correct : mail
    $("#contact_mail").keyup(function(e) {
        valid_mail($(this));
    });

    // test formulaire champ correct : Téléphone
    $("#contact_tel").keyup(function(e) {
        valid_tel($(this));
    });


    // =========================================================================
    // 2) TEST ====> sur des event change
    // test formulaire champ vide : Nom
    $("#contact_nom").change(function(e) {
        valid_vide($(this));
    });

    // test formulaire champ vide : Nom
    $("#contact_societe").change(function(e) {
        valid_vide($(this));
    });

    // test formulaire champ vide : Sujet
    $("#contact_sujet").change(function(e) {
        valid_vide($(this));
    });

    // test formulaire champ vide : Message
    $("#contact_message").change(function(e) {
        valid_vide($(this));
    });

    // test formulaire champ correct : mail
    $("#contact_mail").change(function(e) {
        valid_mail($(this));
    });

    // test formulaire champ correct : Téléphone
    $("#contact_tel").change(function(e) {
        valid_tel($(this));
    });

    $("#formulaire_contact").submit(function(e) {
        // on empêche l'envoi du formulaire classique
        e.preventDefault();

        // 1) TEST de l'ensemble des données
        var valide = true;

        // le nom
        if (!$("#contact_nom").val().length) {
            valide = false;
            $("#contact_nom").next("span").css("visibility", "visible");
            $("#contact_nom").css("border-color", "#e0594a");
            $("#contact_nom").parent().prev("div").css("background-color", "#e0594a");
        }

        // la societe
        if (!$("#contact_societe").val().length) {
            valide = false;
            $("#contact_societe").next("span").css("visibility", "visible");
            $("#contact_societe").css("border-color", "#e0594a");
            $("#contact_societe").parent().prev("div").css("background-color", "#e0594a");
        }

        // le mail
        if (!/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test($("#contact_mail").val())) {
            valide = false;
            $("#contact_mail").next("span").css("visibility", "visible");
            $("#contact_mail").css("border-color", "#e0594a");
            $("#contact_mail").parent().prev("div").css("background-color", "#e0594a");
            if (!$("#contact_mail").val()) {
                $("#contact_mail").next("span").text("*Champ obligatoire");
            } else {
                $("#contact_mail").next("span").text("*Champ incorrect");
            }
        }

        // le tel
        if (!/^(0[1-68])(?:[ _.-]?(\d{2})){4}$/.test($("#contact_tel").val())) {
            valide = false;
            $("#contact_tel").next("span").css("visibility", "visible");
            $("#contact_tel").css("border-color", "#e0594a");
            $("#contact_tel").parent().prev("div").css("background-color", "#e0594a");
            if (!$("#contact_tel").val()) {
                $("#contact_tel").next("span").text("*Champ obligatoire");
            } else {
                $("#contact_tel").next("span").text("*Champ incorrect");
            }
        }

        // le sujet
        if (!$("#contact_sujet").val().length) {
            valide = false;
            $("#contact_sujet").next("span").css("visibility", "visible");
            $("#contact_sujet").css("border-color", "#e0594a");
            $("#contact_sujet").parent().prev("div").css("background-color", "#e0594a");
        }

        // le message
        if (!$("#contact_message").val().length) {
            valide = false;
            $("#contact_message").next("span").css("visibility", "visible");
            $("#contact_message").css("border-color", "#e0594a");
            $("#contact_message").parent().prev("div").css("background-color", "#e0594a");
        }

        // 2) ENVOI d'une requête XHR
        if (valide) {
            var xhrContact = new XMLHttpRequest();
            var donnees = new FormData($(this).get(0));

            xhrContact.open("POST", $(this).attr("action"));

            xhrContact.addEventListener('load', function() {
                // on recupère la réponse
                var reponse = JSON.parse(xhrContact.responseText);
                console.log(reponse);

                if (reponse.valide) { // message envoyer

                    $("#message_mail").text("Message envoyé avec succès.")
                    .css("color", "#75c70a");
                    $("#reponse_mail").css("visibility", "visible").show().fadeOut(4000);
                    $("#formulaire_contact")[0].reset();
                    $(".form_valid").css("background-color", "initial");


                } else { // message non envoyer : Error

                    $("#message_mail").text("Erreur lors de l'envoi du mail.")
                    .css("color", "#e0594a");
                    $("#reponse_mail").css("visibility", "visible").show().fadeOut(4000);

                }
            }, false);

            xhrContact.send(donnees);
        }


    });

});
