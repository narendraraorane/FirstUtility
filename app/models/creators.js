exports.definition = {
    config : {
        columns : {
            "id" : "INTEGER PRIMARY KEY AUTOINCREMENT",
            "firstName" : "TEXT",
            "middleName" : "TEXT",
            "lastName" : "TEXT",
            "suffix" : "TEXT",
            "fullName" : "TEXT",
            "modified": "DATE",
            "thumbnail" : "TEXT",
            "resourceURI" : "TEXT",
            "comics" : "INTEGER",
            "series" : "INTEGER",
            "stories" : "INTEGER",
            "events" : "INTEGER",
            "about" : "Text"
        },
        adapter : {
            type : "sql",
            collection_name : "g_creators",
            idAttribute : "id",
            db_name : "firstutility",
        }
    },
    extendModel : function(Model) {
        _.extend(Model.prototype, {
            // extended functions and properties go here
            validate : function(attrs) {
                for (var key in attrs) {
                    var value = attrs[key];
                    if (key === "firstName" || key === "fullName") {
                        if (value.trim() === "") {
                            return true;
                        }
                    }
                }
            }
        });

        return Model;
    },
    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {
            // extended functions and properties go here

            // For Backbone v1.1.2, uncomment the following to override the
            // fetch method to account for a breaking change in Backbone.
            /*
             fetch: function(options) {
             options = options ? _.clone(options) : {};
             options.reset = true;
             return Backbone.Collection.prototype.fetch.call(this, options);
             }
             */
        });

        return Collection;
    }
}; 