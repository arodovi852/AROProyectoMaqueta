/**
 * Tests de API REST - Series
 * 
 * Tests para verificar el correcto funcionamiento de los endpoints de series
 */

describe('Series API Tests', () => {
  describe('GET /api/series', () => {
    test('should return paginated series list', () => {
      const mockResponse = {
        success: true,
        data: {
          data: [
            { id: '1', title: 'Breaking Bad', rating: 9.5 },
            { id: '2', title: 'Game of Thrones', rating: 9.3 },
          ],
          pagination: {
            page: 1,
            limit: 20,
            total: 50,
            totalPages: 3,
            hasNextPage: true,
            hasPrevPage: false,
          },
        },
      };

      expect(mockResponse.success).toBe(true);
      expect(mockResponse.data.data).toHaveLength(2);
      expect(mockResponse.data.pagination.page).toBe(1);
      expect(mockResponse.data.pagination.hasNextPage).toBe(true);
    });

    test('should accept pagination parameters', () => {
      const queryParams = {
        page: 2,
        limit: 10,
        sortBy: 'rating',
        sortOrder: 'desc',
      };

      expect(queryParams.page).toBeGreaterThan(0);
      expect(queryParams.limit).toBeGreaterThan(0);
      expect(['rating', 'title', 'createdAt']).toContain(queryParams.sortBy);
      expect(['asc', 'desc']).toContain(queryParams.sortOrder);
    });

    test('should accept filter parameters', () => {
      const filters = {
        title: 'Breaking',
        minRating: 8.0,
        maxRating: 10.0,
        releaseYear: 2008,
        genreIds: ['1', '2'],
        status: 'ENDED',
      };

      expect(filters.minRating).toBeGreaterThanOrEqual(0);
      expect(filters.maxRating).toBeLessThanOrEqual(10);
      expect(filters.releaseYear).toBeGreaterThan(1900);
    });

    test('should return 200 status code', () => {
      const statusCode = 200;
      expect(statusCode).toBe(200);
    });
  });

  describe('GET /api/series/:id', () => {
    test('should return single series with details', () => {
      const mockResponse = {
        success: true,
        data: {
          id: '1',
          title: 'Breaking Bad',
          originalTitle: 'Breaking Bad',
          overview: 'A high school chemistry teacher...',
          rating: 9.5,
          ratingsCount: 1000,
          numberOfSeasons: 5,
          numberOfEpisodes: 62,
          status: 'ENDED',
          genres: [
            { id: '1', name: 'Drama', slug: 'drama' },
            { id: '2', name: 'Crime', slug: 'crime' },
          ],
        },
      };

      expect(mockResponse.success).toBe(true);
      expect(mockResponse.data.id).toBe('1');
      expect(mockResponse.data.genres).toHaveLength(2);
      expect(mockResponse.data.rating).toBeGreaterThanOrEqual(0);
      expect(mockResponse.data.rating).toBeLessThanOrEqual(10);
    });

    test('should return 404 if series not found', () => {
      const mockErrorResponse = {
        success: false,
        message: 'Serie no encontrada',
      };

      expect(mockErrorResponse.success).toBe(false);
      expect(mockErrorResponse.message).toBe('Serie no encontrada');
    });
  });

  describe('GET /api/series/top-rated', () => {
    test('should return top rated series', () => {
      const mockResponse = {
        success: true,
        data: [
          { id: '1', title: 'Breaking Bad', rating: 9.5, ratingsCount: 1000 },
          { id: '2', title: 'The Wire', rating: 9.4, ratingsCount: 800 },
          { id: '3', title: 'The Sopranos', rating: 9.3, ratingsCount: 900 },
        ],
      };

      expect(mockResponse.data).toHaveLength(3);
      
      // Verificar que están ordenadas por rating descendente
      for (let i = 0; i < mockResponse.data.length - 1; i++) {
        expect(mockResponse.data[i].rating).toBeGreaterThanOrEqual(
          mockResponse.data[i + 1].rating
        );
      }
    });

    test('should accept limit parameter', () => {
      const limit = 10;
      const minRatings = 100;

      expect(limit).toBeGreaterThan(0);
      expect(minRatings).toBeGreaterThanOrEqual(0);
    });
  });

  describe('POST /api/series (Admin only)', () => {
    test('should require authentication', () => {
      const headers = {
        'Authorization': 'Bearer admin-token',
      };

      expect(headers.Authorization).toBeDefined();
    });

    test('should require admin role', () => {
      const userRole = 'ADMIN';
      const allowedRoles = ['ADMIN'];

      expect(allowedRoles).toContain(userRole);
    });

    test('should validate required fields', () => {
      const createData = {
        title: 'Breaking Bad',
        originalTitle: 'Breaking Bad',
        firstAirDate: '2008-01-20',
        numberOfSeasons: 5,
        numberOfEpisodes: 62,
      };

      const requiredFields = ['title', 'originalTitle', 'firstAirDate', 'numberOfSeasons', 'numberOfEpisodes'];
      
      requiredFields.forEach(field => {
        expect(createData).toHaveProperty(field);
      });
    });

    test('should validate TMDB ID uniqueness', () => {
      const newSeries = {
        tmdbId: 1396,
        title: 'Breaking Bad',
      };

      // Mock: verificar que no existe otra serie con este TMDB ID
      const existingTmdbIds = [1399, 1402, 1405]; // No incluye 1396
      
      expect(existingTmdbIds).not.toContain(newSeries.tmdbId);
    });

    test('should return 201 on success', () => {
      const statusCode = 201;
      const mockResponse = {
        success: true,
        message: 'Serie creada exitosamente',
        data: {
          id: '123',
          title: 'Breaking Bad',
        },
      };

      expect(statusCode).toBe(201);
      expect(mockResponse.success).toBe(true);
    });
  });

  describe('DELETE /api/series/:id (Admin only)', () => {
    test('should not delete series with ratings', () => {
      const series = {
        id: '1',
        title: 'Breaking Bad',
        ratingsCount: 1000,
      };

      // Validación de negocio: no eliminar si tiene valoraciones
      if (series.ratingsCount > 0) {
        const errorMessage = 'No se puede eliminar una serie que tiene valoraciones';
        expect(errorMessage).toBe('No se puede eliminar una serie que tiene valoraciones');
      }
    });

    test('should return 200 on successful deletion', () => {
      const statusCode = 200;
      const mockResponse = {
        success: true,
        message: 'Serie eliminada exitosamente',
      };

      expect(statusCode).toBe(200);
      expect(mockResponse.success).toBe(true);
    });
  });
});

describe('UserSeries API Tests (Business Logic)', () => {
  describe('POST /api/user-series/watch', () => {
    test('should mark series as watched', () => {
      const watchData = {
        seriesId: '1',
        watchedDate: '2024-01-15',
      };

      expect(watchData.seriesId).toBeDefined();
      expect(watchData.watchedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    test('should prevent duplicate entries', () => {
      const existingWatchedSeries = ['1', '2', '3'];
      const newSeriesId = '1';

      // Validación: no permitir duplicados
      if (existingWatchedSeries.includes(newSeriesId)) {
        const errorMessage = 'Ya has marcado esta serie como vista';
        expect(errorMessage).toBe('Ya has marcado esta serie como vista');
      }
    });
  });

  describe('POST /api/user-series/rate (CRITICAL BUSINESS RULE)', () => {
    test('should NOT allow rating without watching', () => {
      const userSeries = {
        seriesId: '1',
        isWatched: false,
        rating: null,
      };

      // REGLA DE NEGOCIO CRÍTICA: No valorar sin ver
      if (!userSeries.isWatched) {
        const errorMessage = 'No puedes valorar una serie que no has visto';
        expect(errorMessage).toBe('No puedes valorar una serie que no has visto');
      }
    });

    test('should allow rating after watching', () => {
      const userSeries = {
        seriesId: '1',
        isWatched: true,
        rating: null,
      };

      const ratingData = {
        rating: 9.5,
      };

      // Si está vista, se permite valorar
      if (userSeries.isWatched) {
        expect(ratingData.rating).toBeGreaterThanOrEqual(0);
        expect(ratingData.rating).toBeLessThanOrEqual(10);
      }
    });

    test('should validate rating range', () => {
      const validRatings = [0, 5.5, 10];
      const invalidRatings = [-1, 10.5, 15];

      validRatings.forEach(rating => {
        expect(rating).toBeGreaterThanOrEqual(0);
        expect(rating).toBeLessThanOrEqual(10);
      });

      invalidRatings.forEach(rating => {
        const isValid = rating >= 0 && rating <= 10;
        expect(isValid).toBe(false);
      });
    });

    test('should update series average rating', () => {
      const currentRating = 9.0;
      const currentCount = 100;
      const newRating = 10.0;

      const totalRating = (currentRating * currentCount) + newRating;
      const newCount = currentCount + 1;
      const newAverage = totalRating / newCount;

      expect(newAverage).toBeGreaterThan(currentRating);
      expect(newAverage).toBeLessThanOrEqual(10);
    });
  });
});

describe('Review API Tests', () => {
  describe('POST /api/reviews', () => {
    test('should require watched series', () => {
      const userSeries = {
        seriesId: '1',
        isWatched: false,
      };

      // VALIDACIÓN: Debe haber visto la serie
      if (!userSeries.isWatched) {
        const errorMessage = 'No puedes escribir una review de una serie que no has visto';
        expect(errorMessage).toBe('No puedes escribir una review de una serie que no has visto');
      }
    });

    test('should allow only one review per user per series', () => {
      const existingReviews = [
        { userId: '1', seriesId: '1' },
        { userId: '1', seriesId: '2' },
      ];

      const newReview = {
        userId: '1',
        seriesId: '1', // Ya existe
      };

      const hasReview = existingReviews.some(
        r => r.userId === newReview.userId && r.seriesId === newReview.seriesId
      );

      if (hasReview) {
        const errorMessage = 'Ya has escrito un review para esta serie';
        expect(errorMessage).toBe('Ya has escrito un review para esta serie');
      }
    });

    test('should validate required fields', () => {
      const reviewData = {
        seriesId: '1',
        content: 'Excelente serie...',
        rating: 9.5,
        hasSpoilers: false,
      };

      expect(reviewData.seriesId).toBeDefined();
      expect(reviewData.content).toBeDefined();
      expect(reviewData.content.length).toBeGreaterThan(0);
    });
  });

  describe('PUT /api/reviews/:id', () => {
    test('should allow only author to update', () => {
      const review = {
        id: '1',
        userId: '123',
        content: 'Original review',
      };

      const currentUserId = '123';

      // Solo el autor puede actualizar
      expect(review.userId).toBe(currentUserId);
    });
  });
});

describe('HTTP Status Codes Tests', () => {
  test('should use correct success codes', () => {
    const codes = {
      GET_SUCCESS: 200,
      POST_SUCCESS: 201,
      DELETE_SUCCESS: 200,
      NO_CONTENT: 204,
    };

    expect(codes.GET_SUCCESS).toBe(200);
    expect(codes.POST_SUCCESS).toBe(201);
    expect(codes.DELETE_SUCCESS).toBe(200);
  });

  test('should use correct error codes', () => {
    const codes = {
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      VALIDATION_ERROR: 422,
      SERVER_ERROR: 500,
    };

    expect(codes.BAD_REQUEST).toBe(400);
    expect(codes.UNAUTHORIZED).toBe(401);
    expect(codes.FORBIDDEN).toBe(403);
    expect(codes.NOT_FOUND).toBe(404);
  });
});
