
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

// Factory pattern
function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase {

    private db: Record<string, T> = {};


    public set(newValue: T): void {
      this.db[newValue.id] = newValue;
    }

    public get(id: string): T {
      return this.db[id];
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
})

console.log(pokemonDBFactoryInstance.get('Bulbasaur'));
