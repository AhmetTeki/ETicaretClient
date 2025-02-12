import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HubUrls } from 'src/app/constants/hub-url';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { SignelRService } from 'src/app/services/common/signelr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private signelRServiece: SignelRService,
    private toastrService: ToastrService
  ) {
    signelRServiece.start(HubUrls.ProductHub);
  }

  ngOnInit(): void {
    this.signelRServiece.on(
      ReceiveFunctions.ProductAddedMessageReceiveFunction,
      (message) => {
        this.toastrService.info('Ürün Eklenmiştir');
      }
    );
  }
}
