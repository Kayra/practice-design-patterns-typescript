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
  }

  // singleton
  const db = new InMemoryDatabase();
  return db;

}

const pokemonDBSinglestonInstance = createDatabase<Pokemon>();
pokemonDBSinglestonInstance.set({
  id: 'Bulbasaur',
  attack: 50,
  defence: 10
})

console.log(pokemonDBSinglestonInstance.get('Bulbasaur'));
