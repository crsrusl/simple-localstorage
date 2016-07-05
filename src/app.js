class SLS {
    constructor(name) {
        this.name = name || this._generateID();
        this.store = {};
        this._save();
    }

    /**
     * Returns an ID which is used for new records or undefined localstorage store name
     * @returns {String}
     * @private
     */
    _generateID() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    /**
     * Sets localstorage to the internal store object
     * @private
     */
    _save() {
        localStorage.setItem(this.name, JSON.stringify(this.store));
    }

    /**
     * Creates a new record and saves it to localstorage
     * @param {Object} obj - The object to create
     * @returns {*}
     */
    createOne(obj) {
        const id = this._generateID();
        obj.id = id;

        this.store = JSON.parse(localStorage.getItem(this.name));
        this.store[id] = obj;
        return this._save();
    }

    /**
     * Returns all records in localstorage
     * @returns {Array}
     */
    findAll() {
        let results = [];

        this.store = JSON.parse(localStorage.getItem(this.name));

        for (let recordKey in this.store) {
            if (this.store.hasOwnProperty(recordKey)) {
                results.push(this.store[recordKey])
            }
        }

        return results;
    }

    /**
     * Returns all records which match the query parameter
     * @param {Object} query - The keys and values to match
     * @param {Boolean} strict - If 'true' the entire query object will need to match the record
     * @returns {Array}
     */
    findByQuery(query, strict = false) {
        this.store = JSON.parse(localStorage.getItem(this.name));

        let queryParams = [];
        let results = [];

        for (let queryKey in query) {
            if (query.hasOwnProperty(queryKey)) {
                queryParams.push({
                    key: queryKey,
                    property: query[queryKey]
                });
            }
        }

        for (let recordKey in this.store) {
            if (this.store.hasOwnProperty(recordKey)) {
                let record = this.store[recordKey];
                let match = false;

                queryParams.forEach((query)=> {
                    if (query.property === record[query.key]) match = true;
                    else if (strict) match = false;
                });

                if (match) results.push(record);
            }
        }

        return results;
    }

    /**
     * Returns a single record matched by ID
     * @param {String} id - The ID to used to find the record
     * @returns {*}
     */
    findById(id) {
        this.store = JSON.parse(localStorage.getItem(this.name));
        return this.store[id];
    }

    /**
     * Deletes a single record matched by ID
     * @param {String} id - The ID used to find the record to delete
     * @returns {*}
     */
    deleteOneById(id) {
        this.store = JSON.parse(localStorage.getItem(this.name));
        delete this.store[id];
        return this._save();
    }

    /**
     * Deletes records matched by query
     * @param {Object} query - The query used to find the records to delete
     * @param {Boolean} strict - If 'true' the entire query object will need to match the record
     * @returns {*}
     */
    deleteByQuery(query, strict = false) {
        const results = this.findByQuery(query, strict).map((result) => {
            return result.id;
        });

        for (let idKey in results) {
            if (results.hasOwnProperty(idKey)) {
                let id = results[idKey];
                delete this.store[id];
            }
        }
        return this._save();
    }

    /**
     * Updates a single record matched by ID
     * @param {String} id - The ID used to find the record to update
     * @param {Object} update - The object used to update to record
     * @returns {*}
     */
    updateOneById(id, update) {
        delete update.id;
        this.store[id] = Object.assign(this.findById(id), update);
        return this._save();
    }
}