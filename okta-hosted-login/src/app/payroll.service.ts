import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";

export interface DBResponse {
  data: any;
  resp: any;
}

@Injectable()
export class PayrollService {
  constructor(private http: HttpClient) {}

  salaryHistory(id?: string) {
    return this.http.get<DBResponse>(`${environment.api}/salary?id=${id}`);
  }

  user(id: string) {
    return this.http.get<DBResponse>(`${environment.api}/employee/${id}`);
  }

  search(q?: string) {
    return this.http.get<DBResponse>(`${environment.api}/employee?q=${q}`);
  }

  addSalary(salary: string, id: string, startDate: any, endDate: any) {
    return this.http.post<DBResponse>(`${environment.api}/salary/add`, {
      id,
      salary,
      startDate,
      endDate
    });
  }

  modifySalaryEndDate(id: string, endDate: any) {
    return this.http.put<DBResponse>(
      `${environment.api}/salary/modifyEndDate`,
      {
        id,
        endDate
      }
    );
  }
}
