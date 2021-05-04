import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(
        private http: HttpClient
    ) { }

    fetch(params: any = {}): Observable<Order[]> {
        return this.http.get<Order[]>('/api/order', {
            params: new HttpParams({
                fromObject: params
            })
        })
    }

    create(order: Order): Observable<Order> {
        return this.http.post<Order>('/api/order', order)
    }
}