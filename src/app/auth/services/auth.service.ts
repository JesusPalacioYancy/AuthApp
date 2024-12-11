import { computed, inject, Injectable, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User, AuthStatus, LoguinResponse, CheckTokenRespounse  } from '../interfaces/index.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  public counter = signal<number>(0);

  constructor() {
    this.checkAuthStatus().subscribe();
  };

  public setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user)
    this._authStatus.set(AuthStatus.autheticated)
    localStorage.setItem('token', token)
    return true
  };

  public login(email: string, password: string): Observable<boolean>{
    const url = `${this.baseUrl}/auth/login`;
    const body = {email, password};

    return this.http.post<LoguinResponse>(url, body)
      .pipe(
        map(({user, token}) => this.setAuthentication(user, token)),
        catchError( err => throwError( () => err.error.message ))
      );
  };

  public checkAuthStatus(): Observable<Boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token')

    if(!token) return of(false);

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

    return this.http.get<CheckTokenRespounse>(url, {headers})
      .pipe(      
        map(({user, token}) => this.setAuthentication(user, token)),
        catchError( () => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );
  };

  

}
