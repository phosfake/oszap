aws dynamodb query \
    --endpoint=http://localhost:8000 \
    --table-name zaps \
    --index-name "GSI1" \
    --expression-attribute-names '{"#pk":"GSI1PK"}' \
    --expression-attribute-values '{":id":{"S":"u#27qoZscoFhzck3ebll5kRdazos"}}' \
    --key-condition-expression "#pk = :id"