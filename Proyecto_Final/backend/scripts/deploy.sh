npm i
npx hardhat compile
rm -rf ./ignition/deployments
npx hardhat ignition deploy ./ignition/modules/Academy.ts --network besu
npx tsc
npm start
