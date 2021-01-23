// 40 most frequent noun-predicate combinations in the BNC

//[
//		{"Sentence": "box red", "Predicate": "red", "Noun": "box"},
//		{"Sentence": "box big", "Predicate": "big", "Noun": "box"}
//		]

var adjectives = _.shuffle([
		{	"Predicate":	'אדום',	"Class":	'color',	"FemPredicate":	'אדומה'},
		{	"Predicate":	'צהוב',	"Class":	'color',	"FemPredicate":	'צהובה'},
		{	"Predicate":	'ירוק',	"Class":	'color',	"FemPredicate":	'ירוקה'},
		{	"Predicate":	'כחול',	"Class":	'color',	"FemPredicate":	'כחולה'},
		{	"Predicate":	'סגול',	"Class":	'color',	"FemPredicate":	'סגולה'},
		{	"Predicate":	'חום',	"Class":	'color',	"FemPredicate":	'חומה'},
		{	"Predicate":	'גדול',	"Class":	'size',	"FemPredicate":	'גדולה'},
		{	"Predicate":	'קטן',	"Class":	'size',	"FemPredicate":	'קטנה'},
		{	"Predicate":	'ענק',	"Class":	'size',	"FemPredicate":	'ענקית'},
		{	"Predicate":	'פצפון',	"Class":	'size',	"FemPredicate":	'פצפונת'},
		{	"Predicate":	'קצר',	"Class":	'size',	"FemPredicate":	'קצרה'},
		{	"Predicate":	'ארוך',	"Class":	'size',	"FemPredicate":	'ארוכה'},
		{	"Predicate":	'צרפתי',	"Class":	'nationality',	"FemPredicate":	'צרפתית'},
		{	"Predicate":	'אמריקני',	"Class":	'nationality',	"FemPredicate":	'אמריקנית'},
		{	"Predicate":	'ספרדי',	"Class":	'nationality',	"FemPredicate":	'ספרדית'},
		{	"Predicate":	'חלק',	"Class":	'texture',	"FemPredicate":	'חלקה'},
		{	"Predicate":	'קשה',	"Class":	'texture',	"FemPredicate":	'קשה'},
		{	"Predicate":	'רך',	"Class":	'texture',	"FemPredicate":	'רכה'},
		{	"Predicate":	'ישן',	"Class":	'age',	"FemPredicate":	'ישנה'},
		{	"Predicate":	'חדש',	"Class":	'age',	"FemPredicate":	'חדשה'},
		{	"Predicate":	'רקוב',	"Class":	'age',	"FemPredicate":	'רקובה'},
		{	"Predicate":	'טרי',	"Class":	'age',	"FemPredicate":	'טריה'},
		{	"Predicate":	'טוב',	"Class":	'quality',	"FemPredicate":	'טובה'},
		{	"Predicate":	'גרוע',	"Class":	'quality',	"FemPredicate":	'גרועה'},
		{	"Predicate":	'עגול',	"Class":	'shape',	"FemPredicate":	'עגולה'},
		{	"Predicate":	'מרובע',	"Class":	'shape',	"FemPredicate":	'מרובעת'}
]);

var nouns = [
		{"Noun":	'תפוח',	"NounClass":	'food',	"Gender":	'masculine'},
		{"Noun":	'בננה',	"NounClass":	'food',	"Gender":	'feminine '},
		{"Noun":	'גזר',	"NounClass":	'food',	"Gender":	'masculine'},
		{"Noun":	'גבינה',	"NounClass":	'food',	"Gender":	'feminine '},
		{"Noun":	'עגבניה',	"NounClass":	'food',	"Gender":	'feminine '},
		{"Noun":	'כיסא',	"NounClass":	'furniture',	"Gender":	'masculine'},
		{"Noun":	'ספה',	"NounClass":	'furniture',	"Gender":	'feminine '},
		{"Noun":	'מאוורר',	"NounClass":	'furniture',	"Gender":	'masculine'},
		{"Noun":	'טלוויזיה',	"NounClass":	'furniture',	"Gender":	'feminine '},
		{"Noun":	'שולחן',	"NounClass":	'furniture',	"Gender":	'masculine'},
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
					"Predicate1":pred1,
					"Class1":pred1.Class,	
					"Predicate2":pred2,
					"Class2":pred2.Class,			
					"Noun":noun.Noun,
					"NounClass":noun.NounClass,
					"NounGender":noun.Gender
				}			
			);
		}
	}
		
	return stims;
	
}