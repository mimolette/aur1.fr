/* Fichier qui traite l'ensembles des différentes routes du site */

// dependencies
var request = require('request');
var extend = require('util')._extend;
/* import du module de gestion des mails */
var SMTPConnection = require('smtp-connection');
/* import des données de la base */
var bdd = require("./bdd.js");
/* importation des données de traduction */
var trad = require("./traduction.js");
/* importation du fichier de parametres */
var statut = require("./parametres.js");

// déclaration de la fonction de requete météo
var openweathermeteo = function(latitude, longitude, callback){
	var  url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+latitude+'&lon='+longitude+'&cnt=3&mode=json&units=metric&lang=fr&APPID=707dccc95165b84fc583e3fc570828e0';

	request(url, function(err, response, body){
		try{
			var result = JSON.parse(body);
			var previsions = {
                all : result
			};

			//console.log(previsions.all);

			callback(null, previsions);
		}catch(e){
			callback(e);
		}
	});
}

var formatData = function(objet) {
	var newObj = {};
	var parseObj = objet["0"]["_doc"];
	// parcourt des attribut de l'objet
	for (var i in parseObj) {
		if (parseObj.hasOwnProperty(i)) {
			// test si la propriete est un tableau
			var attr = parseObj[i];

			if (Array.isArray(attr)) {
				// parcourt des élément du tableau
				var final = "";
				for (var jj = 0, c = attr.length; jj < c; jj++) {
					var chaine = attr[jj];
					if (typeof chaine === "string") {
						final += chaine + "||";
					}

				}
				final = final.substring(0, (final.length - 2));
				newObj[i] = final;
			} else {
				newObj[i] = attr;
			}
		}
	}

	return newObj;
};

module.exports = function(app) {

	/* ================ SECTION UPDATE des données de la BDD ================ */

	app.get("/data/formated/:type/:id", function(req, res) {
		if (statut.requestBDD) {
			/* requete avec objet form-data requis de type champ = champ,
			   donnees = valeur à recherche dans ce champ*/

			bdd[req.params.type]
			.where("_id")
			.equals(req.params.id)
			.exec(function(err, data) {
				if (err) {
					//console.error(err);
					res.json({
						requete : err
					});
				}

				else {
					if (data) {
						res.json({
							formatedData : formatData(data),
							requete : data
						});
					} else {
						res.json({
							requete : "Aucune données existante"
						});
					}
				}
			});
		} else {
			res.end();
		}

	});

	app.get("/data/:type/:id", function(req, res) {
		if (statut.requestBDD) {
			/* requete avec objet form-data requis de type champ = champ,
			   donnees = valeur à recherche dans ce champ*/

			bdd[req.params.type]
			.where("_id")
			.equals(req.params.id)
			.exec(function(err, data) {
				if (err) {
					//console.error(err);
					res.json({
						requete : err
					});
				}

				else {
					if (data) {

						try {
							var formatedData = formatData(data);
							res.json({
								requete : formatedData,
								sourceData : data
							});
						} catch (error) {
							res.json({erreur : error});
						}

						
					} else {
						res.json({
							requete : "Aucune données existante"
						});
					}
				}
			});
		} else {
			res.end();
		}

	});

	app.post("/data/rechercheID/:type", function(req, res) {
		if (statut.requestBDD) {
			/* requete avec objet form-data requis de type champ = champ,
			   donnees = valeur à recherche dans ce champ*/

			bdd[req.params.type]
			.where(req.body.champ)
			.equals(req.body.donnee)
			.exec(function(err, data) {
				if (err) {
					//console.error(err);
					res.json({
						requete : err
					});
				}

				else {
					if (data) {
						res.json({
							requete : data
						});
					} else {
						res.json({
							requete : "Aucune données existante"
						});
					}
				}
			});
		} else {
			res.end();
		}

	});


	app.put("/data/update/:type/:id", function(req, res) {
		if (statut.requestBDD) {
			/*console.log("====== params ======");
			console.dir(req.params);
			console.log("====== body ======");
			console.dir(req.body);*/

			bdd[req.params.type]
			.findById(req.params.id)
			.exec(function(err, objet) {
				if (err) {
					console.error(err);
					res.json({
						traitement : err
					});
				}
				else {
					if (objet) {
						// traitement sur les données de l'objet form-data
						for (var champ in req.body) {
							var champ_final = champ.split("||")[0];
						  var donnee_finales = req.body[champ].split("||").length > 1 ? req.body[champ].split("||") : req.body[champ];

							/*console.log("====================================");
							console.log(champ_final);
							console.log(donnee_finales);*/

							// si c'est du push
							if (champ.split("||")[1] == "push") {
								//console.log("cas d'un tableau ============");
								// si pas de numéro, ajout a la fin
								if (!champ.split("||")[2]) {
									//console.log("on push à la fin");
									objet[champ_final] = objet[champ_final].concat(donnee_finales);
									//console.log(objet[champ_final]);
								} else {
									//console.log("on push à la position " + champ.split("||")[2]);
									objet[champ_final].splice.apply(objet[champ_final], [champ.split("||")[2], 0].concat(donnee_finales));
									//objet[champ_final].splice(champ.split("||")[2], 0, donnee_finales);
									//console.log(objet[champ_final]);
								}
							} else if (champ.split("||")[1] == "reset") {
							// on remplace l'ensemble du tableau existante
							//console.log("on remplace la valeur existante");
							objet[champ_final] = [];
							} else if (champ.split("||")[1] == "delete") {
								// on remplace l'ensemble du tableau existante
								//console.log("on remplace la valeur existante");
								objet[champ_final] = donnee_finales;
							} else if (champ.split("||")[1] == "date") {
								var annee, mois, jour;
						        annee = req.body[champ].split("/")[0];
						        mois  = parseInt(req.body[champ].split("/")[1], "10") - 1;
						        jour  = req.body[champ].split("/")[2];

								// on remplace l'ensemble du tableau existante
								console.log("on remplace la valeur existante par une date ISO");
								objet[champ_final] = new Date(annee, mois, jour);
							} else {
								// on remplace l'ensemble du tableau existante
								//console.log("on remplace la valeur existante");
								objet[champ_final] = donnee_finales;
							}

						}
						objet.save(function(err, newObjet) {
							if (err) {
								console.error(err);
								res.json({
									traitement : err
								});
							} else {
								res.json({
									traitement : newObjet
								});
							}
						})
					} else {
						res.json({
							traitement : false
						});
					}
				}
			});
		} else {
			res.end();
		}
	});


	app.post("/data/create/:type", function(req, res) {
		if (statut.requestBDD) {
			/*console.log("====== params ======");
			console.dir(req.params);
			console.log("====== body ======");
			console.dir(req.body);*/
			var objet = {};
			for (var champ in req.body) {
				var champ_final = champ.split("||")[0];
				var donnee_finales = req.body[champ].split("||").length > 1 ? req.body[champ].split("||") : req.body[champ];

				/*console.log("====================================");
				console.log(champ_final);
				console.log(donnee_finales);*/

				// si c'est du push
				if (champ.split("||")[1] == "date") {
						var annee, mois, jour;
						annee = req.body[champ].split("/")[0];
						mois  = parseInt(req.body[champ].split("/")[1], "10") - 1;
						jour  = req.body[champ].split("/")[2];

						// on remplace l'ensemble du tableau existante
						//console.log("on remplace la valeur existante par une date ISO");
						objet[champ_final] = new Date(annee, mois, jour);
				} else {
						// on remplace l'ensemble du tableau existante
						//console.log("on remplace la valeur existante");
						objet[champ_final] = donnee_finales;
				}

			}

			//console.log(objet);

			var c = new bdd[req.params.type](objet);
			c.save(function(err, newObjet) {
				if (err) {
					console.error(err);
					res.json({
						traitement : false
					});
				} else {
					res.json({
						traitement : newObjet
					});
				}
			});
		} else {
			res.end();
		}

	});

	app.delete("/data/delete/:type/:id", function(req, res) {
		if (statut.requestBDD) {
			bdd[req.params.type]
			.findByIdAndRemove(req.params.id, function(err, objet) {
				if (err) {
					console.error(err);
					res.json({
						traitement : false
					});
				} else {
					res.json({
						traitement : objet
					});
				}
			});

		} else {
			res.end();
		}
	});


	/* ================ SECTION UPDATE des données de la BDD ================ */

	// création d'une instance de connection SMTP
	var options = {
		host : "localhost",
		port : 25,
		connectionTimeout : 5000,
		tls : {
			rejectUnauthorized : false
		}
	};

	//var connection = new SMTPConnection(options);

    // 1) la racine du site
    app.get("/", function(req, res) {
        // connexion à la base de données pour récupérer les paramtres de
        // section
        bdd.Section.find().exec(function(err, sections) {
            if(err) console.error(err);
            else {
                res.render('index', { choix_all : sections });
                //console.dir(sections);
            }
        });
    });

	/*// 1) les mentions légales
    app.get("/section/:num/mentions-legales", function(req, res) {
		// connexion à la base de données pour récupérer les paramtres de
        // section
        bdd.Section.find().exec(function(err, sections) {
            if(err) console.error(err);
            else {
                var non_choisi = [];
                var choisi;

                for (var i = 0; i < sections.length; i++) {

                    if (sections[i]._id == req.params.num) {
                        choisi = sections[i];
                    } else non_choisi.push(sections[i]);
                }
                res.render('mentions_legales', { choice : choisi,
                                             no_choice : non_choisi,
                                           });
            }
        });
    });*/

    // 2) Le chemin des choix de section
    app.get("/section/:num", function(req, res) {
        // connexion à la base de données pour récupérer les paramtres de
        // section
        bdd.Section.find().exec(function(err, sections) {
            if(err) console.error(err);
            else {
                // accès à la base de données de news pour chercher les X dernières
                // actualités à afficher sur la page principale
                bdd.Actu.find().sort("-creation")
                .exec(function(err, actus) {
                    if(err) console.error(err);
                    // la recherche à abouti
                    else {
                        var non_choisi = [];
                        var choisi;
                        for (var i = 0; i < sections.length; i++) {
                            if (sections[i]._id == req.params.num) {
                                choisi = sections[i];
                            } else non_choisi.push(sections[i]);
                        }
						var mois_trad = [];
						for (var actu = 0; actu < actus.length; actu++) {
							//console.log(actus[actu].creation);
							//console.log("mois = " + actus[actu].creation.getMonth());
							mois_trad.push(trad.month[(actus[actu].creation.getMonth())]);
						}
                        res.render('section', { choice : choisi,
                                                no_choice : non_choisi,
                                                actualites : actus,
												traduction : mois_trad
                                              });

                    }
                });
            }
        });
    });

    // ======================= PENSER A METTRE A JOUR LE LIENS ET LE FOOTER ====

    // 3) la page de présentation de l'entreprise
    app.get("/section/:num/presentation", function(req, res) {
        // connexion à la base de données pour récupérer les paramtres de
        // section
        bdd.Section.find().exec(function(err, sections) {
            if(err) console.error(err);
            else {
                var non_choisi = [];
                var choisi;

                for (var i = 0; i < sections.length; i++) {

                    if (sections[i]._id == req.params.num) {
                        choisi = sections[i];
                    } else non_choisi.push(sections[i]);
                }
                res.render('presentation', { choice : choisi,
                                             no_choice : non_choisi,
                                           });
            }
        });
    });

    // 4) la page de contact
    app.get("/section/:num/contact", function(req, res) {
        // connexion à la base de données pour récupérer les paramtres de
        // section
        bdd.Section.find().exec(function(err, sections) {
            if(err) console.error(err);
            else {
                var non_choisi = [];
                var choisi;
                for (var i = 0; i < sections.length; i++) {
                    if (sections[i]._id == req.params.num) {
                        choisi = sections[i];
                    } else non_choisi.push(sections[i]);
                }
                res.render('contact', { choice : choisi,
                                        no_choice : non_choisi,
                                      });
            }
        });
    });

    // 4.1) gestion d'un contact par formulaire
    app.post("/section/:num/contact_reponse", function(req, res) {
		/* Test lié au formulaire */
		var valide_envoi = [false, false, false, false, false, false];
		// nom
		if (req.body.contact_nom) valide_envoi[0] = true;

		// société
		if (req.body.contact_societe) valide_envoi[1] = true;

		// mail
        if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(req.body.contact_mail)) {
			valide_envoi[2] = true;
        }
		// Téléphone
        if (/^(0[1-68])(?:[ _.-]?(\d{2})){4}$/.test(req.body.contact_tel)) {
            valide_envoi[3] = true;
        }
		// sujet
		if (req.body.contact_sujet) valide_envoi[4] = true;

		// message
		if (req.body.contact_message) valide_envoi[5] = true;

		// test final
		var test_final = true;
		for (var t = 0; t < valide_envoi.length; t++) {
			if (!valide_envoi[t]) test_final = false;
		}

		if (test_final) {
			var connection = new SMTPConnection(options);
			// création du text et sujet
			var civilite = req.body.contact_civ + " " + req.body.contact_nom + (req.body.contact_prenom ? " " + req.body.contact_prenom : "") + " société : " + req.body.contact_societe;
			var sujet = "www.aur1.fr ===> " + civilite + " : " + req.body.contact_sujet;
			//console.log("sujet : " + sujet);

			var message = "Numéro de téléphone de " + civilite + " : " + req.body.contact_tel + "\r\n";
			message += "E-mail de contact de " + civilite + " : " + req.body.contact_mail + "\r\n";
			message += req.body.contact_message;
			//console.log("message : " + message);

	        // parametrage des options du mail à envoyer
			//aur1.ww@gmail.com
			var envelope = {
				from : req.body.contact_mail,
				to   : "aur1.ww@gmail.com"
			};

			connection.connect(function(err) {
				//console.log(err);
				if(err) {
					console.error(err);
					// renvoi d'une réponse négative
			        res.json({ valide : false });
				}
				connection.send(envelope, message, function(err, info) {
					if (err) {
						console.error(err);
						// renvoi d'une réponse négative
						res.json({
							valide : false,
							data : [sujet, civilite, message],
							error : info
						});
					}
					//console.log(info);
					// renvoi d'une réponse négative

					res.json({
						valide : true,
						data : [sujet, civilite, message],
						error : info
					});
					connection.quit();
				});
			});




		} else {
			// renvoi d'une réponse négative
	        res.json({ valide : false });
		}
    });

    // 5) la pages des Occasions
    app.get("/section/:num/occasions", function(req, res) {
        // connexion à la base de données pour récupérer les paramtres de
        // section
        bdd.Section.find().exec(function(err, sections) {
            if(err) console.error(err);
            else {
                // accès à la base de données des occasions pour chercher toutes les
                // machines
                bdd.Occasion.find().select("nom_machine img")
                    .exec(function(err, occas) {
                    if(err) console.error(err);
                    // la recherche à abouti
                    else {
                        var non_choisi = [];
                        var choisi;
                        for (var i = 0; i < sections.length; i++) {
                            if (sections[i]._id == req.params.num) {
                                choisi = sections[i];
                            } else non_choisi.push(sections[i]);
                        }
                        res.render('occasions', { choice : choisi,
                                                no_choice : non_choisi,
                                                machines : occas
                                              });

                    }
                });
            }
        });
    });

	// 5.1) la page d'une machine d'occasion choisie
	app.get("/section/:num/occasions/:id", function(req, res) {
        // connexion à la base de données pour récupérer les parametres de
        // section
        bdd.Section.find().exec(function(err, sections) {
            if(err) console.error(err);
            else {
                // accès à la base de données de la gammes pour chercher la gamme
                // demandée

                bdd.Occasion.findById(req.params.id)
                    .populate("marque")
                    .populate("culture")
					.populate("gamme_ref", "_id nom_gamme repertoire section")
                    .exec(function(err, occasion) {
                    if(err) console.error(err);
                    // la recherche à abouti
                    else {
                        /*console.log("=====================================");
                        console.dir(occasion);
                        console.log("=====================================");*/

						var opts = { path: 'gamme_ref.section', model: 'Section' };

                        bdd.Occasion.populate(occasion, opts, function(err, docs) {
                            if (err) console.error(err);
                            else {
                                /*console.log("=====================================");
                                console.dir(docs.gamme_ref);
                                console.log("=====================================");
                                */
								var non_choisi = [];
                                var choisi;
                                for (var i = 0; i < sections.length; i++) {
                                    if (sections[i]._id == req.params.num) {
                                        choisi = sections[i];
                                    } else non_choisi.push(sections[i]);
                                }

                                res.render('occasion_detail', { choice : choisi,
                                                        no_choice : non_choisi,
                                                        machine : docs
                                                      });
                            }
                        });
						/*
						var non_choisi = [];
						var choisi;
						for (var i = 0; i < sections.length; i++) {
							if (sections[i]._id == req.params.num) {
								choisi = sections[i];
							} else non_choisi.push(sections[i]);
						}

						res.render('occasion_detail', {
												choice : choisi,
												no_choice : non_choisi,
												machine : occasion
											  });
											  */
                    }
                });
            }
        });
    });

    // 6.1) la pages de la gamme de la section choisi (trie sur les nom de gamme)
    app.get("/section/:num/gamme", function(req, res) {
        // connexion à la base de données pour récupérer les paramtres de
        // section
        bdd.Section.find().exec(function(err, sections) {
            if(err) console.error(err);
            else {
                // accès à la base de données de la gammes pour chercher toutes les
                // machines qui corresponde à la section choisi parmis :
                // - Pepinières viticoles
                // - Maraichâge
                // - Plantation
                // - Poly'planche
                bdd.Gamme.find().where("section").equals(req.params.num)
                    .select("nom_gamme repertoire modele ordre")
                    .populate("modele", "img")
                    .exec(function(err, gammes) {
                    if(err) console.error(err);
                    // la recherche à abouti
                    else {
                        var non_choisi = [];
                        var choisi;
                        console.log("=====================================");
                        console.dir(gammes);
                        console.log("=====================================");

                        for (var i = 0; i < sections.length; i++) {
                            if (sections[i]._id == req.params.num) {
                                choisi = sections[i];
                            } else non_choisi.push(sections[i]);
                        }
                        res.render('gamme', { choice : choisi,
                                                no_choice : non_choisi,
                                                machines : gammes
                                              });

                    }
                });
            }
        });
    });

    // 6.2) la pages de la gamme de la section choisi (trie sur les cultures)
    app.get("/section/:num/cultures", function(req, res) {
        // connexion à la base de données pour récupérer les paramtres de
        // section
        bdd.Section.find().exec(function(err, sections) {
            if(err) console.error(err);
            else {
                // accès à la base de données de la gammes pour chercher toutes les
                // machines qui corresponde à la section choisi parmis :
                // - Pepinières viticoles
                // - Maraichâge
                // - Plantation
                // - Poly'planche
                bdd.Gamme.find().where("section").equals(req.params.num)
                    .select("nom_gamme culture")
                    .populate("culture")
                    .exec(function(err, gammes) {
                    if(err) console.error(err);
                    // la recherche à abouti
                    else {
                        var cultures_all = [];
                        var non_choisi = [];
                        var choisi;
                        console.log("=====================================");
                        console.dir(gammes);
                        console.log("=====================================");
                        console.log(gammes[0].culture[0].img);
                        // on parcrout les gammes pour extraires les cultures
                        for (var g = 0; g < gammes.length; g++) {
                            for (var c = 0; c < gammes[g].culture.length; c++) {
                                var test = cultures_all.indexOf(gammes[g].culture[c]);
                                if (!~test) {
                                    cultures_all.push(gammes[g].culture[c]);
                                }
                            }
                        }
                        console.log("=====================================");
                        console.dir(cultures_all);
                        console.log("=====================================");
                        for (var i = 0; i < sections.length; i++) {
                            if (sections[i]._id == req.params.num) {
                                choisi = sections[i];
                            } else non_choisi.push(sections[i]);
                        }
                        res.render('gamme_culture', { choice : choisi,
                                                no_choice : non_choisi,
                                                cultures : cultures_all
                                              });

                    }
                });
            }
        });
    });

    // 6.2.1) la pages de la gamme de la section choisi (trie sur les cultures)
    //        choix d'une culture
    app.get("/section/:num/cultures/:idCulture", function(req, res) {
        // connexion à la base de données pour récupérer les paramtres de
        // section
        bdd.Section.find().exec(function(err, sections) {
            if(err) console.error(err);
            else {
                // accès à la base de données de la gammes pour chercher toutes les
                // machines qui corresponde à la section choisi parmis :
                // - Pepinières viticoles
                // - Maraichâge
                // - Plantation
                // - Poly'planche
                bdd.Gamme.find().where({
                    section : req.params.num,
                    culture : req.params.idCulture})
                    .select("nom_gamme repertoire modele")
                    .populate("modele", "img")
                    .exec(function(err, gammes) {
                    if(err) console.error(err);
                    // la recherche à abouti
                    else {
                        var cultures_all = [];
                        var non_choisi = [];
                        var choisi;
                        console.log("=====================================");
                        console.dir(gammes);
                        console.log("=====================================");

                        console.log(gammes[0].modele[0].img[0]);
                        for (var i = 0; i < sections.length; i++) {
                            if (sections[i]._id == req.params.num) {
                                choisi = sections[i];
                            } else non_choisi.push(sections[i]);
                        }
                        res.render('gamme_choix_culture', { choice : choisi,
                                                no_choice : non_choisi,
                                                machines : gammes
                                              });

                    }
                });
            }
        });
    });

    // 6.3) la pages d'une gamme choisie'
    app.get("/section/:num/gamme/:id", function(req, res) {
        // connexion à la base de données pour récupérer les parametres de
        // section
        bdd.Section.find().exec(function(err, sections) {
            if(err) console.error(err);
            else {
                // accès à la base de données de la gammes pour chercher la gamme
                // demandée

                bdd.Gamme.findById(req.params.id)
                    .populate("modele")
                    .populate("culture")
					.populate("occasions")
                    .exec(function(err, gammes) {
                    if(err) console.error(err);
                    // la recherche à abouti
                    else {
                        /*console.log("=====================================");
                        console.dir(gammes);
                        console.log("=====================================");*/
                        var opts = { path: 'modele.marque', model: 'Marque' };

                        bdd.Gamme.populate(gammes, opts, function(err, docs) {
                            if (err) console.error(err);
                            else {
                                /*console.log("=====================================");
                                console.dir(docs.modele);
                                console.log("=====================================");
								*/
								var non_choisi = [];
                                var choisi;
                                for (var i = 0; i < sections.length; i++) {
                                    if (sections[i]._id == req.params.num) {
                                        choisi = sections[i];
                                    } else non_choisi.push(sections[i]);
                                }

                                res.render('gamme_detail', { choice : choisi,
                                                        no_choice : non_choisi,
                                                        machine : docs
                                                      });
                            }
                        });

                    }
                });
            }
        });
    });

	/*
    // 7) la page qui rassemble l'ensembles de news de l'entreprise
    app.get("/section/:num/news", function(req, res) {
        // connexion à la base de données pour récupérer les paramtres de
        // section
        bdd.Section.find().exec(function(err, sections) {
            if(err) console.error(err);
            else {
                // accès à la base de données de news pour chercher toutes les
                // actualités à afficher dans l'odre décroissant
                bdd.Actu.find().sort("-creation").exec(function(err, actus) {
                    if(err) console.error(err);
                    // la recherche à abouti
                    else {
                        var non_choisi = [];
                        var choisi;
                        for (var i = 0; i < sections.length; i++) {
                            if (sections[i]._id == req.params.num) {
                                choisi = sections[i];
                            } else non_choisi.push(sections[i]);
                        }
                        res.render('news', { choice : choisi,
                                             no_choice : non_choisi,
                                             actualites : actus
                                           });

                    }
                });
            }
        });
    });*/

    // 8) reception d'une requete météo
    app.post("/section/meteo", function(req, res) {
        /*console.log("requete météo reçue ========================");
        console.log(req.body);*/

		// création d'une table de latitude et longitude proche de la position
		// GPS pour multiplier les chances de trouvé des données viables proches
		var origines = {
			lat : Math.round(parseFloat(req.body.lat)*100)/100,
			lon : Math.round(parseFloat(req.body.lon)*100)/100
		};

		var table_coor = [
			{lat : origines.lat , lon : origines.lon},
			{
				lat : origines.lat+0.05,
				lon : origines.lon
			},
			{
				lat : origines.lat,
				lon : origines.lon+0.05
			},
			{
				lat : origines.lat-0.05,
				lon : origines.lon
			},
			{
				lat : origines.lat,
				lon : origines.lon-0.05
			},
		];

		var result_meteo = {
			city  : {},
			jour1 : {},
			jour2 : {},
			jour3 : {}
		};

		var nb_req = -1;

		var test_request_meteo = function() {
			nb_req++;
			if (nb_req < table_coor.length) {
				openweathermeteo(table_coor[nb_req].lat, table_coor[nb_req].lon, function(err, previsions){
					if(err) {
						/*console.log("requete n° " + nb_req + " failed");
						console.error(err);*/
						test_request_meteo();
					} else {
						// opération sur les date_service
						var dateJour = new Date();
						var jour = trad.day[dateJour.getDay()];
						var nbJour = dateJour.getDate();
						var mois = trad.month[dateJour.getMonth()];

						result_meteo.city.name = previsions.all.city.name;
						result_meteo.city.country = previsions.all.city.country;

						result_meteo.jour1.date = jour + " " + nbJour + " " + mois;
						result_meteo.jour2.date = trad.day[dateJour.getDay()+1 > 6 ? ((dateJour.getDay()+1)%6)-1 : dateJour.getDay()+1];
						result_meteo.jour3.date = trad.day[dateJour.getDay()+2 > 6 ? ((dateJour.getDay()+2)%6)-1 : dateJour.getDay()+2];

						// reste des parametres météo
						result_meteo.jour1.icon = previsions.all.list[0].weather[0].icon.slice(0, -1);
						result_meteo.jour2.icon = previsions.all.list[1].weather[0].icon.slice(0, -1);
						result_meteo.jour3.icon = previsions.all.list[2].weather[0].icon.slice(0, -1);

						result_meteo.jour1.current_temp = Math.round(previsions.all.list[0].temp.day);
						result_meteo.jour2.temp = {
							min : Math.round(previsions.all.list[1].temp.min),
							max : Math.round(previsions.all.list[1].temp.max)
						};
						result_meteo.jour3.temp = {
							min : Math.round(previsions.all.list[2].temp.min),
							max : Math.round(previsions.all.list[2].temp.max)
						};

						result_meteo.jour1.description = previsions.all.list[0].weather[0].description;
						result_meteo.jour2.description = previsions.all.list[1].weather[0].description;
						result_meteo.jour3.description = previsions.all.list[2].weather[0].description;

						result_meteo.jour1.humidite = previsions.all.list[0].humidity;
						result_meteo.jour2.humidite = previsions.all.list[1].humidity;
						result_meteo.jour3.humidite = previsions.all.list[2].humidity;

						result_meteo.jour1.vent = Math.round(((previsions.all.list[0].speed)*36/10));
						result_meteo.jour2.vent = Math.round(((previsions.all.list[1].speed)*36/10));
						result_meteo.jour3.vent = Math.round(((previsions.all.list[2].speed)*36/10));

						/*console.dir(result_meteo);
						console.log("nb requete effectué = " + (nb_req+1));*/
						res.json({ meteo : result_meteo });
					}
				});
			} else {
				//console.log("ensembles des requetes on échouer");
				res.json({ meteo : false });
			}
		};

		test_request_meteo();

    });





}
