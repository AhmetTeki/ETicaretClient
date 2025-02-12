import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userAuthService: UserAuthService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user);
      await userAuthService.googleLogin(user, () => {
        this.authService.identityCheck();
      });
    });
  }

  ngOnInit(): void {}
  async login(usernameOrEmail: string, password: string) {
    await this.userAuthService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();
      alert('Giriş Yapıldı!');
      this.activatedRoute.queryParams.subscribe((params) => {
        const returnUrl: string = params['returnUrl'];
        if (returnUrl) {
          this.router.navigate(['returnUrl']);
        }
      });
    });
  }
}
