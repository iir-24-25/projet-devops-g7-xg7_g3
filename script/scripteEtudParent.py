import random

# Définir les valeurs possibles pour les champs
filieres = ['GC', 'GESI', 'GF', 'GI', 'IAII', 'IIR']
niveaux = ['NIVEAU_1', 'NIVEAU_2', 'NIVEAU_3', 'NIVEAU_4', 'NIVEAU_5']
villes = ['MARRAKECH', 'RABAT', 'CASABLANCA', 'FES', 'TANGER']
genders = ['FEMALE', 'MALE']
is_login_values = [0, 1]

# Listes de noms et prénoms
noms = [
    "Dupont", "Martin", "Bernard", "Petit", "Durand", "Leroy", "Moreau", "Simon", "Laurent", "Michel",
    "Garcia", "Roux", "Vincent", "Fournier", "Morel", "Girard", "Andre", "Lefevre", "Mercier", "Dupuis",
    "Lambert", "Bonnet", "Francois", "Martinez", "Legrand", "Garnier", "Faure", "Rousseau", "Clement", "Gauthier",
    "Dumas", "Charpentier", "Robin", "Masson", "Sanchez", "Blanchard", "Guerin", "Perrin", "Morin", "Giraud",
    "Boyer", "Lopez", "Rodriguez", "Colin", "Vidal", "Lemoine", "Brunet", "Arnaud", "Caron", "Moulin",
    "Chevalier", "Renault", "Noel", "Meyer", "Pereira", "Gomez", "Picard", "Marchand", "Dubois", "Thomas",
    "Robert", "Richard", "Fontaine", "David", "Bertrand", "Royer", "Lemaire", "Duval", "Denis", "Payet",
    "Leclerc", "Guillaume", "Lacroix", "Benoit", "Fabre", "Carpentier", "Baron", "Philip", "Fernandez", "Blanc",
    "Gaudin", "Rey", "Schmitt", "Perrot", "Adam", "Barbier", "Hardy", "Breton", "Bourgeois", "Aubert",
    "Lamy", "Deschamps", "Fischer", "Weber", "Klein", "Lefranc", "Collet", "Legendre", "Roussel", "Joly",
    "Gillet", "Bouvier", "Mallet", "Prevost", "Pichon", "Guerin", "Cordier", "Imbert", "Barre", "Monnier",
    "Herve", "Thibault", "Peltier", "Coulon", "Bazin", "Gautier", "Allard", "Teixeira", "Pons", "Lejeune",
    "Dias", "Carre", "Bigot", "Jacquet", "Hamon", "Arnal", "Vasseur", "Masse", "Chauvin", "Herault",
    "Guillot", "Frey", "Drouet", "Boulanger", "Vallet", "Pasquier", "Laval", "Delorme", "Gregoire", "Maillard",
    "Tessier", "Samson", "Lacombe", "Chambon", "Marty", "Antoine", "Hoarau", "Lebreton", "Pelletier", "Tanguy"
]

prenoms_male = [
    "Jean", "Thomas", "Luc", "Paul", "Hugo", "Antoine", "Louis", "Alexandre", "Nicolas", "Victor",
    "Mathieu", "Pierre", "Julien", "Maxime", "Adrien", "Romain", "Nathan", "Florian", "Théo", "Léo",
    "Quentin", "Ethan", "Tom", "Arthur", "Raphaël",
    "Gabriel", "Martin", "Simon", "David", "Benjamin", "Clément", "Samuel", "Lucas", "Baptiste", "Guillaume",
    "Charles", "Vincent", "Jules", "Émile", "Olivier", "Sébastien", "François", "Damien", "Cédric", "Yann",
    "Mathias", "Gaspard", "Étienne", "Rémi", "Axel", "Noah", "Evan", "Timothée", "Valentin", "Dylan",
    "Bastien", "Aurélien", "Laurent", "Grégoire", "Tristan", "Léon", "Malo", "Sacha", "Eliot", "Marius",
    "Jérôme", "Alban", "Corentin", "Thibault", "Gautier", "Robin", "Stanislas", "Loïc", "Antonin", "Brice",
    "Éloi", "Félix", "Hector", "Isaac", "Johan", "Kevin", "Lilian", "Maël", "Nolan", "Oscar",
    "Pablo", "Quentin", "Ruben", "Steven", "Tanguy", "Ugo", "Vivien", "William", "Xavier", "Yanis",
    "Zacharie", "Adam", "Benoît", "Cyril", "Denis", "Erwan", "Fabien", "Gilles", "Hadrien", "Ilan",
    "Joris", "Kilian", "Loris", "Matéo", "Nino", "Patrice", "Rayan", "Sylvain", "Thierry", "Ulysse",
    "Victorien", "Wesley", "Xander", "Yohan", "Zéphyr", "Alain", "Bruno", "Clovis", "Dorian", "Édouard"
]

prenoms_female = [
    "Sophie", "Marie", "Camille", "Emma", "Chloe", "Alice", "Julie", "Manon", "Laura", "Elodie",
    "Amandine", "Clara", "Léa", "Zoé", "Inès", "Lola", "Anaïs", "Maëlle", "Jade", "Lucie",
    "Noémie", "Sarah", "Amélie", "Lina", "Eva",
    "Charlotte", "Mathilde", "Pauline", "Margaux", "Céline", "Marion", "Hélène", "Louise", "Fanny", "Mélanie",
    "Justine", "Valentine", "Émilie", "Océane", "Lisa", "Agathe", "Roxane", "Clémence", "Sabrina", "Aurélie",
    "Morgane", "Léna", "Capucine", "Aurore", "Floriane", "Élodie", "Solène", "Alicia", "Romane", "Célia",
    "Adèle", "Louna", "Maéva", "Elsa", "Juliette", "Anaëlle", "Candice", "Delphine", "Estelle", "Flavie",
    "Gabrielle", "Hortense", "Iris", "Jeanne", "Karine", "Laetitia", "Mélissa", "Nadine", "Ophélie", "Perrine",
    "Quitterie", "Rose", "Stéphanie", "Thaïs", "Vanessa", "Wendy", "Yasmine", "Zélie", "Anouk", "Bérénice",
    "Coralie", "Daphné", "Éléonore", "Faustine", "Garance", "Hermine", "Ingrid", "Jasmine", "Katia", "Lara",
    "Maïlys", "Nelly", "Oriane", "Priscille", "Rosalie", "Salomé", "Tiphaine", "Ursule", "Victoire", "Xénia",
    "Yolande", "Zoélie", "Albane", "Blandine", "Célestine", "Dorothée", "Érine", "Fiona", "Gwendoline", "Hanna",
    "Isabelle", "Jocelyne", "Klara", "Lydia", "Marjorie", "Noëlle", "Pénélope", "Rachel", "Suzanne", "Tatiana"
]

# Nombre de groupes et d'étudiants par groupe
students_per_group = 20
group_ids = range(1, 2551)  # Group IDs de 1 à 2550
total_groups = len(group_ids)  # 2550 groupes
total_students = total_groups * students_per_group  # 51000 étudiants
total_parents = total_groups  # 2550 parents (un par groupe)

# Initialiser la requête SQL
sql = "INSERT INTO persons (type, nom, prenom, email, password, gender, ville, tel, image, emprunt, is_login, address_mac, filiere, niveau, specialisation, group_id, parents_id) VALUES\n"

values = []

# Étape 1 : Générer les parents (un parent par groupe)
parent_counter = 0  # Pour générer des emails uniques pour les parents
parent_ids = {}  # Dictionnaire pour stocker les IDs des parents par groupe

for group_id in group_ids:
    parent_counter += 1

    # Générer nom
    nom = random.choice(noms)

    # Genre
    gender = random.choice(genders)

    # Générer prénom en fonction du genre
    prenom = random.choice(prenoms_male if gender == 'MALE' else prenoms_female)

    # Générer un email unique
    email = f"parent{parent_counter}@example.com"

    # Générer un mot de passe
    password = f"parentpass{parent_counter}"

    # Ville
    ville = random.choice(villes)

    # Téléphone (format réaliste)
    tel = f"'06{random.randint(10000000, 99999999)}'"

    # Image et emprunt (NULL)
    image = "NULL"
    emprunt = "NULL"

    # is_login
    is_login = random.choice(is_login_values)

    # Address MAC (NULL pour les parents)
    address_mac = "NULL"

    # Champs spécifiques aux étudiants (NULL pour les parents)
    filiere = "NULL"
    niveau = "NULL"
    specialisation = "NULL"
    group_id_sql = "NULL"
    parents_id = "NULL"

    # Ajouter les valeurs pour le parent
    values.append(f"('PAR', '{nom}', '{prenom}', '{email}', '{password}', '{gender}', '{ville}', {tel}, {image}, {emprunt}, {is_login}, {address_mac}, {filiere}, {niveau}, {specialisation}, {group_id_sql}, {parents_id})")

    # Stocker l'ID du parent (l'ID sera parent_counter, car les parents sont insérés en premier)
    parent_ids[group_id] = parent_counter

# Étape 2 : Générer les étudiants
student_counter = 0  # Pour générer des emails uniques pour les étudiants

for group_id in group_ids:
    # Déterminer filiere et niveau pour ce groupe
    filiere = filieres[(group_id - 1) % len(filieres)]  # Cycle à travers les filieres
    niveau = niveaux[(group_id - 1) % len(niveaux)]    # Cycle à travers les niveaux

    # Récupérer l'ID du parent pour ce groupe
    parent_id = parent_ids[group_id]

    for _ in range(students_per_group):
        student_counter += 1

        # Générer nom
        nom = random.choice(noms)

        # Genre
        gender = random.choice(genders)

        # Générer prénom en fonction du genre
        prenom = random.choice(prenoms_male if gender == 'MALE' else prenoms_female)

        # Générer un email unique
        email = f"student{student_counter}@example.com"

        # Générer un mot de passe
        password = f"pass{student_counter}"

        # Ville
        ville = random.choice(villes)

        # Téléphone (format réaliste)
        tel = f"'06{random.randint(10000000, 99999999)}'"

        # Image et emprunt (NULL)
        image = "NULL"
        emprunt = "NULL"

        # is_login
        is_login = random.choice(is_login_values)

        # Address MAC (unique, format correct)
        mac_part = f"{student_counter:06d}"  # 6-digit number
        address_mac = f"00:1A:2B:{mac_part[0:2]}:{mac_part[2:4]}:{mac_part[4:6]}"  # Format as 00:1A:2B:XX:XX:XX

        # Specialisation (NULL)
        specialisation = "NULL"

        # Ajouter les valeurs pour l'étudiant
        values.append(f"('ETUD', '{nom}', '{prenom}', '{email}', '{password}', '{gender}', '{ville}', {tel}, {image}, {emprunt}, {is_login}, '{address_mac}', '{filiere}', '{niveau}', {specialisation}, {group_id}, {parent_id})")

# Écrire les données dans des fichiers batch
batch_size = 10000
batched_values = [values[i:i + batch_size] for i in range(0, len(values), batch_size)]

for i, batch in enumerate(batched_values):
    batch_sql = "INSERT INTO persons (type, nom, prenom, email, password, gender, ville, tel, image, emprunt, is_login, address_mac, filiere, niveau, specialisation, group_id, parents_id) VALUES\n"
    batch_sql += ",\n".join(batch) + ";"
    try:
        with open(f"./insert_persons_batch_{i+1}.sql", "w") as f:
            f.write(batch_sql)
        print(f"Batch {i+1} SQL script generated as 'insert_persons_batch_{i+1}.sql'")
    except Exception as e:
        print(f"Error writing batch {i+1}: {e}")

print(f"Total records generated: {len(values)} (Parents: {total_parents}, Students: {total_students})")