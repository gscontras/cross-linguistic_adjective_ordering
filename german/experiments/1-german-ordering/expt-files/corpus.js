// 40 most frequent noun-predicate combinations in the BNC

//[
//		{"Sentence": "box red", "Predicate": "red", "Noun": "box"},
//		{"Sentence": "box big", "Predicate": "big", "Noun": "box"}
//		]

var adjectives = _.shuffle([
		{"Predicate":"red", "Class":"color", "Masculine": "rote", "Feminine": "rote", "Neuter":"rote"},
		{"Predicate":"yellow", "Class":"color", "Masculine": "gelbe", "Feminine": "gelbe", "Neuter":"gelbe"},
		{"Predicate":"green", "Class":"color", "Masculine": "gr&uuml;ne", "Feminine": "gr&uuml;ne", "Neuter":"gr&uuml;n"},
		{"Predicate":"blue", "Class":"color", "Masculine": "blaue", "Feminine": "blaue", "Neuter":"blaue"},
		{"Predicate":"purple", "Class":"color", "Masculine": "purpure", "Feminine": "purpure", "Neuter":"purpure"},
		{"Predicate":"brown", "Class":"color", "Masculine": "braune", "Feminine": "braune", "Neuter":"braune"},											
		{"Predicate":"big", "Class":"size", "Masculine": "große", "Feminine": "große", "Neuter":"große"},
		{"Predicate":"small", "Class":"size", "Masculine": "kleine", "Feminine": "kleine", "Neuter":"kleine"},					
		{"Predicate":"huge", "Class":"size", "Masculine": "riesige", "Feminine": "riesige", "Neuter":"riesige"},					
		{"Predicate":"tiny", "Class":"size", "Masculine": "winzige", "Feminine": "winzige", "Neuter":"winzige"},
        {"Predicate":"short", "Class":"size", "Masculine": "kurze", "Feminine": "kurze", "Neuter":"kurze"},					
		{"Predicate":"long", "Class":"size", "Masculine": "lange", "Feminine": "lange", "Neuter":"lange"},
    ///Holz-(wooden) holzartig-(wood-like)
		///{"Predicate":"wooden", "Class":"material", "Masculine": "", "Feminine": "", "Neuter":""},
		///{"Predicate":"plastic", "Class":"material", "Masculine": "", "Feminine": "", "Neuter":""},
		///{"Predicate":"metal", "Class":"material", "Masculine": "", "Feminine": "", "Neuter":""},
        {"Predicate":"American", "Class":"nationality", "Masculine": "Americanische", "Feminine": "Americanische", "Neuter":"Americanische"},
        {"Predicate":"German", "Class":"nationality", "Masculine": "Deutsche", "Feminine": "Deutsche", "Neuter":"Deutsche"},
        {"Predicate":"French", "Class":"nationality", "Masculine": "Franz&ouml;sische", "Feminine": "Franz&ouml;sische", "Neuter":"Franz&ouml;sische"},
		{"Predicate":"smooth", "Class":"texture", "Masculine": "glatte", "Feminine": "glatte", "Neuter":"glatte"},
		{"Predicate":"hard", "Class":"texture", "Masculine": "harte", "Feminine": "harte", "Neuter":"harte"},
		{"Predicate":"soft", "Class":"texture", "Masculine": "weiche", "Feminine": "weiche", "Neuter":"weiche"},
		{"Predicate":"old", "Class":"age", "Masculine": "alte", "Feminine": "alte", "Neuter":"alte"},
		{"Predicate":"new", "Class":"age", "Masculine": "neue", "Feminine": "neue", "Neuter":"neue"}, 
		{"Predicate":"rotten", "Class":"age", "Masculine": "faule", "Feminine": "faule", "Neuter":"faule"},
		{"Predicate":"fresh", "Class":"age", "Masculine": "frische", "Feminine": "frische", "Neuter":"frische"},
		{"Predicate":"good", "Class":"quality", "Masculine": "gute", "Feminine": "gute", "Neuter":"gute"},
		{"Predicate":"bad", "Class":"quality", "Masculine": "schlechte", "Feminine": "schlechte", "Neuter":"schlechte"},
		{"Predicate":"round", "Class":"shape", "Masculine": "runde", "Feminine": "runde", "Neuter":"runde"},						
		{"Predicate":"square", "Class":"shape", "Masculine": "quadratische", "Feminine": "quadratische", "Neuter":"quadratische"}
]);

var nouns = [
		{"Noun":"apple", "NounClass":"food", "German": "Apfel", "Gender": "Masculine"},
		{"Noun":"banana", "NounClass":"food","German": "Banane", "Gender": "Feminine"},
		{"Noun":"carrot", "NounClass":"food","German": "Karotte", "Gender": "Feminine"},
		{"Noun":"cheese", "NounClass":"food","German": "K&auml;se", "Gender": "Masculine"},
		{"Noun":"tomato", "NounClass":"food","German": "Tomate", "Gender": "Feminine"},								
		{"Noun":"chair", "NounClass":"furniture","German": "Stuhl", "Gender": "Masculine"},								
		{"Noun":"couch", "NounClass":"furniture","German": "Couch", "Gender": "Feminine"},
		{"Noun":"fan", "NounClass":"furniture","German": "Ventilator", "Gender": "Masculine"},								
		{"Noun":"TV", "NounClass":"furniture","German": "Fernsehen", "Gender": "Neuter"},								
		{"Noun":"desk", "NounClass":"furniture","German": "Schreibtisch", "Gender": "Masculine"}								
];

var stimuli =  makeStims();

function makeStims() {
	stims = [];

	while (stims.length < 26) {
		noun = _.sample(nouns);
		pred1 = _.sample(adjectives);
		pred2 = _.sample(adjectives);
		if (pred1.Class!=pred2.Class) {
			stims.push(
				{
					"Predicate1":pred1.Masculine,
					"Predicate1English":pred1.Predicate,
					"Class1":pred1.Class,	
					"Predicate2":pred2.Masculine,
					"Predicate2English":pred2.Predicate,
					"Class2":pred2.Class,			
					"Noun":noun.German,
					"NounGender":noun.Gender,
					"NounEnglish":noun.Noun,
					"NounClass":noun.NounClass
				}			
			);
		}
	}
		
	return stims;
	
}