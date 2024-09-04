import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeComponent } from './components/theme/theme.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [ThemeComponent, SpinnerComponent],
  imports: [CommonModule],
  exports: [ThemeComponent, SpinnerComponent],
})
export class SharedModule {}
