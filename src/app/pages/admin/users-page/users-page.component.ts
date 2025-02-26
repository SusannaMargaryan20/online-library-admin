import { Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../global/material.module';
import { UserService } from '../../../api/user/user.service';
import { UserInfoResModel } from '../../../api/user/res/user-detail.res.model';
import { UsersManageComponent } from '../../../global/components/users-manage/users-manage.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopUpComponent } from '../../../global/components/confirm-pop-up/confirm-pop-up.component';

@Component({
  selector: 'app-users-page',
  imports: [MaterialModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {

  displayedColumns: string[] = ['id', 'avatar', 'first_name', 'last_name', 'email', 'actions'];

  usersList = signal<UserInfoResModel[]>([]);
  page: number = 1;

  private userService = inject(UserService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.fetchUsers();
  }


  async fetchUsers(){ 
    const data = await this.userService.getUsers(this.page).toPromise();
    if(data) {
      this.usersList.set(data.data as UserInfoResModel[]);
    }
  }


  openDialogUserManage(user?: UserInfoResModel) {
    const dialogRef = this.dialog.open(UsersManageComponent, {
      width: '450px',
      data: user || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchUsers();
      }
    });

  }


  openDialogDeleteUser(userId: number) {
    const dialogRef = this.dialog.open(ConfirmPopUpComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(userId);
      }
    });
  }


  async deleteUser(userId: number) {
    const data = await this.userService.deleteApiUsersession(userId).toPromise();
    if(data) {
      await this.fetchUsers();
    }
  }
}
