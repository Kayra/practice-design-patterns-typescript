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
        selectBest(scoreStrategy) {
            const found = {
                max: 0,
                item: undefined
            };
            Object.values(this.db).reduce((currentFound, item) => {
                const score = scoreStrategy(item);
                if (score > currentFound.max) {
                    currentFound.max = score;
                    currentFound.item = item;
                }
                return currentFound;
            }, found);
            return found.item;
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
pokemonDBFactoryInstance.set({
    id: 'Blastoise',
    attack: 60,
    defence: 40
});
const bestDefensive = pokemonDBFactoryInstance.selectBest(({ defence }) => defence);
const bestOffensive = pokemonDBFactoryInstance.selectBest(({ attack }) => attack);
console.log(`Best defence pokemon is ${bestDefensive === null || bestDefensive === void 0 ? void 0 : bestDefensive.id}`);
console.log(`Best offense pokemon is ${bestOffensive === null || bestOffensive === void 0 ? void 0 : bestOffensive.id}`);
