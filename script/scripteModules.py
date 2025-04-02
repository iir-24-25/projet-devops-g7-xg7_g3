import random

# Define the possible values based on the table structure
filieres = ['GC', 'GESI', 'GF', 'GI', 'IAII', 'IIR']
niveaux = ['NIVEAU_1', 'NIVEAU_2', 'NIVEAU_3', 'NIVEAU_4', 'NIVEAU_5']
semestres = ['PREMIER', 'DEUXIEME']
is_pratique_values = [0, 1]  # 0 for theoretical, 1 for practical
weekly_hours_values = [90, 120, 180]  # Possible values for weekly_hours

# Number of modules per semester
modules_per_semestre = {
    'PREMIER': 12,
    'DEUXIEME': 13
}

# Start the SQL INSERT statement with the correct column name
sql = "INSERT INTO modules (weekly_hours, is_pratique, niveau, semestre, titre, filiere) VALUES\n"

values = []
for filiere in filieres:
    for niveau in niveaux:
        for semestre in semestres:
            num_modules = modules_per_semestre[semestre]
            for module_num in range(1, num_modules + 1):
                # Generate a title for the module
                titre = f"Module {module_num} - {filiere} {niveau} {semestre}"
                # Ensure the title fits within VARCHAR(50)
                if len(titre) > 50:
                    titre = titre[:47] + "..."  # Truncate and add ellipsis if too long

                # Randomly select weekly_hours and is_pratique
                weekly_hours = random.choice(weekly_hours_values)
                is_pratique = random.choice(is_pratique_values)

                # Add the values tuple with the correct column name
                values.append(f"({weekly_hours}, {is_pratique}, '{niveau}', '{semestre}', '{titre}', '{filiere}')")

# Join all values with commas and add a semicolon at the end
sql += ",\n".join(values) + ";"

# Write to a file
with open("./insert_modules_corrected.sql", "w") as f:
    f.write(sql)

print("Corrected SQL script generated as 'insert_modules_corrected.sql'")
print(f"Total modules generated: {len(values)}")