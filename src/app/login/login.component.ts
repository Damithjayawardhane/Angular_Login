import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginform!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return a.email === this.loginform.value.email && this.loginform.value.password
          
        });
        if(user){
          alert("Login Successfull")
          this.loginform.reset();
          this.router.navigate(['/employee'])
        }else{
          alert('User not found');
        }

        
      },
      (err) => alert('Something went wrong')
    );
  }
}
