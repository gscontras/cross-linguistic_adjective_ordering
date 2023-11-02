import pandas as pd

# Load the dataset into a DataFrame
data = pd.read_csv('../output_with_pmi.csv')

# Define a list of specific adjectives and nouns you want to include
specific_adjs = ['rosso','giallo','verde','blu','viola','marrone','grande','piccolo','gigantesco','minuscolo','corto','lungo','polacco','francese','tedesco','liscio','duro','morbido','vecchio','nuovo','marcio','fresco','fantastico','cattivo','rotondo','quadrato','rossa','gialla','marrone','piccola','gigantesca','minuscola','corta','lunga','polacca','tedesca','liscia','dura','morbida','vecchia','nuova','marcia','fresca','fantastica','cattiva','rotonda','quadrata']
specific_nouns = ['mela','banana','carota','formaggio','pomodoro','sedia','divano','vintilatore','televisore','scrivania']

# Filter the DataFrame to include only rows with specified adjectives and nouns
filtered_data = data[(data['adjs'].isin(specific_adjs)) & (data['noun'].isin(specific_nouns))]

# Save the filtered DataFrame as a new CSV file
filtered_data.to_csv('../filtered_output_with_pmi.csv', index=False)