import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    RouterModule, 
    ArticleListComponent 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Final App of the Angular Base Course';
}
