// Files Adapter
//
// Allows you to change the file storage mechanism.
//
// Adapter classes must implement the following functions:
// * createFile(config, filename, data)
// * getFileData(config, filename)
// * getFileLocation(config, request, filename)

export class FilesAdapter {
  createFile(config, filename, data) { }

  deleteFile(config, filename) { }

  getFileData(config, filename) { }

  getFileLocation(config, filename) { }
}

export default FilesAdapter;
