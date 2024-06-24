import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleStateService {
  private articleSubject = new BehaviorSubject<Article | null>(null);

  setArticle(article: Article): void {
    this.articleSubject.next(article);
  }

  getArticle(): Observable<Article | null> {
    return this.articleSubject.asObservable();
  }
}
