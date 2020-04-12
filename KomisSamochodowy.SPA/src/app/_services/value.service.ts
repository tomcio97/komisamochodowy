import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Value } from '../_models/Value';
import { environment } from 'src/environments/environment';
import { PaginationResult } from '../_models/pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ValueService {

baseUrl = environment.apiUrl;

constructor(private http: HttpClient) {}

getValues(page?, itemsPerPage?, mark?, model?, year?, engineCapacity?, priceFrom?, priceTo?, orderBy?): Observable<PaginationResult<Value[]>>
{
  const paginationResult: PaginationResult<Value[]> = new PaginationResult<Value[]>();
  let params = new HttpParams();

  if(page != null && itemsPerPage != null)
  {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if(mark != null )
  {
    params = params.append('mark', mark);

  }
 if(model != null )
  {
    params = params.append('model', model);
  }

  if (year)
  {
    params = params.append('year', year);
  }

  if(engineCapacity)
  {
    params = params.append('engineCapacity', engineCapacity);
  }
  
  if(priceFrom)
  {
    params = params.append('priceFrom',priceFrom);
  }

  if(priceTo)
  {
    params = params.append('priceTo', priceTo);
  }

  if(orderBy)
  {
    params = params.append('orderBy', orderBy);
  }
  return this.http.get<Value[]>(this.baseUrl + 'values', {observe: 'response', params})
            .pipe(
              map(response => {
                paginationResult.result = response.body;
                
                if (response.headers.get('Pagination') != null) {
                  paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
                }
              

                return paginationResult;
              })
            );

}

getValue(id: number): Observable<Value>
{
  return this.http.get<Value>(this.baseUrl + 'values/' + id);
}

updateValue(id: number, value: Value)
{
  return this.http.put(this.baseUrl + 'values/' + id, value);
}

setMain(valueId: number, id: number)
{
  return this.http.post(this.baseUrl + 'values/' + valueId + '/photos/' + id + '/setMain', {});
}

deletePhoto(valueid: number, id: number)
{
  return this.http.delete(this.baseUrl + 'values/' + valueid + '/photos/' + id);
}

addValue(formData: FormData)
{
  return this.http.post<any>(this.baseUrl + 'values', formData);
}

}
