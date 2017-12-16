/* Fichier qui regroupe l'ensemble des données relatives aux gammes */

module.exports = [
    {
        nom_gamme : "défricheuses",
        description : [
            "Pour l’arrachage de vieux plants de vigne, arbres fruitiers, haies, buissons et autres arbres.",
            "li/start/Soc de forme spéciale",
            "li/Rouleaux extracteurs simple ou double",
            "li/Centrale hydraulique",
            "li/Le rouleau peut être bougé vers le haut ou le bas hydrauliquement",
            "li/end/Vitesse de travail jusqu'à 10 km/h",
            "Notre méthode de travail est simple, mais notre machine est une défricheuse de haute performance."
        ],
        documentation : ["livret machines à planter.pdf", "doc machine à planter (mini).pdf"],
        repertoire : "12",
        culture : ["Vignes", "Arbres fruitiers", "Sapins de Noël", "Sapins", "Energies renouvelables"],
        section : ["Plantation et Arrachage"]
    },
	{
        nom_gamme : "butteuses dérouleuses",
		ordre : 2,
        description : [
            "La machine à dérouler le plastique est équipée de rouleaux formeurs entraînés par l’arbre de prise de force pour la réalisation de deux buttes hautes, de deux systèmes de déroulement du tuyau d’arrosage aux goutte à goutte, et de deux mini-dérouleuses qui positionnent le film automatiquement.",
            "La technique de buttes individuelles permet d’optimiser vos pépinières et d’obtenir un meilleur enracinement : la qualité des plants et les taux de réussites sont améliorés."

        ],
        documentation : ["livret pépinières.pdf"],
        repertoire : "1",
        culture : ["Pepinières viticoles", "Fraises"],
        section : ["Pepinières viticoles"]
    },
	{
        nom_gamme : "machine aide à planter la pépinière",
		ordre : 3,
        description : [
            "Selon l’équipement, pour 6 à 10 opérateurs. Le châssis peut être baissé hydrauliquement tel que les opérateurs sont assis à peine au-dessus du niveau du sol.",
			"Nous pouvons adapter nos machines à planter pour la pépinière."
        ],
        documentation : ["livret pépinières.pdf"],
        repertoire : "2",
        culture : ["Pepinières viticoles", "Poireaux"],
        section : ["Pepinières viticoles"]
    },
	{
        nom_gamme : "rogneuses",
		ordre : 6,
        description : [
            "La particularité de la rogneuse est l’unité de rognage pendulaire suspendue. Grâce à elle, la rogneuse compense automatiquement des erreurs de conduite du chauffeur du tracteur et il n’y a aucun risque que les plants puissent être endommagés."
        ],
        documentation : ["livret pépinières.pdf"],
        repertoire : "3",
        culture : ["Pepinières viticoles"],
        section : ["Pepinières viticoles"]
    },
	{
        nom_gamme : "bineuses",
		ordre : 4,
        description : [
            "Les bineuses sont disponibles avec socs larges ou griffes « vibro » et également avec possibilité de châssis coulissant."
        ],
        documentation : ["livret pépinières.pdf"],
        repertoire : "4",
        culture : ["Pepinières viticoles", "Maraichage"],
        section : ["Pepinières viticoles", "Maraichage"]
    },
	{
        nom_gamme : "pulvérisateurs",
		ordre : 5,
        description : [
            "Le pulvérisateur pour la pépinière se déplace sur des roues de soutien réglables en hauteur, et pour une grande largeur de travail, 3 buses suspendues sont de chaque côté du rang. Elles traitent en haut et à l’arrière de la rangée des plants de vigne. Grâce au cache, un tourbillon se trouve dans les feuilles et même par vent et pluie une pulvérisation sûre, rapide et confortable est possible."
        ],
        documentation : ["livret pépinières.pdf"],
        repertoire : "5",
        culture : ["Pepinières viticoles"],
        section : ["Pepinières viticoles"]
    },
	{
        nom_gamme : "outils de défeuillage",
		ordre : 7,
        description : [
            "Les brosses de défeuillage sont fixées sur un châssis qui est en suspension pendulaire. Grâce à ceci, les brosses rotatives sont centrées automatiquement par rapport aux rangées et ne peuvent provoquer aucune blessure des plants.",
			"Un rognage court peut être ajouté avec l'outils de défeuillage."
        ],
        documentation : ["livret pépinières.pdf"],
        repertoire : "6",
        culture : ["Pepinières viticoles"],
        section : ["Pepinières viticoles"]
    },
	{
        nom_gamme : "machines à arracher",
		ordre : 8,
        description : [
            "De la plus simple à la plus performante, nos arracheuses de plants s’adaptent à vos conditions. Nos arracheuses existent en 1 ou 2 rangs avec ou sans lieur.",
			"li/start/1m de coulissement latéral",
			"li/Réglage hydraulique de la courroie de transport en avant/arrière et haut/bas",
			"li/Barres de secouage fonctionnant en va et vient à la verticale",
			"li/Secouage latéral",
			"li/end/Guidage automatique"
        ],
        documentation : ["livret pépinières.pdf"],
        repertoire : "7",
        culture : ["Pepinières viticoles"],
        section : ["Pepinières viticoles"]
    },
	{
        nom_gamme : "rebenMax",
		ordre : 9,
        description : [
            "La machine à trier qui va améliorer vos performances de triage.",
			"Le RebenMax vous permet de trier, couper les racines, paraffiner individuellement vos plants et de les refroidir aussitôt. Le comptage s'effectue dès la sortie des clips et chaque botte de 25 plants est séparée par un espace plus important.",
			"Le RebenMax vous permet un comptage journalier et total.",
			"Le RebenMax existe en version standard ou rétréci pour être adapté à vos besoins. La reception des plants se fait sur une chaine ou en corbeilles."
        ],
        documentation : ["livret pépinières.pdf"],
        repertoire : "8",
        culture : ["Pepinières viticoles"],
        section : ["Pepinières viticoles"]
    },
	{
        nom_gamme : "machine à greffer",
		ordre : 1,
        description : [
            "Automatic IV ou 1 coupe, des milliers d’exemplaires sont en activité.",
			"La machine à greffer Automatic IV est une machine de haute qualité, conçue pour un fonctionnement simple avec peu d'usure et une longue durée de vie.",
			"Elle garantit une meilleure visibilité, grâce à sa construction oblique et étroite, inclinée vers l'arrière. La course de la lame est très longue et très exacte. Pour un travail sans jeu pendant des années, la course peut simplement être réglée par des vis excentriques. Le support est idéal pour le centrage de porte-greffe et greffon ce qui permet un travail exact. Le levier à pédale est adaptable à la taille de la personne et permet aini un travail confortable. La course du levier est courte. La profondeur de coupe est réglable et empêche une usure inutile de la lame et la matrice. Si la lame et la matrice sont usées, elles peuvent facilement être remplacées.",
			"Existe aussi en version 1-coupe : greffon et porte-greffe sont greffés en une seule coupe.",
			"La machine à greffer peut être montée sur une table galvanisée."
        ],
        documentation : ["livret pépinières.pdf"],
        repertoire : "9",
        culture : ["Pepinières viticoles", "Pépiniere arboricole"],
        section : ["Pepinières viticoles"]
    },
	{
        nom_gamme : "planteuses vigne GPS",
        description : [
            "Elles sont prédestinées pour la plantation de nouvelles parcelles en champs vierges et en plein champs. L’arpentage des champs plats, vallonnés ou en pente, de grande ou petite taille, de forme régulière ou non, peut s’effectuer par seulement 2 points (lignes de référence) par le guidage satellite de la machine à planter. La performance inégalée des machines à planter IPS Drive Wagner n’est plus à prouver. De nombreuses IPS Drive sont en service dans toutes les régions de France (Charentes, Val de Loire, Languedoc, Côtes du Rhône, Alsace, …). Leur performance permet à la fois de planter des plants, des marquants ou tuteurs, d’arroser,… ",
			"Grâce aux machines à planter Wagner, vous planterez aisément vos plants à racines longues, qui auront un développement rapide dès la première année.",
			"Les planteuses IPS Drive, éxistent en version standard, KL et GL. Plusieurs options sont possibles tant méchaniques que logicielles. Par exemple, le logiciel Wagner à été configurer pour des plantations en courbe, en terrase, en trapèze, ...",
			"La société AUR1 saura vous conseiller et vous orienter vers la machine à planter qui correspond à votre utilisation, votre vignoble et vos besoins.",
			"Le service technique AUR1 saura vous accompagner dans la prise en main de l’IPS Drive et dans le suivi de votre machine à planter."
		],
        documentation : ["livret machines à planter.pdf", "doc machine à planter (mini).pdf"],
        repertoire : "10",
        culture : ["Vignes", "Plants seuls et pots", "Oliviers"],
        section : ["Plantation et Arrachage"]
    },
	{
        nom_gamme : "planteuses vigne laser",
        description : [
            "L’attelage à 3 points avec les roues de soutien s’adapte à l’inclinaison du terrain. Le soc de plantation est maintenu automatiquement à la verticale et ainsi, les plants sont également à la verticale.",
			"Le laser permet d'avoir un guidage rectiligne aux écartement prédéfinis. La distance de plantation sur le rang est réglé par un système de fil à entrainement hydraulique, cette écartement est réglable par pignons.",
			"Les différants types de machines à planter Wagner à guidage laser sont utilisées depuis de nombreuses années et dans toutes les régions."
		],
        documentation : ["livret machines à planter.pdf", "doc machine à planter (mini).pdf"],
        repertoire : "19",
        culture : ["Vignes", "Plants seuls et pots", "Oliviers"],
        section : ["Plantation et Arrachage"]
    },
	{
        nom_gamme : "planteuses d’arbres",
        description : [
            "Plantation moderne et économique d’arbres fruitiers avec machine à planter guidées par laser ou satellite. Selon la taille des arbres, différentes clayettes ou estrades peuvent être montées sur la machine à planter.",
			"Différentes machines à planter les arbres Wagner sont disponibles, de la plus simple (avec uniquement des traçeurs) à la plus sophistiquée (avec guidage GPS). Nous réalisons des machines pour la plantation de scions (pommiers, poiriers, noisetiers, ...), de jeunes plants d'arbres (cassis, chênes truffiers, ...) et de plants d'arbres en pots grâce à des largeurs de socs différentes et adpatées."
			],
        documentation : ["livret machines à planter.pdf", "doc machine à planter (mini).pdf"],
        repertoire : "11",
        culture : ["Arbres fruitiers", "Plants seuls et pots", "Oliviers"],
        section : ["Plantation et Arrachage"]
    },
    {
        nom_gamme : "poly'planches",
        description : [
            "Le Poly’Planches est le nouveau distributeur d’engrais, il permet d’épandre, avec précision, les engrais granulés minéraux de tous types et organiques types bouchons, de toutes granulométries en plein ou en localisé, d’une utilisation simple & rapide grâce à son réglage de débit par variateur.",
            "li/start/Trémie 1400 L ; 2 big-bags",
            "li/Jusqu’à  1200Kg/Ha à 7km/h sur 3 planches soit à 3 à 4has/h.",
            "li/3 pelles de distribution de 1,20m, repliables hydrauliquement.",
            "li/Répartition homogène et regulière, ce qui favorise le rendement des cultures et l’optimisation des engrais.",
			"li/Turbine à entrainement pdf à gros débit d'air pour le transport aisé des engrais.",
			"li/Venturi inox spécifiquement étudié pour des grandes capacités.",
			"li/end/Boitier de commandes en cabine du tracteur avec variateur de vitesse, commande générale et individuelle des rotors.",
            "Le travail conjoint des sociétés AUR 1 et SEPEBA, ainsi que l’écoute des producteurs, ont permis d’unir nos compétences pour concevoir un appareil innovant qui correspond à vos besoins : Le Poly’Planches."
        ],
        documentation : [],
        repertoire : "13",
        culture : ["Maraichage"],
        section : ["Poly'planches"]
    },
    {
        nom_gamme : "arracheuse",
        description : [
            "Les récolteuses carottes « Dewulf » sont toutes équipées d’un cueilleur ultra moderne et adaptés à vos possibilités logistiques. La professionnalité de cette arracheuse est le résultat d’une étude approfondie pour la rendre très facile d’emploi tout en gardant une fiabilité maximale. En utilisant des composants d’une qualité supérieure et en soignant particulièrement l’étanchéité des roulements, cette machine vous assure des saisons d’arrachage sans soucis.",
			"Les arracheuses Dewulf sont adaptées à la récolte des carottes, céléris, rutabaga, panais, navets, ...",
			"Elles éxistent en version préhension par les feuilles ou avec un ceuilleur sol.",
			"Du modèle le plus simple, porté 3 points au récolteuses automotrices, vous trouverez dans la gamme Dewulf la machine qui vous convient.",
			"Pour vos récoltes spécifiques, AUR1 peut vous proposer d'autres solutions adaptées."
        ],
        documentation : [],
        repertoire : "14",
        culture : ["Carottes", "Navets", "Panais", "Radis noir", "Celeri", "Rutabaga"],
        section : ["Maraichage"]
    },
    {
        nom_gamme : "récolteuses",
        description : [
			"Quelles soient salades, épinard, red chard, roquette,… Ces jeunes pousses nécessitent un matériel de récolte performant et adapté. Les récolteuses AUTRAN sont étudiées pour satisfaire vos exigences de culture. Quelles soient semi-portées ou automotrices, à roues ou à chenilles, leur système de coupe à substantation par vérin compensé, permettra de récolter vos jeunes pousses ou herbes aromatiques en toutes conditions.",
			"Les récolteuses AUTRAN éxistent en version portées 3 points, automotrices à roues ou à chenilles.",
			"Leur système de coupe à scie à ruban, ou scie à double lames, est adapté aux différents types de produits. L'ensemble du méchanisme de récolte est maintenu par deux vérins à supstentation compensée. Le tapis de convoyage de type alimentaire, transporte le produit vers la plateforme arrière pour vous permettre de conditionner en caisses ou palox.",
			"AUTRAN développe des récolteuses adaptées aux plantes aromatiques (thym, sauge, coriande, anneth, fenouil, ...)."
			],
        documentation : [],
        repertoire : "15",
        culture : ["Jeunes pousses", "Plantes aromatiques", "Persil"],
        section : ["Maraichage"]
    },
    {
        nom_gamme : "atomiseurs",
        description : [
            "L’atomisation permet de créer une micromisation pour pénétrer au cœur du feuillage. Les atomiseurs automoteurs MAB sont adaptés aux cultures de fraises hors sol, de tomates, etc… Des rampes spécifiques peuvent être créées pour toutes applications. L’efficacité et la rapidité du traitement ne sont plus à prouver, et des centaines de MAB sont en service.",

        ],
        documentation : [],
        repertoire : "16",
        culture : ["Fraises", "Tomates", "Framboises", "Vignes"],
        section : ["Maraichage"]
    },
    {
        nom_gamme : "rigoleuses",
        description : [
			"Les rogoleuses existent en version monoroue,  biroues et verticales."
		],
        documentation : [],
        repertoire : "17",
        culture : ["Maraichage"],
        section : ["Maraichage"]
    },
    {
        nom_gamme : "chassis coulissants",
		ordre : 99,
        description : [
			"C'est surtout dans la culture maraîchère que l'on utilise le châssis coulissant, pour fraiser les buttes au centimètres près pour les asperges et les fraises, pour les machines à semer et à planter et pour les pulvérisateurs, surtout d'herbicide.",
			"Un châssis coulissant augmente le poids et la longueur de l'appareillage, mais c'est une solution pratique car elle permet de guider plusieurs appareils en ligne dorite.",
			"Différents systèmes peuvent servir de détecteurs, en fonction des utilisations et de la précision désirée, ainsi que les données du terrain (plat/valonné). Dans notre programme nous avons des guidages manuels, par ultra-sons, par détecteurs de proximité, à palpeur, des guidages laser et GPS.",
			"Selon les modèles, les châssis coulissant ont un coulissement de 25 à 40 cm vers la droite/ la gauche. S'il faut ajouter des outils portés avec entraînement par l'arbre de prise de force, il faut choisir chaque fois la variante H. Cette variante peut être utilisée universellement indépendamment de la dimension de la construction."
		],
        documentation : [],
        repertoire : "20",
        culture : ["Maraichage", "Vignes", "Pepinières viticoles"],
        section : ["Plantation et Arrachage", "Pepinières viticoles", "Maraichage", "Poly'planches"]
    }
];
