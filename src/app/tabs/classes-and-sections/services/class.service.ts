import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  ServerResponse,
  ServerResponseObj,
} from '../../../core/models/server-response.model';
import {
  AddClassPayload,
  Class,
  ClassListParams,
  UpdateClassPayload,
} from '../interfaces/class.interface';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private readonly http = inject(HttpClient);

  getAll(params?: ClassListParams): Observable<ServerResponse<Class>> {
    return this.http.get<ServerResponse<Class>>(
      `${environment.baseurl}Class/GetAll`,
      { params: params as Record<string, string> },
    );
  }

  getById(params: { id: string }): Observable<ServerResponseObj<Class>> {
    return this.http.get<ServerResponseObj<Class>>(
      `${environment.baseurl}Class/GetById`,
      { params },
    );
  }

  add(payload: AddClassPayload): Observable<ServerResponseObj<Class>> {
    return this.http.post<ServerResponseObj<Class>>(
      `${environment.baseurl}Class/Add`,
      payload,
    );
  }

  update(payload: UpdateClassPayload): Observable<ServerResponseObj<Class>> {
    return this.http.put<ServerResponseObj<Class>>(
      `${environment.baseurl}Class/Update`,
      payload,
    );
  }

  delete(id: string): Observable<ServerResponseObj<null>> {
    return this.http.delete<ServerResponseObj<null>>(
      `${environment.baseurl}Class/Delete?id=${id}`,
    );
  }
}
