import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "rowsFilter"
})
export class RowsFilterPipe implements PipeTransform {
    constructor() {}
    transform(value:any[], args: string[]):any {
        if (!value || !args) {
            return value;
        }
        let filterText = args;
        var obj:any[] = [];
        value.forEach(function (rows) {
            var isEx = false;
            for (let title in rows) {
                if (rows[title] != null) {
                    rows[title] = rows[title].toString();
                    if (!isEx) {
                        isEx = rows[title].indexOf(filterText) != -1;
                        if (isEx) {
                            obj.push(rows);
                        }
                    }
                }
            }
        });
        return obj;
    }
}