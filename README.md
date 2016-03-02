# Azure Storage Files Adapter for Parse Server
<a href="https://www.npmjs.com/package/parse-server-azure-storage"><img src="https://badge.fury.io/js/parse-server-azure-storage.svg" alt="npm version" height="18"></a> <a href="https://david-dm.org/felixrieseberg/parse-server-azure-storage"><img src="https://david-dm.org/felixrieseberg/parse-server-azure-storage.svg" alt="dependencies" height="18px"></a>
This module allows you to use Azure Blob Storage with the open source Parse Server, brought to you by your friends in Microsoft's Open Source Engineering team.

## Usage
First, ensure that you have an Azure Blob Storage account, with a container setup. Then, install the adapter:

```
npm install parse-server-azure-storage
```

#### Direct Access
By default, Parse will proxy all files - meaning that your end user accesses the files via your open source Parse-Server, not directly by going to Azure Blob storage. This is useful if you want files to only be accessible for logged in users or have otherwise security considerations.

If your files can be public, you'll win performance by accessing files directly on Azure Blob Storage. To enable, ensure that your container's security policy is set to `blob`. Then, in your `AzureStorageAdapter` options, set `directAccess: true`.

```
var ParseServer         = require('parse-server').ParseServer;
var AzureStorageAdapter = require('parse-server-azure-storage').AzureStorageAdapter;

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

## License
The MIT License (MIT); Copyright (c) 2016 Felix Rieseberg and Microsoft Corporation. Please see `LICENSE` for details.
