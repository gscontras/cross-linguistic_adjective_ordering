// 40 most frequent noun-predicate combinations in the BNC

//[
//		{"Sentence": "box red", "Predicate": "red", "Noun": "box"},
//		{"Sentence": "box big", "Predicate": "big", "Noun": "box"}
//		]

var adjectives = _.shuffle([
		{"Predicate":"red", "Class":"color", "Masculine": "roode", "Feminine": "roode", "Neuter":"roode"},
		{"Predicate":"yellow", "Class":"color", "Masculine": "geele", "Feminine": "geele", "Neuter":"geele"},
		{"Predicate":"green", "Class":"color", "Masculine": "groen", "Feminine": "groen", "Neuter":"groen"},
		{"Predicate":"blue", "Class":"color", "Masculine": "blauwe", "Feminine": "blauwe", "Neuter":"blauwe"},
		{"Predicate":"purple", "Class":"color", "Masculine": "paarse", "Feminine": "paarse", "Neuter":"paarse"},
		{"Predicate":"brown", "Class":"color", "Masculine": "bruine", "Feminine": "bruine", "Neuter":"bruine"},											
		{"Predicate":"big", "Class":"size", "Masculine": "groote", "Feminine": "groote", "Neuter":"groote"},
		{"Predicate":"small", "Class":"size", "Masculine": "kleine", "Feminine": "kleine", "Neuter":"kleine"},					
		{"Predicate":"huge", "Class":"size", "Masculine": "reusachtige", "Feminine": "reusachtige", "Neuter":"reusachtige"},					
		{"Predicate":"tiny", "Class":"size", "Masculine": "minuscuule", "Feminine": "minuscuule", "Neuter":"minuscuule"},
        {"Predicate":"short", "Class":"size", "Masculine": "korte", "Feminine": "korte", "Neuter":"korte"},					
		{"Predicate":"long", "Class":"size", "Masculine": "lange", "Feminine": "lange", "Neuter":"lange"},
    ///Holz-(wooden) holzartig-(wood-like)
		///{"Predicate":"wooden", "Class":"material", "Masculine": "", "Feminine": "", "Neuter":""},
		///{"Predicate":"plastic", "Class":"material", "Masculine": "", "Feminine": "", "Neuter":""},
		///{"Predicate":"metal", "Class":"material", "Masculine": "", "Feminine": "", "Neuter":""},
        {"Predicate":"American", "Class":"nationality", "Masculine": "Amerikaanse", "Feminine": "Amerikaanse", "Neuter":"Amerikaanse"},
        {"Predicate":"Dutch", "Class":"nationality", "Masculine": "Duitse", "Feminine": "Duitse", "Neuter":"Duitse"},
        {"Predicate":"French", "Class":"nationality", "Masculine": "Franse", "Feminine": "Franse", "Neuter":"Franse"},
		{"Predicate":"smooth", "Class":"texture", "Masculine": "glade", "Feminine": "glade", "Neuter":"glade"},
		{"Predicate":"hard", "Class":"texture", "Masculine": "harde", "Feminine": "harde", "Neuter":"harde"},
		{"Predicate":"soft", "Class":"texture", "Masculine": "zachte", "Feminine": "zachte", "Neuter":"zachte"},
		{"Predicate":"old", "Class":"age", "Masculine": "oude", "Feminine": "oude", "Neuter":"oude"},
		{"Predicate":"new", "Class":"age", "Masculine": "nieuw", "Feminine": "nieuw", "Neuter":"nieuw"}, 
		{"Predicate":"rotten", "Class":"age", "Masculine": "rote", "Feminine": "rote", "Neuter":"rote"},
		{"Predicate":"fresh", "Class":"age", "Masculine": "frise", "Feminine": "frise", "Neuter":"frise"},
		{"Predicate":"good", "Class":"quality", "Masculine": "goede", "Feminine": "goede", "Neuter":"goede"},
		{"Predicate":"bad", "Class":"quality", "Masculine": "slechte", "Feminine": "slechte", "Neuter":"slechte"},
		{"Predicate":"round", "Class":"shape", "Masculine": "ronde", "Feminine": "ronde", "Neuter":"ronde"},						
		{"Predicate":"square", "Class":"shape", "Masculine": "vierkante", "Feminine": "vierkante", "Neuter":"vierkante"}
]);

var nouns = [
		{"Noun":"apple", "NounClass":"food", "Dutch": "appel", "Gender": "Masculine", "Genetive": "des appel"},
		{"Noun":"banana", "NounClass":"food","Dutch": "banaan", "Gender": "Feminine", "Genetive": "der banaan"},
		{"Noun":"carrot", "NounClass":"food","Dutch": "wortel", "Gender": "Masculine", "Genetive": "des wortel"},
		{"Noun":"cheese", "NounClass":"food","Dutch": "kass", "Gender": "Masculine", "Genetive": "des kass"},
		{"Noun":"tomato", "NounClass":"food","Dutch": "tomaat", "Gender": "Feminine", "Genetive": "der tomaat"},								
		{"Noun":"chair", "NounClass":"furniture","Dutch": "stoel", "Gender": "Masculine", "Genetive": "des stoel"},								
		{"Noun":"couch", "NounClass":"furniture","Dutch": "rustbank", "Gender": "Feminine", "Genetive": "der rustbank"},
		{"Noun":"fan", "NounClass":"furniture","Dutch": "ventilator", "Gender": "Masculine", "Genetive": "des ventilator"},								
		{"Noun":"TV", "NounClass":"furniture","Dutch": "kijkbuis", "Gender": "Feminine", "Genetive": "der kijkbuis"},								
		{"Noun":"desk", "NounClass":"furniture","Dutch": "bureau", "Gender": "Masculine", "Genetive": "des bureau"}								
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
					"Noun":noun.Dutch,
					"NounGender":noun.Gender,
					"NounEnglish":noun.Noun,
					"NounClass":noun.NounClass,
					"NounGenetive": noun.Genetive
				}			
			);
		}
	}
		
	return stims;
	
}