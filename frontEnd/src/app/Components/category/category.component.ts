import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  images: { url: string, alt: string }[] = [];

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.images = [
      { url: '../assets/images/layouts/55.jpg', alt: 'Gallery Image 1' },
      { url: '../assets/images/layouts/54.png', alt: 'Gallery Image 2' },
      { url: '../assets/client/images/gallery-img-03.jpg', alt: 'Gallery Image 3' },
      { url: '../assets/client/images/gallery-img-04.jpg', alt: 'Gallery Image 4' },
      { url: '../assets/client/images/gallery-img-05.jpg', alt: 'Gallery Image 5' },
      { url: '../assets/images/layouts/56.jpg', alt: 'Gallery Image 6' },
    ];
  }
}
