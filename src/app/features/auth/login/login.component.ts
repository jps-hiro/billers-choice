import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    clientId: new FormControl('100001', Validators.required),
    userName: new FormControl('Test', Validators.required),
    password: new FormControl('Abcd1!', Validators.required)
  })

  checking=false;

  constructor(
    public fvs: FormValidationService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }
  sign() {
    if(this.loginForm.invalid){
      return;
    }
    this.checking = true;
    this.authService.login({...this.loginForm.value, authLocation: 0}).subscribe(
      (res)=>{
        this.checking = false;
        this.router.navigate(['/']);
      },
      (err)=>{
        this.checking = false;
        this.toastr.error(err.error.errorMessage, 'Error');
      }
    )
  }

}
