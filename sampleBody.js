let sampleRequestBody = {
    "q0":{
       "query":"Paris",
       "type":"http://schema.swissartresearch.net/ontology/rds#Person",
       "limit":2
    }
}

let sampleResponse = {
    "q0":{
       "result":[
          {
             "id":"https://d-nb.info/gnd/1055264965",
             "name":"John Stevenson",
             "score":1.0,
             "match":true,
             "dataset":{
                "id":"https://d-nb.info/gnd/entityfacts/graph",
                "name":"entity-facts"
             },
             "description":"   \n",
             "type":[
                {
                   "id":"https://d-nb.info/standards/elementset/gnd#Person",
                   "name":"Person"
                }
             ]
          },
          {
             "id":"https://d-nb.info/gnd/1055470689",
             "name":"Albert Denison Conyngham",
             "score":1.0,
             "match":true,
             "dataset":{
                "id":"https://d-nb.info/gnd/entityfacts/graph",
                "name":"entity-facts"
             },
             "description":"   (1805 - 1860)\n",
             "type":[
                {
                   "id":"https://d-nb.info/standards/elementset/gnd#Person",
                   "name":"Person"
                }
             ]
          }
       ]
    }
 }