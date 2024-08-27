import { Component } from '@angular/core';

interface urlImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'shared-theme',
  templateUrl: './theme.component.html',
  styles: ``,
})
export class ThemeComponent {
  public urlImage: urlImage = {
    src: '../../../../assets/moon.svg',
    alt: 'Moon logo',
  };

  ngOnInit(): void {
    if (
      localStorage.getItem('theme') !== 'dark' ||
      !localStorage.getItem('theme')
    ) {
      document.documentElement.classList.remove('dark');
      this.urlImage.src = '../../../../assets/moon.svg';
      this.urlImage.alt = 'Moon logo';
    } else {
      document.documentElement.classList.add('dark');
      this.urlImage.src = '../../../../assets/sun.svg';
      this.urlImage.alt = 'Sun logo';
    }
  }

  changeTheme() {
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.removeItem('theme');
      document.documentElement.classList.remove('dark');
      this.urlImage.src = '../../../../assets/moon.svg';
      this.urlImage.alt = 'Moon logo';
    } else {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      this.urlImage.src = '../../../../assets/sun.svg';
      this.urlImage.alt = 'Sun logo';
    }
  }
}
