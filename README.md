# SIGAP - Système Intelligent de Gestion d'Absence et de Pointage

**SIGAP** (Système Intelligent de Gestion d'Absence et de Pointage) est une solution technologique innovante conçue pour automatiser la gestion des présences dans les établissements scolaires et universitaires. En intégrant la reconnaissance faciale, NFC, Bluetooth, et des caméras intelligentes, SIGAP offre une collecte sécurisée, fiable et centralisée des données de présence pour les étudiants et les enseignants. Le système est modulaire, adaptable à différentes tailles de classes, et conforme aux réglementations RGPD.

## Table des matières
1. [Fonctionnalités principales](#fonctionnalités-principales)
2. [Prérequis](#prérequis)
3. [Installation](#installation)
   - [Backend (Java 21, Maven, Elasticsearch)](#backend)
   - [Frontend (Next.js)](#frontend)
   - [Reconnaissance faciale (Python)](#reconnaissance-faciale)
   - [Matériel (ESP32, RFID, Raspberry Pi, Caméra, LCD)](#matériel)
4. [Utilisation](#utilisation)
5. [Architecture du projet](#architecture-du-projet)
6. [Contribuer](#contribuer)
7. [Tests](#tests)
8. [Licence](#licence)
9. [Contact](#contact)

## Fonctionnalités principales
- **Reconnaissance faciale** : Identification des étudiants à l'entrée via caméras IP avec IA (YOLOv8, DeepFace).
- **Validation de présence** :
  - Classes de 30 à 50 étudiants : Validation via cartes NFC ou application mobile.
  - Amphithéâtres (>50 étudiants) : Détection Bluetooth via adresses MAC, avec vérification par comptage caméra.
- **Pointage des enseignants** : Validation via NFC sur smartphone, synchronisée avec l’emploi du temps.
- **Interfaces utilisateurs** :
  - Tableau de bord pour administrateurs : Gestion des utilisateurs, rapports PDF/Excel.
  - Dashboard pour enseignants : Historique des présences, statistiques.
  - Portail pour parents : Notifications en temps réel, suivi de l’assiduité.
  - Application mobile pour étudiants : Planning, historique, notifications.
- **Sécurité** : Chiffrement TLS, JWT, conformité RGPD.
- **Mode hors-ligne** : Synchronisation différée pour les modules ESP32/NFC.

## Prérequis
Avant de commencer, assurez-vous d’avoir installé les outils suivants :
- **Java** : JDK 21
- **Maven** : Version 3.8+
- **Node.js** : Version 18.x+
- **Python** : Version 3.10+
- **Docker** : Pour Elasticsearch et autres services
- **PlatformIO** : Pour programmer les ESP32, RFID, Raspberry Pi, caméras et LCD
- **MySQL** : Version 8.0+
- **Git** : Pour cloner le dépôt
- **Matériel** :
  - ESP32 avec modules Bluetooth/NFC
  - Caméras IP (ESP32-CAM ou équivalent)
  - Lecteurs NFC ISO/IEC 14443-A
  - Raspberry Pi (pour traitement local, si applicable)
  - Écran LCD compatible ESP32

## Installation

### Backend (Java 21, Maven, Elasticsearch)
1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/votre-utilisateur/sigap.git
   cd sigap
   ```

2. **Configurer Elasticsearch avec Docker** :
   - Assurez-vous que Docker est en cours d’exécution.
   - Lancez Elasticsearch :
     ```bash
     docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:8.10.0
     ```
   - Vérifiez que Elasticsearch est accessible : `curl http://localhost:9200`.

3. **Configurer la base de données MySQL** :
   - Créez une base de données :
     ```bash
     mysql -u root -p -e "CREATE DATABASE sigap_db;"
     ```
   - Mettez à jour les paramètres de connexion dans `backend/src/main/resources/application.properties` :
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/sigap_db
     spring.datasource.username=votre_utilisateur
     spring.datasource.password=votre_mot_de_passe
     spring.elasticsearch.uris=http://localhost:9200
     ```

4. **Construire et lancer le backend** :
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   Le backend sera accessible à `http://localhost:8080`.

### Frontend (Next.js)
1. **Installer les dépendances** :
   ```bash
   cd frontend
   npm install
   ```

2. **Configurer les variables d’environnement** :
   - Créez un fichier `.env.local` dans `frontend` :
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:8080/api
     ```

3. **Lancer le frontend** :
   ```bash
   npm run dev
   ```
   Le frontend sera accessible à `http://localhost:3000`.

### Reconnaissance faciale (Python)
1. **Créer un environnement virtuel** :
   ```bash
   cd recognition
   python -m venv venv
   source venv/bin/activate  # Sur Windows : venv\Scripts\activate
   ```

2. **Installer les bibliothèques nécessaires** :
   ```bash
   pip install opencv-python==4.8.0.76
   pip install deepface==0.0.79
   pip install ultralytics==8.0.196  # Pour YOLOv8
   pip install numpy==1.24.3
   pip install tensorflow==2.13.0  # Nécessaire pour DeepFace
   pip install requests==2.31.0  # Pour les appels API
   ```

3. **Configurer le script de reconnaissance faciale** :
   - Mettez à jour `recognition/config.py` avec les chemins des modèles YOLOv8 et DeepFace, ainsi que l’URL de l’API backend :
     ```python
     YOLO_MODEL_PATH = "path/to/yolov8n.pt"
     DEEPFACE_MODEL = "Facenet"
     API_URL = "http://localhost:8080/api/recognize"
     ```

4. **Lancer le script de reconnaissance faciale** :
   ```bash
   python recognition/main.py
   ```

### Matériel (ESP32, RFID, Raspberry Pi, Caméra, LCD)
1. **Installer PlatformIO** :
   - Téléchargez et installez [PlatformIO IDE](https://platformio.org/install/ide?install=vscode) (extension recommandée pour VS Code).
   - Assurez-vous que les pilotes pour ESP32 et Raspberry Pi sont installés.

2. **Ouvrir le projet dans PlatformIO** :
   - Ouvrez VS Code et installez l’extension PlatformIO si ce n’est pas déjà fait.
   - Clonez le dossier `hardware` du projet :
     ```bash
     cd hardware
     ```
   - Ouvrez le dossier `hardware` dans VS Code :
     - Cliquez sur l’icône PlatformIO (en forme de fourmi) dans la barre latérale.
     - Sélectionnez **Open Project** et choisissez le dossier `hardware`.
   - Le fichier `platformio.ini` dans `hardware` contient les configurations pour ESP32 et Raspberry Pi :
     ```ini
     [env:esp32dev]
     platform = espressif32
     board = esp32dev
     framework = arduino
     lib_deps =
         https://github.com/miguelbalboa/rfid.git  # Pour RFID
         ESP32 BLE Arduino
     monitor_speed = 115200

     [env:rpi]
     platform = raspberrypi
     board = pico
     framework = arduino
     ```

3. **Configurer le matériel** :
   - Connectez l’ESP32, le module RFID (ex. : MFRC522), la caméra (ESP32-CAM) et l’écran LCD au port USB.
   - Pour Raspberry Pi, connectez les modules nécessaires (ex. : caméra, capteurs).

4. **Compiler et téléverser le code** :
   - Dans PlatformIO, sélectionnez l’environnement (`esp32dev` pour ESP32 ou `rpi` pour Raspberry Pi).
   - Cliquez sur **Build** pour compiler le code.
   - Cliquez sur **Upload** pour téléverser le code sur le matériel.
   - Exemple de structure du dossier `hardware` :
     ```
     hardware/
     ├── src/
     │   ├── esp32_nfc.ino  # Code pour NFC et Bluetooth
     │   ├── esp32_cam.ino  # Code pour caméra
     │   ├── lcd_display.ino  # Code pour LCD
     │   ├── rpi_main.ino   # Code pour Raspberry Pi
     └── platformio.ini
     ```

5. **Tester le matériel** :
   - Utilisez le moniteur série de PlatformIO (`pio device monitor`) pour vérifier les logs de l’ESP32 ou du Raspberry Pi.
   - Assurez-vous que les modules communiquent avec le backend via l’API REST.

## Utilisation
1. **Administrateurs** :
   - Accédez à `http://localhost:3000/admin` pour gérer les utilisateurs, classes, et plannings.
   - Générez des rapports via l’interface (PDF/Excel).
2. **Enseignants** :
   - Utilisez l’application mobile ou le tableau de bord web pour pointer votre présence (NFC).
   - Consultez les statistiques d’assiduité par classe.
3. **Étudiants** :
   - Utilisez l’application mobile pour consulter votre planning et historique de présence.
   - Validez votre présence via NFC (classes petites) ou Bluetooth (amphithéâtres).
4. **Parents** :
   - Connectez-vous au portail web pour recevoir des notifications en temps réel sur la présence de vos enfants.

Pour plus de détails, consultez la [documentation](docs/user-guide.md).

## Architecture du projet
```
sigap/
├── backend/              # Java Spring Boot, Maven
│   ├── src/main/java/    # Code source
│   └── pom.xml           # Dépendances Maven
├── frontend/             # Next.js
│   ├── pages/            # Pages Next.js
│   ├── components/       # Composants React
│   └── public/           # Fichiers statiques
├── recognition/          # Scripts Python pour reconnaissance faciale
│   ├── main.py           # Script principal
│   └── config.py         # Configuration
├── hardware/             # Code pour ESP32, RFID, Raspberry Pi, LCD
│   ├── src/              # Code Arduino
│   └── platformio.ini    # Configuration PlatformIO
├── docs/                 # Documentation
├── tests/                # Tests unitaires
└── README.md             # Ce fichier
```

- **Backend** : Java 21, Spring Boot, MySQL, Elasticsearch (via Docker).
- **Frontend** : Next.js, hébergé sur Vercel (optionnel).
- **Reconnaissance faciale** : Python avec YOLOv8, DeepFace, OpenCV.
- **Matériel** : ESP32 pour NFC/Bluetooth, caméras IP, LCD, Raspberry Pi.

## Contribuer
1. **Forkez le dépôt** :
   ```bash
   git checkout -b feature/votre-fonctionnalité
   ```
2. **Écrivez des tests** pour vos modifications.
3. **Soumettez une pull request** avec une description claire.

Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour plus de détails.

## Tests
- **Backend** :
  ```bash
  cd backend
  mvn test
  ```
- **Frontend** :
  ```bash
  cd frontend
  npm test
  ```
- **Reconnaissance faciale** :
  ```bash
  cd recognition
  pytest tests/
  ```

## Licence
Ce projet est sous licence [MIT](LICENSE). Voir le fichier LICENSE pour plus de détails.

## Contact
- **Email** : support@sigap.org
- **GitHub Issues** : [Ouvrir un ticket](https://github.com/votre-utilisateur/sigap/issues)
- **Documentation** : [docs/](docs/)

---

**SIGAP** - Automatisez et sécurisez la gestion des présences dès aujourd'hui !
