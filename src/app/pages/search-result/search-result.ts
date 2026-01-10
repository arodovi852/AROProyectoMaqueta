import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

/**
 * Página SearchResult
 * 
 * Muestra los resultados de búsqueda de series.
 */
@Component({
  selector: 'app-search-result',
  imports: [CommonModule],
  templateUrl: './search-result.html',
  styleUrl: './search-result.scss',
})
export class SearchResult {
  searchQuery = '';

  // Resultados de búsqueda (datos de ejemplo)
  searchResults = [
    {
      id: 1,
      title: 'The haunting of Hill House',
      description: "In the summer of '92, a family of seven move into Hill House to renovate the mansion in order to sell it and build their own house. However, they begin to experience increasing paranormal phenomena.",
      image: '/assets/Image_For_Card_3.jpg'
    },
    {
      id: 2,
      title: 'Twin Peaks',
      description: 'In 1989, a local logger discovers a naked corpse wrapped in plastic on the bank of a river outside the town of Twin Peaks. When police arrive, the body is identified as high school senior and homecoming queen Laura Palmer.',
      image: '/assets/Images_For_Card_1.jpg'
    },
    {
      id: 3,
      title: 'Breaking Bad',
      description: 'Walter White is a struggling high school chemistry teacher from New Mexico, who becomes a crime lord in the local methamphetamine drug trade, driven to provide for his family financially after being diagnosed with lung cancer.',
      image: '/assets/Image_For_Card_5.jpg'
    },
    {
      id: 4,
      title: 'Stranger Things',
      description: 'In 1983, a kid named Will gets misteriously abducted by something and, after a few weird events, his loved ones begin an extensive search to find him.',
      image: '/assets/Images_For_Card_2.jpg'
    }
  ];

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
    });
  }
}
