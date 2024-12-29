# Découvrez Clock, l'horloge pour Discord
Clock est un bot pour discord qui envoie l'heur à chaque minute dans le serveur et le salon de votre choix.
Version 2.0 du 29/12/2024

### Pré-requis
Un Bot Discord --> Vous pouvez le créer directement sur https://discord.com/developers/applications
Un serveur Discord avec un channel "Horloge"

### Configuration
1. Ajoutez une image de profile à votre bot, ainsi qu'une description dans les **General Information**
2. Dans **Installation**, cochez _'Guild Install'_ puis en décendant, _'Discord Provided Link'_,
3. Dans Défault stings, sous scopes choisissez 'bot' et en dessous, Administrator
4. Copiez le lien qui ressemble à ça : https://discord.com/oauth2/authorize?client_id=1234567891011121314
5. Collez le lien dans le navigateur et invitez le bot sur votre serveur.
6. Dans bot, réinitialisez le TOKEN et copiez le.
7. ajouter un fichier .env et complétez le comme suit :
TOKEN=**Ajouter le Token du Bot**
CLIENT_ID=**Ajouter votre client ID**
GUILD_ID=**Ajouter l'identifiant de votre serveur**
CHANNEL_ID=**Ajouter l'identifiant de votre Channel**

### Démarez le bot
node clock.js
