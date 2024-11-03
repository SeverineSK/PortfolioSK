# Mon Projet Portfolio Full Stack

Ce projet est une application web développée en utilisant un stack technologique moderne : React pour le frontend, Tailwind CSS pour le style, Node.js et Express pour le backend, et MySQL pour la base de données.

## Table des Matières
- [Installation](#installation)
- [Fonctionnalités](#fonctionnalités)
- [Scripts Disponibles](#scripts-disponibles)
- [Configuration](#configuration)
- [Technologies Utilisées](#technologies-utilisées)

## Installation

1. Clonez ce dépôt sur votre machine :
   ```bash
   git clone https://github.com/votre-utilisateur/nom-du-repo.git
   cd nom-du-repo
   ```

2. Installez les dépendances pour le backend :
   ```bash
   cd server
   npm install
   ```

3. Installez les dépendances pour le frontend :
   ```bash
   cd ../src
   npm install
   ```

4. Configurez votre base de données MySQL et mettez à jour le fichier `.env` avec vos identifiants et paramètres.

## Fonctionnalités

- **CRUD Complet** : Créez, lisez, mettez à jour et supprimez des données.
- **Interface Moderne** : Utilise Tailwind CSS pour un design responsive et agréable.
- **Séparation du Frontend et Backend** : Architecturé pour un développement modulaire.

## Scripts Disponibles

Dans le répertoire `frontend`, vous pouvez exécuter :

### `npm start`
Démarre l'application en mode développement. Ouvrez [http://localhost:3000](http://localhost:3000) pour voir l'application dans le navigateur.

### `npm run build`
Construit l'application pour la production dans le dossier `build`.

Dans le répertoire `backend`, vous pouvez exécuter :

### `npm start`
Démarre le serveur backend avec Node.js.

### `npm run dev`
Démarre le serveur en mode développement avec Nodemon pour un rechargement automatique.

## Configuration

Assurez-vous que le fichier `.env` dans le répertoire `backend` contient les variables suivantes :
- `DB_HOST`: hôte de la base de données (ex: localhost)
- `DB_USER`: utilisateur de la base de données
- `DB_PASSWORD`: mot de passe de la base de données
- `DB_NAME`: nom de la base de données

## Technologies Utilisées

- **React** : Bibliothèque JavaScript pour construire des interfaces utilisateur.
- **Tailwind CSS** : Framework CSS utilitaire pour un design rapide et responsive.
- **Node.js** : Environnement d'exécution pour le backend.
- **Express** : Framework pour Node.js pour créer des API robustes.
- **MySQL** : Système de gestion de base de données relationnelle.

