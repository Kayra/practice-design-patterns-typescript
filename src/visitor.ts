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
  visit(visitor: (item: T) => void): void;
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

    visit(visitor: (item: T) => void): void {
      Object.values(this.db).forEach(visitor);
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

pokemonDBFactoryInstance.visit(item => console.log(item.id));
