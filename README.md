## Azure Storage Files Adapter for Parse Server
This module allows you to use Azure Blob Storage with the open source Parse Server.

### Usage
```
var ParseServer         = require('parse-server').ParseServer;
var AzureStorageAdapter = require('parse-server-azure-storage');

var account = 'YOUR_AZURE_STORAGE_ACCOUNT_NAME';
var container = 'YOUR_AZURE_STORAGE_CONTAINER_NAME';
var options = {
    accessKey: 'YOUR_ACCESS_KEY',
    directAccess: false // If set to true, files will be served by Azure Blob Storage directly
}

var api = new ParseServer({
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337'
  (...)
  filesAdapter: new AzureStorageAdapter(account, container, options);
});
```
