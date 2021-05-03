# SARI-RDS-REST-Lookup
ResearchSpace app to provide lookups against the SARI RDS lookup endpoint

The implementation follows the [W3C Reconciliation Service API](https://reconciliation-api.github.io/specs/latest/).

The API expects a JSON object that contains one or more queries as follows:
```JSON
{
  "q0": {
    "query": "Leonora Carrington"
  }
}
```

To perform more than one lookup (batch querying), include several `qX`, e.g.:


```JSON
{
  "q0": {
    "query": "Leonora Carrington"
  },
  "q1": {
    "query": "Max Ernst"
  },
  "q2": {
    "query": "Mexico City"
  }
}
```

The API returns a list of results for each `q`. Here is a sample response for the first query:
```JSON
{
    "q0": {
        "result": [
            {
                "id": "https://d-nb.info/gnd/118519271",
                "name": "Leonora Carrington",
                "score": 0.8838834764831843,
                "match": true,
                "dataset": {
                    "id": "https://d-nb.info/gnd/entityfacts/graph",
                    "name": "entity-facts"
                },
                "description": "Künstlerin Mexikan. surrealist. Malerin u. Schriftstellerin brit. Herkunft; lebte seit 1942 in Mexiko Frankreich (1917 - 25. Mai 2011)\n",
                "type": [
                    {
                        "id": "https://d-nb.info/standards/elementset/gnd#Person",
                        "name": "Person"
                    }
                ]
            },
            {
                "id": "https://resource.swissartresearch.net/person/35fd708b-d4b0-4506-94a3-3a3f7c93e175/appellation/5f050c96e6cd140dd363201e9462fc3c",
                "name": "Leonora Carrington",
                "score": 0.8838834764831843,
                "match": true,
                "dataset": {
                    "id": "http://example.org/myproject/records",
                    "name": "records"
                },
                "type": [
                    {
                        "id": "http://www.cidoc-crm.org/cidoc-crm/E41_Appellation",
                        "name": "E41_Appellation"
                    }
                ]
            },
            ...
}
```


### Parameters

The following additional parameters in the query object are currently supported:

- `limit` (integer): number of results to return
- `type` (URI string): type of entities to return (see list of types below) 

### Entity Types

The API supports querying against any RDF datatype that is present in the dataset. However, some abstract datatypes are implemented to query for certain types across datasets.

- `http://schema.swissartresearch.net/ontology/rds#BuiltWork`: Built works
- `http://schema.swissartresearch.net/ontology/rds#Event`: Events
- `http://schema.swissartresearch.net/ontology/rds#Group`: Groups
- `http://schema.swissartresearch.net/ontology/rds#Person`: Persons
- `http://schema.swissartresearch.net/ontology/rds#Place`: Places

For example, to query for Persons with the name Paris:

```JSON
{
  "q0": {
    "query": "Paris",
    "limit": 3,
    "type": "http://schema.swissartresearch.net/ontology/rds#Person"
  }
}
```
### Supported Datasets

The default lookup searches across all datasets. To limit a lookup to a specific dataset, a dedicated endpoint is used. All endpoints support the above queries.

All: 
https://rds-mph.swissartresearch.net/rest/reconciliation/default-lookup

ULAN: 
https://rds-mph.swissartresearch.net/rest/reconciliation/ulan-lookup

Wikidata: 
https://rds-mph.swissartresearch.net/rest/reconciliation/wikidata-lookup

AAT:
https://rds-mph.swissartresearch.net/rest/reconciliation/aat-lookup

GND:
https://rds-mph.swissartresearch.net/rest/reconciliation/entityfacts-lookup

Geonames:
https://rds-mph.swissartresearch.net/rest/reconciliation/geonames-lookup


## Sample query
```
curl --location --request POST 'https://rds-mph.swissartresearch.net/rest/reconciliation/default-lookup' \
--header 'content-type: application/json' \
--header 'accept: application/json' \
--data-raw '{"q0":{"query":"Paris", "type": "http://schema.swissartresearch.net/ontology/rds#Person", "limit":20,"preferredLanguage":"en"}}'
```

## Aggregated Lookup

Several datasets may contain entries about the same entities. A separate endpoint offers an aggregate lookup, which groups together URIs that refer to the same entities. The endpoint tries to determine, which URIs across dataset refer to the same entities (via e.g. owl:sameAs links in the datasets) and will return them as a group.

However, the W3C Reconciliation API does not support hierarchical data, but only allows endpoints to return a flat list. Groups are established through re-ordering of the results, causing "same" entities to appear under each other, and an additional `reference` property, which links the grouped entities to the 'main' one.

In the example below, the query for "Leonora Carrington" returns three results that all refer to the same entity. The first one is considered the 'main' entity and does not have a `reference` property, while the latter two refer to the same one. The `reference` property can be used to establish groups. The mere absence of a `reference` property denotes the beginning of a new group and can therefore be used to visually separate a group in contexts where hierarchical display is not possible. For example, a line could be drawn above entries without a `reference` via css in order to visually discriminate groups of entitites.



### Example

Query:
```bash
curl --location --request POST 'https://rds-qa.swissartresearch.net/rest/reconciliation/aggregated-federated-lookup' \
    --header 'content-type: application/json' \
    --header 'accept: application/json' \
    --data-raw '{"q0":{"query":"Leonora Carrington", "type": "http://schema.swissartresearch.net/ontology/rds#Person", "limit":20,"preferredLanguage":"en"}}'
```

Response:
```json
{
  "q0": {
    "result": [
      {
        "id": "http://vocab.getty.edu/ulan/500018196",
        "name": "Carrington, Leonora",
        "score": 0.8838834764831843,
        "match": true,
        "dataset": {
          "id": "http://vocab.getty.edu/ulan/graph",
          "name": "ulan"
        },
        "type": [
          {
            "id": "http://vocab.getty.edu/ontology#PersonConcept",
            "name": "PersonConcept"
          }
        ]
      },
      {
        "id": "http://www.wikidata.org/entity/Q233207",
        "name": "Leonora Carrington",
        "score": 0.91,
        "match": true,
        "dataset": {
          "id": "http://www.wikidata.org",
          "name": "wikidata"
        },
        "description": "Mexican artist, surrealist painter and novelist (1917-2011)",
        "reference": "http://vocab.getty.edu/ulan/500018196",
        "type": [
          {
            "id": "http://www.wikidata.org/entity/Q5",
            "name": "human"
          }
        ]
      },
      {
        "id": "https://d-nb.info/gnd/118519271",
        "name": "Leonora Carrington",
        "score": 0.8838834764831843,
        "match": true,
        "dataset": {
          "id": "https://d-nb.info/gnd/entityfacts/graph",
          "name": "entity-facts"
        },
        "description": "Künstlerin Mexikan. surrealist. Malerin u. Schriftstellerin brit. Herkunft; lebte seit 1942 in Mexiko Frankreich (1917 - 25. Mai 2011)\n",
        "reference": "http://vocab.getty.edu/ulan/500018196",
        "type": [
          {
            "id": "https://d-nb.info/standards/elementset/gnd#Person",
            "name": "Person"
          }
        ]
      }
    ]
  }
}
```

