const fs = require('fs');

const removeDir = () => {
  const folderToDelete = 'tmp';
  fs.rmdir(folderToDelete, { recursive: true }, rmDirCallback);

  function rmDirCallback(error) {
    if (error) {
      console.log('Error in deletion');
      console.log(error.message);
    } else {
      console.log('Success');
    }
  }
};

module.exports = { removeDir };
