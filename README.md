# Simple LocalStorage
## A simple localstorage db.

### Creating a new localstorage db

To create a new localstorage db:

    let store = new SLS('myStore');

If you do not pass in a 'name' parameter, the store will be assigned a unique ID.

### Creating a new record in the store

To create a new record:

    store.createOne({name:"John Smith", age:40});

Pass a JSON object to the createOne method in the store. 
    
### To find all records in the store

    store.findAll();

The findAll method will return a list of all records in the store

### Finding a record by query

    store.findByQuery({name:"John Smith}, true);

The findByQuery takes 2 parameters. The first parameter is the query object, the second parameter is a boolean which toggles 'strict' search of the store.
 
When strict is true, all keys/values in the query object must match a record in the store in order for it to be returned. When strict is false, it will return all records which have at least 1 matching key/value in the query object. 

### Finding a record by ID 

    store.findById('prp12avqy2bksspccygejy29s8');

The findById method takes a record ID as a parameter, this ID is used to retrieve a record from the store.

### Deleted a record

    store.deleteById('prp12avqy2bksspccygejy29s8');

The deleteById method takes a record ID as a parameter, this ID is used to delete a record from the store.

### Updating an existing record

    store.updateOneById('prp12avqy2bksspccygejy29s8', {name:"John Robert Smith"});

The updateOneById method takes 2 parameters. The ID of the record to update and an object used to update the record. 