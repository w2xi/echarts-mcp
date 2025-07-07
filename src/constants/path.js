const os = require("os");
const { join, resolve } = require("path");

const ROOT_DIR = resolve(__dirname, "..", "..");

const HOME_DIR = os.homedir();

const DOWNLOAD_DIR = join(HOME_DIR, "Downloads");

module.exports = { ROOT_DIR, DOWNLOAD_DIR, HOME_DIR }; 