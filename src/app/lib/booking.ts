import type { BookingRecord, BookingServices, BookingStatus, BookingTier } from '../types/booking';

type BookingRow = {
  id: string;
  name: string;
  email: string;
  booking_ref: string;
  tier: string;
  status: string;
  voucher_value: number;
  surgery_date: string;
  clinic: string;
  services: unknown;
};

const DEFAULT_SERVICES: BookingServices = {
  airportPickup: {
    status: 'Pending',
  },
  insurance: {
    status: 'Inactive',
  },
  hotline: {
    available: true,
  },
};

function normalizeTier(value: string): BookingTier {
  if (value === 'VIP' || value === 'Safety' || value === 'Essential') {
    return value;
  }
  return 'Essential';
}

function normalizeStatus(value: string): BookingStatus {
  if (value === 'Confirmed' || value === 'Pending Verification') {
    return value;
  }
  return 'Pending Verification';
}

function normalizeServices(services: unknown): BookingServices {
  if (!services || typeof services !== 'object') {
    return DEFAULT_SERVICES;
  }

  const typed = services as Partial<BookingServices>;
  return {
    airportPickup: {
      ...DEFAULT_SERVICES.airportPickup,
      ...typed.airportPickup,
    },
    insurance: {
      ...DEFAULT_SERVICES.insurance,
      ...typed.insurance,
    },
    hotline: {
      ...DEFAULT_SERVICES.hotline,
      ...typed.hotline,
    },
  };
}

export function mapBookingRowToRecord(row: BookingRow): BookingRecord {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    bookingRef: row.booking_ref,
    tier: normalizeTier(row.tier),
    status: normalizeStatus(row.status),
    voucherValue: Number(row.voucher_value ?? 0),
    surgeryDate: row.surgery_date,
    clinic: row.clinic,
    services: normalizeServices(row.services),
  };
}
