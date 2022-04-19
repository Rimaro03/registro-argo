var base64 = require('base-64');
var utf8 = require('utf8');

const encode = (toCryptString) => {
    const utf8String = utf8.encode(toCryptString)
    const cryptedString = base64.encode(utf8String)
    return cryptedString
}