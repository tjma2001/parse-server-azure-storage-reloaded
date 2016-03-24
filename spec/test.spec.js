'use strict';
let filesAdapterTests = require('parse-server-conformance-tests').files;

let AzureStorageAdapter = require('../src/AzureStorageAdapter.js').default;

describe('Azure tests', () => {

  it('should throw when not initialized properly', () => {
    expect(() => {
      new AzureStorageAdapter();
    }).toThrow('AzureStorageAdapter requires an account name');

    expect(() => {
      new AzureStorageAdapter('accountName');
    }).toThrow('AzureStorageAdapter requires a container');
  });

  it('should not throw when initialized properly', () => {
    expect(() => {
      new AzureStorageAdapter('accountName', 'container', {'accessKey': new Buffer('accessKey').toString('base64') });
    }).not.toThrow();
  });

  if (process.env.AZURE_ACCOUNT_NAME && process.env.AZURE_CONTAINER && process.env.AZURE_ACCESS_KEY) {
    // Should be initialized from the env
    let adapter = new AzureStorageAdapter(process.env.AZURE_ACCOUNT_NAME, process.env.AZURE_CONTAINER, {
      accessKey: process.env.AZURE_ACCESS_KEY
    });
    filesAdapterTests.testAdapter("AzureAdapter", adapter);
  }
})
