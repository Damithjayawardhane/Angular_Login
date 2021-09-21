import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { EmployeeModel } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  isEdit: boolean = false;
  isEditButtonName = 'Add';

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    if (this.isEdit) {
      this.isEditButtonName = 'Update';
    } else {
      this.isEditButtonName = 'Add';
    }
    this.getAllEmployee();
    this.formValue = this.formBuilder.group({
      id: [],
      firstName: [''],
      lastName: [''],
      email: [''],
      mobileNumber: [''],
      salary: [''],
    });
  }

  employeeDetails() {
    this.employeeModelObj.firstname = this.formValue.value.firstName;
    this.employeeModelObj.lastname = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobileNumber;
    this.employeeModelObj.salary = this.formValue.value.salary;

    if (this.isEdit) {
      let id = this.formValue.value.id;
      this.api.updateEmployee(this.employeeModelObj, id).subscribe(
        (res) => {
          alert('Employee updated Successfully');
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
        },
        (err) => {
          alert('Something went wrong');
        }
      );
    } else {
      this.api.postEmployee(this.employeeModelObj).subscribe(
        (res) => {
          alert('Employee Added Successfully');
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
        },
        (err) => {
          alert('Something went wrong');
        }
      );
    }
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
    });
  }

  deleteEmployeeDetail(data: any) {
    this.api.deleteEmployee(data.id).subscribe(
      (res) => {
        alert('Employee deleted Successfully');
        this.getAllEmployee();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  onEdit(data: any) {
    this.isEdit = true;
    this.isEditButtonName = 'Update';

    this.formValue.controls['id'].setValue(data.id);
    this.formValue.controls['firstName'].setValue(data.firstname);
    this.formValue.controls['lastName'].setValue(data.lastname);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobileNumber'].setValue(data.mobile);
    this.formValue.controls['salary'].setValue(data.salary);
  }

  addEmployee() {
    this.isEditButtonName = 'Add';
    this.isEdit = true;
    this.formValue.reset();
  }
}
