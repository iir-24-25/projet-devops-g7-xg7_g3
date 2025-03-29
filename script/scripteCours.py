import random

# Define the ranges
professor_ids = list(range(58651, 63751))  # 58,651 to 63,750 (5,100 professors)
module_ids = list(range(1, 71))  # 1 to 70 (70 modules)

# Start the SQL INSERT statement
sql = "INSERT INTO cours (module_id, professeur_id) VALUES\n"

values = []

# Assign each professor to a random number of modules (between 1 and 5)
for prof_id in professor_ids:
    # Randomly decide how many modules this professor will teach (1 to 5)
    num_modules = random.randint(1, 5)
    
    # Randomly select that many modules for this professor
    selected_modules = random.sample(module_ids, num_modules)
    
    # Create a cours record for each module-professor pair
    for module_id in selected_modules:
        values.append(f"({module_id}, {prof_id})")

# Remove duplicates (in case a professor is assigned the same module multiple times)
# This can happen if we run multiple iterations, but in this case, random.sample ensures no duplicates within one professor's assignments
values = list(dict.fromkeys(values))

# Split into batches to avoid overly large INSERT statements
batch_size = 5000
batched_values = [values[i:i + batch_size] for i in range(0, len(values), batch_size)]

# Write to multiple files
for i, batch in enumerate(batched_values):
    batch_sql = "INSERT INTO cours (module_id, professeur_id) VALUES\n"
    batch_sql += ",\n".join(batch) + ";"
    try:
        with open(f"insert_cours_batch_{i+1}.sql", "w") as f:
            f.write(batch_sql)
        print(f"Batch {i+1} SQL script generated as 'insert_cours_batch_{i+1}.sql'")
    except Exception as e:
        print(f"Error writing batch {i+1}: {e}")

print(f"Total cours records generated: {len(values)}")