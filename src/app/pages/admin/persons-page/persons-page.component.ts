import { Component, computed, inject, signal } from '@angular/core';
import { PersonsService } from '../../../api/persons/persons.service';
import { MaterialModule } from '../../../global/material.module';
import { IPersonList } from '../../../api/persons/res/persons-list.res.model';
import { NgIf } from '@angular/common';
import { PaginationComponent } from "../../../global/components/pagination/pagination.component";
@Component({
  selector: 'app-persons-page',
  imports: [MaterialModule, NgIf, PaginationComponent],
  templateUrl: './persons-page.component.html',
  styleUrl: './persons-page.component.scss'
})
export class PersonsPageComponent {
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'phone', 'website'];
  personsData = signal<IPersonList[]>([]);

  currentPage = signal(0);
  takeCount = signal(10);
  totalItems = signal(0);

  sortColumn = signal<'firstname' | 'phone' | ''>('');

  sortDirection = signal<Record<'firstname' | 'phone', 'asc' | 'desc' | ''>>({
    firstname: '',
    phone: '',
  });

  searchTerm = signal('');

  
  private personsService = inject(PersonsService);

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    const data = await this.personsService.getPersons(100).toPromise();
    if (data && data.code == 200) {
      this.personsData.set(data.data as IPersonList[]);
      this.totalItems.set(data.total)
    }
  }


  onSortChange(column: 'firstname' | 'phone') {
    if (this.sortColumn() === column) {
      const newDirection = this.sortDirection()[column] === 'asc' ? 'desc' : 'asc';
      this.sortDirection.set({ ...this.sortDirection(), [column]: newDirection });
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set({ firstname: '', phone: '', [column]: 'asc' });
    }
  }


  handlePageEvent(event: any): void {
    // this.currentPage.set(event.pageIndex);
    // this.pageSize.set(event.pageSize);
  }

  updateSearchTerm(event: any): void {
    const value = event.target.value || '';  
    this.searchTerm.set(value); 
  }

  paginatedPersons = computed(() => {
    const startIndex = this.currentPage() * this.takeCount();
    let sortedPersons = JSON.parse(JSON.stringify(this.personsData()));

    if (this.searchTerm()) {
     const filteredValue = sortedPersons.filter((person: IPersonList) =>
        `${person.firstname} ${person.lastname} ${person.email}`.toLowerCase().startsWith(this.searchTerm().toLowerCase())
      );

      sortedPersons = filteredValue;
    }

    sortedPersons = sortedPersons.slice(startIndex, startIndex + this.takeCount());

    if (this.sortDirection() && this.sortColumn()) {
      const column = this.sortColumn() as 'firstname' | 'phone';
      const direction = this.sortDirection()[column];

      sortedPersons.sort((a: any, b: any) => {
        const valueA = a[column];
        const valueB = b[column];

        if (valueA < valueB) return direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortedPersons;
  });


}
