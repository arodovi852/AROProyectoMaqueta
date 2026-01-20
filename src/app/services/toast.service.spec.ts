import { TestBed } from '@angular/core/testing';
import { ToastService, ToastMessage } from './toast.service';
import { firstValueFrom, skip } from 'rxjs';

/**
 * Tests para ToastService
 * FASE 7: Testing unitario de servicios
 */
describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show', () => {
    it('should emit toast message through observable', async () => {
      const toastPromise = firstValueFrom(service.toast$.pipe(skip(1)));
      service.show('Test message', 'info', 5000);
      
      const toast = await toastPromise;
      expect(toast?.message).toBe('Test message');
      expect(toast?.type).toBe('info');
      expect(toast?.duration).toBe(5000);
    });
  });

  describe('success', () => {
    it('should show success toast with correct type', async () => {
      const toastPromise = firstValueFrom(service.toast$.pipe(skip(1)));
      service.success('Success!');
      
      const toast = await toastPromise;
      expect(toast?.type).toBe('success');
      expect(toast?.message).toBe('Success!');
    });

    it('should use default duration of 4000ms for success', async () => {
      const toastPromise = firstValueFrom(service.toast$.pipe(skip(1)));
      service.success('Success!');
      
      const toast = await toastPromise;
      expect(toast?.duration).toBe(4000);
    });
  });

  describe('error', () => {
    it('should show error toast with correct type', async () => {
      const toastPromise = firstValueFrom(service.toast$.pipe(skip(1)));
      service.error('Error occurred');
      
      const toast = await toastPromise;
      expect(toast?.type).toBe('error');
      expect(toast?.message).toBe('Error occurred');
    });

    it('should use default duration of 8000ms for error', async () => {
      const toastPromise = firstValueFrom(service.toast$.pipe(skip(1)));
      service.error('Error occurred');
      
      const toast = await toastPromise;
      expect(toast?.duration).toBe(8000);
    });
  });

  describe('info', () => {
    it('should show info toast with correct type', async () => {
      const toastPromise = firstValueFrom(service.toast$.pipe(skip(1)));
      service.info('Info message');
      
      const toast = await toastPromise;
      expect(toast?.type).toBe('info');
      expect(toast?.message).toBe('Info message');
    });

    it('should use default duration of 3000ms for info', async () => {
      const toastPromise = firstValueFrom(service.toast$.pipe(skip(1)));
      service.info('Info message');
      
      const toast = await toastPromise;
      expect(toast?.duration).toBe(3000);
    });
  });

  describe('warning', () => {
    it('should show warning toast with correct type', async () => {
      const toastPromise = firstValueFrom(service.toast$.pipe(skip(1)));
      service.warning('Warning message');
      
      const toast = await toastPromise;
      expect(toast?.type).toBe('warning');
      expect(toast?.message).toBe('Warning message');
    });

    it('should use default duration of 6000ms for warning', async () => {
      const toastPromise = firstValueFrom(service.toast$.pipe(skip(1)));
      service.warning('Warning message');
      
      const toast = await toastPromise;
      expect(toast?.duration).toBe(6000);
    });
  });

  describe('custom duration', () => {
    it('should allow custom duration for success toast', async () => {
      const toastPromise = firstValueFrom(service.toast$.pipe(skip(1)));
      service.success('Custom duration', 10000);
      
      const toast = await toastPromise;
      expect(toast?.duration).toBe(10000);
    });

    it('should allow custom duration for error toast', async () => {
      const toastPromise = firstValueFrom(service.toast$.pipe(skip(1)));
      service.error('Custom duration', 15000);
      
      const toast = await toastPromise;
      expect(toast?.duration).toBe(15000);
    });
  });
});
