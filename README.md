# Découvrez Clock, l'horloge pour Discord
Clock est un bot pour discord qui envoie l'heur à chaque minute dans le serveur et le salon de votre choix.

### Pré-requis
Un Bot Discord --> Vous pouvez le créer directement sur https://discord.com/developers/applications
Un serveur Discord

### Configuration
1. Ajoutez une image de profile à votre bot, ainsi qu'une description dans les **General Information**
2. Dans **Installation**, cochez _'Guild Install'_ puis en décendant, _'Discord Provided Link'_,
3. Dans Défault stings, sous scopes choisissez 'bot' et en dessous, Administrator
4. Copiez le lien qui ressemble à ça : https://discord.com/oauth2/authorize?client_id=1234567891011121314
5. Collez le lien dans le navigateur et invitez le bot sur votre serveur.

6. Dans bot, réinitialisez le TOKEN et copiez le. Colllez le dans le code du bot

Extrait du code
const TOKEN = 'MTI0OTc1MzU******TAyNzcwNQ.GZylOH.******_TVk7TCOEJsuxOSVpynIcpnece******';

Copiez collez aussi votre ID de salon et de guilde ou vous souhaitez envoyer le message.

### Démarez le bot
node clock.js
