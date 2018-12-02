import { Component, OnInit } from '@angular/core';
import { PayrollService } from "../payroll.service";

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css'],
  providers: [PayrollService]
})
export class SalaryComponent implements OnInit {

  inputID: string = "";
  stringInvalid: boolean = true;

  newSalary: string = "";
  newSalaryInvalid: boolean = true;
  inputsInvalid: boolean = true;

  salaries: any;
  dateNow: any;
  dateEnd: any;

  constructor(private payroll: PayrollService) {}

  ngOnInit() {}

  checkIDString(input: string) {
    // Validation input
    // Input must be a 5 digit number starting with any number from 1-9.
    let reg = /[1-9][0-9]{4}/;
    let expFound = reg.test(input);

    try {
      if (input.length === 5 && expFound) {
        this.stringInvalid = false;
      } else if (input.length !== 5 || !expFound) {
        this.stringInvalid = true;
      }
    } catch (err) {
      this.stringInvalid = true;
      console.log("Input string is invalid");
    }
    this.inputsInvalid = this.newSalaryInvalid || this.stringInvalid;
  }

  onIDSearch() {
    this.payroll.salaryHistory(this.inputID).subscribe(response => {
      try {
        this.salaries = response;
        this.inputID = "";
        this.stringInvalid = true;
      } catch (err) {
        window.alert("Invalid uID entered.");
      }
    });
    this.stringInvalid = true;
  }

  checkNewSalaryString(input: string) {
    // Validation input
    // Input must be only digits.
    let reg = /^[0-9]+$/;
    let expFound = reg.test(input);

    try {
      if (expFound) {
        this.newSalaryInvalid = false;
      } else if (!expFound) {
        this.newSalaryInvalid = true;
      }
    } catch (err) {
      this.newSalaryInvalid = true;
      console.log("Input salary is invalid");
    }
    this.inputsInvalid = this.newSalaryInvalid || this.stringInvalid;
  }

  onModifyEndDateAndAddSalary() {
    this.onModifyEndDate();
    this.addSalary();
  }
  addSalary() {
    var today = new Date();

    var utcDate = new Date(
      Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        today.getHours(),
        today.getMinutes(),
        today.getSeconds(),
        today.getMilliseconds()
      )
    );

    //Default end date placeholder: 9999-01-01T08:00:00.000Z
    var utcDateEnd = new Date(Date.UTC(9999, 0, 1, 8, 0, 0, 0));

    this.dateNow = utcDate.toISOString();
    this.dateEnd = utcDateEnd.toISOString();

    this.payroll
      .addSalary(this.newSalary, this.inputID, this.dateNow, this.dateEnd)
      .subscribe(response => {
        try {
          console.log(response);
            this.salaries.push({
            emp_no: this.inputID,
            salary: this.newSalary,
            from_date: this.dateNow,
            to_date: this.dateEnd
          });
          this.newSalary = "";
          this.newSalaryInvalid = true;
        } catch (err) {
          window.alert("Invalid uID entered.");
        }
      });
    this.inputsInvalid = true;
  }

  onModifyEndDate() {
    var today = new Date();

    var utcDate = new Date(
      Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        today.getHours(),
        today.getMinutes(),
        today.getSeconds(),
        today.getMilliseconds()
      )
    );

    this.dateEnd = utcDate.toISOString();

    this.payroll
      .modifySalaryEndDate(this.inputID, this.dateEnd)
      .subscribe(response => {
        try {
          this.salaries[this.salaries.length - 1].to_date = this.dateNow;
          console.log(response);
        } catch (err) {
          window.alert("Salary End Date Update Failed.");
        }
      });
  }

}
