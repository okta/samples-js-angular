import { Component, OnInit } from '@angular/core';
import { PayrollService } from '../payroll.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [PayrollService]
})
export class SearchComponent implements OnInit {

  inputID: string = "";
  searchQuery: string = "";
  stringInvalid: boolean = true;
  stringIsEmpty: boolean = true;

  employees: any;

  //TODO add array for user results

  constructor(private payroll: PayrollService) { }

  ngOnInit() {
  }

  checkIDString(input: string){
    // Validation input
    // Input must be a 5 digit number starting with a 1.
    let reg = /[1-9][0-9]{4}/
    let expFound = reg.test(input);

    try {
      if( input.length === 5 && expFound){
        this.stringInvalid = false;
      }
      else if(input.length !== 5 || !expFound) {
        this.stringInvalid = true;
      }
    }
    catch(err) {
      this.stringInvalid = true;
      console.log("Input string is invalid");
    }

  }

  checkQueryString(input: string){
      if( input !== '' ){
          this.stringIsEmpty = false;
      }
    }

  onIDSearch() {
    this.payroll.user(this.inputID).subscribe(response => { 
      try {
        this.employees = response;
        this.inputID = "";
      }
      catch(err) {
        window.alert("Invalid uID entered.");
      }
    });
  };

  onNameSearch(input: string) {
    this.payroll.search(input).subscribe(response => {
      this.employees = response;
    })
  }

}