"use strict";
class InMemoryDatabase {
    constructor() {
        this.db = {};
    }
    set(newValue) {
        this.db[newValue.id] = newValue;
    }
    get(id) {
        return this.db[id];
    }
}
const pokemonDB = new InMemoryDatabase();
pokemonDB.set({
    id: 'Bulbasaur',
    attack: 50,
    defence: 10
});
console.log(pokemonDB.get('Bulbasaur'));
