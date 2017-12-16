var mongoose = require("mongoose");

mongoose.connection.on("error", function() {
    console.log("Erreur de connexion à la base de données");
});
mongoose.connection.on("open", function() {
    console.log("Connexion réussie à la base de données");
});

// ==== Schema : Actualités =====================================================
var ActuSchema = mongoose.Schema({
    titre : String,
    creation : Date,
    img : Array,
    video : Array,
    texte : Array
});

/* Les sections, gammes et modèles et cultures */
// ==== Schema : section =========================================================
var SectionSchema = mongoose.Schema({
    nom : String,
    couleur : String,
    couleur_light : String,
    link : String,
    img1 : String,
    img2 : String,
    imgbandeau : String,
    description : Array,
    nom_class : String,
    ordre : Number
});

// ==== Schema : culture =========================================================
var CultureSchema = mongoose.Schema({
    nom : String,
    img : String
});

// ==== Schema : marque =========================================================
var MarqueSchema = mongoose.Schema({
    nom : String,
    lien_web : String,
    logo : String
});

// ==== Schema : modele =========================================================
var ModeleSchema = mongoose.Schema({
    nom_modele : String,
    img : Array,
    video : Array,
    documentation : Array,
    marque : {type : mongoose.Schema.Types.ObjectId, ref : "Marque"},
    commentaires : Array,
    caracteristiques : Array,
    gamme : String,
    ordre : Number
});

// ==== Schema : gamme =========================================================
var GammeSchema = mongoose.Schema({
    nom_gamme : String,
    ordre : Number,
    description : Array,
    documentation : Array,
    repertoire : String,
    modele : [{type : mongoose.Schema.Types.ObjectId, ref : "Modele"}],
    culture : [{type : mongoose.Schema.Types.ObjectId, ref : "Culture"}],
    section : [{type : mongoose.Schema.Types.ObjectId, ref : "Section"}],
    occasions : [{type : mongoose.Schema.Types.ObjectId, ref : "Occasion"}]
});

// ==== Schema : Occasions =====================================================
var OccasionSchema = mongoose.Schema({
    nom_machine : String,
    date_mise_en_service : Date,
    img : Array,
    description : Array,
    marque : {type : mongoose.Schema.Types.ObjectId, ref : "Marque"},
    culture : [{type : mongoose.Schema.Types.ObjectId, ref : "Culture"}],
    gamme_ref : {type : mongoose.Schema.Types.ObjectId, ref : "Gamme"}
});

// Création des Modèles associé à leur Schéma ==================================
var Actu = mongoose.model("Actu", ActuSchema);
exports.Actu = Actu;
var Section = mongoose.model("Section", SectionSchema);
exports.Section = Section;
var Culture = mongoose.model("Culture", CultureSchema);
exports.Culture = Culture;
var Marque = mongoose.model("Marque", MarqueSchema);
exports.Marque = Marque;
var Modele = mongoose.model("Modele", ModeleSchema);
exports.Modele = Modele;
var Gamme = mongoose.model("Gamme", GammeSchema);
exports.Gamme = Gamme;
var Occasion = mongoose.model("Occasion", OccasionSchema);
exports.Occasion = Occasion;
