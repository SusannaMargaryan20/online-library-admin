import { Component, inject, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfoResModel } from '../../../api/user/res/user-detail.res.model';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../api/user/user.service';

@Component({
  selector: 'app-users-manage',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './users-manage.component.html',
  styleUrl: './users-manage.component.scss'
})
export class UsersManageComponent {
  readonly dialogRef = inject(MatDialogRef<UsersManageComponent>);

  private formGroup = inject(FormBuilder);

  private userService = inject(UserService);

  usersManageForm = this.formGroup.group({
    email: ['', [Validators.required, Validators.email]],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    password: ['']
  });

  submitted = signal(false);
  isPassVisible = signal<boolean>(false)


  get f() {
    return this.usersManageForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserInfoResModel
  ) {

  }

  ngOnInit() {
    if (this.data) {

      this.usersManageForm.patchValue({
        first_name: this.data.first_name,
        last_name: this.data.last_name,
        email: this.data.email
      });
      this.usersManageForm.controls['password'].setValidators([]);
      this.usersManageForm.controls['password'].updateValueAndValidity();
    } else {
      this.usersManageForm.controls['password'].setValidators([Validators.required]);
      this.usersManageForm.controls['password'].updateValueAndValidity();
    }
  }


  clickEvent(event: MouseEvent) {
    this.isPassVisible.set(!this.isPassVisible());
    event.stopPropagation();
  }

  async onSave() {
    this.submitted.set(true);
    if (this.usersManageForm.invalid) {
      return;
    }

    const reqData = this.usersManageForm.value as any;

    if (this.data && this.data?.id) {
      reqData.id = this.data.id;
      delete reqData.password;

      const data = await this.userService.putApiUsersessionEdit(reqData).toPromise();
      if (data) {
        this.dialogRef.close(true);
      }
    } else {
      //don't have any backend api for users add
      const data = await this.userService.postApiUsersessionAdd(reqData).toPromise();
      if (data) {
        this.dialogRef.close(true);
      }
    }

  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
