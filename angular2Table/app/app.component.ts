import {Component} from "@angular/core";

@Component({
    selector: 'app',
    templateUrl: 'app/app.table.html'
})
export class AppComponent {
    public jsonFile: any[];
    public jsonFileTitle: any[];
    public filterText: string;
    public nameOfTitle: string;
    public sortedArr: boolean;

    constructor() {
        this.jsonFile = [];
        this.jsonFileTitle = [];
    }

    public onChange(event: any): void {
        console.log('onChange');
        var files: File = event.srcElement.files;
        var reader: FileReader = new FileReader();
        reader.onload = (evt: any) => {
            if (evt.target.readyState == reader.DONE) {
                var contents: any = evt.target.result;
                var arrayAll: any = JSON.parse(contents);
                this.jsonFile = arrayAll;
                arrayAll.forEach((row: any, ind: number) => {
                    if (ind == 0) {
                        for (var a in row) {
                            this.jsonFileTitle.push(a);
                        }
                    }
                });
            }
        }
        reader.readAsText(files[0]);
    }

    public sorted(value: string): void {
        this.nameOfTitle = value;
        this.sortedArr = !this.sortedArr;
    }
}
