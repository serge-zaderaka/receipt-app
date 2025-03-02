import { BrowserStorageService } from 'src/services/storage.service';
import type { ReceiptStorage } from 'src/utils/types';

export const storageService = new BrowserStorageService<ReceiptStorage>('receipt-storage');
