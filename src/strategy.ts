export { };


interface Pokemon {
  id: string;
  attack: number;
  defence: number;
}

interface BaseRecord {
  id: string;
}

interface Database<T extends BaseRecord> {
  set(newValue: T): void
  get(id: string): T | undefined
}

function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {

    private db: Record<string, T> = {};

    public set(newValue: T): void {
      this.db[newValue.id] = newValue;
    }

    public get(id: string): T {
      return this.db[id];
    }

    selectBest(scoreStrategy: (item: T) => number): T | undefined {

      const found: {
        max: number;
        item: T | undefined;
      } = {
        max: 0,
        item: undefined
      }

      Object.values(this.db).reduce((currentFound, item) => {
        const score = scoreStrategy(item);
        if (score > currentFound.max) {
          currentFound.max = score;
          currentFound.item = item;
        }
        return currentFound;
      }, found)

      return found.item;
    }

  }
  return InMemoryDatabase;
}

const PokemonDB = createDatabase<Pokemon>();
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

console.log(`Best defence pokemon is ${bestDefensive?.id}`);
console.log(`Best offense pokemon is ${bestOffensive?.id}`);
