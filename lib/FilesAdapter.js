"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Files Adapter
//
// Allows you to change the file storage mechanism.
//
// Adapter classes must implement the following functions:
// * createFile(config, filename, data)
// * getFileData(config, filename)
// * getFileLocation(config, request, filename)

var FilesAdapter = exports.FilesAdapter = function () {
  function FilesAdapter() {
    _classCallCheck(this, FilesAdapter);
  }

  _createClass(FilesAdapter, [{
    key: "createFile",
    value: function createFile(config, filename, data) {}
  }, {
    key: "deleteFile",
    value: function deleteFile(config, filename) {}
  }, {
    key: "getFileData",
    value: function getFileData(config, filename) {}
  }, {
    key: "getFileLocation",
    value: function getFileLocation(config, filename) {}
  }]);

  return FilesAdapter;
}();

exports.default = FilesAdapter;