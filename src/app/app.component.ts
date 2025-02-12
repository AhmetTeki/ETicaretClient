import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ETicaretClient';
  /**
   *
   */
  constructor(
    public authService: AuthService,
    private router: Router,
    private httpClientService: HttpClientService
  ) {
    authService.identityCheck();
  }
  SignOut() {
    localStorage.removeItem('accesToken');
    this.router.navigate(['']);
    this.authService.identityCheck();
  }
}
