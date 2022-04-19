var base64 = require('base-64');
var utf8 = require('utf8');

const decode = (toDecryptString) => {
    const bytesString = base64.decode(toDecryptString)
    const decryptedString = utf8.decode(bytesString)
    return decryptedString
}