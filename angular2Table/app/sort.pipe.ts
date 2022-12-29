import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "rowsSort"
})
export class RowsSortPipe implements PipeTransform {
    constructor() {}
    transform(value:any[], args:string[], sorted:boolean):any {
        let argsRow:any = args;
        let valueArr:any[] = value;
        if (!valueArr || !args) {
            return valueArr;
        }
        valueArr.sort((a:any, b:any) => {
            if (sorted) {
                if (a[argsRow] != null && a[argsRow].toString().replace(/\D/g, '') !== "") {
                    return parseFloat(a[argsRow]) - parseFloat(b[argsRow]);
                }
                else {
                    if (a[argsRow] < b[argsRow]) {
                        return -1;
                    } else if (a[argsRow] > b[argsRow]) {
                        return 1;
                    } else {
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
                    } else if (a[argsRow] < b[argsRow]) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
        });
        return valueArr;
    }
}