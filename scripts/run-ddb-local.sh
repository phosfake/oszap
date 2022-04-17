original_directory=$(pwd)
cd F:/ddb
java -Djava.library.path=./DynamoDBLocal_lib -jar ./DynamoDBLocal.jar -sharedDb
cd $original_directory
