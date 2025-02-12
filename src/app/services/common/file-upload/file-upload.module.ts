import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop'; // Doğru modül adı
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [CommonModule, NgxFileDropModule, MatDialogModule, MatButtonModule], // Modül doğru şekilde import edildi
  exports: [FileUploadComponent],
})
export class FileUploadModule {}
