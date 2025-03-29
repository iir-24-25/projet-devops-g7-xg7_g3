import random

# Define possible values
genders = ['FEMALE', 'MALE']
is_login_values = [0, 1]

# Etablissements with their corresponding villes
etablissements = [
    ('EMSI Centre', 'MARRAKECH'),
    ('EMSI Gueliz', 'MARRAKECH'),
    ('EMSI Roudani', 'CASABLANCA'),
    ('EMSI Maarif', 'CASABLANCA'),
    ('EMSI Les Orangers', 'CASABLANCA'),
    ('EMSI Centre 1', 'CASABLANCA'),
    ('EMSI Centre 2', 'CASABLANCA'),
    ('EMSI Moulay Youssef', 'CASABLANCA'),
    ('EMSI RABAT AGDAL 1', 'RABAT'),
    ('EMSI RABAT AGDAL 2', 'RABAT'),
    ('EMSI RABAT BOUREGREG', 'RABAT'),
    ('EMSI RABAT CENTRE 1', 'RABAT'),
    ('EMSI RABAT CENTRE 2', 'RABAT'),
    ('EMSI RABAT SOUISSI', 'RABAT'),
    ('EMSI RABAT HASSAN', 'RABAT'),
    ('EMSI FES', 'FES'),
    ('EMSI Tanger', 'TANGER')
]

# Sample names for generating nom and prenom
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

# Start the SQL INSERT statement
sql = "INSERT INTO persons (type, nom, prenom, email, password, gender, ville, tel, image, emprunt, is_login, address_mac, filiere, niveau, specialisation, group_id, parents_id) VALUES\n"

values = []
admin_counter = 0  # For generating unique email

for etablissement, ville in etablissements:
    admin_counter += 1

    # Generate nom
    nom = random.choice(noms)

    # Gender
    gender = random.choice(genders)

    # Generate prenom based on gender
    prenom = random.choice(prenoms_male if gender == 'MALE' else prenoms_female)

    # Generate unique email
    email = f"admin{admin_counter}@example.com"

    # Generate password
    password = f"adminpass{admin_counter}"

    # Ville (based on etablissement)
    # Already defined in the etablissements list

    # Tel (generate a fake phone number)
    tel = f"'06{random.randint(10000000, 99999999)}'"

    # Image and emprunt (nullable, set to NULL)
    image = "NULL"
    emprunt = "NULL"

    # is_login
    is_login = random.choice(is_login_values)

    # Address MAC (NULL for admins)
    address_mac = "NULL"

    # Filiere, niveau, specialisation (NULL for admins)
    filiere = "NULL"
    niveau = "NULL"
    specialisation = "NULL"

    # Group_id and parents_id (NULL for admins)
    group_id = "NULL"
    parents_id = "NULL"

    # Add the values tuple
    values.append(f"('ADMIN', '{nom}', '{prenom}', '{email}', '{password}', '{gender}', '{ville}', {tel}, {image}, {emprunt}, {is_login}, {address_mac}, {filiere}, {niveau}, {specialisation}, {group_id}, {parents_id})")

# Write to a single file (since there are only 17 admins)
sql += ",\n".join(values) + ";"

try:
    with open("insert_admins.sql", "w") as f:
        f.write(sql)
    print("SQL script generated as 'insert_admins.sql'")
except Exception as e:
    print(f"Error writing SQL script: {e}")

print(f"Total admins generated: {len(values)}")