import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from '../../interfaces/article';
import { ArticleStateService } from '../../services/article-state-service.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  title = 'View article';
  article: Article = {id: 0, title: '', content: ''};  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleStateService: ArticleStateService
  ) {}

  ngOnInit(): void {
    const articleId = +this.route.snapshot.params['id'];
    this.articleStateService.getArticle().subscribe(article => {
      if (article && article.id === articleId) {
        this.article = article;
      } else {
        this.router.navigate(['/404', articleId]);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
