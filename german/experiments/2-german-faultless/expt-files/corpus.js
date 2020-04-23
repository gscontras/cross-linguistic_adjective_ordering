// 40 most frequent noun-predicate combinations in the BNC

//[
//		{"Sentence": "box red", "Predicate": "red", "Noun": "box"},
//		{"Sentence": "box big", "Predicate": "big", "Noun": "box"}
//		]

var adjectives = _.shuffle([
		{"Predicate":"rot","EnglishPredicate":"red", "Class":"color", "Masculine": "rote", "Feminine": "rote", "Neuter":"rote"},
		{"Predicate":"gelb","EnglishPredicate":"yellow", "Class":"color", "Masculine": "gelbe", "Feminine": "gelbe", "Neuter":"gelbe"},
		{"Predicate":"gr&uuml;n", "EnglishPredicate":"green", "Class":"color", "Masculine": "gr&uuml;ne", "Feminine": "gr&uuml;ne", "Neuter":"gr&uuml;n"},
		{"Predicate":"blau","EnglishPredicate":"blue", "Class":"color", "Masculine": "blaue", "Feminine": "blaue", "Neuter":"blaue"},
		{"Predicate":"purpur","EnglishPredicate":"purple", "Class":"color", "Masculine": "purpure", "Feminine": "purpure", "Neuter":"purpure"},
		{"Predicate":"braun","EnglishPredicate":"brown", "Class":"color", "Masculine": "braune", "Feminine": "braune", "Neuter":"braune"},											
		{"Predicate":"gro&szlig;","EnglishPredicate":"big", "Class":"size", "Masculine": "gro&szlig;e", "Feminine": "gro&szlig;e", "Neuter":"gro&szlig;e"},
		{"Predicate":"klein","EnglishPredicate":"small", "Class":"size", "Masculine": "kleine", "Feminine": "kleine", "Neuter":"kleine"},					
		{"Predicate":"riesig","EnglishPredicate":"huge", "Class":"size", "Masculine": "riesige", "Feminine": "riesige", "Neuter":"riesige"},					
		{"Predicate":"winzig","EnglishPredicate":"tiny", "Class":"size", "Masculine": "winzige", "Feminine": "winzige", "Neuter":"winzige"},
        {"Predicate":"kurz","EnglishPredicate":"short", "Class":"size", "Masculine": "kurze", "Feminine": "kurze", "Neuter":"kurze"},					
		{"Predicate":"lang","EnglishPredicate":"long", "Class":"size", "Masculine": "lange", "Feminine": "lange", "Neuter":"lange"},
    ///Holz-(wooden) holzartig-(wood-like)
		///{"Predicate":"wooden", "Class":"material", "Masculine": "", "Feminine": "", "Neuter":""},
		///{"Predicate":"plastic", "Class":"material", "Masculine": "", "Feminine": "", "Neuter":""},
		///{"Predicate":"metal", "Class":"material", "Masculine": "", "Feminine": "", "Neuter":""},
        {"Predicate":"Americanisch","EnglishPredicate":"American", "Class":"nationality", "Masculine": "Americanische", "Feminine": "Americanische", "Neuter":"Americanische"},
        {"Predicate":"Deutsch","EnglishPredicate":"German", "Class":"nationality", "Masculine": "Deutsche", "Feminine": "Deutsche", "Neuter":"Deutsche"},
        {"Predicate":"Franz&ouml;sisch","EnglishPredicate":"French", "Class":"nationality", "Masculine": "Franz&ouml;sische", "Feminine": "Franz&ouml;sische", "Neuter":"Franz&ouml;sische"},
		{"Predicate":"glatt","EnglishPredicate":"smooth", "Class":"texture", "Masculine": "glatte", "Feminine": "glatte", "Neuter":"glatte"},
		{"Predicate":"hart","EnglishPredicate":"hard", "Class":"texture", "Masculine": "harte", "Feminine": "harte", "Neuter":"harte"},
		{"Predicate":"weich","EnglishPredicate":"soft", "Class":"texture", "Masculine": "weiche", "Feminine": "weiche", "Neuter":"weiche"},
		{"Predicate":"alt","EnglishPredicate":"old", "Class":"age", "Masculine": "alte", "Feminine": "alte", "Neuter":"alte"},
		{"Predicate":"neu","EnglishPredicate":"new", "Class":"age", "Masculine": "neue", "Feminine": "neue", "Neuter":"neue"}, 
		{"Predicate":"faul","EnglishPredicate":"rotten", "Class":"age", "Masculine": "faule", "Feminine": "faule", "Neuter":"faule"},
		{"Predicate":"frisch","EnglishPredicate":"fresh", "Class":"age", "Masculine": "frische", "Feminine": "frische", "Neuter":"frische"},
		{"Predicate":"gut","EnglishPredicate":"good", "Class":"quality", "Masculine": "gute", "Feminine": "gute", "Neuter":"gute"},
		{"Predicate":"schlecht","EnglishPredicate":"bad", "Class":"quality", "Masculine": "schlechte", "Feminine": "schlechte", "Neuter":"schlechte"},
		{"Predicate":"rund","EnglishPredicate":"round", "Class":"shape", "Masculine": "runde", "Feminine": "runde", "Neuter":"runde"},						
		{"Predicate":"quadratisch","EnglishPredicate":"square", "Class":"shape", "Masculine": "quadratische", "Feminine": "quadratische", "Neuter":"quadratische"}
]);

var nouns = [
		{"Noun":"apple", "NounClass":"food", "German": "Apfel", "Gender": "Masculine", "Genetive": "des Apfels","Demonstrative": "Dieser"},
		{"Noun":"banana", "NounClass":"food","German": "Banane", "Gender": "Feminine", "Genetive": "der Banane","Demonstrative": "Diese"},
		{"Noun":"carrot", "NounClass":"food","German": "Karotte", "Gender": "Feminine", "Genetive": "der Karotte","Demonstrative": "Diese"},
		{"Noun":"cheese", "NounClass":"food","German": "K&auml;se", "Gender": "Masculine", "Genetive": "des K&auml;ses","Demonstrative": "Dieser"},
		{"Noun":"tomato", "NounClass":"food","German": "Tomate", "Gender": "Feminine", "Genetive": "der Tomate","Demonstrative": "Diese"},								
		{"Noun":"chair", "NounClass":"furniture","German": "Stuhl", "Gender": "Masculine", "Genetive": "des Stuhles","Demonstrative": "Dieser"},								
		{"Noun":"couch", "NounClass":"furniture","German": "Couch", "Gender": "Feminine", "Genetive": "der Couch","Demonstrative": "Diese"},
		{"Noun":"fan", "NounClass":"furniture","German": "Ventilator", "Gender": "Masculine", "Genetive": "des Ventilators","Demonstrative": "Dieser"},								
		{"Noun":"TV", "NounClass":"furniture","German": "Fernsehen", "Gender": "Neuter", "Genetive": "des Fernsehens","Demonstrative": "Diese"},								
		{"Noun":"desk", "NounClass":"furniture","German": "Schreibtisch", "Gender": "Masculine", "Genetive": "des Schreibtisches","Demonstrative": "Dieser"}								
];

var stimuli =  makeStims();

//					"Predicate1":pred1.Masculine,
//					"Predicate1English":pred1.Predicate,
//					"Class1":pred1.Class,	
//					"Predicate2":pred2.Masculine,
//					"Predicate2English":pred2.Predicate,
//					"Class2":pred2.Class,			
//					"Noun":noun.German,
//					"NounGender":noun.Gender,
//					"NounEnglish":noun.Noun,
//					"NounClass":noun.NounClass,
//					"NounGenetive": noun.Genetive,
//                    "NounDemonstrative": noun.Demonstrative


function makeStims() {
	stims = [];

	for (var i=0; i<adjectives.length; i++) {
		noun = _.sample(nouns);
		stims.push(
			{
				"Predicate":adjectives[i].Predicate,
				"PredicateEnglish":adjectives[i].EnglishPredicate,
				"Class":adjectives[i].Class,				
				"Noun":noun.Noun,
				"NounClass":noun.NounClass,
				"Demonstrative":noun.Demonstrative,
				
			}
			);
		}
		
	return stims;
	
}