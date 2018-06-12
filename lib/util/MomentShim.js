var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// This shim is here just to get pikaday working with Intl instead of moment.js
// It basically stubs out all the required methods that pikaday uses.
// May not be needed after https://github.com/dbushell/Pikaday/pull/721
var MomentShim = function () {
    function MomentShim(date) {
        _classCallCheck(this, MomentShim);

        this.date = new Date(date);
    }

    _createClass(MomentShim, [{
        key: "format",
        value: function format() {
            return this.date.toLocaleDateString(__LANGUAGE__);
        }
    }, {
        key: "toDate",
        value: function toDate() {
            return new Date(this.date);
        }
    }, {
        key: "isValid",
        value: function isValid() {
            return this.date.getTime() > 0;
        }
    }]);

    return MomentShim;
}(); /**
      * 
      * @file Shim for moment.js
      * @author Box
      */


var momentGenerator = function momentGenerator(date) {
    return new MomentShim(date);
};
export default momentGenerator;