"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SLS = function () {
    function SLS(name) {
        _classCallCheck(this, SLS);

        this.name = name || this._generateID();
        this.store = {};
        this._save();
    }

    /**
     * Returns an ID which is used for new records or undefined localstorage store name
     * @returns {String}
     * @private
     */


    _createClass(SLS, [{
        key: "_generateID",
        value: function _generateID() {
            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        }

        /**
         * Sets localstorage to the internal store object
         * @private
         */

    }, {
        key: "_save",
        value: function _save() {
            localStorage.setItem(this.name, JSON.stringify(this.store));
        }

        /**
         * Creates a new record and saves it to localstorage
         * @param {Object} obj - The object to create
         * @returns {*}
         */

    }, {
        key: "createOne",
        value: function createOne(obj) {
            var id = this._generateID();
            obj.id = id;

            this.store = JSON.parse(localStorage.getItem(this.name));
            this.store[id] = obj;
            return this._save();
        }

        /**
         * Returns all records in localstorage
         * @returns {Object}
         */

    }, {
        key: "findAll",
        value: function findAll() {
            return JSON.parse(localStorage.getItem(this.name));
        }

        /**
         * Returns all records which match the query parameter
         * @param {Object} query - The keys and values to match
         * @param {Boolean} strict - If 'true' the entire query object will need to match the record
         * @returns {Array}
         */

    }, {
        key: "findByQuery",
        value: function findByQuery(query) {
            var _this = this;

            var strict = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            this.store = JSON.parse(localStorage.getItem(this.name));

            var queryParams = [];
            var results = [];

            for (var queryKey in query) {
                if (query.hasOwnProperty(queryKey)) {
                    queryParams.push({
                        key: queryKey,
                        property: query[queryKey]
                    });
                }
            }

            for (var recordKey in this.store) {
                if (this.store.hasOwnProperty(recordKey)) {
                    (function () {
                        var record = _this.store[recordKey];
                        var match = false;

                        queryParams.forEach(function (query) {
                            if (query.property === record[query.key]) match = true;else if (strict) match = false;
                        });

                        if (match) results.push(record);
                    })();
                }
            }

            return results;
        }

        /**
         * Returns a single record matched by ID
         * @param {String} id - The ID to used to find the record
         * @returns {*}
         */

    }, {
        key: "findById",
        value: function findById(id) {
            this.store = JSON.parse(localStorage.getItem(this.name));
            return this.store[id];
        }

        /**
         * Deletes a single record matched by ID
         * @param {String} id - The ID used to find the record to delete
         * @returns {*}
         */

    }, {
        key: "deleteById",
        value: function deleteById(id) {
            this.store = JSON.parse(localStorage.getItem(this.name));
            delete this.store[id];
            return this._save();
        }

        /**
         * Updates a single record matched by ID
         * @param {String} id - The ID used to find the record to update
         * @param {Object} update - The object used to update to record
         * @returns {*}
         */

    }, {
        key: "updateOneById",
        value: function updateOneById(id, update) {
            delete update.id;
            this.store[id] = Object.assign(this.findById(id), update);
            return this._save();
        }
    }]);

    return SLS;
}();
//# sourceMappingURL=app.js.map
