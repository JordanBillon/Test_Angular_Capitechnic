import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item.model';

export interface ItemWithId extends Item {
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private apiUrl = '/items';

  constructor(private http: HttpClient) {}

  // Récupère les items et les transforme en tableau pour faciliter l'affichage

  getItems(): Observable<ItemWithId[]> {
    return this.http.get<Record<number, Item>>(this.apiUrl).pipe(
      map(data => Object.entries(data).map(([key, item]) => ({
        ...item,
        id: Number(key)
      })))
    );
  }

  // Met à jour le titre d'un item
  
  updateItemTitle(id: number, title: string): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, { title });
  }
}