var _ = require('underscore');

var arrayAverage = (array) => {
    return _.reduce(array, function (first_num, second_num) {
        return first_num + second_num;
    }, 0) / (array.length === 0 ? 1 : array.length);
}

module.exports = { arrayAverage };