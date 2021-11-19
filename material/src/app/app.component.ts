import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.customFilter(value))
    );
  }

  constructor(private snackBar: MatSnackBar) {
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
}

@Component({
  selector: 'custom-snackbar',
  template: `<span style="color: orange"> Custom Snackbar </span>`
})
export class CustomSnackBarComponent {

}