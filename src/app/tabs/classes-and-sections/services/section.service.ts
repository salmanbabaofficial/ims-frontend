import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  ServerResponse,
  ServerResponseObj,
} from '../../../core/models/server-response.model';
import {
  AddSectionPayload,
  Section,
  SectionListParams,
  UpdateSectionPayload,
} from '../interfaces/section.interface';

@Injectable({ providedIn: 'root' })
export class SectionService {
  private readonly http = inject(HttpClient);

  getAll(params?: SectionListParams): Observable<ServerResponse<Section>> {
    return this.http.get<ServerResponse<Section>>(
      `${environment.baseurl}Section/GetAll`,
      { params: params as Record<string, string> },
    );
  }

  getById(params: { id: string }): Observable<ServerResponseObj<Section>> {
    return this.http.get<ServerResponseObj<Section>>(
      `${environment.baseurl}Section/GetById`,
      { params },
    );
  }

  getByClassId(classId: string): Observable<ServerResponse<Section>> {
    return this.http.get<ServerResponse<Section>>(
      `${environment.baseurl}Section/GetByClassId?id=${classId}`,
    );
  }

  add(payload: AddSectionPayload): Observable<ServerResponseObj<Section>> {
    return this.http.post<ServerResponseObj<Section>>(
      `${environment.baseurl}Section/Add`,
      payload,
    );
  }

  update(payload: UpdateSectionPayload): Observable<ServerResponseObj<Section>> {
    return this.http.put<ServerResponseObj<Section>>(
      `${environment.baseurl}Section/Update`,
      payload,
    );
  }

  delete(id: string): Observable<ServerResponseObj<null>> {
    return this.http.delete<ServerResponseObj<null>>(
      `${environment.baseurl}Section/Delete?id=${id}`,
    );
  }
}
