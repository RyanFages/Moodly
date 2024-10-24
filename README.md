# Moodly

Moodly est une application conçue pour suivre et analyser les émotions d'une équipe de manière anonyme, favorisant ainsi le bien-être et la cohésion au sein du groupe.

L'outil permet à chaque membre de l'équipe d'ajouter ou de modifier son humeur quotidienne de façon simple et confidentielle. Les managers, quant à eux, ont accès à une vue d'ensemble des tendances émotionnelles de leur équipe sur les 30 derniers jours, ce qui leur permet d’identifier rapidement les besoins de soutien ou les ajustements à apporter pour améliorer le moral général.

Ce projet vise à encourager un environnement de travail plus sain et productif en offrant des insights précieux basés sur l'humeur collective tout en respectant la confidentialité individuelle.


## Demo

Voici une vidéo de démo de notre application

INSÉRER LIEN VIDÉO


## Technologie utilisé

**Client:** React native 

**Server:** Strapi v5


## Deploiment

Pour lancer le projet, allez dans le terminal du dossier MoodlyApp et lancez les commandes suivant :
```bash
  npm i
```
pour installer toutes les dépendances requises puis :
```bash
  npm start
```
pour lancer l'application.


## Utilisation

Après avoir lancé l'application, l'utilisateur est dirigé vers une page de connexion ou d'inscription.

Une fois connecté, il accède à la page de sélection de son émotion. Il peut alors tourner la roue pour choisir l'émotion qui correspond à son ressenti du jour. Après avoir validé son choix en cliquant sur le bouton "Valider", il sera redirigé vers une page affichant son émotion sélectionnée. Les données seront ensuite envoyées au tableau de bord du manager. L'utilisateur peut modifier son émotion à tout moment durant la journée en cliquant sur le bouton "Modifier".

Si l'utilisateur est un manager, il accède directement à un tableau de bord affichant les émotions enregistrées par son équipe au cours des 30 derniers jours, ainsi qu'une section dédiée à la gestion de son équipe lui permettant d'ajouter ou de retirer des membres dans son équipe.


## Auteurs

- FAGES Kevin
- FAGES Ryan
- GUILLE Matéo
- RIBEIRO Elisa
- SEYDI Coumba
