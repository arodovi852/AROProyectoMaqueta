import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SeriesService, Series, SeriesListResponse } from './series.service';
import { firstValueFrom } from 'rxjs';

/**
 * Tests for SeriesService
 * PHASE 7: Service unit testing
 */
describe('SeriesService', () => {
  let service: SeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeriesService]
    });
    service = TestBed.inject(SeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loading and error signals', () => {
    it('should have loading signal initialized to false', () => {
      expect(service.loading()).toBeFalsy();
    });

    it('should have error signal initialized to null', () => {
      expect(service.error()).toBeNull();
    });
  });

  describe('getAllSeries', () => {
    it('should return mock series list', async () => {
      const result = await firstValueFrom(service.getAllSeries());
      
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should set loading to true while fetching', () => {
      service.getAllSeries().subscribe();
      expect(service.loading()).toBeTruthy();
    });
  });

  describe('getSeriesById', () => {
    it('should return a series by id', async () => {
      const result = await firstValueFrom(service.getSeriesById('1'));
      
      expect(result).toBeTruthy();
      expect(result.id).toBe('1');
      expect(result.title).toBe('Twin Peaks');
    });

    it('should throw error for non-existent id', async () => {
      await expect(firstValueFrom(service.getSeriesById('999'))).rejects.toThrow();
    });
  });

  describe('getSeriesFiltered', () => {
    it('should filter series by search term', async () => {
      const result = await firstValueFrom(service.getSeriesFiltered(1, 10, 'Twin'));
      
      expect(result).toBeTruthy();
      expect(result.items.length).toBeGreaterThan(0);
      expect(result.items.some(s => s.title.includes('Twin'))).toBeTruthy();
    });

    it('should filter series by genre', async () => {
      const result = await firstValueFrom(service.getSeriesFiltered(1, 10, undefined, 'Horror'));
      
      expect(result).toBeTruthy();
      result.items.forEach((series) => {
        expect(series.genre.includes('Horror')).toBeTruthy();
      });
    });

    it('should return correct page size', async () => {
      const result = await firstValueFrom(service.getSeriesFiltered(1, 2));
      
      expect(result).toBeTruthy();
      expect(result.items.length).toBeLessThanOrEqual(2);
      expect(result.pageSize).toBe(2);
    });
  });

  describe('create', () => {
    it('should create a new series', async () => {
      const newSeries = {
        title: 'New Test Series',
        description: 'A test description',
        year: 2024,
        genre: ['Drama'],
        seasons: 1,
        status: 'ongoing' as const
      };

      const result = await firstValueFrom(service.create(newSeries));
      
      expect(result).toBeTruthy();
      expect(result.id).toBeTruthy();
      expect(result.title).toBe(newSeries.title);
      expect(result.rating).toBe(0);
    });
  });

  describe('update', () => {
    it('should update an existing series', async () => {
      const result = await firstValueFrom(service.update('1', { title: 'Updated Title' }));
      
      expect(result).toBeTruthy();
      expect(result.title).toBe('Updated Title');
    });

    it('should throw error for non-existent series', async () => {
      await expect(firstValueFrom(service.update('999', { title: 'Updated' }))).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete a series without error', async () => {
      await expect(firstValueFrom(service.delete('1'))).resolves.toBeUndefined();
    });
  });
});
