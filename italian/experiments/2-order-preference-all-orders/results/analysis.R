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

length(unique(d$workerid)) # n=108 (120)

#####
## histogram
#####

ggplot(d, aes(x = response)) +
  geom_histogram(color = "black", fill="gray50", bins=33) +
  #geom_density()+
  theme_bw() +
  facet_wrap(~condition)+
  xlab("\nslider response")+
  ylab("count\n")
#ggsave("response-histogram-exp1.png",height=1.75,width=6.75)

## bootstrap entropy
library(entropy)

# Function to perform bootstrapping and calculate entropy
bootstrap_entropy <- function(data, indices) {
  sample_data <- data[indices]
  entropy.empirical(sample_data)
}

# Define the number of bootstrap replicates
n_bootstrap <- 1000

# Bootstrap for each group of cylinders
bootstrap_results_AAN <- boot(d$response[d$condition == "AAN"], bootstrap_entropy, R = n_bootstrap)
#6.612635 0.0001853996  0.01162752
bootstrap_results_ANA <- boot(d$response[d$condition == "ANA"], bootstrap_entropy, R = n_bootstrap)
#6.439414 0.000504087  0.01790537
bootstrap_results_NAA <- boot(d$response[d$condition == "NAA"], bootstrap_entropy, R = n_bootstrap)
#6.554883 0.0006364542  0.01501741

# Calculate confidence intervals
ci_AAN <- boot.ci(bootstrap_results_AAN, type = "perc")
ci_ANA <- boot.ci(bootstrap_results_ANA, type = "perc")
ci_NAA <- boot.ci(bootstrap_results_NAA, type = "perc")

# Print confidence intervals
print(ci_AAN)
print(ci_ANA)
print(ci_NAA)

# Compare entropy values
entropy_diff_AAN_ANA <- bootstrap_results_AAN$t - bootstrap_results_ANA$t
entropy_diff_AAN_NAA <- bootstrap_results_AAN$t - bootstrap_results_NAA$t
entropy_diff_ANA_NAA <- bootstrap_results_ANA$t - bootstrap_results_NAA$t

# Calculate p-values
p_value_AAN_ANA <- mean(entropy_diff_AAN_ANA >= 0)
p_value_AAN_NAA <- mean(entropy_diff_AAN_NAA >= 0)
p_value_ANA_NAA <- mean(entropy_diff_ANA_NAA >= 0)





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
nrow(agr) #5616
#write.csv(agr,"~/git/cross-linguistic_adjective_ordering/italian/experiments/2-order-preference-all-orders/results/naturalness-duplicated.csv")

adj_agr = aggregate(correctresponse~predicate*correctclass*condition,FUN=mean,data=agr)
adj_agr$length = NA
adj_agr$length = (nchar(adj_agr$predicate)-3)/7

agr$length = (nchar(agr$predicate)-3)/7

pmi = read.csv("filtered_output_with_pmi.csv",header=T)

merged_df <- merge(agr, pmi, by.x = c("noun", "predicate"), by.y = c("noun", "adjs"), all.x = TRUE)

# don't replace NAs
merged_df_NA <- merged_df

minPMI = min(merged_df$PMI,na.rm = TRUE)
#-5.353278 # minimum PMI value

# replace NAs with minium value
merged_df$PMI[is.na(merged_df$PMI)] <- minPMI
merged_df_no_NA <- merged_df


#####
## class analysis 
#####

#class_agr = aggregate(correctresponse~correctclass*condition,FUN=mean,data=agr)
source("helpers.R")
class_agr = bootsSummary(data=merged_df , measurevar="correctresponse", groupvars=c("correctclass","condition"))
class_agr$predictor = "rating"
colnames(class_agr)[4] <- "response"

#write.csv(class_agr,"within.csv")

length_agr = bootsSummary(data=merged_df , measurevar="length", groupvars=c("correctclass","condition"))
length_agr$predictor = "length"
colnames(length_agr)[4] <- "response"

### remove NAs from PMI average calculation
merged_df_pmi <- merged_df[complete.cases(merged_df), ]
pmi_agr = bootsSummary(data=merged_df_pmi , measurevar="PMI", groupvars=c("correctclass","condition"))
colnames(pmi_agr)[1] <- "correctclass"
colnames(pmi_agr)[4] <- "response"
pmi_agr$predictor = "PMI"


# combine ratings, length, and PMI
all_agr = rbind(class_agr,length_agr,pmi_agr)
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



#####
## individual adjective analysis
#####

head(adj_agr)

# add PMI
adj_agr_pmi = aggregate(PMI~predicate*correctclass*condition,FUN=mean,data=merged_df_NA) #include NA?
adj_agr$PMI <- adj_agr_pmi$PMI

# add subjectivity
s = read.csv("../../4-faultless-disagreement/results/pred-subjectivity.csv",header=T)
adj_agr_full <- merge(adj_agr, s, by.x = "predicate", by.y = "predicate", all.x = TRUE)
colnames(adj_agr_full)[9] <- "subjectivity"

# change length
adj_agr_full$length = nchar(adj_agr_full$predicate)

## correlation analysis
AAN <- adj_agr_full[adj_agr_full$condition=="AAN",]
ANA <- adj_agr_full[adj_agr_full$condition=="ANA",]
NAA <- adj_agr_full[adj_agr_full$condition=="NAA",]

###################################
## ANA
#subjectivity ANA
gof(ANA$correctresponse,ANA$subjectivity)
# r = 0.89, r2 = 0.79
results <- boot(data=ANA, statistic=rsq, R=10000, formula=correctresponse~subjectivity)
boot.ci(results, type="bca") 
# 95%   ( 0.6321,  0.8711 )  

#PMI ANA
gof(ANA$correctresponse,ANA$PMI)
# r = 0.20, r2 = 0.04
results <- boot(data=ANA, statistic=rsq, R=10000, formula=correctresponse~PMI)
boot.ci(results, type="bca") 
# 95%   ( 0.0001,  0.2740 ) 

#length ANA
gof(ANA$correctresponse,ANA$length)
# r = 0.32, r2 = 0.11
results <- boot(data=ANA, statistic=rsq, R=10000, formula=correctresponse~length)
boot.ci(results, type="bca") 
# 95%   ( 0.0006,  0.4207 ) 

###################################
## NAA
#subjectivity NAA
gof(NAA$correctresponse,NAA$subjectivity)
# r = -0.68, r2 = 0.47
results <- boot(data=NAA, statistic=rsq, R=10000, formula=correctresponse~subjectivity)
boot.ci(results, type="bca") 
# 95%   ( 0.0615,  0.7406 )


###################################
## AAN
#subjectivity AAN
gof(AAN$correctresponse,AAN$subjectivity)
# r = 0.77, r2 = 0.59
results <- boot(data=AAN, statistic=rsq, R=10000, formula=correctresponse~subjectivity)
boot.ci(results, type="bca") 
# 95%   ( 0.3581,  0.7599 )  

# plots

ggplot(adj_agr_full, aes(x=subjectivity,y=correctresponse)) +
  geom_point() +
  #geom_smooth()+
  stat_smooth(method="lm",color="black")+
  #geom_text(aes(label=predicate),size=2.5,vjust=1.5)+
  ylab("preference\nfor first position\n")+
  xlab("\nsubjectivity score")+
  ylim(0,1)+
  #xlim(0,1)+
  theme_bw() +
  facet_wrap(~condition)
#ggsave("exp1-subjectivity.png",height=2,width=6.75)





#### difference analysis

diff <- d
diff$length1 = nchar(as.character(diff$predicate1))
diff$length2 = nchar(as.character(diff$predicate2))
diff$length_diff = diff$length1 - diff$length2

result_df <- diff %>%
  left_join(pmi, by = c("noun" = "noun", "predicate1" = "adjs"))
result_df2 <- result_df %>%
  left_join(pmi, by = c("noun" = "noun", "predicate2" = "adjs"))
result_df2$pmi_diff = result_df2$PMI.x - result_df2$PMI.y

s = read.csv("adjective-subjectivity.csv",header=T)
result_df3 <- merge(result_df2, s, by.x = "predicate1English", by.y = "predicate", all.x = TRUE)
result_df4 <- merge(result_df3, s, by.x = "predicate2English", by.y = "predicate", all.x = TRUE)
result_df4$subj_diff = result_df4$response.y - result_df4$response

m <- lmer(response~(length_diff+pmi_diff+subj_diff)*condition+ (1|workerid) , data =result_df4)
summary(m)

ggplot(data=result_df4,aes(x=length_diff,y=response.x))+
  geom_point()+
  geom_smooth(method="lm",color="black")+
  ylim(0,1)+
  facet_grid(.~condition)+
  ylab("rating")+
  xlab("\nlength difference (A1-A2)") +
  #labs("order\npreference")+
  theme_bw()
#ggsave("length.png",width=6,height=2.5)

ggplot(data=result_df4,aes(x=pmi_diff,y=response.x))+
  geom_point()+
  geom_smooth(method="lm",color="black")+
  ylim(0,1)+
  ylab("rating")+
  xlab("\nPMI difference (A1-A2)") +
  facet_grid(.~condition)+
  #labs("order\npreference")+
  theme_bw()
#ggsave("PMI.png",width=6,height=2.5)

ggplot(data=result_df4,aes(x=subj_diff,y=response.x))+
  geom_point()+
  geom_smooth(method="lm",color="black")+
  ylim(0,1)+
  ylab("rating")+
  xlab("\n(English) subjectivity difference (A1-A2)") +
  facet_grid(.~condition)+
  #labs("order\npreference")+
  theme_bw()
#ggsave("subjectivity.png",width=6,height=2.5)



#### old PMI analysis

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