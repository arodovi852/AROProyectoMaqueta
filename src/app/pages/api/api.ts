import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Endpoint {
  method: string;
  path: string;
  description: string;
  parameters?: { name: string; type: string; required: boolean; description: string }[];
  response: string;
}

interface ApiSection {
  id: string;
  title: string;
  description: string;
  endpoints: Endpoint[];
}

/**
 * API Documentation Page
 * 
 * Documentation for the BROADCASTTD API
 */
@Component({
  selector: 'app-api',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './api.html',
  styleUrl: './api.scss',
})
export class Api {
  baseUrl = 'https://api.broadcasttd.com/v1';
  apiVersion = '1.0.0';

  features = [
    { icon: 'zap', title: 'Fast & Reliable', description: 'Low latency responses with 99.9% uptime' },
    { icon: 'code', title: 'RESTful Design', description: 'Clean, predictable resource-oriented URLs' },
    { icon: 'lock', title: 'Secure', description: 'OAuth 2.0 authentication and HTTPS encryption' },
    { icon: 'book', title: 'Well Documented', description: 'Comprehensive guides and examples' }
  ];

  sections: ApiSection[] = [
    {
      id: 'series',
      title: 'Series',
      description: 'Endpoints for retrieving and managing series information',
      endpoints: [
        {
          method: 'GET',
          path: '/series',
          description: 'Get a list of all series with pagination',
          parameters: [
            { name: 'page', type: 'integer', required: false, description: 'Page number (default: 1)' },
            { name: 'limit', type: 'integer', required: false, description: 'Items per page (max: 100)' },
            { name: 'genre', type: 'string', required: false, description: 'Filter by genre' },
            { name: 'status', type: 'string', required: false, description: 'Filter by status (ongoing, ended)' }
          ],
          response: '{ "data": [Series], "pagination": { "page": 1, "total": 1000 } }'
        },
        {
          method: 'GET',
          path: '/series/:id',
          description: 'Get detailed information about a specific series',
          parameters: [
            { name: 'id', type: 'integer', required: true, description: 'Series ID' }
          ],
          response: '{ "data": Series }'
        },
        {
          method: 'GET',
          path: '/series/:id/episodes',
          description: 'Get all episodes for a series',
          parameters: [
            { name: 'id', type: 'integer', required: true, description: 'Series ID' },
            { name: 'season', type: 'integer', required: false, description: 'Filter by season number' }
          ],
          response: '{ "data": [Episode] }'
        }
      ]
    },
    {
      id: 'users',
      title: 'Users',
      description: 'Endpoints for user management and profiles',
      endpoints: [
        {
          method: 'GET',
          path: '/users/me',
          description: 'Get the authenticated user\'s profile',
          response: '{ "data": User }'
        },
        {
          method: 'PATCH',
          path: '/users/me',
          description: 'Update the authenticated user\'s profile',
          parameters: [
            { name: 'username', type: 'string', required: false, description: 'New username' },
            { name: 'bio', type: 'string', required: false, description: 'User biography' },
            { name: 'avatar_url', type: 'string', required: false, description: 'Profile picture URL' }
          ],
          response: '{ "data": User }'
        },
        {
          method: 'GET',
          path: '/users/:id/watchlist',
          description: 'Get a user\'s public watchlist',
          parameters: [
            { name: 'id', type: 'integer', required: true, description: 'User ID' }
          ],
          response: '{ "data": [WatchlistItem] }'
        }
      ]
    },
    {
      id: 'lists',
      title: 'Lists',
      description: 'Endpoints for creating and managing series lists',
      endpoints: [
        {
          method: 'GET',
          path: '/lists',
          description: 'Get public lists with optional filtering',
          parameters: [
            { name: 'sort', type: 'string', required: false, description: 'Sort by: popular, recent, likes' },
            { name: 'user_id', type: 'integer', required: false, description: 'Filter by creator' }
          ],
          response: '{ "data": [List] }'
        },
        {
          method: 'POST',
          path: '/lists',
          description: 'Create a new list',
          parameters: [
            { name: 'title', type: 'string', required: true, description: 'List title' },
            { name: 'description', type: 'string', required: false, description: 'List description' },
            { name: 'is_public', type: 'boolean', required: false, description: 'Public visibility' },
            { name: 'series_ids', type: 'array', required: false, description: 'Initial series to add' }
          ],
          response: '{ "data": List }'
        },
        {
          method: 'POST',
          path: '/lists/:id/series',
          description: 'Add a series to a list',
          parameters: [
            { name: 'id', type: 'integer', required: true, description: 'List ID' },
            { name: 'series_id', type: 'integer', required: true, description: 'Series to add' }
          ],
          response: '{ "success": true }'
        }
      ]
    },
    {
      id: 'ratings',
      title: 'Ratings & Reviews',
      description: 'Endpoints for ratings and reviews',
      endpoints: [
        {
          method: 'POST',
          path: '/series/:id/rate',
          description: 'Rate a series',
          parameters: [
            { name: 'id', type: 'integer', required: true, description: 'Series ID' },
            { name: 'rating', type: 'number', required: true, description: 'Rating (0.5-5.0)' }
          ],
          response: '{ "data": Rating }'
        },
        {
          method: 'GET',
          path: '/series/:id/reviews',
          description: 'Get reviews for a series',
          parameters: [
            { name: 'id', type: 'integer', required: true, description: 'Series ID' },
            { name: 'sort', type: 'string', required: false, description: 'Sort by: recent, helpful' }
          ],
          response: '{ "data": [Review] }'
        },
        {
          method: 'POST',
          path: '/series/:id/reviews',
          description: 'Submit a review',
          parameters: [
            { name: 'id', type: 'integer', required: true, description: 'Series ID' },
            { name: 'content', type: 'string', required: true, description: 'Review text' },
            { name: 'contains_spoilers', type: 'boolean', required: false, description: 'Spoiler flag' }
          ],
          response: '{ "data": Review }'
        }
      ]
    }
  ];

  rateLimits = [
    { tier: 'Free', requests: '100 requests/hour', features: 'Basic endpoints' },
    { tier: 'Developer', requests: '1,000 requests/hour', features: 'All endpoints + webhooks' },
    { tier: 'Enterprise', requests: 'Unlimited', features: 'Priority support + SLA' }
  ];

  getMethodClass(method: string): string {
    const classes: Record<string, string> = {
      'GET': 'method--get',
      'POST': 'method--post',
      'PATCH': 'method--patch',
      'PUT': 'method--put',
      'DELETE': 'method--delete'
    };
    return classes[method] || '';
  }
}
