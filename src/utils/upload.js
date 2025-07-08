const { getFileRequestServer } = require("./env");
const FormData = require('form-data');

const uploadFile = async (fileBuffer, fileName) => {
  const url = getFileRequestServer();

  const formData = new FormData();

  if (!fileBuffer || fileBuffer.length === 0) {
    throw new Error('File buffer is empty');
  }

  formData.append("source", fileBuffer, {
    filename: fileName,
    contentType: 'image/png'
  });
  formData.append("format", "txt");

  try {
    return new Promise((resolve, reject) => {
      formData.submit({
        host: new URL(url).hostname,
        port: new URL(url).port || (new URL(url).protocol === 'https:' ? 443 : 80),
        path: new URL(url).pathname,
        protocol: new URL(url).protocol,
        method: 'POST',
        headers: {
          "X-API-Key": "chv_Sduvd_4786343edab9d3c72732b7fe99f33805ba79ececa9eae72741b6a496165cb59141a3e4b2e6a2244535ad0dd85e8e210c1113ce2009b96c11c13f48c45c126be8",
        }
      }, (err, res) => {
        if (err) {
          console.error('Upload error:', err);
          reject(err);
          return;
        }

        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(data);
          } catch (parseError) {
            console.error('JSON parse error:', parseError);
            console.log('Raw response:', data);
            reject(parseError);
          }
        });
      });
    });
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

module.exports = {
  uploadFile,
};
