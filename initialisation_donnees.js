var bdd = require("./bdd.js");

// importation de la base des acutalités
var actus = require("./base_actualites.js");

// importation de la base de section
var parametres = require("./base_section.js");
// importation de la base des cultures
var para_cultures = require('./base_cultures.js');
// importation de la base des marques
var para_marques = require('./base_marques.js');
// importation de la base des modeles
var para_modeles = require('./base_modeles.js');
// importation de la base des gammes
var para_gammes = require('./base_gammes.js');
// importation de la base des occasions
var para_occasions = require('./base_occasions.js');

// ======== INITIALISATION de la base des actualités ===========================
function init_actus() {
    console.log("=============================================================");
    console.log("========================INITIALISATION=======================");
    console.log("=======================BASE des actualités===================");
    console.log("...");
    for (var a = 0; a < actus.length; a++) {
        var annee, mois, jour;
        annee = actus[a].creation.split("/")[0];
        mois  = parseInt(actus[a].creation.split("/")[1], "10") - 1;
        jour  = actus[a].creation.split("/")[2];
        var actualite = new bdd.Actu({
            titre : actus[a].titre,
            creation : new Date(annee, mois, jour),
            img : actus[a].img,
            video : actus[a].video,
            texte : actus[a].texte
        });
        actualite.save();
    }
}

// ======== INITIALISATION de la base des sections =============================
function init_base_de_donnees() {
    init_actus();
    console.log("=============================================================");
    console.log("========================INITIALISATION=======================");
    console.log("=======================BASE des sections=====================");
    console.log("...");
    var nb_save_section = 0;
    for (var i = 0; i < parametres.length; i++) {

        (function(currentI) {
            //console.log("on test si " + parametres[currentI].nom + " existe !!!");
            bdd.Section.find().where("nom").equals(parametres[currentI].nom)
            .count(function(err, nbSection) {
                //console.log("résultat = " + nbSection + " section trouvé");
                if (!nbSection) {
                    //console.log(currentI);
                    var s = new bdd.Section({
                        nom : parametres[currentI].nom,
                        couleur : parametres[currentI].couleur,
                        couleur_light : parametres[currentI].couleur_light,
                        img1 : parametres[currentI].img1,
                        img2 : parametres[currentI].img2,
                        imgbandeau : parametres[currentI].imgbandeau,
                        description : parametres[currentI].description,
                        nom_class : parametres[currentI].nom_class,
                        ordre : parametres[currentI].ordre
                    });
                    s.save(function(err, section) {
                        nb_save_section++;
                        console.log("nb de section traitée (save) = " + nb_save_section);
                        if (nb_save_section == parametres.length) {
                            console.log("=======================FIN INIT_1=======================");
                            init_cultures();
                        }
                    });
                } else {
                    nb_save_section++;
                    console.log("nb de section traitée (no_save) = " + nb_save_section);
                    if (nb_save_section == parametres.length) {
                        console.log("=======================FIN INIT_1=======================");
                        init_cultures();
                    }
                }
            });
        })(i);

    }

}

// ======== INITIALISATION de la base des cultures =============================
function init_cultures () {
    console.log("=============================================================");
    console.log("========================INITIALISATION=======================");
    console.log("=======================BASE des cultures=====================");
    console.log("...");
    var nb_save_cultures = 0;
    for (var i = 0; i < para_cultures.length; i++) {
        (function(currentI) {
            //console.log("on test si " + para_cultures[currentI].nom + " existe !!!");
            bdd.Culture.find().where("nom").equals(para_cultures[currentI].nom)
            .count(function(err, nbCulture) {
                //console.log("résultat = " + nbCulture + " cultures trouvé");
                if (!nbCulture) {
                    //console.log(currentI);
                    var c = new bdd.Culture({
                        nom : para_cultures[currentI].nom,
                        img : para_cultures[currentI].img,
                    });
                    c.save(function(err, culture) {
                        nb_save_cultures++;
                        console.log("nb de cultures traitée (save) = " + nb_save_cultures);
                        if (nb_save_cultures == para_cultures.length) {
                            console.log("=======================FIN INIT_2=======================");
                            init_marques();
                        }
                    });
                } else {
                    nb_save_cultures++;
                    console.log("nb de cultures traitée (no_save) = " + nb_save_cultures);
                    if (nb_save_cultures == para_cultures.length) {
                        console.log("=======================FIN INIT_2=======================");
                        init_marques();
                    }
                }
            });
        })(i);
    }
}


// ======== INITIALISATION de la base des marques =============================
function init_marques () {
    console.log("=============================================================");
    console.log("========================INITIALISATION=======================");
    console.log("=======================BASE des marques======================");
    console.log("...");
    var nb_save_marques = 0;
    for (var i = 0; i < para_marques.length; i++) {
        (function(currentI) {
            //console.log("on test si " + para_marques[currentI].nom + " existe !!!");
            bdd.Marque.find().where("nom").equals(para_marques[currentI].nom)
            .count(function(err, nbMarque) {
                //console.log("résultat = " + nbMarque + " marques trouvé");
                if (!nbMarque) {
                    //console.log(currentI);
                    var m = new bdd.Marque({
                        nom : para_marques[currentI].nom,
                        lien_web : para_marques[currentI].lien_web,
                        logo : para_marques[currentI].logo,
                    });
                    m.save(function(err, marque) {
                        nb_save_marques++;
                        console.log("nb de marques traitée (save) = " + nb_save_marques);
                        if (nb_save_marques == para_marques.length) {
                            console.log("=======================FIN INIT_3=======================");
                            init_modeles();
                        }
                    });
                } else {
                    nb_save_marques++;
                    console.log("nb de marques traitée (no_save) = " + nb_save_marques);
                    if (nb_save_marques == para_marques.length) {
                        console.log("=======================FIN INIT_3=======================");
                        init_modeles();
                    }
                }
            });
        })(i);
    }
}


// ======== INITIALISATION de la base des modeles =============================
// !!!!!!!!!!!!!!!!!!! INITIALISATION APRES MARQUES !!!!!!!!!!!!!!!!!!!!!!!!!!!
function init_modeles() {
    console.log("=============================================================");
    console.log("========================INITIALISATION=======================");
    console.log("=======================BASE des modeles======================");
    console.log("...");
    var nb_save_modeles = 0;
    for (var i = 0; i < para_modeles.length; i++) {
        (function(currentI) {
            if (para_modeles[currentI].nom_modele) {
                var test = para_modeles[currentI].nom_modele;
                var champ = "nom_modele";
            } else {
                var test = para_modeles[currentI].gamme;
                var champ = "gamme";
            }
            //console.log("on test si " + test + " existe !!!");
            bdd.Modele.find().where(champ).equals(test)
            .count(function(err, nbModele) {
                //console.log("résultat = " + nbModele + " modèle trouvé");
                if (!nbModele) {
                    //console.log(currentI);
                    // on accède à la base des marques pour trouvé l'id
                    bdd.Marque.find().where("nom").equals(para_modeles[currentI].marque)
                    .exec(function(err, marqueFound) {
                        if (err) console.error(err);
                        else {
                            if (marqueFound.length) {
                                var ordre_modele;
                                if (!para_modeles[currentI].ordre) {
                                    ordre_modele = 0;
                                } else {
                                    ordre_modele = para_modeles[currentI].ordre;
                                }

                                var m = new bdd.Modele({
                                    nom_modele : para_modeles[currentI].nom_modele,
                                    img : para_modeles[currentI].img,
                                    video : para_modeles[currentI].video,
                                    marque : marqueFound[0]._id,
                                    commentaires : para_modeles[currentI].commentaires,
                                    documentation : para_modeles[currentI].documentation,
                                    caracteristiques : para_modeles[currentI].caracteristiques,
                                    gamme : para_modeles[currentI].gamme,
                                    ordre : ordre_modele
                                });
                                m.save(function(err, modele) {
                                    nb_save_modeles++;
                                    console.log("nb de modele traitée (save) = " + nb_save_modeles);
                                    if (nb_save_modeles == para_modeles.length) {
                                        console.log("=======================FIN INIT_4=======================");
                                        init_gamme();
                                    }
                                });
                            } else {
                                console.log("aucune marque correspondante");
                            }
                        }
                    });

                } else {
                    nb_save_modeles++;
                    console.log("nb de modele traitée (no_save) = " + nb_save_modeles);
                    if (nb_save_modeles == para_modeles.length) {
                        console.log("=======================FIN INIT_4=======================");
                        init_gamme();
                    }
                }
            });
        })(i);
    }
}




// ======== INITIALISATION de la base des gammes ===============================
// !!!!!!!!!!!!!!!!!!! INITIALISATION APRES MODELES !!!!!!!!!!!!!!!!!!!!!!!!!!!!
function init_gamme() {
    console.log("=============================================================");
    console.log("========================INITIALISATION=======================");
    console.log("=======================BASE des gammes=======================");
    console.log("...");
    var nb_save_gammes = 0;
    for (var i = 0; i < para_gammes.length; i++) {
        (function(currentI) {
            //console.log("on test si " + para_gammes[currentI].nom_gamme + " existe !!!");
            bdd.Gamme.find().where("nom_gamme").equals(para_gammes[currentI].nom_gamme)
            .count(function(err, nbGamme) {
                //console.log("résultat = " + nbGamme + " gammes trouvé");
                if (!nbGamme) {
                    //console.log(currentI);
                    // initialisation d'un compteur pour l'attente des requetes
                    // asynchrone
                    var compteur = 3;
                    // initialisation des variable de stockages
                    var result_modele = [];
                    var result_culture = [];
                    var result_section = [];
                    // 0) fonction de sauvegarde de la gamme, elle se lance lorque
                    //    toute les connexions nécéssaire aux autres base on été
                    //    effectué avec succès
                    function sauvegarde() {
                        var g = new bdd.Gamme({
                            nom_gamme : para_gammes[currentI].nom_gamme,
                            ordre : para_gammes[currentI].ordre,
                            description : para_gammes[currentI].description,
                            documentation : para_gammes[currentI].documentation,
                            repertoire : para_gammes[currentI].repertoire,
                            modele : result_modele,
                            culture : result_culture,
                            section : result_section
                        });
                        g.save(function(err, gamme) {
                            nb_save_gammes++;
                            console.log("nb de modele traitée (save) = " + nb_save_gammes);
                            if (nb_save_gammes == para_gammes.length) {
                                console.log("=======================FIN INIT_5=======================");
                                init_occas();
                            }
                        });
                    }

                    // 1) on accède à la base de données des modèles
                    bdd.Modele.find().where("gamme")
                    .equals(para_gammes[currentI].nom_gamme).select("_id")
                    .exec(function(err, modeles) {
                        if (err) console.error(err);
                        else {
                            for (var m = 0; m < modeles.length; m++) {
                                result_modele.push(modeles[m]._id);
                            }
                            //console.dir(result_modele);
                            compteur--;
                            if (compteur == 0) sauvegarde();
                        }
                    });

                    // 2) on accède à la base de données des cultures
                    //    - on parcourt la liste des cultures pour trouvé leur ID
                    for (var c = 0; c < para_gammes[currentI].culture.length; c++) {
                        bdd.Culture.find().where("nom")
                        .equals(para_gammes[currentI].culture[c]).select("_id")
                        .exec(function(err, cultures) {
                            if (err) console.error(err);
                            else {
                                result_culture.push(cultures[0]);
                                // test si le nombre d'id trouvé = le nombre de cultures
                                if (result_culture.length == para_gammes[currentI].culture.length) {
                                    compteur--;
                                    //console.dir(result_culture);
                                    if (compteur == 0) sauvegarde();
                                }
                            }
                        });
                    }

                    // 3) on accède à la base de données des sections
                    //    - on parcourt la liste des section pour trouvé leur ID
                    for (var s = 0; s < para_gammes[currentI].section.length; s++) {
                        //console.log("test sur " + para_gammes[currentI].section[s]);
                        bdd.Section.find().where("nom")
                        .equals(para_gammes[currentI].section[s]).select("_id")
                        .exec(function(err, sections) {
                            if (err) console.error(err);
                            else {
                                result_section.push(sections[0]);
                                // test si le nombre d'id trouvé = le nombre de sections
                                if (result_section.length == para_gammes[currentI].section.length) {
                                    compteur--;
                                    if (compteur == 0) sauvegarde();
                                }
                            }
                        });
                    }


                } else {
                    nb_save_gammes++;
                    console.log("nb de modele traitée (no_save) = " + nb_save_gammes);
                    if (nb_save_gammes == para_gammes.length) {
                        console.log("=======================FIN INIT_5=======================");
                        init_occas();
                    }
                }
            });
        })(i);
    }
}

// ======== INITIALISATION de la base des occasions ============================
// !!!!!!!!!!!!!!!!!!! INITIALISATION APRES GAMMES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function init_occas() {
    console.log("=============================================================");
    console.log("========================INITIALISATION=======================");
    console.log("=======================BASE des occasions====================");
    console.log("...");
    var nb_save_occas = 0;
    for (var o = 0; o < para_occasions.length; o++) {

        (function(currentI) {
            var result_culture = [];
            var result_gamme, result_marque;
            var annee, mois, jour;
            annee = para_occasions[currentI].date_service.split("/")[0];
            mois  = para_occasions[currentI].date_service.split("/")[1];
            jour  = para_occasions[currentI].date_service.split("/")[2];
            var date_service = new Date(annee, mois, jour);

            function save_occasions(i) {

                var options = {
                    nom_machine : para_occasions[i].nom_machine,
                    date_mise_en_service : date_service,
                    img : para_occasions[i].img,
                    description : para_occasions[i].description,
                    marque : result_marque,
                    culture : result_culture
                }

                if(result_gamme) {
                    options.gamme_ref = result_gamme
                }


                //console.log("accès à la sauvegarde");
                var o = new bdd.Occasion(options);
                o.save(function(err, modele) {
                    nb_save_occas++;
                    console.log("nb d'occas traitée (save) = " + nb_save_occas);
                    if (nb_save_occas == para_occasions.length) {
                        console.log("=======================FIN INIT_6=======================");
                        console.log(">>>>>>>>>>>FIN INITIALISATION BASE DE DONNEES<<<<<<<<<<<");
                    }

                    if (result_gamme) {
                        //console.log("update de la gamme " + result_gamme);
                        bdd.Gamme.findByIdAndUpdate(
                            result_gamme,
                            {$push: {"occasions": modele._id}},
                            function(err, gamme) {
                                if (err) console.error(err);
                                else {
                                    //console.log(gamme);
                                }
                            }
                        );
                    }

                });
            }

            //console.log("on test si " + para_occasions[currentI].nom_machine + " existe !!!");
            //console.log("on test si " + date_service + " existe !!!");
            bdd.Occasion.find()
            .where("nom_machine").equals(para_occasions[currentI].nom_machine)
            .where("date_mise_en_service").equals(date_service)
            .count(function(err, nbOccas) {
                //console.log("résultat = " + nbOccas + " occasions trouvé");
                if (!nbOccas) {
                    var nbRecherche = 3;
                    //console.log("init nb recherche = " + nbRecherche);
                    //console.log(currentI);
                    // on accède à la base des marques pour trouvé l'id
                    bdd.Marque.findOne().where("nom").equals(para_occasions[currentI].marque)
                    .select("_id")
                    .exec(function(err, marqueFound) {
                        if (err) console.error(err);
                        else {
                            if (marqueFound) {
                                //console.log("marque " + marqueFound._id + " trouvé !!!");
                                result_marque = marqueFound._id;
                                nbRecherche--;
                                //console.log("nbRecherche (marques) = " + nbRecherche);
                                if (!nbRecherche) save_occasions(currentI);
                            } else {
                                console.log("aucune marque correspondante");
                            }
                        }
                    });


                    // on accède à la base des cultures pour trouvé leurs id
                    if (para_occasions[currentI].culture.length) {
                        console.log(" ===== TEST des cultures =====");
                        for (var c = 0; c < para_occasions[currentI].culture.length; c++) {
                            bdd.Culture.find().where("nom")
                            .equals(para_occasions[currentI].culture[c]).select("_id")
                            .exec(function(err, cultures) {
                                if (err) console.error(err);
                                else {
                                    result_culture.push(cultures[0]);
                                    // test si le nombre d'id trouvé = le nombre de cultures
                                    if (result_culture.length == para_occasions[currentI].culture.length) {
                                        nbRecherche--;
                                        //console.log("nbRecherche (cultures) = " + nbRecherche);
                                        //console.dir(result_culture);
                                        if (!nbRecherche) save_occasions(currentI);
                                    } else console.log("Error toute les cultures n'on pas été trouvées !!!!");
                                }
                            });
                        }
                    }

                    if (para_occasions[currentI].gamme_ref) {
                        // on accède à la base des gammes pour trouvé l'ID de la gamme correspondante
                        bdd.Gamme.findOne().where("nom_gamme")
                        .equals(para_occasions[currentI].gamme_ref).select("_id culture")
                        .exec(function(err, gammes) {
                            if (err) console.error(err);
                            else {
                                if (gammes._id) {
                                    result_gamme = gammes._id;
                                    //console.log("gamme " + gammes._id + " trouvé !!!");
                                    if (!para_occasions[currentI].culture.length) {
                                        result_culture = gammes.culture;
                                        //console.log("culture " + gammes.culture + " trouvé !!!");
                                        nbRecherche--;
                                        if (!nbRecherche) save_occasions(currentI);
                                    }
                                    nbRecherche--;
                                    //console.log("nbRecherche (gammme) = " + nbRecherche);
                                    if (!nbRecherche) save_occasions(currentI);
                                } else {
                                    result_gamme = false;
                                    nbRecherche--;
                                    if (!nbRecherche) save_occasions(currentI);
                                    console.log("Error aucune gamme correspondante !!!!");
                                }

                            }
                        });
                    } else {
                        result_gamme = false;
                        if (!para_occasions[currentI].culture.length) {
                            nbRecherche--;
                            if (!nbRecherche) save_occasions(currentI);
                        }
                        nbRecherche--;
                        //console.log("nbRecherche (gammme) = " + nbRecherche);
                        if (!nbRecherche) save_occasions(currentI);
                    }


                } else {
                    nb_save_occas++;
                    console.log("nb d'occas traitée (no_save) = " + nb_save_occas);
                    if (nb_save_occas == para_occasions.length) {
                        console.log("=======================FIN INIT_6=======================");
                        console.log(">>>>>>>>>>>FIN INITIALISATION BASE DE DONNEES<<<<<<<<<<<");
                    }
                }
            });
        })(o);
    }
}






// Fonction pour réinitialisé l'intégralité de la base de données (dev only)
function reinitialisation_bdd() {
    var compteur = 7;
    bdd.Section.remove({}, function(err, docs) {
        if(err) console.error(err);
        else {
            compteur--;
            if (!compteur) init_base_de_donnees();
            console.log("Sections supprimées !!!");
        }
    });
    bdd.Actu.remove({}, function(err, docs) {
        if(err) console.error(err);
        else {
            compteur--;
            if (!compteur) init_base_de_donnees();
            console.log("Actualités supprimées !!!");
        }
    });
    bdd.Culture.remove({}, function(err, docs) {
        if(err) console.error(err);
        else {
            compteur--;
            if (!compteur) init_base_de_donnees();
            console.log("Cultures supprimées !!!");
        }
    });
    bdd.Marque.remove({}, function(err, docs) {
        if(err) console.error(err);
        else {
            compteur--;
            if (!compteur) init_base_de_donnees();
            console.log("Marques supprimées !!!");
        }
    });
    bdd.Modele.remove({}, function(err, docs) {
        if(err) console.error(err);
        else {
            compteur--;
            if (!compteur) init_base_de_donnees();
            console.log("Modèles supprimées !!!");
        }
    });
    bdd.Gamme.remove({}, function(err, docs) {
        if(err) console.error(err);
        else {
            compteur--;
            if (!compteur) init_base_de_donnees();
            console.log("Gammes supprimées !!!");
        }
    });
    bdd.Occasion.remove({}, function(err, docs) {
        if(err) console.error(err);
        else {
            compteur--;
            if (!compteur) init_base_de_donnees();
            console.log("Occasions supprimées !!!");
        }
    });
}

// commandes ===============>>>>>>>>>>>>
//init_base_de_donnees();
//reinitialisation_bdd();



// Verification du contenu des Actualités
/*
bdd.Actu.find(function(err, actus) {
    if (err) return console.error(err);
    console.log(actus);
});
*/
/*
// Verification du contenu de la gamme
bdd.Gamme.find(function(err, gammes) {
    if (err) return console.error(err);
    console.log(gammes);
});*/
