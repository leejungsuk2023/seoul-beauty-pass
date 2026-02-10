export type BookingTier = 'Essential' | 'Safety' | 'VIP';
export type BookingStatus = 'Confirmed' | 'Pending Verification';

export interface BookingAirportPickup {
  status: string;
  driverName?: string;
  carPlate?: string;
  pickupTime?: string;
  terminal?: string;
}

export interface BookingInsurance {
  status: string;
  provider?: string;
  coverage?: string;
  policyNumber?: string;
}

export interface BookingHotline {
  available: boolean;
  number?: string;
}

export interface BookingServices {
  airportPickup: BookingAirportPickup;
  insurance: BookingInsurance;
  hotline: BookingHotline;
}

export interface BookingRecord {
  id: string;
  name: string;
  email: string;
  bookingRef: string;
  tier: BookingTier;
  status: BookingStatus;
  voucherValue: number;
  surgeryDate: string;
  clinic: string;
  services: BookingServices;
}
