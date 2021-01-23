// 40 most frequent noun-predicate combinations in the BNC

//[
//		{"Sentence": "box red", "Predicate": "red", "Noun": "box"},
//		{"Sentence": "box big", "Predicate": "big", "Noun": "box"}
//		]

var adjectives = _.shuffle([
		{	"Predicate":	'אדום',	"Class":	'color',	"FemPredicate":	'אדומה', "Translation": 'red'},
		{	"Predicate":	'צהוב',	"Class":	'color',	"FemPredicate":	'צהובה', "Translation": 'yellow'},
		{	"Predicate":	'ירוק',	"Class":	'color',	"FemPredicate":	'ירוקה', "Translation": 'green'},
		{	"Predicate":	'כחול',	"Class":	'color',	"FemPredicate":	'כחולה', "Translation": 'blue'},
		{	"Predicate":	'סגול',	"Class":	'color',	"FemPredicate":	'סגולה', "Translation": 'purple'},
		{	"Predicate":	'חום',	"Class":	'color',	"FemPredicate":	'חומה', "Translation": 'brown'},
		{	"Predicate":	'גדול',	"Class":	'size',	"FemPredicate":	'גדולה', "Translation": 'big'},
		{	"Predicate":	'קטן',	"Class":	'size',	"FemPredicate":	'קטנה', "Translation": 'small'},
		{	"Predicate":	'ענק',	"Class":	'size',	"FemPredicate":	'ענקית', "Translation": 'huge'},
		{	"Predicate":	'פצפון',	"Class":	'size',	"FemPredicate":	'פצפונת', "Translation": 'tiny'},
		{	"Predicate":	'קצר',	"Class":	'size',	"FemPredicate":	'קצרה', "Translation": 'short'},
		{	"Predicate":	'ארוך',	"Class":	'size',	"FemPredicate":	'ארוכה', "Translation": 'long'},
		{	"Predicate":	'צרפתי',	"Class":	'nationality',	"FemPredicate":	'צרפתית', "Translation": 'French'},
		{	"Predicate":	'אמריקני',	"Class":	'nationality',	"FemPredicate":	'אמריקנית', "Translation": 'American'},
		{	"Predicate":	'ספרדי',	"Class":	'nationality',	"FemPredicate":	'ספרדית', "Translation": 'Spanish'},
		{	"Predicate":	'חלק',	"Class":	'texture',	"FemPredicate":	'חלקה', "Translation": 'smooth'},
		{	"Predicate":	'קשה',	"Class":	'texture',	"FemPredicate":	'קשה', "Translation": 'hard'},
		{	"Predicate":	'רך',	"Class":	'texture',	"FemPredicate":	'רכה', "Translation": 'soft'},
		{	"Predicate":	'ישן',	"Class":	'age',	"FemPredicate":	'ישנה', "Translation": 'old'},
		{	"Predicate":	'חדש',	"Class":	'age',	"FemPredicate":	'חדשה', "Translation": 'new'},
		{	"Predicate":	'רקוב',	"Class":	'age',	"FemPredicate":	'רקובה', "Translation": 'rotten'},
		{	"Predicate":	'טרי',	"Class":	'age',	"FemPredicate":	'טריה', "Translation": 'fresh'},
		{	"Predicate":	'טוב',	"Class":	'quality',	"FemPredicate":	'טובה', "Translation": 'good'},
		{	"Predicate":	'גרוע',	"Class":	'quality',	"FemPredicate":	'גרועה', "Translation": 'bad'},
		{	"Predicate":	'עגול',	"Class":	'shape',	"FemPredicate":	'עגולה', "Translation": 'round'},
		{	"Predicate":	'מרובע',	"Class":	'shape',	"FemPredicate":	'מרובעת', "Translation": 'square'}
]);

var adjectivesPattern = _.shuffle([
		{	"Predicate":	'מנוקד',	"Class":	'pattern',	"FemPredicate":	'מנוקדת', "Translation": 'dotted'},
		{	"Predicate":	'משובץ',	"Class":	'pattern',	"FemPredicate":	'משובצת', "Translation": 'checkered'},
		{	"Predicate":	'מפוספס',	"Class":	'pattern',	"FemPredicate":	'מפוספסת', "Translation": 'striped'}
]);

var nouns = [
		{"Noun":	'תפוח',	"NounClass":	'food',	"Gender":	'masculine', "Translation": 'apple'},
		{"Noun":	'בננה',	"NounClass":	'food',	"Gender":	'feminine ', "Translation": 'banana'},
		{"Noun":	'גזר',	"NounClass":	'food',	"Gender":	'masculine', "Translation": 'carrot'},
		{"Noun":	'גבינה',	"NounClass":	'food',	"Gender":	'feminine ', "Translation": 'cheese'},
		{"Noun":	'עגבניה',	"NounClass":	'food',	"Gender":	'feminine ', "Translation": 'tomato'},
		{"Noun":	'כיסא',	"NounClass":	'furniture',	"Gender":	'masculine', "Translation": 'chair'},
		{"Noun":	'ספה',	"NounClass":	'furniture',	"Gender":	'feminine ', "Translation": 'couch'},
		{"Noun":	'מאוורר',	"NounClass":	'furniture',	"Gender":	'masculine', "Translation": 'fan'},
		{"Noun":	'טלוויזיה',	"NounClass":	'furniture',	"Gender":	'feminine ', "Translation": 'TV'},
		{"Noun":	'שולחן',	"NounClass":	'furniture',	"Gender":	'masculine', "Translation": 'desk'},
];

var stimuli =  makeStims();

var patterns = makePatterns();

function makeStims() {
	stims = [];

	for (var i=0; i<adjectives.length; i++) {
		noun = _.sample(nouns);
		stims.push(
			{
				"Predicate":adjectives[i],						
				"Noun":noun.Noun,
				"NounClass":noun.NounClass,
				"NounGender":noun.Gender,
				"NounTranslation":noun.Translation
			}
			);
		}
		
	return stims;
	
}

function makePatterns() {
	stims = [];

	for (var i=0; i<adjectivesPattern.length; i++) {
		noun = _.sample(nouns);
		stims.push(
			{
				"Predicate":adjectivesPattern[i],						
				"Noun":noun.Noun,
				"NounClass":noun.NounClass,
				"NounGender":noun.Gender,
				"NounTranslation":noun.Translation
			}
			);
		}
		
	return stims;
	
}