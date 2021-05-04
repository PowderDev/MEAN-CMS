import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Position } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class PositionService {
    constructor(
        private http: HttpClient
    ) { }

    fetch(categoryId: string): Observable<Position[]> {
        return this.http.get<Position[]>(`/api/position/${categoryId}`)
    }

    create(position: Position): Observable<Position> {
        return this.http.post<Position>('/api/position', position)
    }

    update(position: Position): Observable<Position> {
        return this.http.put<Position>(`/api/position/${position._id}`, position)
    }

    remove(position: Position) {
        return this.http.delete(`/api/position/${position._id}`)
    }
}