aws dynamodb delete-table \
    --table-name zaps \
    --endpoint http://localhost:8000

aws dynamodb create-table \
    --table-name zaps \
    --attribute-definitions \
        AttributeName=PK,AttributeType=S \
        AttributeName=SK,AttributeType=S \
    --key-schema \
        AttributeName=PK,KeyType=HASH \
        AttributeName=SK,KeyType=RANGE \
    --provisioned-throughput \
        ReadCapacityUnits=10,WriteCapacityUnits=5 \
    --table-class STANDARD \
    --endpoint http://localhost:8000

aws dynamodb update-table \
    --table-name zaps \
    --attribute-definitions \
        AttributeName=GSI1PK,AttributeType=S \
        AttributeName=GSI1SK,AttributeType=S \
    --global-secondary-index-updates file://gsi1.json \
    --endpoint http://localhost:8000