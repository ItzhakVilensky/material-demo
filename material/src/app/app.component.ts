import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'material';
  notifications = 0;
  showSpinner = false;
  opened = false;
  showFiller = false;
  selectedValue: string = '';
  options: string[] = ['Angular', 'React', 'Vue']
  objectOptions = [
    { name: 'Angular' },
    { name: 'React' },
    { name: 'Vue' }]
  myControl = new FormControl();
  filteredOptions: Observable<string[]> = new Observable<string[]>();
  minDate = new Date();
  maxDate = new Date(2030, 1, 1);
  dateFilter = (date: any) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.customFilter(value))
    );
  }

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {
  }

  private customFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayFn(subject: any) {
    return subject ? subject.name : undefined;
  }

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 3000);
  }

  log(state: string) {
    console.log('state: ', state);
  }

  logChange(ev: any) {
    console.log('ev: ', ev);
  }

  openSnackBar(message: string, action: string) {
    // action = Dismiss
    const snackBarRef = this.snackBar.open(message, action, { duration: 2000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Was dismissed');
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('On Action');
    });
  }

  openCustomSnackBar() {
    this.snackBar.openFromComponent(CustomSnackBarComponent, { duration: 2000 });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogExampleComponent, { data: { name: 'developer' } });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result: ', result);
    });
  }
}

@Component({
  selector: 'custom-snackbar',
  template: `<span style="color: orange"> Custom Snackbar </span>`
})
export class CustomSnackBarComponent {

}