export const ImportantNutrients = {
    carotenoids: [
        321, 322, //carotene
        334, //Cryptoxanthin
        337, //Lycopene
        338, //Lutein + zeaxanthin
    ], sterols: [
        601, // Cholesterol,
        636, // Phytosterols,
        638, // Stigmasterol,
        639, // Campesterol,
        641, // Beta-sitosterol,
    ], overview: [
        203, //protein
        291, //fiber
        205, //carbs
        605, //Fatty acids, total trans,
        606, //Fatty acids, total saturated,
        645, //Fatty acids, total monounsaturated,
        646, //Fatty acids, total polyunsaturated,
    ], omega3: [
        851, // 18:3 n-3 c,c,c (ALA)
        621, // 22:6 n-3 (DHA),
        629, // 20:5 n-3 (EPA),
        631, // 22:5 n-3 (DPA),
    ], amino: [
        454, // Betaine,
        501, // Tryptophan,
        502, // Threonine,
        503, // Isoleucine,
        504, // Leucine,
        505, // Lysine,
        506, // Methionine,
        507, // Cystine,
        508, // Phenylalanine,
        509, // Tyrosine,
        510, // Valine,
        511, // Arginine,
        512, // Histidine,
        513, // Alanine,
        514, // Aspartic acid,
        515, // Glutamic acid,
        516, // Glycine,
        517, // Proline,
        518, // Serine,
        521, // Hydroxyproline,
    ],
    minerals: [
        301, // Calcium, Ca,
        303, // Iron, Fe,
        304, // Magnesium, Mg,
        305, // Phosphorus, P,
        306, // Potassium, K,
        307, // Sodium, Na,
        309, // Zinc, Zn,
        312, // Copper, Cu,
        313, // Fluoride, F,
        315, // Manganese, Mn,
        317, // Selenium, Se,
    ],
    vitamins: [
        //318, // Vitamin A, IU,
        // 573, // Vitamin E, added,
        // 578, // Vitamin B-12, added,
        319, // Retinol,
        // 320, // Vitamin A, RAE,
        321, // Carotene, beta,
        322, // Carotene, alpha,
        323, // Vitamin E (alpha-tocopherol),
        324, // Vitamin D,
        325, // Vitamin D2 (ergocalciferol),
        326, // Vitamin D3 (cholecalciferol),
        // 328, // Vitamin D (D2 + D3),
        334, // Cryptoxanthin, beta,
        337, // Lycopene,
        338, // Lutein + zeaxanthin,
        // 341, // Tocopherol, beta,
        // 342, // Tocopherol, gamma,
        // 343, // Tocopherol, delta,
        // 344, // Tocotrienol, alpha,
        // 345, // Tocotrienol, beta,
        // 346, // Tocotrienol, gamma,
        // 347, // Tocotrienol, delta,
        401, // Vitamin C, total ascorbic acid,
        404, // Thiamin,
        405, // Riboflavin,
        406, // Niacin,
        410, // Pantothenic acid,
        415, // Vitamin B-6,
        // 417, // Folate, total,
        418, // Vitamin B-12,
        421, // Choline, total,
        // 428, // Menaquinone-4,
        429, // Dihydrophylloquinone,
        430, // Vitamin K (phylloquinone),
        431, // Folic acid,
        432, // Folate, food,
        // 435, // Folate, DFE
    ],
    Isoflavones: [
        710, // Object { name: "Daidzein", group: "Isoflavones" }
        711, // Object { name: "Genistein", group: "Isoflavones" }
        712, // Object { name: "Glycitein", group: "Isoflavones" }
        713, // Object { name: "Total isoflavones", group: "Isoflavones" }
        714, // Object { name: "Biochanin A", group: "Isoflavones" }
        715, // Object { name: "Formononetin", group: "Isoflavones" }
        716, // Object { name: "Coumestrol", group: "Isoflavones" }        
    ],
    Anthocyanidins: [
        731, // Object { name: "Cyanidin", group: "Anthocyanidins" }
        740, // Object { name: "Petunidin", group: "Anthocyanidins" }
        741, // Object { name: "Delphinidin", group: "Anthocyanidins" }
        742, // Object { name: "Malvidin", group: "Anthocyanidins" }
        743, // Object { name: "Pelargonidin", group: "Anthocyanidins" }
        745, // Object { name: "Peonidin", group: "Anthocyanidins" }
    ],
    "Flavan-3-ols": [
        734,// Total Proanthocyanidin     
        749, // Object { name: "(+)-Catechin", group: "Flavan-3-ols" }
        750, // Object { name: "(-)-Epigallocatechin", group: "Flavan-3-ols" }
        751, // Object { name: "(-)-Epicatechin", group: "Flavan-3-ols" }
        752, // Object { name: "(-)-Epicatechin 3-gallate", group: "Flavan-3-ols" }
        753, // Object { name: "(-)-Epigallocatechin 3-gallate", group: "Flavan-3-ols" }
        794, // Object { name: "(+)-Gallocatechin", group: "Flavan-3-ols" }
    ],
    Flavonols: [
        785, // Object { name: "Isorhamnetin", group: "Flavonols" }
        786, // Object { name: "Kaempferol", group: "Flavonols" }
        788, // Object { name: "Myricetin", group: "Flavonols" }
        789, // Object { name: "Quercetin", group: "Flavonols" }
    ],
    Flavanones: [
        758, // Object { name: "Eriodictyol", group: "Flavanones" }
        759, // Object { name: "Hesperetin", group: "Flavanones" }
        762, // Object { name: "Naringenin", group: "Flavanones" }
        770, // Object { name: "Apigenin", group: "Flavones" }
        773, // Object { name: "Luteolin", group: "Flavones" }
    ]
}

export const CustomNutrientNames = {
    605: "Trans Fat", //Fatty acids, total trans,
    606: "Saturated Fat", //Fatty acids, total saturated,
    645: "Monounsaturated Fat", //Fatty acids, total monounsaturated,
    646: "Polyunsaturated Fat", //Fatty acids, total polyunsaturated,

    851: "ALA", // 18:3 n-3 c,c,c (ALA)
    621: "DHA", // 22:6 n-3 (DHA),
    629: "EPA", // 20:5 n-3 (EPA),
    631: "DPA", // 22:5 n-3 (DPA),

    401: "Vitamin C", // Vitamin C, total ascorbic acid,    
    323: "Vitamin E", // Tocopherols + Tocotrienols, not just Vitamin E (alpha-tocopherol),
    325: "Vitamin D2", // Vitamin D2 (ergocalciferol),
    326: "Vitamin D3", // Vitamin D3 (cholecalciferol),

    119: "Proanthocyanidins",// Total Proanthocyanidin     

}

export const NutrientSummationReductions = {
    // 323 Vitamin E (alpha-tocopherol),
    // 341, // Tocopherol, beta,
    // 342, // Tocopherol, gamma,
    // 343, // Tocopherol, delta,
    // 344, // Tocotrienol, alpha,
    // 345, // Tocotrienol, beta,
    // 346, // Tocotrienol, gamma,
    // 347, // Tocotrienol, delta,

    323: [341, 342, 343, 344, 345, 346, 347],

    // // Total Proanthocyanidin
    // 734: "Proanthocyanidin dimers"
    // 735: "Proanthocyanidin trimers"
    // 736: "Proanthocyanidin 4-6mers"
    // 737: "Proanthocyanidin 7-10mers"
    // 738: "Proanthocyanidin polymers (>10mers)"
    734: [735, 736, 737, 738],

}