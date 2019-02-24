'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// AzureStorageAdapter
//
// Stores Parse files in Azure Blob Storage.

var Azure = require('azure-storage');
var requiredParameter = require('./RequiredParameter');
var streams = require('memory-streams');

var AzureStorageAdapter = exports.AzureStorageAdapter = function () {
  // Creates an Azure Storage Client.
  function AzureStorageAdapter() {
    var accountName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParameter('AzureStorageAdapter requires an account name');
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : requiredParameter('AzureStorageAdapter requires a container');

    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$accessKey = _ref.accessKey,
        accessKey = _ref$accessKey === undefined ? '' : _ref$accessKey,
        _ref$directAccess = _ref.directAccess,
        directAccess = _ref$directAccess === undefined ? false : _ref$directAccess;

    _classCallCheck(this, AzureStorageAdapter);

    this._accountName = accountName;
    this._accessKey = accessKey;
    this._container = container;
    this._directAccess = directAccess;

    // Init client
    this._client = Azure.createBlobService(this._accountName, this._accessKey);
  }

  /**
   * For a given config object, filename, and data, store a file in Azure Blob Storage
   * @param  {object} config
   * @param  {string} filename
   * @param  {string} data
   * @return {Promise} Promise containing the Azure Blob Storage blob creation response
   */


  _createClass(AzureStorageAdapter, [{
    key: 'createFile',
    value: function createFile(filename, data) {
      var _this = this;

      var containerParams = {
        publicAccessLevel: this._directAccess ? 'blob' : undefined
      };

      return new Promise(function (resolve, reject) {
        _this._client.createContainerIfNotExists(_this._container, containerParams, function (cerr, cresult, cresponse) {
          if (cerr) {
            return reject(cerr);
          }

          _this._client.createBlockBlobFromText(_this._container, filename, data, function (err, result) {
            if (err) {
              return reject(err);
            }

            resolve(result);
          });
        });
      });
    }

    /**
     * Delete a file if found by filename
     * @param  {object} config
     * @param  {string} filename
     * @return {Promise} Promise that succeeds with the result from Azure Storage
     */

  }, {
    key: 'deleteFile',
    value: function deleteFile(filename) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2._client.deleteBlob(_this2._container, filename, function (err, res) {
          if (err) {
            return reject(err);
          }

          resolve(res);
        });
      });
    }

    /**
     * Search for and return a file if found by filename
     * @param  {object} config
     * @param  {string} filename
     * @return {Promise} Promise that succeeds with the result from Azure Storage
     */

  }, {
    key: 'getFileData',
    value: function getFileData(filename) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var fileStream = new streams.WriteableStream();
        _this3._client.getBlobToStream(_this3._container, filename, fileStream, function (err, result) {
          err && reject(err);
          resolve(Buffer.from(fileStream));
        });
        // this._client.getBlobToText(this._container, filename, (err, text, blob, res) => {
        //   if (err) {
        //     console.error('error getting blob', err)
        //     return reject(err)
        //   }

        //   resolve(new Buffer(text))
        // })
      });
    }

    /**
     * Generates and returns the location of a file stored in Azure Blob Storage for the given request and filename
     * The location is the direct Azure Blob Storage link if the option is set, otherwise we serve the file through parse-server
     * @param  {object} config
     * @param  {string} filename
     * @return {string} file's url
     */

  }, {
    key: 'getFileLocation',
    value: function getFileLocation(config, filename) {
      if (this._directAccess) {
        return 'https://' + this._accountName + '.blob.core.windows.net/' + this._container + '/' + filename;
      }
      return config.mount + '/files/' + config.applicationId + '/' + encodeURIComponent(filename);
    }
  }]);

  return AzureStorageAdapter;
}();

exports.default = AzureStorageAdapter;