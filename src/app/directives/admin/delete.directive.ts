import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  DeleteDialogComponent,
  DeleteState,
} from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;
@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _render: Renderer2,
    private httpClientService: HttpClientService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {
    const img = _render.createElement('img');
    img.setAttribute('style', 'cursor: pointer;');
    img.setAttribute('alt', 'Sil');
    this._render.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @HostListener('click')
  async onClick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        const td: HTMLTableCellElement = this.element.nativeElement; // Directive'in bağlı olduğu hücre
        const tr: HTMLTableRowElement = td.parentElement as HTMLTableRowElement; // Hücrenin bağlı olduğu satır
        this.httpClientService
          .delete(
            {
              controller: this.controller,
            },
            this.id
          )
          .toPromise();
        $(tr).fadeOut(500); // Sadece bu satır gizlenir
      },
    });
  }
  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     data: DeleteState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result == DeleteState.Yes) {
  //       afterClosed();
  //     }
  //   });
  // }
}
