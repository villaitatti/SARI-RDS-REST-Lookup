# SARI-RDS-REST-Lookup
ResearchSpace app to provide lookups against the SARI RDS lookup endpoint


## Lookup Endpoints

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


## Sample query:
`curl --location --request POST 'https://rds-mph.swissartresearch.net/rest/reconciliation/default-lookup' \
--header 'content-type: application/json' \
--header 'accept: application/json' \
--data-raw '{"q0":{"query":"Paris", "type": "http://schema.swissartresearch.net/ontology/rds#Person", "limit":20,"preferredLanguage":"en"}}'`
