import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ItemsService, ItemWithId } from '../../core/services/items.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.css'
})
export class ItemDetail implements OnInit {
  item: ItemWithId | null = null;
  itemId!: number;
  newTitle = '';
  loading = false;
  saving = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Récupération de l'id depuis l'URL
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    this.itemsService.getItems().subscribe({
      next: (data) => {
        this.item = data.find(i => i.id === this.itemId) ?? null;
        if (this.item) this.newTitle = this.item.title;
        else this.error = 'Item introuvable';
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Erreur lors du chargement';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  updateTitle(): void {
    if (!this.newTitle.trim()) return;
    this.saving = true;
    this.error = null;
    this.successMessage = null;

    this.itemsService.updateItemTitle(this.itemId, this.newTitle).subscribe({
      next: (updated) => {
        this.item = { ...updated, id: this.itemId };
        this.newTitle = updated.title;
        this.successMessage = 'Titre mis à jour avec succès';
        this.saving = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err.status === 400
          ? 'Titre invalide'
          : err.status === 404
          ? 'Item introuvable'
          : 'Erreur lors de la mise à jour';
        this.saving = false;
        this.cdr.detectChanges();
      }
    });
  }
}