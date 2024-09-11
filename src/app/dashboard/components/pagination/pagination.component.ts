import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  private router = inject(Router);

  @Input({ required: true })
  route: string = '/dashboard';

  @Input()
  public currentPage: number = 1;

  @Input()
  public finalPage: number = 2;

  @Input({ required: true })
  public limit: number = 0;

  constructor() {}

  ngOnInit(): void {}

  nextPage() {
    this.currentPage++;
    this.updatePage();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.updatePage();
  }

  updatePage() {
    const offset = (this.currentPage - 1) * this.limit;

    this.router.navigate([this.route], {
      queryParams: { limit: this.limit, offset: offset },
    });
  }
}
