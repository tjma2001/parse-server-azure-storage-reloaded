'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AzureStorageAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _azureStorage = require('azure-storage');

var Azure = _interopRequireWildcard(_azureStorage);

var _FilesAdapter2 = require('./FilesAdapter');

var _RequiredParameter = require('./RequiredParameter');

var _RequiredParameter2 = _interopRequireDefault(_RequiredParameter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // AzureStorageAdapter
//
// Stores Parse files in Azure Blob Storage.

var AzureStorageAdapter = exports.AzureStorageAdapter = function (_FilesAdapter) {
  _inherits(AzureStorageAdapter, _FilesAdapter);

  // Creates an Azure Storage Client.

  function AzureStorageAdapter() {
    var accountName = arguments.length <= 0 || arguments[0] === undefined ? (0, _RequiredParameter2.default)('AzureStorageAdapter requires an account name') : arguments[0];
    var container = arguments.length <= 1 || arguments[1] === undefined ? (0, _RequiredParameter2.default)('AzureStorageAdapter requires a container') : arguments[1];

    var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref$accessKey = _ref.accessKey;
    var accessKey = _ref$accessKey === undefined ? '' : _ref$accessKey;
    var _ref$directAccess = _ref.directAccess;
    var directAccess = _ref$directAccess === undefined ? false : _ref$directAccess;

    _classCallCheck(this, AzureStorageAdapter);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AzureStorageAdapter).call(this));

    _this._accountName = accountName;
    _this._accessKey = accessKey;
    _this._container = container;
    _this._directAccess = directAccess;

    // Init client
    _this._client = Azure.createBlobService(_this._accountName, _this._accessKey);
    return _this;
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
    value: function createFile(config, filename, data) {
      var _this2 = this;

      var containerParams = {
        publicAccessLevel: this._directAccess ? 'blob' : undefined
      };

      return new Promise(function (resolve, reject) {
        _this2._client.createContainerIfNotExists(_this2._container, containerParams, function (cerr, cresult, cresponse) {
          if (cerr) {
            return reject(cerr);
          }

          _this2._client.createBlockBlobFromText(_this2._container, filename, data, function (err, result) {
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
    value: function deleteFile(config, filename) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3._client.deleteBlob(_this3._container, filename, function (err, res) {
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
    value: function getFileData(config, filename) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4._client.getBlobToText(_this4._container, filename, function (err, text, blob, res) {
          if (err) {
            return reject(err);
          }

          resolve(text);
        });
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
        return 'http://' + this._accountName + '.blob.core.windows.net/' + this._container + '/' + filename;
      }
      return config.mount + '/files/' + config.applicationId + '/' + encodeURIComponent(filename);
    }
  }]);

  return AzureStorageAdapter;
}(_FilesAdapter2.FilesAdapter);

exports.default = AzureStorageAdapter;