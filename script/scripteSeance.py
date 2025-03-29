import mysql.connector
from datetime import time
import random

# Fonction pour générer une heure aléatoire
def random_time():
    hour = random.randint(8, 18)  # Heures entre 8h et 18h
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    return time(hour, minute, second)

# Connexion à la base de données
try:
    connection = mysql.connector.connect(
        host="localhost",  # Remplacez par votre hôte
        user="root",  # Remplacez par votre nom d'utilisateur
        password="",  # Remplacez par votre mot de passe
        database="systemGestionAbsance"  # Nom de la base de données
    )

    cursor = connection.cursor()

    # Requête d'insertion
    insert_query = """
    INSERT INTO seance (id, heure_debut, heure_fin, emploi_temp_id, module_id)
    VALUES (%s, %s, %s, %s, %s)
    """

    # Compteur pour l'ID de la séance
    seance_id = 1

    # Boucle pour générer les données
    for emploi_id in range(20001, 81201):  # De 20001 à 81200
        # Générer un module_id aléatoire entre 1 et 750
        module_id = random.randint(1, 750)

        # Générer des heures de début et de fin
        heure_debut = random_time()
        # Ajouter 1 à 2 heures pour l'heure de fin
        heure_fin_hour = (heure_debut.hour + random.randint(1, 2)) % 24
        heure_fin = time(heure_fin_hour, heure_debut.minute, heure_debut.second)

        # Données à insérer
        data = (seance_id, heure_debut, heure_fin, emploi_id, module_id)

        # Exécuter la requête d'insertion
        cursor.execute(insert_query, data)

        # Incrémenter l'ID de la séance
        seance_id += 1

    # Valider les changements
    connection.commit()
    print(f"{cursor.rowcount} enregistrements insérés avec succès !")

except mysql.connector.Error as error:
    print(f"Erreur lors de l'insertion : {error}")

finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("Connexion à la base de données fermée.")
