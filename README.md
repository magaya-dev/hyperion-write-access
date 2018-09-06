# Hyperion Write Access

## What is it?

Write access wrapper for operations in hyperion.

## How to use it?

Can be used as follows:

```js
let hyperionConnection; // ... get raw hyperion object
const WriteAccess = require('@magaya/hyperion-write-access');

const writer = new WriteAccess(hyperionConnection.async); // Needs methods in async

// Get interface object
let dbObject; // ... get object from hyperion
let objectToModify = await writer.edit(dbObject); 

// Begin editing objectToModify
let modifiedDbObject = await writer.save(objectToModify);
```