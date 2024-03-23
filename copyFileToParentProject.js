const fs = require('fs-extra');
const path = require('path');

fs.copy(path.join(__dirname, 'dist'), path.join(__dirname, '../../webFile'));