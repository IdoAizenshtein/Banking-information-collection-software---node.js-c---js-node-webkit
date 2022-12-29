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
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.jsonFile = [];
        this.jsonFileTitle = [];
    }
    AppComponent.prototype.onChange = function (event) {
        var _this = this;
        console.log('onChange');
        var files = event.srcElement.files;
        var reader = new FileReader();
        reader.onload = function (evt) {
            if (evt.target.readyState == reader.DONE) {
                var contents = evt.target.result;
                var arrayAll = JSON.parse(contents);
                _this.jsonFile = arrayAll;
                arrayAll.forEach(function (row, ind) {
                    if (ind == 0) {
                        for (var a in row) {
                            _this.jsonFileTitle.push(a);
                        }
                    }
                });
            }
        };
        reader.readAsText(files[0]);
    };
    AppComponent.prototype.sorted = function (value) {
        this.nameOfTitle = value;
        this.sortedArr = !this.sortedArr;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: 'app/app.table.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map