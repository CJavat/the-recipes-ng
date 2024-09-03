import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-search-component',
  templateUrl: './search-component.component.html',
  styles: ``,
})
export class SearchComponentComponent {
  private router = inject(Router);

  onSubmit(event: Event, input: string): void {
    event.preventDefault();

    this.router.navigate(['dashboard', 'search'], {
      queryParams: { q: input },
    });
  }
}
