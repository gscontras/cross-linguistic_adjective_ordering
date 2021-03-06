



function make_slides(f) {
  var   slides = {};

  slides.ID =  slide({
    name : "ID",
    button : function(e){
      exp.subj_ID = {
        ID : $("#identification").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    // log_responses : function() {
    //     exp.subj_ID.push({
    //       ID : $("#ID").val()
    //     });
    // },
  });

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

  slides.multi_slider1 = slide({
    name : "multi_slider1",
    present : stimuli1,
    present_handle : function(stim) {
      $(".err").hide();
      this.init_sliders();      
      exp.sliderPost = null;
      this.stim = stim; //FRED: allows you to access stim in helpers
      $(".noun").html(stim.Noun);

      $(".low").html("\"the "+ stim.Predicate2 + " " + stim.Predicate1 + " " + stim.Noun + "\"");
      $(".high").html("\"the "+ stim.Predicate1 + " " + stim.Predicate2 + " " + stim.Noun + "\"");

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
      utils.make_slider("#slider01", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },
    log_responses : function() {
        exp.data_trials.push({
          "response" : exp.sliderPost,
          "noun" : this.stim.Noun,  
          "nounclass" : this.stim.NounClass,        
          "predicate1" : this.stim.Predicate1,
          "predicate2" : this.stim.Predicate2,
          "class1" : this.stim.Class1,
          "class2" : this.stim.Class2,                     
          "slide_number" : exp.phase
        });
    },
  });

  slides.encouragement1 = slide({
    name : "encouragement1",
    start: function() {
    }, 
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.multi_slider2 = slide({
    name : "multi_slider2",
    present : stimuli2,
    present_handle : function(stim) {
      $(".err").hide();
      this.init_sliders();      
      exp.sliderPost = null;
      this.stim = stim; //FRED: allows you to access stim in helpers
      $(".noun").html(stim.Noun);

      $(".low").html("\"the "+ stim.Predicate2 + " " + stim.Predicate1 + " " + stim.Noun + "\"");
      $(".high").html("\"the "+ stim.Predicate1 + " " + stim.Predicate2 + " " + stim.Noun + "\"");

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
      utils.make_slider("#slider02", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },
    log_responses : function() {
        exp.data_trials.push({
          "response" : exp.sliderPost,
          "noun" : this.stim.Noun,  
          "nounclass" : this.stim.NounClass,        
          "predicate1" : this.stim.Predicate1,
          "predicate2" : this.stim.Predicate2,
          "class1" : this.stim.Class1,
          "class2" : this.stim.Class2,                     
          "slide_number" : exp.phase
        });
    },
  });

  slides.encouragement2 = slide({
    name : "encouragement2",
    start: function() {
    }, 
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.multi_slider3 = slide({
    name : "multi_slider3",
    present : stimuli3,
    present_handle : function(stim) {
      $(".err").hide();
      this.init_sliders();      
      exp.sliderPost = null;
      this.stim = stim; //FRED: allows you to access stim in helpers
      $(".noun").html(stim.Noun);

      $(".low").html("\"the "+ stim.Predicate2 + " " + stim.Predicate1 + " " + stim.Noun + "\"");
      $(".high").html("\"the "+ stim.Predicate1 + " " + stim.Predicate2 + " " + stim.Noun + "\"");

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
      utils.make_slider("#slider03", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },
    log_responses : function() {
        exp.data_trials.push({
          "response" : exp.sliderPost,
          "noun" : this.stim.Noun,  
          "nounclass" : this.stim.NounClass,        
          "predicate1" : this.stim.Predicate1,
          "predicate2" : this.stim.Predicate2,
          "class1" : this.stim.Class1,
          "class2" : this.stim.Class2,                     
          "slide_number" : exp.phase
        });
    },
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      exp.subj_data = {
        assess : $('input[name="assess"]:checked').val(),
        comments : $("#comments").val()
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
          "subject_ID" : exp.subj_ID,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
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
  exp.structure=["ID","i0", "instructions1",'multi_slider1','encouragement1','multi_slider2','encouragement2','multi_slider3', 'subj_info', 'thanks'];
  
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