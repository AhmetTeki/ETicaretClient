import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {
  _isAuthenticated,
  AuthService,
} from 'src/app/services/common/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const token: string = localStorage.getItem('accesToken');

    // const decodeToken = this.jwtHelper.decodeToken(token);
    // const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);
    // let expired: boolean;
    // try {
    //   expired = this.jwtHelper.isTokenExpired(token);
    // } catch {
    //   expired = true;
    // }

    if (!_isAuthenticated) {
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url },
      });
      console.log('buraya girmek için giriş yapmalısın');
    }

    return true;
  }
}
