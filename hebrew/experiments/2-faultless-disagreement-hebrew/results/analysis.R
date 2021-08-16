library(ggplot2)
library(lme4)
library(hydroGOF)
library(dplyr)
library(lmerTest)
setwd("~/git/cross-linguistic_adjective_ordering/hebrew/experiments/2-faultless-disagreement-hebrew/results/")
source("helpers.R")

d = read.csv("results.csv",header=T)
head(d)

d = d[d$language=="עברית",]

unique(d$language)

length(unique(d$participant_id)) # n=21

d$response = 1-d$response
#write.csv(d,"hebrew-faultless.csv")

aggregate(response~class,data=d,mean)
d=d[d$class!="pattern",]

d$hebrewPredicate ="NA"
d[d$predicate=="red",]$hebrewPredicate = "אדום"
d[d$predicate=="yellow",]$hebrewPredicate = "צהוב"
d[d$predicate=="green",]$hebrewPredicate = "ירוק"
d[d$predicate=="blue",]$hebrewPredicate = "כחול"
d[d$predicate=="purple",]$hebrewPredicate = "סגול"
d[d$predicate=="brown",]$hebrewPredicate = "חום"
d[d$predicate=="big",]$hebrewPredicate = "גדול"
d[d$predicate=="small",]$hebrewPredicate = "קטן"
d[d$predicate=="huge",]$hebrewPredicate = "ענק"
d[d$predicate=="tiny",]$hebrewPredicate = "פצפון"
d[d$predicate=="short",]$hebrewPredicate = "קצר"
d[d$predicate=="long",]$hebrewPredicate = "ארוך"
d[d$predicate=="French",]$hebrewPredicate = "צרפתי"
d[d$predicate=="American",]$hebrewPredicate = "אמריקני"
d[d$predicate=="Spanish",]$hebrewPredicate = "ספרדי"
d[d$predicate=="smooth",]$hebrewPredicate = "חלק"
d[d$predicate=="hard",]$hebrewPredicate = "קשה"
d[d$predicate=="soft",]$hebrewPredicate = "רך"
d[d$predicate=="old",]$hebrewPredicate = "ישן"
d[d$predicate=="new",]$hebrewPredicate = "חדש"
d[d$predicate=="rotten",]$hebrewPredicate = "רקוב"
d[d$predicate=="fresh",]$hebrewPredicate = "טרי"
d[d$predicate=="good",]$hebrewPredicate = "טוב"
d[d$predicate=="bad",]$hebrewPredicate = "גרוע"
d[d$predicate=="round",]$hebrewPredicate = "עגול"
d[d$predicate=="square",]$hebrewPredicate = "מרובע"

d_agr = aggregate(response~predicate*hebrewPredicate,FUN=mean,data=d)

#d$class <- factor(d$class,levels=c("quality","size","age","texture","color","shape","nationality"))

## class plot
d_s = bootsSummary(data=d, measurevar="response", groupvars=c("class"))
# save data for aggregate plot
#write.csv(d_s,"~/Documents/git/cocolab/adjective_ordering/presentations/DGfS/plots/faultless.csv")
class_plot <- ggplot(d_s, aes(x=reorder(class,-response,mean),y=response)) +
  geom_bar(stat="identity",position=position_dodge()) +
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=reorder(class,-response,mean), width=0.1),position=position_dodge(width=0.9))+
  ylab("faultless disagreement\n")+
  xlab("\nadjective class") +
  ylim(0,1) +
  theme_bw()
class_plot
#ggsave("../results/class_plot.pdf",height=3)


#### comparison with faultless disgareement


o = read.csv("../../1-order-preference-hebrew/results/hebrew-naturalness-duplicated.csv",header=T)

o_agr = aggregate(correctresponse~predicate*correctclass,data=o,FUN=mean)

o_agr$subjectivity = d_agr$response[match(o_agr$predicate,d_agr$hebrewPredicate)]

#### NO COLOR ADJECTIVES
#o_agr = o_agr[o_agr$correctclass!="color",]

gof(o_agr$correctresponse,o_agr$subjectivity)
# r = 0.81, r2 = 0.65
results <- boot(data=o_agr, statistic=rsq, R=10000, formula=correctresponse~subjectivity)
boot.ci(results, type="bca") 
# 95%   ( 0.4351,  0.7737 )  

ggplot(o_agr, aes(x=subjectivity,y=correctresponse)) +
  geom_point() +
  #geom_smooth()+
  stat_smooth(method="lm",color="black")+
  #geom_text(aes(label=predicate),size=2.5,vjust=1.5)+
  ylab("preferred distance from noun\n")+
  xlab("\nsubjectivity score")+
  ylim(0,1)+
  #xlim(0,1)+
  theme_bw()
#ggsave("../results/hebrew-scatter.pdf",height=2.75,width=3.15)




#### analysis of extrapolated ratings

e = read.csv("~/git/multilingual-subjectivity/interpolated_ratings/best_net_50_predictions.csv",header=T)
o_agr$extrapolated = e$prediction[match(o_agr$predicate,e$predicate)]
gof(o_agr$correctresponse,o_agr$extrapolated)
# r = 0.84, r2 = 0.70
results <- boot(data=o_agr, statistic=rsq, R=10000, formula=correctresponse~extrapolated)
boot.ci(results, type="bca") 
# 95%   ( 0.4854,  0.8296 )  



#### analysis of english-only extrapolated ratings

eo = read.csv("~/git/multilingual-subjectivity/interpolated_ratings/english_only_interpolated_scores.csv",header=T)
o_agr$extrapolated_eo = eo$interpolated.score[match(o_agr$predicate,eo$predicate)]
gof(o_agr$correctresponse,o_agr$extrapolated_eo)
# r = 0.66, r2 = 0.44
results <- boot(data=o_agr, statistic=rsq, R=10000, formula=correctresponse~extrapolated_eo)
boot.ci(results, type="bca") 
# 95%   ( 0.2333,  0.6350 )


