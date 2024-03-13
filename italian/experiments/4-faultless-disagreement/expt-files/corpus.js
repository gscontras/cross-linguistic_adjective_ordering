// 40 most frequent noun-predicate combinations in the BNC

//[
//		{"Sentence": "box red", "Predicate": "red", "Noun": "box"},
//		{"Sentence": "box big", "Predicate": "big", "Noun": "box"}
//		]

var adjectives = _.shuffle([
		{"Predicate":"rosso", "Class":"color","FemPredicate":"rossa", "English": "red"},
		{"Predicate":"giallo", "Class":"color","FemPredicate":"gialla", "English": "yellow"},
		{"Predicate":"verde", "Class":"color","FemPredicate":"verde", "English": "green"},
		{"Predicate":"blu", "Class":"color","FemPredicate":"blu", "English": "blue"},
		{"Predicate":"viola", "Class":"color","FemPredicate":"viola", "English": "purple"},
		{"Predicate":"marrone", "Class":"color","FemPredicate":"marrone", "English": "brown"},											
		{"Predicate":"grande", "Class":"size","FemPredicate":"grande", "English": "big"},
		{"Predicate":"piccolo", "Class":"size","FemPredicate":"piccola", "English": "small"},					
		{"Predicate":"gigantesco", "Class":"size","FemPredicate":"gigantesca", "English": "huge"},					
		{"Predicate":"minuscolo", "Class":"size","FemPredicate":"minuscola", "English": "tiny"},					
		{"Predicate":"corto", "Class":"size","FemPredicate":"corta", "English": "short"},					
		{"Predicate":"lungo", "Class":"size","FemPredicate":"lunga", "English": "long"},							
		{"Predicate":"polacco", "Class":"nationality","FemPredicate":"polacca", "English": "Polish"},
		{"Predicate":"francese", "Class":"nationality","FemPredicate":"francese", "English": "French"},
		{"Predicate":"tedesco", "Class":"nationality","FemPredicate":"tedesca", "English": "German"},
		{"Predicate":"liscio", "Class":"texture","FemPredicate":"liscia", "English": "smooth"},
		{"Predicate":"duro", "Class":"texture","FemPredicate":"dura", "English": "hard"},
		{"Predicate":"morbido", "Class":"texture","FemPredicate":"morbida", "English": "soft"},
		{"Predicate":"vecchio", "Class":"age","FemPredicate":"vecchia", "English": "old"},
		{"Predicate":"nuovo", "Class":"age","FemPredicate":"nuova", "English": "new"},
		{"Predicate":"marcio", "Class":"age","FemPredicate":"marcia", "English": "rotten"},
		{"Predicate":"fresco", "Class":"age","FemPredicate":"fresca", "English": "fresh"},
		{"Predicate":"fantastico", "Class":"quality","FemPredicate":"fantastica", "English": "wonderful"},
		{"Predicate":"cattivo", "Class":"quality","FemPredicate":"cattiva", "English": "bad"},
		{"Predicate":"rotondo", "Class":"shape","FemPredicate":"rotonda", "English": "round"},						
		{"Predicate":"quadrato", "Class":"shape","FemPredicate":"quadrata", "English": "square"}
]);

var nouns = [
		{"Noun":"mela", "NounClass":"food", "Gender": "feminine"},
		{"Noun":"banana", "NounClass":"food", "Gender":"feminine"}, 
		{"Noun":"carota", "NounClass":"food", "Gender": "feminine"},
		{"Noun":"formaggio", "NounClass":"food", "Gender":"masculine"},
		{"Noun":"pomodoro", "NounClass":"food", "Gender": "masculine"},								
		{"Noun":"sedia", "NounClass":"furniture", "Gender": "feminine"},								
		{"Noun":"divano", "NounClass":"furniture", "Gender": "masculine"},								
		{"Noun":"ventilatore", "NounClass":"furniture", "Gender": "masculine"},								
		{"Noun":"televisore", "NounClass":"furniture", "Gender": "masculine"},								
		{"Noun":"scrivania", "NounClass":"furniture", "Gender": "feminine"}								
];

var stimuli =  makeStims();

function makeStims() {
	stims = [];

	for (var i=0; i<adjectives.length; i++) {
		noun = _.sample(nouns);
		stims.push(
			{
				"Predicate1":adjectives[i],
				"FemPredicate":adjectives[i].FemPredicate,
				"Class":adjectives[i].Class,	
				"Copula": adjectives[i].copula,			
				"Noun":noun.Noun,
				"NounGender":noun.Gender,
				"NounClass":noun.NounClass
			}
			);
		}
		
	return stims;
	
}