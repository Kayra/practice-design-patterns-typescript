"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Factory pattern
function createDatabase() {
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
    return InMemoryDatabase;
}
const PokemonDB = createDatabase();
const pokemonDBFactoryInstance = new PokemonDB();
pokemonDBFactoryInstance.set({
    id: 'Bulbasaur',
    attack: 50,
    defence: 10
});
console.log(pokemonDBFactoryInstance.get('Bulbasaur'));
