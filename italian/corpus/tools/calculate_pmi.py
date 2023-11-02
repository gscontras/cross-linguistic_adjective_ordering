import pandas as pd
import math

# Load the dataset into a DataFrame
data = pd.read_csv('../new_testpair.csv', usecols=['count', 'noun', 'adjs'])

# Remove rows with NaN values
data = data.dropna()

# Calculate the total count of records in the dataset
total_count = data['count'].sum()

# Calculate the total count of each unique adjective
adjs_counts = data.groupby('adjs')['count'].sum()

# Calculate the total count of each unique noun
noun_counts = data.groupby('noun')['count'].sum()

# Calculate PMI for each row and store the results in a new column
pmi_values = []
for index, row in data.iterrows():
    noun = row['noun']
    adjs = row['adjs']
    count = row['count']

    # Laplace smoothing for probabilities
    p_noun_adjs = (count + 1) / (total_count + len(data))
    p_noun = (noun_counts[noun] + 1) / (total_count + len(data))
    p_adjs = (adjs_counts[adjs] + 1) / (total_count + len(data))

    if p_noun == 0 or p_adjs == 0:
        pmi = 0  # Avoid taking the logarithm of zero
    else:
        pmi = math.log2(p_noun_adjs / (p_noun * p_adjs))

    pmi_values.append(pmi)

data['PMI'] = pmi_values

# Print or save the updated DataFrame with PMI values
data.to_csv('../output_with_pmi.csv', index=False)