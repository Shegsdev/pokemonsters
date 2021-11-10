# pokeMonsters

pokeMonsters is an application that helps you learn about all the species of pocket monsters that exist.
According to [Wiki](https://en.wikipedia.org/wiki/Pok%C3%A9mon), there are over 1000 species.
To learn more click [here](https://en.wikipedia.org/wiki/Pok%C3%A9mon)

For development, I relied on an external API resource for data.

**Approach**
Firstly, I took some time to study the API documentation and know:
* How the data is structured
* What are the available endpoints and which ones will be needed
* What are the required query parameters in order to make a successful API call

After having some understanding of the endpoints, I began implementing them in code.
For our application, all we need includes:
1. GET / (An endpoint to get all Pokemons)
2. GET /pokemons/{name} (An endpoint to get a specific Pokemon)

Starting with the backend, I wrote two [utility functions](https://github.com/Shegsdev/pokemonsters/blob/develop/pages/api/pokemon.ts) to perform the tasks.
Both function calls are asynchronous, so we need to make sure the response payload resolves successfully.

*Consuming the API*
On the client-side, there is an index page where all pokemon characters are displayed and a sub-page that shows and individual character.
To fetch all characters, we make a request to `getPokemons` method. This returns an array of objects containing the data we need.

Displaying the results all at once will make the first page load slow, so there's a pagination functionality to help render just enough data.

**Future updates**
Here are some of the functionalities I wish to add as well as improve on:
* Root page search bar (Search for Pokemons by name, ability, specie, etc)
* Improve page load (Fetching a large amount of data loads quite slow at first)
* Add more pages to view more data
* Improve User Interface


**Features**
* View all Pokemons
* View a single Pokemon
* Pagination
* Responsiveness


**View the application**
You can test it locally by cloning this repo
Move into the project directory and install dependencies:
```yarn install``` or ```npm install```

Boot up the server:
```yarn start``` or ```npm start```