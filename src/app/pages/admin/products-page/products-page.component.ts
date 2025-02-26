import { Component, computed, inject, signal, Signal } from '@angular/core';
import { Products } from '../../../api/products/res/products-info.interface';
import { ProductsService } from '../../../api/products/products.service';
import { MaterialModule } from '../../../global/material.module';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-products-page',
  imports: [MaterialModule, NgFor, NgIf],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent {

  products = signal<Products[]>([]);
  displayedCount = signal(10);
  sortOrder = signal<string>('none');

  private productsService = inject(ProductsService);

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    const data = await this.productsService.getProducts(50).toPromise();
    if (data && data.code == 200) {
      this.products.set(data.data);
    }
  }

  onSortChange(event: any): void {
    this.sortOrder.set(event.value);
  }

  showMore() {
    this.displayedCount.set(this.displayedCount() + 10);
  }

  paginatedProducts = computed(() => {

    const order = this.sortOrder();
    const products: Products[] = JSON.parse(JSON.stringify(this.products()));

    const pagedProducts = products.slice(0, this.displayedCount());

    if (order === 'asc') {
      return pagedProducts.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (order === 'desc') {
      return pagedProducts.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return pagedProducts;
  });
}
