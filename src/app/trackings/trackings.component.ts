import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrackingsService } from '../services/trackings.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trackings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './trackings.component.html',
  styleUrls: ['./trackings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackingsComponent {
  private svc = inject(TrackingsService);

  trackings$ = this.svc.list();

  newName = '';

  editId = signal<string | null>(null);
  // keep a simple mutable field for template binding
  editNameValue = '';

  async add() {
    const name = this.newName?.trim();
    if (!name) return;
    await this.svc.add({ name, dateCreated: new Date() });
    this.newName = '';
  }

  startEdit(t: any) {
    this.editId.set(t.id);
    this.editNameValue = t.name || '';
  }

  async saveEdit() {
    const id = this.editId();
    if (!id) return;
    await this.svc.update(id, { name: this.editNameValue });
    this.editId.set(null);
    this.editNameValue = '';
  }

  cancelEdit() {
    this.editId.set(null);
    this.editNameValue = '';
  }

  async delete(id?: string) {
    if (!id) return;
    if (!confirm('Delete this tracking?')) return;
    await this.svc.delete(id);
  }
}
