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
# only native Italian speakers
d = d[d$language!="GREG"
      &d$language !="Spagnolo Italiano"
      &d$language !="",]

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
adj_agr$length = NA
adj_agr$length = (nchar(adj_agr$predicate)-3)/7

agr$length = (nchar(agr$predicate)-3)/7

#class_agr = aggregate(correctresponse~correctclass*condition,FUN=mean,data=agr)
source("helpers.R")
class_agr = bootsSummary(data=agr, measurevar="correctresponse", groupvars=c("correctclass","condition"))
class_agr$predictor = "rating"
colnames(class_agr)[4] <- "response"

length_agr = bootsSummary(data=agr, measurevar="length", groupvars=c("correctclass","condition"))
length_agr$predictor = "length"
colnames(length_agr)[4] <- "response"

# load PMI
pmi = read.csv("filtered_output_with_pmi.csv",header=T)
class_info <- data.frame(
  adjs = c("blu", "cattivo", "corto", "duro", "fantastica", "fantastico", "francese",
           "fresco", "giallo", "gigantesco", "grande", "liscio", "lungo", "marcia",
           "marcio", "marrone", "minuscolo", "morbida", "morbido", "nuovo", "piccola",
           "piccolo", "polacco", "quadrato", "rossa", "rosso", "rotondo", "tedesco",
           "vecchio", "verde", "viola"),
  Class = c("color", "quality", "size", "texture", "quality", "quality", "nationality",
            "age", "color", "size", "size", "texture", "size", "age", "age", "color",
            "size", "texture", "texture", "age", "size", "size", "nationality", "shape",
            "color", "color", "shape", "nationality", "age", "color", "color")
)
pmi_class <- merge(pmi, class_info, by = "adjs", all.x = TRUE)
pmi_class$PMI <- (pmi_class$PMI - min(pmi_class$PMI)) / (max(pmi_class$PMI) - min(pmi_class$PMI))
pmi_agr = bootsSummary(data=pmi_class, measurevar="PMI", groupvars=c("Class"))
colnames(pmi_agr)[1] <- "correctclass"
colnames(pmi_agr)[3] <- "response"
pmi_agr$predictor = "PMI"
# Duplicate the rows and add "AAN", "ANA", and "NAA" to the 'condition' column
expanded_pmi_agr <- pmi_agr
# Repeat the data frame to match the length of the expanded 'condition' column
expanded_pmi_agr <- expanded_pmi_agr[rep(1:nrow(expanded_pmi_agr), each = 3),]
expanded_pmi_agr$condition <- c("AAN", "ANA", "NAA","AAN", "ANA", "NAA","AAN", "ANA", "NAA","AAN", "ANA", "NAA","AAN", "ANA", "NAA","AAN", "ANA", "NAA","AAN", "ANA", "NAA")
# Reset the row names (optional)
rownames(expanded_pmi_agr) <- NULL
#convert response to value between 0 and 1


# combine ratings, length, and PMI
all_agr = rbind(class_agr,length_agr,expanded_pmi_agr)
all_agr$predictor = factor(all_agr$predictor,levels=c('rating','length','PMI'))

level_order = c('size','quality','age','texture','shape','color','nationality')


#plot
ggplot(data=all_agr,aes(x=factor(correctclass,level=level_order),y=response,fill=predictor))+
  geom_bar(stat="identity",position=position_dodge(.9),color="black")+
  geom_hline(yintercept=0.5,linetype="dashed") + 
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=factor(correctclass,level=level_order), width=0.25),alpha=1,position=position_dodge(.9))+
  xlab("adjective class")+
  ylab("preference\nfor first position\n")+
  ylim(0,1)+
  facet_grid(.~condition)+
  #labs("order\npreference")+
  theme_bw()+
  theme(axis.text.x=element_text(angle=45,vjust=1,hjust=1))+
  scale_fill_manual(values=c("gray25","gray50","gray75"))
#theme(axis.text.x=element_text(angle=90,vjust=0.35,hjust=1))
#ggsave("class_distance.png",height=2,width=7)





