const FILE_REQUEST_SERVER = "https://www.picgo.net/api/1/upload";

const getFileRequestServer = () => {
  return process.env.FILE_REQUEST_SERVER || FILE_REQUEST_SERVER;
};

module.exports = {
  getFileRequestServer,
};
