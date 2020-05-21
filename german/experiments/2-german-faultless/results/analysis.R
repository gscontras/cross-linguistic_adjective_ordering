library(ggplot2)
library(lme4)
library(hydroGOF)
library(dplyr)
library(lmerTest)
setwd("~/git/cross-linguistic_adjective_ordering/german/experiments/2-german-faultless/results/")
source("helpers.R")

d = read.csv("results.csv",header=T)
head(d)

d = d[d$language!="",]

unique(d$language)

length(unique(d$participant_id)) # n=40

aggregate(response~class,data=d,mean)
d_agr = aggregate(response~predicateGerman,FUN=mean,data=d)

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


o = read.csv("../../1-german-ordering/results/german-naturalness-duplicated.csv",header=T)

o_agr = aggregate(correctresponse~predicate*correctclass,data=o,FUN=mean)

o_agr$shortPredicate <- factor(o_agr$predicate,labels=c("alt",
                                                        "americanisch",
                                                        "blau",
                                                        "braun",
                                                        "deutsch",
                                                        "faul",
                                                        "franz&ouml;sisch",
                                                        "frisch",
                                                        "gelb",
                                                        "glatt",
                                                        "gr&uuml;n",
                                                        "gro&szlig;",
                                                        "gut",
                                                        "hart",
                                                        "klein",
                                                        "kurz",
                                                        "lang",
                                                        "neu",
                                                        "purpur",
                                                        "quadratisch",
                                                        "riesig",
                                                        "rot",
                                                        "rund",
                                                        "schlecht",
                                                        "weich",
                                                        "winzig"   
))


o_agr$subjectivity = d_agr$response[match(o_agr$shortPredicate,d_agr$predicateGerman)]

#### NO COLOR ADJECTIVES
#o_agr = o_agr[o_agr$correctclass!="color",]

gof(o_agr$correctresponse,o_agr$subjectivity)
# r = 0.85, r2 = 0.73
results <- boot(data=o_agr, statistic=rsq, R=10000, formula=correctresponse~subjectivity)
boot.ci(results, type="bca") 
# 95%   ( 0.5509,  0.8279 )  

ggplot(o_agr, aes(x=subjectivity,y=correctresponse)) +
  geom_point() +
  #geom_smooth()+
  stat_smooth(method="lm",color="black")+
  #geom_text(aes(label=predicate),size=2.5,vjust=1.5)+
  ylab("preferred distance from noun\n")+
  xlab("\nsubjectivity score")+
  ylim(0,1)+
  theme_bw()
#ggsave("../results/german-scatter.pdf",height=2.75,width=3.15)
