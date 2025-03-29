import random
import itertools

# Define possible values
jours = ['JEUDI', 'LUNDI', 'MARDI', 'MERCREDI', 'SAMEDI', 'VENDREDI']
salles = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'C4', 'C5', 'D1', 'D2', 'D3', 'D4', 'D5']
seances = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6']
semestres = ['PREMIER', 'DEUXIEME']
group_ids = list(range(1, 2551))  # 1 to 2550

# Generate all possible (jour, salle, seance) combinations
all_combinations = list(itertools.product(jours, salles, seances))
print(f"Total possible (jour, salle, seance) combinations: {len(all_combinations)}")  # Should be 720

# Number of time slots per semester per group
slots_per_semester = 12

# Start the SQL INSERT statement
sql = "INSERT INTO emploi_temps (jour, salle, seance, semestre, groupe_id) VALUES\n"

values = []

# Generate time slots for each group
for group_id in group_ids:
    for semestre in semestres:
        # Randomly select 12 unique (jour, salle, seance) combinations for this semester
        selected_combinations = random.sample(all_combinations, slots_per_semester)
        
        # Create an emploi_temps record for each combination
        for jour, salle, seance in selected_combinations:
            values.append(f"('{jour}', '{salle}', '{seance}', '{semestre}', {group_id})")

# Split into batches to avoid overly large INSERT statements
batch_size = 10000
batched_values = [values[i:i + batch_size] for i in range(0, len(values), batch_size)]

# Write to multiple files
for i, batch in enumerate(batched_values):
    batch_sql = "INSERT INTO emploi_temps (jour, salle, seance, semestre, groupe_id) VALUES\n"
    batch_sql += ",\n".join(batch) + ";"
    try:
        with open(f"insert_emploi_temps_batch_{i+1}.sql", "w") as f:
            f.write(batch_sql)
        print(f"Batch {i+1} SQL script generated as 'insert_emploi_temps_batch_{i+1}.sql'")
    except Exception as e:
        print(f"Error writing batch {i+1}: {e}")

print(f"Total emploi_temps records generated: {len(values)}")