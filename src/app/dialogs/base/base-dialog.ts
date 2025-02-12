import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export class BaseDialog<DialogComponent> {
  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}
  Close() {
    this.dialogRef.close();
  }
}
