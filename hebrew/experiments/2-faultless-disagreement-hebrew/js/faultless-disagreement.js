



function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions1 = slide({
    name : "instructions1",
    start: function() {
      $(".instruction_condition").html("Between subject intruction manipulation: "+ exp.instruction);
    }, 
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.multi_slider = slide({
    name : "multi_slider",
    present : _.shuffle(stimuli),
    present_handle : function(stim) {
      $(".err").hide();
      this.init_sliders();      
      exp.sliderPost = null;
      // $('input[name="sense"]:checked').attr('checked',false);
      this.stim = stim; //FRED: allows you to access stim in helpers
      //var noun_data = _.sample(corpus.Noun)
      //this.noun_data = noun_data;
      //var noun = noun_data.noun;
      //var animacy = noun_data.animacy;

      this.verbs = _.shuffle([
        {polarity: "positive", Predicate: "הזה הוא", FemPredicate: "הזאת היא"},
        {polarity: "negative", Predicate: "הזה הוא לא", FemPredicate: "הזאת היא לא"}
      ]);

      var names_list = _.shuffle(names);

      var name1 = names_list[0];
      var name2 = names_list[1];

      $(".name1").html(name1.name);

      $(".name2").html(name2.name);

      $(".noun").html(stim.Noun);

      if (name1.gender == "F" & name2.gender == "F") {
            $(".see").html("רואות את"); // different if both names F
            $(".right").html("יכולות להיות צודקות"); // different if both names F
          } else {
            $(".see").html("רואים את"); 
            $(".right").html("יכולים להיות צודקים"); 
          }
      if (stim.NounGender=="masculine") {
            $(".same").html("אותו"); 
            var adjective = stim.Predicate.Predicate
          } else {
            $(".same").html("אותה"); // different if noun feminine
            var adjective = stim.Predicate.FemPredicate
          }
      if (name1.gender=="F") {
            $(".says").html("אומרת"); // name1 F
            var wrong = "את טועה"
          } else {
            $(".says").html("אומר"); // name1 M
            var wrong = "אתה טועה"
          }

      if (stim.NounGender=="masculine") {
        $(".utterance1").html("\"ה" + stim.Noun + " " + this.verbs[0]["Predicate"] + " " + adjective + ".\"");
        $(".utterance2").html("\"" + wrong + ". ה" + stim.Noun + " " + this.verbs[1]["Predicate"] + " "  + adjective + ".\"");
      } else {
        $(".utterance1").html("\"ה" + stim.Noun + " " + this.verbs[0]["FemPredicate"] + " " + adjective + ".\"");
        $(".utterance2").html("\"" + wrong + ". ה" + stim.Noun + " " + this.verbs[1]["FemPredicate"] + " "  + adjective + ".\"");
      }

		  this.n_sliders = 1;

    },

    button : function() {
    	console.log(exp.sliderPost);
      if (exp.sliderPost != null) {
        this.log_responses();
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
    },

    init_sliders : function() {
      utils.make_slider("#slider0", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },
//    make_slider_callback : function(i) {
//      return function(event, ui) {
//        exp.sliderPost[i] = ui.value;
//      };
//    },
    log_responses : function() {
        exp.data_trials.push({
          "response" : exp.sliderPost,
          "noun" : this.stim.NounTranslation,          
          "predicate" : this.stim.Predicate.Translation,
          "nounclass" : this.stim.NounClass,
          "class" : this.stim.Predicate.Class,                    
          "firstutterance" : this.verbs[0]["polarity"],      
          "slide_number" : exp.phase
        });
    },
  });

  slides.pattern = slide({
    name : "pattern",
    present : _.shuffle(patterns),
    present_handle : function(stim) {
      $(".err").hide();
      this.init_sliders();      
      exp.sliderPost = null;
      this.stim = stim; //FRED: allows you to access stim in helpers

      this.verbs = _.shuffle([
        {polarity: "positive", Predicate: "הזה הוא", FemPredicate: "הזאת היא"},
        {polarity: "negative", Predicate: "הזה הוא לא", FemPredicate: "הזאת היא לא"}
      ]);

      var names_list = _.shuffle(names);

      var name1 = names_list[0];
      var name2 = names_list[1];

      $(".name1").html(name1.name);

      $(".name2").html(name2.name);

      $(".noun").html(stim.Noun);

      if (name1.gender == "F" & name2.gender == "F") {
            $(".see").html("רואות את"); // different if both names F
            $(".right").html("יכולות להיות צודקות"); // different if both names F
          } else {
            $(".see").html("רואים את"); 
            $(".right").html("יכולים להיות צודקים"); 
          }
      if (stim.NounGender=="masculine") {
            $(".same").html("אותו"); 
            var adjective = stim.Predicate.Predicate
          } else {
            $(".same").html("אותה"); // different if noun feminine
            var adjective = stim.Predicate.FemPredicate
          }
      if (name1.gender=="F") {
            $(".says").html("אומרת"); // name1 F
            var wrong = "את טועה"
          } else {
            $(".says").html("אומר"); // name1 M
            var wrong = "אתה טועה"
          }

      if (stim.NounGender=="masculine") {
        $(".utterance1").html("\"ה" + stim.Noun + " " + this.verbs[0]["Predicate"] + " " + adjective + ".\"");
        $(".utterance2").html("\"" + wrong + ". ה" + stim.Noun + " " + this.verbs[1]["Predicate"] + " "  + adjective + ".\"");
      } else {
        $(".utterance1").html("\"ה" + stim.Noun + " " + this.verbs[0]["FemPredicate"] + " " + adjective + ".\"");
        $(".utterance2").html("\"" + wrong + ". ה" + stim.Noun + " " + this.verbs[1]["FemPredicate"] + " "  + adjective + ".\"");
      }

      this.n_sliders = 1;

    },

    button : function() {
      console.log(exp.sliderPost);
      if (exp.sliderPost != null) {
        this.log_responses();
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
    },

    init_sliders : function() {
      utils.make_slider("#pattern_slider0", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },
    log_responses : function() {
        exp.data_trials.push({
          "response" : exp.sliderPost,
          "noun" : this.stim.NounTranslation,          
          "predicate" : this.stim.Predicate.Translation,
          "nounclass" : this.stim.NounClass,
          "class" : this.stim.Predicate.Class,                    
          "firstutterance" : this.verbs[0]["polarity"],      
          "slide_number" : exp.phase
        });
    },
  });

  slides.subj_info =  slide({
    name : "subj_info",
    button2 : function(){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        // enjoyment : $("#enjoyment").val(),
        assess : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        // education : $("#education").val(),
        // comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          //"condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      
    },
    submitFinal : function(){
      console.log("SUBMIT")
      turk.submit(exp.data)
      js_send()
    }
  });

  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  exp.instruction = _.sample(["instruction1","instruction2"]);
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "instructions1",'multi_slider','pattern', 'subj_info', 'thanks'];
  
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}