import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleStorageService } from '../../services/article-storage.service';
import { Article } from '../../interfaces/article';
import { ArticleStateService } from '../../services/article-state-service.service';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule, 
    ArticleDetailComponent, 
    ConfirmDialogComponent
  ],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  selectedArticle: Article | null = null;
  isConfirming: boolean = false;
  articleToDelete: Article | null = null;
  searchTerm: string = '';

  constructor(
    private articleStorageService: ArticleStorageService, 
    private router: Router, 
    private articleStateService: ArticleStateService
  ) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articles = this.articleStorageService.getArticles();
    this.filterArticles();
  }

  filterArticles(): void {
    if (this.searchTerm) {
      this.filteredArticles = this.articles.filter(article =>
        article.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredArticles = this.articles;
    }
  }

  onSearchTermChange(): void {
    this.filterArticles();
  }

  selectArticle(article: Article): void {
    this.articleStateService.setArticle(article);
    this.router.navigate(['/articles/', article.id]);
  }

  createArticle(): void {
    this.articleStateService.setArticle({ id: 0, title: '', content: '' });
    this.router.navigate(['/add-article']);
  }

  editArticle(article: Article): void {
    this.articleStateService.setArticle(article);
    this.router.navigate(['/add-article']);
  }

  confirmDelete(article: Article): void {
    this.articleToDelete = article;
    this.isConfirming = true;
  }

  deleteArticle(confirmed: boolean): void {
    if (confirmed && this.articleToDelete) {
      this.articleStorageService.deleteArticle(this.articleToDelete.id);
      this.loadArticles();
      this.selectedArticle = null;
    }
    this.isConfirming = false;
    this.articleToDelete = null;
  }
}
