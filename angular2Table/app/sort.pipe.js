"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var RowsSortPipe = (function () {
    function RowsSortPipe() {
    }
    RowsSortPipe.prototype.transform = function (value, args, sorted) {
        var argsRow = args;
        var valueArr = value;
        if (!valueArr || !args) {
            return valueArr;
        }
        valueArr.sort(function (a, b) {
            if (sorted) {
                if (a[argsRow] != null && a[argsRow].toString().replace(/\D/g, '') !== "") {
                    return parseFloat(a[argsRow]) - parseFloat(b[argsRow]);
                }
                else {
                    if (a[argsRow] < b[argsRow]) {
                        return -1;
                    }
                    else if (a[argsRow] > b[argsRow]) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            else {
                if (a[argsRow] != null && a[argsRow].toString().replace(/\D/g, '') !== "") {
                    return parseFloat(b[argsRow]) - parseFloat(a[argsRow]);
                }
                else {
                    if (a[argsRow] > b[argsRow]) {
                        return -1;
                    }
                    else if (a[argsRow] < b[argsRow]) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
        });
        return valueArr;
    };
    RowsSortPipe = __decorate([
        core_1.Pipe({
            name: "rowsSort"
        }), 
        __metadata('design:paramtypes', [])
    ], RowsSortPipe);
    return RowsSortPipe;
}());
exports.RowsSortPipe = RowsSortPipe;
//# sourceMappingURL=sort.pipe.js.map