import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from '../services/common/file-upload/file-upload.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatCardModule } from '@angular/material/card';

import { NgxFileDropModule } from 'ngx-file-drop';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectProductImageDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FileUploadModule,
    NgxFileDropModule,
    MatCardModule,
    FormsModule,
  ],

  exports: [],
})
export class DialogModule {}
