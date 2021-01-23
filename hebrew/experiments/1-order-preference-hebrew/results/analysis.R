library(ggplot2)
library(lme4)
library(hydroGOF)
library(dplyr)

setwd("~/git/hebrew_adjectives/experiments/1-order-preference-hebrew/results/")
source("helpers.R")


df = read.csv("results.csv",header=T)
    
d = subset(df, select=c("age",
                        "assess",
                        #"comments",
                        #"describe",
                        #"dialect", 
                        #"education", 
                        #"enjoyment", 
                        "gender",
                        "language",
                        #"lived",
                        #"proficiency",
                        #"test1",
                        #"test2",
                        #"test3",
                        #"years",
                        #"time_in_minutes",
                        "class1",
                        "class2",
                        "gender",
                        "noun",
                        "nounclass",
                        "predicate1",
                        "predicate2",
                        "response",
                        "slide_number",
                        "participant_id",
                        "time_in_minutes"))
#d <- df

unique(d$language)

d = d[d$language!="רוסית"&
        d$language!="עברית, אנגלית"&
        d$language!="עברית ורוסית",]

d$workerID = d$participant_id

length(unique(d$workerID)) #n=28 (31)

t <- d

#####
## duplicate observations by first predicate
#####

library(tidyr)

o <- t
o$rightpredicate1 = o$predicate2
o$rightpredicate2 = o$predicate1
o$rightresponse = 1-o$response
agr = o %>% 
  select(predicate1,rightpredicate1,response,rightresponse,workerID,noun,nounclass,class1,class2) %>%
  gather(predicateposition,predicate,predicate1:rightpredicate1,-workerID,-noun,-nounclass,-class1,-class2)
agr$correctresponse = agr$response
agr[agr$predicateposition == "rightpredicate1",]$correctresponse = agr[agr$predicateposition == "rightpredicate1",]$rightresponse
agr$correctclass = agr$class1
agr[agr$predicateposition == "rightpredicate1",]$correctclass = agr[agr$predicateposition == "rightpredicate1",]$class2
head(agr[agr$predicateposition == "rightpredicate1",])
agr$trails_response = NULL
agr$rightresponse = NULL
agr$class1 = NULL
agr$class2 = NULL
nrow(agr) #572
agr$correctresponse = 1 - agr$correctresponse
agr = agr[!is.na(agr$correctresponse),]
#write.csv(agr,"hebrew-naturalness-duplicated.csv")




adj_agr = aggregate(correctresponse~predicate*correctclass,FUN=mean,data=agr)
adj_agr

class_agr = aggregate(correctresponse~correctclass,FUN=mean,data=agr)

class_s = bootsSummary(data=agr, measurevar="correctresponse", groupvars=c("correctclass"))
#write.csv(class_s,"../results/tagalog_class_s.csv")

ggplot(data=class_s,aes(x=reorder(correctclass,-correctresponse,mean),y=correctresponse))+
  geom_bar(stat="identity",fill="lightgray",color="black")+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=reorder(correctclass,-correctresponse,mean), width=0.1))+
  geom_hline(yintercept=0.5,linetype="dashed") + 
  xlab("\nadjective class")+
  ylab("preferred\ndistance from noun\n")+
  ylim(0,1)+
  #labs("order\npreference")+
  theme_bw()#+
#theme(axis.text.x=element_text(angle=90,vjust=0.35,hjust=1))
#ggsave("../results/class_distance_hebrew.pdf",height=3)