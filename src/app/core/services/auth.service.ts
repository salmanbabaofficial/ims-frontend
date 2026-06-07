import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  AuthUser,
  ChangePasswordPayload,
  LoginPayload,
  LoginResponse,
  RefreshTokenPayload,
} from '../../auth/interfaces/auth.interface';
import { ServerResponseObj } from '../models/server-response.model';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  login(payload: LoginPayload): Observable<ServerResponseObj<LoginResponse>> {
    return this.http.post<ServerResponseObj<LoginResponse>>(
      `${environment.baseurl}Auth/Login`,
      payload,
    );
  }

  logout(refreshToken: string): Observable<ServerResponseObj<null>> {
    return this.http.post<ServerResponseObj<null>>(
      `${environment.baseurl}Auth/Logout`,
      { refreshToken },
    );
  }

  refreshTokens(payload: RefreshTokenPayload): Observable<ServerResponseObj<LoginResponse>> {
    return this.http.post<ServerResponseObj<LoginResponse>>(
      `${environment.baseurl}Auth/RefreshTokens`,
      payload,
    );
  }

  me(): Observable<ServerResponseObj<AuthUser>> {
    return this.http.get<ServerResponseObj<AuthUser>>(`${environment.baseurl}Auth/Me`);
  }

  changePassword(payload: ChangePasswordPayload): Observable<ServerResponseObj<null>> {
    return this.http.post<ServerResponseObj<null>>(
      `${environment.baseurl}Auth/ChangePassword`,
      payload,
    );
  }

  saveSession(data: LoginResponse): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    if (data.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    }
    if (data.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
  }

  clearSession(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  getCurrentUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }
}
