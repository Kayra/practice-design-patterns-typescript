"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createObserver() {
    let listeners = [];
    return {
        subscribe: (listener) => {
            listeners.push(listener);
            return () => {
                listeners = listeners.filter(l => l !== listener);
            };
        }, publish: (event) => {
            listeners.forEach((listener) => listener(event));
        }
    };
}
function createDatabase() {
    class InMemoryDatabase {
        constructor() {
            this.db = {};
            this.beforeAddListeners = createObserver();
            this.afterAddListeners = createObserver();
        }
        set(newValue) {
            this.beforeAddListeners.publish({
                newValue,
                value: this.db[newValue.id]
            });
            this.db[newValue.id] = newValue;
            this.afterAddListeners.publish({
                value: newValue
            });
        }
        get(id) {
            return this.db[id];
        }
        onBeforeAdd(listener) {
            return this.beforeAddListeners.subscribe(listener);
        }
        onAfterAdd(listener) {
            return this.afterAddListeners.subscribe(listener);
        }
    }
    return InMemoryDatabase;
}
const PokemonDB = createDatabase();
const pokemonDBFactoryInstance = new PokemonDB();
const unnsubscribe = pokemonDBFactoryInstance.onAfterAdd(({ value }) => {
    console.log(value);
});
pokemonDBFactoryInstance.set({
    id: 'Bulbasaur',
    attack: 50,
    defence: 10
});
unnsubscribe();
pokemonDBFactoryInstance.set({
    id: 'Ivysaur',
    attack: 70,
    defence: 25
});
