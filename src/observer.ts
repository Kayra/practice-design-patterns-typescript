export { };

type Listener<EventType> = (ev: EventType) => void;
function createObserver<EventType>(): {
  subscribe: (listener: Listener<EventType>) => () => void;
  publish: (event: EventType) => void;
} {
  let listeners: Listener<EventType>[] = [];

  return {
    subscribe: (listener: Listener<EventType>): () => void => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener)
      }
    }, publish: (event: EventType) => {
      listeners.forEach((listener) => listener(event))
    }
  }
}

interface BeforeSetEvent<T> {
  value: T;
  newValue: T;
}

interface AfterSetEvent<T> {
  value: T;
}

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

  onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
  onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;
}

function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {

    private db: Record<string, T> = {};

    private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
    private afterAddListeners = createObserver<AfterSetEvent<T>>();

    public set(newValue: T): void {

      this.beforeAddListeners.publish({
        newValue,
        value: this.db[newValue.id]
      });

      this.db[newValue.id] = newValue;

      this.afterAddListeners.publish({
        value: newValue
      });

    }

    public get(id: string): T {
      return this.db[id];
    }

    onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
      return this.beforeAddListeners.subscribe(listener);
    }

    onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
      return this.afterAddListeners.subscribe(listener);
    }

  }
  return InMemoryDatabase;
}

const PokemonDB = createDatabase<Pokemon>();
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
