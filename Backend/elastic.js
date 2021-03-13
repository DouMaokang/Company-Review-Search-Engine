let elasticsearch = require("elasticsearch");

module.exports = new elasticsearch.Client(
        {
            hosts: ["http://localhost:9200"]
        }
    );