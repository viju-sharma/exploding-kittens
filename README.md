# Exploding Kitten - MERN TypeScript Project

Hi, I am Vijender,
Welcome to my project, "Exploding Kitten" - a web game developed using the MERN stack and TypeScript. This game allows users to create a unique username after signing up or logging in and then play exciting games.

One of the unique features of this game is that players earn points with each win, and these points are reflected on the leaderboard, which tracks each user's rank and score. The use of TypeScript in both the front-end and back-end development ensures that the code is scalable and easy to maintain.

Overall, this project aims to provide a fun and engaging gaming experience for users and showcase the use of cutting-edge technologies in web development.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- MongoDB
- Express
- React
- Node.js
- TypeScript
- Redis

## Getting Started

To get started with this project, you will need to have Node.js, Redis and MongoDB installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/your-username/mern-typescript.git
```

2. Install the Dependency of server:

```bash
cd server-exploding-kittens
npm install
```

3. Create Env File in Server's Root Directory:

```bash
touch .env
nano .env
```

4. Put Env File Content as:

```bash
NODE_ENV = development
MONGO_URL = mongodb://..........................
PORT = 4444
JWT_SECRET = I am vijender full stack dev
REDIS_URL = redis://127.0.0.1:6379
```

5. Run Server:

```bash
npm run dev
```

6. Install the Dependency of client:

```bash
cd ../client-exploding-kittens
npm install
```

7. Run Client:

```bash
npm run dev
```

## Folder Structure

```
├── client-exploding-kittens
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── bomb.svg
│   │   ├── cat.svg
│   │   ├── defuse.svg
│   │   ├── kitten.png
│   │   ├── lost.jpg
│   │   ├── suffle.svg
│   │   └── winner.png
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── components
│   │   │   ├── Loading.tsx
│   │   │   ├── Navbar.module.css
│   │   │   ├── Navbar.tsx
│   │   │   ├── SleepingCat.module.css
│   │   │   ├── SleepingCat.tsx
│   │   │   ├── Table.module.css
│   │   │   ├── Table.tsx
│   │   │   ├── YouLostCard.tsx
│   │   │   ├── YouWonCard.module.css
│   │   │   └── YouWonCard.tsx
│   │   ├── features
│   │   │   ├── auth.slice.ts
│   │   │   ├── game.slice.ts
│   │   │   ├── hooks.ts
│   │   │   └── index.ts
│   │   ├── index.css
│   │   ├── interfaces
│   │   │   ├── ActiveTab.interface.ts
│   │   │   ├── Card.interface.ts
│   │   │   ├── LeaderBoard.interface.ts
│   │   │   └── LoginSuccess.interface.ts
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── Game
│   │   │   │   ├── Cards
│   │   │   │   │   ├── Cards.module.css
│   │   │   │   │   ├── Cards.tsx
│   │   │   │   │   └── components
│   │   │   │   │       └── Card.tsx
│   │   │   │   ├── ExposedCards
│   │   │   │   │   ├── ExposedCards.module.css
│   │   │   │   │   └── ExposedCards.tsx
│   │   │   │   └── Game.tsx
│   │   │   ├── Home
│   │   │   │   └── Home.tsx
│   │   │   ├── LeaderBoard
│   │   │   │   └── LeaderBoard.tsx
│   │   │   ├── Login
│   │   │   │   ├── components
│   │   │   │   ├── Login.module.css
│   │   │   │   └── Login.tsx
│   │   │   └── Signup
│   │   │       └── Signup.tsx
│   │   ├── utils
│   │   │   └── requestMethods.ts
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── README.md
└── server-exploding-kittens
    ├── nodemon.json
    ├── package.json
    ├── package-lock.json
    ├── src
    │   ├── controllers
    │   │   ├── Game.controller.ts
    │   │   └── User.controller.ts
    │   ├── index.ts
    │   ├── middlewares
    │   │   ├── authenticated.middleware.ts
    │   │   ├── error.middleware.ts
    │   │   └── validation.middleware.ts
    │   ├── models
    │   │   └── User.model.ts
    │   ├── routes
    │   │   ├── game.routes.ts
    │   │   └── user.routes.ts
    │   └── utils
    │       ├── exceptions
    │       │   └── http.exception.ts
    │       ├── interfaces
    │       │   ├── database.interface.ts
    │       │   └── token.interface.ts
    │       ├── token.ts
    │       └── validateEnv.ts
    └── tsconfig.json
```

## Contributing

If you find any issues or bugs, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
