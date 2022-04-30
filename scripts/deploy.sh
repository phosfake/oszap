cd api
npm install
nest build
npm prune --production
cd ../cdk
npx cdk deploy