library(ggplot2)
library(reshape2)
library(lme4)
library(dplyr)

setwd("~/git/cross-linguistic_adjective_ordering/italian/experiments/4-faultless-disagreement/results/")

source("helpers.r")

df = read.csv("results.csv",header=T)

d = df[df$language!="",]

length(unique(d$participant_id)) # 23 participants


### add in English translations of adjectives

# Load the required library
library(jsonlite)

# Your JSON data
json_data <- '[{"Predicate":"rosso", "Class":"color","FemPredicate":"rossa", "English": "red"},
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
{"Predicate":"quadrato", "Class":"shape","FemPredicate":"quadrata", "English": "square"}]'

# Parse the JSON data
json_df <- fromJSON(json_data)

# Assuming your dataset is called df and the column is called 'predicate'
# Merge the datasets based on 'predicate' column
merged_d <- merge(d, json_df[, c("Predicate", "English")], by.x = "predicate", by.y = "Predicate", all.x = TRUE)

t <- merged_d

t$class <- factor(t$class,levels=c("quality","size","age","texture","color","shape","nationality"))

## class plot
d_s = bootsSummary(data=t, measurevar="response", groupvars=c("class"))

class_plot <- ggplot(d_s, aes(x=reorder(class,-response,mean),y=response)) +
  geom_bar(stat="identity",position=position_dodge()) +
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=reorder(class,-response,mean), width=0.1),position=position_dodge(width=0.9))+
  ylab("faultless disagreement\n")+
  xlab("\nadjective class") +
  ylim(0,1) +
  theme_bw()
class_plot
#ggsave("faultless_class_plot.png",height=2.5,width=4.5)

agr_pred = aggregate(response~predicate*class,data=t,mean)

#write.csv(agr_pred,"pred-subjectivity.csv")





adj_agr = aggregate(response~predicate*class,FUN=mean,data=t)
adj_agr
class_s = bootsSummary(data=t, measurevar="response", groupvars=c("class"))

# class plot with adjectives
class_s$class = factor(class_s$class,levels=c("size","quality","texture","age","shape","color","nationality"))
ggplot(data=class_s,aes(x=reorder(class,-response,mean),y=response))+
  geom_bar(stat="identity",fill="lightgrey",color="black")+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=reorder(class,-response,mean), width=0.1),alpha=1)+
  geom_jitter(data=adj_agr,aes(y=response),alpha=.75,color="red") +
  #geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=reorder(correctclass,-correctresponse,mean), width=0.1),alpha=0.5)+
  #geom_hline(yintercept=0.5,linetype="dashed") +
  xlab("\nadjective class")+
  ylab("faultless disagreement\n")+
  ylim(0,1)+
  #labs("order\npreference")+
  theme_bw()#+
#ggsave("faultless_class_jitter.png",height=2.5,width=4.5)