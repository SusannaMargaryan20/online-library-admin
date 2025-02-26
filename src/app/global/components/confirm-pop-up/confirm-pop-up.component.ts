import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-pop-up',
  imports: [MaterialModule],
  templateUrl: './confirm-pop-up.component.html',
  styleUrl: './confirm-pop-up.component.scss'
})
export class ConfirmPopUpComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmPopUpComponent>);


  onConfirm(): void {
    this.dialogRef.close(true); 
  }

  onCancel(): void {
    this.dialogRef.close(false); 
  }


}
