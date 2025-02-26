import { NgFor } from '@angular/common';
import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-pagination',
  imports: [NgFor, MaterialModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() total = signal(0); 
  @Input() itemsPerPage = signal(10); 
  @Input() currentPage = signal(0);  
  @Output() pageChange = new EventEmitter<{ currentPage: number, itemsPerPage: number }>();

  totalPages = computed(() => Math.ceil(this.total() / this.itemsPerPage()));


  pageNumbers = computed(() => {
    const totalPages = this.totalPages();
    const range = 5; 
    const start = Math.max(0, this.currentPage() - Math.ceil(range / 2));
    const end = Math.min(totalPages, start + range);

    return Array.from({ length: end - start }, (_, i) => start + i);
  });

  previousPage() {
    if (this.currentPage() > 0) {
      this.currentPage.set(this.currentPage() - 1);
      this.emitPageChange();
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages() - 1) {
      this.currentPage.set(this.currentPage() + 1);
      this.emitPageChange();
    }
  }

  onPageClick(page: number) {
    this.currentPage.set(page);
    this.emitPageChange();
  }

  private emitPageChange() {
    this.pageChange.emit({currentPage: this.currentPage(), itemsPerPage: this.itemsPerPage()});
  }
}
