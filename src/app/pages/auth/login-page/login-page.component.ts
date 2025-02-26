import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../../../api/helpers/auth-service.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../global/material.module';
import { LoginReqModel } from '../../../api/user/req/login-req.model';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-login-page',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formGroup = inject(FormBuilder);

  submitted = signal<boolean>(false);
  inProgress = signal<boolean>(false);
  isPassVisible = signal<boolean>(false)

  loginForm = this.formGroup.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  })


  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
  }  


  clickEvent(event: MouseEvent) {
    this.isPassVisible.set(!this.isPassVisible());
    event.stopPropagation();
  }

  async login() {

    this.submitted.set(true);
    this.inProgress.set(true);

    if(this.submitted() && this.loginForm.invalid) {
      this.inProgress.set(false);
      return;
    }

    const reqModel: LoginReqModel = this.loginForm.value as any;
    
    const data = await this.authService.login(reqModel).pipe(finalize(() => this.inProgress.set(false))).toPromise();
     if(data) {
      this.router.navigate(['/admin']);
    }

  }
}
