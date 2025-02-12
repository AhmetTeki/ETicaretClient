import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private httpClientService: HttpClientService,
    private toastrService: ToastrService
  ) {}
  async login(
    usernameOrEmail: string,
    password: string,
    successCallBack?: () => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post<any | TokenResponse>(
        {
          controller: 'auth',
          action: 'login',
        },
        {
          usernameOrEmail,
          password,
        }
      );
    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accesToken', tokenResponse.token.accesToken);

      this.toastrService.info('Giriş yapıldı');
    }
    // callBackFunction();
  }

  async googleLogin(
    user: SocialUser,
    successCallBack?: () => void
  ): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> =
      this.httpClientService.post<SocialUser | TokenResponse>(
        {
          action: 'google-login',
          controller: 'auth',
        },
        user
      );
    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem('accesToken', tokenResponse.token.accesToken);
      alert('Goole Login Başarı ile Sağlanmıştır');
    }
  }
}
