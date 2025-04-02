import mysql.connector
import random
from datetime import datetime, timedelta

# Connexion à la base de données
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",  # Remplace par ton mot de passe
    database="systemGestionAbsance"
)
cursor = conn.cursor()

# Paramètres
ETUDIANT_MIN_ID = 2551
ETUDIANT_MAX_ID = 63769
GROUPE_MIN_ID = 1
GROUPE_MAX_ID = 2550
SALLE_OPTIONS = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5',
                 'C1', 'C2', 'C3', 'C4', 'C5', 'D1', 'D2', 'D3', 'D4', 'D5']
SEANCE_MIN_ID = 1
SEANCE_MAX_ID = 1000  # Ajuste selon tes séances
NOMBRE_ABSENCES = 5000  # Nombre total d'absences à insérer

# Calculer le début et la fin de la semaine actuelle
today = datetime.now()
start_of_week = today - timedelta(days=today.weekday())  # Lundi
end_of_week = start_of_week + timedelta(days=6)  # Dimanche

# Vérification des IDs existants dans la table persons
cursor.execute("SELECT id FROM persons")
valid_etudiant_ids = [row[0] for row in cursor.fetchall()]

# Générer des absences aléatoires pour cette semaine
absences = []
for _ in range(NOMBRE_ABSENCES):
    # Assurer que l'etudiant_id existe dans la table persons
    etudiant_id = random.choice(valid_etudiant_ids)  # Utiliser un ID valide existant
    seance_id = random.randint(SEANCE_MIN_ID, SEANCE_MAX_ID)
    salle = random.choice(SALLE_OPTIONS)
    # Générer une date d'absence entre le début et la fin de la semaine
    date_absence = start_of_week + timedelta(days=random.randint(0, 6))
    is_justif = random.choice([0, 1])

    absences.append((date_absence, is_justif, salle, etudiant_id, seance_id))

# Requête SQL pour insérer les données
sql = """INSERT INTO absences (date_absence, is_justif, salle, etudiant_id, seance_id) 
         VALUES (%s, %s, %s, %s, %s)"""

cursor.executemany(sql, absences)
conn.commit()

print(f"{cursor.rowcount} absences insérées avec succès.")

# Fermeture de la connexion
cursor.close()
conn.close()
