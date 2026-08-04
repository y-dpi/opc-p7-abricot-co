## Gestion de projets Abricot

Ce projet est le frontend de l'application Abricot, construit avec Next.js, React, Tailwind CSS et TypeScript. Il permet de gérer des projets, leurs membres, leurs tâches (vue liste et vue kanban) et les commentaires associés.

L'API backend n'est **pas** incluse dans ce dépôt : le frontend consomme une API REST externe que vous devez fournir.

## Pour utiliser ce projet :

- Commencer par cloner le projet.
- Assurez-vous d'avoir [Node.js](https://nodejs.org/) (version 20.9 ou supérieure, requise par Next.js 16) et [pnpm](https://pnpm.io/) installés.

### Brancher l'API (backend)

L'API se configure en premier, car le frontend consomme ses données.

- Renommez le fichier `example.env.local` en `.env.local`.
- Renseignez la variable `API_URL` avec l'URL de base de votre API (par exemple `http://localhost:8000`, sans slash final).
- Assurez-vous que votre API est démarrée et accessible à cette adresse.

> `API_URL` est lue uniquement côté serveur : elle n'est jamais exposée au navigateur. L'authentification se fait par JWT, stocké dans un cookie de session `httpOnly` géré par le serveur Next.js.

### Lancer le frontend

- Ouvrez un terminal à la racine du projet.
- Exécutez `pnpm install` pour installer les dépendances.
- Exécutez `pnpm run dev` pour démarrer le serveur de développement.
- Votre site devrait alors être accessible à l'adresse `http://localhost:3000` dans n'importe quel navigateur.

Pour générer une version de production, utilisez `pnpm run build` (puis `pnpm run start` pour la servir). Le linter s'exécute avec `pnpm run lint`.

> En développement uniquement, la route `/components` donne accès à une galerie de tous les composants de l'interface. Elle renvoie une 404 en production.

## Dépendances externes :
  - [Node.js](https://nodejs.org/) (v20.9+)
  - [pnpm](https://pnpm.io/) (vous devriez également pouvoir utiliser `npm` ou `yarn`)
  - Une API REST compatible, à brancher via la variable `API_URL`
  - Côté frontend : [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [TypeScript](https://www.typescriptlang.org/)

## Problèmes courants :

Si les commandes `pnpm` échouent, vérifiez que Node.js et pnpm sont bien installés en exécutant `node --version` et `pnpm --version`.

Si le frontend n'affiche aucune donnée, ou si la connexion échoue systématiquement, vérifiez que le fichier `.env.local` existe bien (et non `example.env.local`), que `API_URL` pointe vers votre API et que celle-ci est bien démarrée et joignable. Aucun jeu de données mockées n'est fourni : une API fonctionnelle est nécessaire.

Si le port `3000` est déjà utilisé, lancez le serveur sur un autre port avec `pnpm run dev -- -p 3001`.

Ce projet a été développé avec Node.js. Bien que d'autres versions puissent fonctionner, le bon fonctionnement n'est pas garanti avec des versions plus anciennes.
