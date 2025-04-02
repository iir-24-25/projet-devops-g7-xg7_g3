# Python script to generate SQL INSERT statements for the groups table

filieres = ['GC', 'GESI', 'GF', 'GI', 'IAII', 'IIR']
niveaux = ['NIVEAU_1', 'NIVEAU_2', 'NIVEAU_3', 'NIVEAU_4', 'NIVEAU_5']
group_names = ['G1', 'G2', 'G3', 'G4', 'G5']
etablissement_ids = range(1, 18)  # 1 to 17

sql = "INSERT INTO groups (filiere, name, niveau, etablissement_id) VALUES\n"

values = []
for etablissement_id in etablissement_ids:
    for filiere in filieres:
        for niveau in niveaux:
            for group_name in group_names:
                values.append(f"('{filiere}', '{group_name}', '{niveau}', {etablissement_id})")

# Join all values with commas and add a semicolon at the end
sql += ",\n".join(values) + ";"

# Write to a file
with open("../script/insert_groups.sql", "w") as f:
    f.write(sql)

print("SQL script generated as 'insert_groups.sql'")