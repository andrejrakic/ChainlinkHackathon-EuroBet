# External Adapter for Odds

Since odds for winning EURO changes during team, one can not write it on chain via mapping. Therefore, one need Chainlink external adapter.

## Start

_Make sure to install necessary dependencies_

```
npm start
```

## Example Query

```
curl -X POST -H "content-type:application/json" "http://localhost:8080/" --data '{ "id": 0, "data": { "id": "France" } }'
```
