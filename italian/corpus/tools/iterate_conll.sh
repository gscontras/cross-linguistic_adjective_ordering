#!/bin/bash

# Check if a directory is provided as a command-line argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 directory_path"
    exit 1
fi

# Store the directory path provided as a command-line argument
directory_path="$1"

# Check if the directory exists
if [ ! -d "$directory_path" ]; then
    echo "Error: Directory '$directory_path' does not exist."
    exit 1
fi

# Loop through all .xz files in the directory
for xz_file in "$directory_path"/*.xz; do
    if [ -f "$xz_file" ]; then
        # Decompress the .xz file using xz command
        xz -d "$xz_file"

        # Run your Python command on the decompressed file
        decompressed_file="${xz_file%.xz}"
        python src/extract_pairs_nps_from_conllu.py -i "$decompressed_file" -p new_testpair.csv -n new_testnp.csv -a
    fi
done