library(ggplot2)
library(lme4)
library(hydroGOF)
library(dplyr)
#library(tidyr)

setwd("~/git/cross-linguistic_adjective_ordering/italian/experiments/2-order-preference-all-orders/results/")

df = read.csv("results.csv",header=T)
head(df)

d <- df

d$workerid = d$participant_id

unique(d$language)

all <- d
# only native Vietnamese speakers (n=1)
d = d[d$language!="GREG"
      &d$language !="Spagnolo Italiano",]

length(unique(d$workerid)) # n=110 (120)

#####
## duplicate observations by first predicate
#####

library(tidyr)

o <- d
o$rightpredicate1 = o$predicate2
o$rightpredicate2 = o$predicate1
o$rightresponse = 1-o$response
agr = o %>% 
        select(predicate1,rightpredicate1,response,rightresponse,workerid,noun,nounclass,class1,class2,condition) %>%
        gather(predicateposition,predicate,predicate1:rightpredicate1,-workerid,-noun,-nounclass,-class1,-class2)
agr$correctresponse = agr$response
agr[agr$predicateposition == "rightpredicate1",]$correctresponse = agr[agr$predicateposition == "rightpredicate1",]$rightresponse
agr$correctclass = agr$class1
agr[agr$predicateposition == "rightpredicate1",]$correctclass = agr[agr$predicateposition == "rightpredicate1",]$class2
head(agr[agr$predicateposition == "rightpredicate1",])
agr$response = NULL
agr$rightresponse = NULL
agr$class1 = NULL
agr$class2 = NULL
nrow(agr) #5720
#write.csv(agr,"~/git/cross-linguistic_adjective_ordering/italian/experiments/2-order-preference-all-orders/results/naturalness-duplicated.csv")

adj_agr = aggregate(correctresponse~predicate*correctclass*condition,FUN=mean,data=agr)
adj_agr

class_agr = aggregate(correctresponse~correctclass*condition,FUN=mean,data=agr)

ggplot(data=class_agr,aes(x=reorder(correctclass,-correctresponse,mean),y=correctresponse))+
  geom_bar(stat="identity")+
  #geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=reorder(class1,-correctresponse,mean), width=0.1),alpha=0.5)+
  xlab("\nadjective class")+
  ylab("preference for first position\n")+
  ylim(0,1)+
  facet_grid(.~condition)+
  #labs("order\npreference")+
  theme_bw()#+
  #theme(axis.text.x=element_text(angle=90,vjust=0.35,hjust=1))
#ggsave("class_distance.pdf",height=3)





