import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  styleUrls: ['./not-found.component.scss'],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {
  articleId: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.articleId = +this.route.snapshot.paramMap.get('id')!;
  }
}
