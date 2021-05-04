import { Category } from './../interfaces';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    constructor(
        private http: HttpClient
    ) { }

    fetch(): Observable<Category[]> {
        return this.http.get<Category[]>('/api/category')
    }

    fetchById(id: string): Observable<Category> {
        return this.http.get<Category>(`/api/category/${id}`)
    }

    create(name: string, image?: File) {
        const fd = new FormData()
        if (image) fd.append('image', image, image.name)
        fd.append('name', name)

        return this.http.post('/api/category', fd)
    }

    update(id: string, name: string, image?: File) {
        const fd = new FormData()
        if (image) fd.append('image', image, image.name)
        fd.append('name', name)

        return this.http.put(`/api/category/${id}`, fd)
    }

    remove(id: string) {
        return this.http.delete(`/api/category/${id}`)
    }
}