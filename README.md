# Flutter-InAppUpgrade Local Server

This is a example server for Flutter-InAppUpgrade in local.

## How to use?
```bash
npm install
npm run local
```

## Summary

|URL|Method|Description|
|:---|---|---|
|/appcast/:version|Get|fetch the appcast json file which named {version}, you should put the config file in the src/files/ first
|/upload|Post|upload file to server, storage in src/files/
|/download/:filename|Get|download file named {filename}, the file should storage in src/files/