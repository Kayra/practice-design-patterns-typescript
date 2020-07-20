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
        visit(visitor) {
            Object.values(this.db).forEach(visitor);
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
pokemonDBFactoryInstance.set({
    id: 'Ivysaur',
    attack: 70,
    defence: 25
});
pokemonDBFactoryInstance.visit(item => console.log(item.id));
