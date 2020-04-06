Object.prototype.deepCopy = function() {
    return JSON.parse(JSON.stringify(this))
}