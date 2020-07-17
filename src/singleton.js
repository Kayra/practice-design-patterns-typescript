"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    // singleton
    const db = new InMemoryDatabase();
    return db;
}
const pokemonDBSinglestonInstance = createDatabase();
pokemonDBSinglestonInstance.set({
    id: 'Bulbasaur',
    attack: 50,
    defence: 10
});
console.log(pokemonDBSinglestonInstance.get('Bulbasaur'));
