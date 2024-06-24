import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleStorageService } from '../../services/article-storage.service';
import { ArticleStateService } from '../../services/article-state-service.service';
import { Article } from '../../interfaces/article';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  article: Article = {id: 0, title: '', content: ''};

  constructor(
    private articleStorageService: ArticleStorageService, 
    private router: Router,
    private articleStateService: ArticleStateService,
  ) { }

  ngOnInit(): void {    
    this.articleStateService.getArticle().subscribe(article => {
      if (article) {
        this.article = article        
      }
      console.log(this.article)
    });
  }

  onSubmit(userForm: NgForm): void {
    const frmValue = userForm.form.value;
    
    if (this.article.id) {
      const newArticle: Article = {id: this.article.id, title: frmValue.title, content: frmValue.content}
      this.articleStorageService.updateArticle(newArticle);
    } else {
      const newArticle: Article = {id: Date.now(), title: frmValue.title, content: frmValue.content}
      this.articleStorageService.addArticle(newArticle);
    }
    this.router.navigate(['/']);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
