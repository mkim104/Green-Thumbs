var _ = require('underscore');
var avg;

var arrayAverage = (array) => {
    if (array.length === 0) {
        avg = 0;
    } else {
        avg = _.reduce(array, function (first_num, second_num) {
            return first_num + second_num;
        }, 0) / array.length;
    }

    return avg.toFixed(1);
}

module.exports = { arrayAverage };