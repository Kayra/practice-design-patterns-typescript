# practice-design-patterns-typescript

This is a collection of Typescript scripts written while roughly following [Jack Herrington's Five Essential Design Patterns in Typescript](https://www.youtube.com/watch?v=JBu2ZTPgiKI).

Technologies used:

- node: v18.4.0
- npx: 8.15.0

---

## Set up and Use

In the root directory, install the required packages:

```bash
npm i
```

Compile any Typescript changes:

```
npx tsc
```

Run a compiled script:

```bash
node src/inMemoryDatabase.js
```

## Patterns

The available patterns to see and run are:

* Factory
* Observer
* Singleton
* Strategy
* Visitor

The `inMemoryDatabase.ts` script is the vanilla implementation for reference.

A convinience command to run a script in one line:

```
npx tsc && node src/singleton.js
```



