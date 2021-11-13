import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material';
  notifications = 0;
  showSpinner = false;
  opened = false;
  showFiller = false;

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 3000);
  }

  log(state: string) {
    console.log('state: ', state);
  }

  logChange(ev: any){
    console.log('ev: ', ev);
  }
}
