const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const targetURL = 'https://scrapeme.live/shop/';

const scraper = () => {
    const getPokemons = ($) => {
        const pokemons = $('.products li'); // Get all list items from the unodered list with a classname of `products`
        const pokemonData = [];
        //  The `each()` method loops over all pokemon list items
        pokemons.each((index, el) => {
        // Get the image, name, and price of each pokemon and create an object
            const pokemon = {}
            pokemon.img = $(el).find('a > img').attr('src'); // Selector to get the image `src` value of a pokemon
            pokemon.name = $(el).find('h2').text(); // Selector to get the name of a pokemon
            pokemon.price = $(el).find('.amount').text(); // Selector to get the price of a pokemon
            pokemonData.push(pokemon)
        })
        // Create a `pokemon.json` file in the root directory with the scrapped pokemonData
        fs.writeFile("pokemon.json", JSON.stringify(pokemonData, null, 2), (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Data written to file successfully!");
          });
    }
    // axios function to fetch HTML Markup from target URL
    axios.get(targetURL).then((response) => { 
        const body = response.data; 
        const $ = cheerio.load(body); // Load HTML data and initialize cheerio
        getPokemons($)
    });
}

scraper();




