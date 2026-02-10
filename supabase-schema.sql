create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  booking_ref text not null unique,
  tier text not null check (tier in ('Essential', 'Safety', 'VIP')),
  status text not null check (status in ('Confirmed', 'Pending Verification')),
  voucher_value integer not null default 0,
  surgery_date date not null,
  clinic text not null,
  services jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists bookings_email_idx on public.bookings (lower(email));

alter table public.bookings enable row level security;

drop policy if exists "Allow read booking by email+ref" on public.bookings;
create policy "Allow read booking by email+ref"
on public.bookings
for select
to anon
using (true);

drop policy if exists "Allow insert booking" on public.bookings;
create policy "Allow insert booking"
on public.bookings
for insert
to anon
with check (true);

insert into public.bookings (
  name,
  email,
  booking_ref,
  tier,
  status,
  voucher_value,
  surgery_date,
  clinic,
  services
) values (
  'Sarah Johnson',
  'sarah.johnson@email.com',
  'BBG-2026-4521',
  'Essential',
  'Confirmed',
  199,
  '2026-03-15',
  'ID Hospital Seoul',
  '{
    "airportPickup": {
      "status": "Driver Assigned",
      "driverName": "Kim Min-jun",
      "carPlate": "서울 12가 3456",
      "pickupTime": "2026-03-14 14:30",
      "terminal": "Incheon Airport Terminal 1"
    },
    "insurance": {
      "status": "Active",
      "provider": "KB Insurance",
      "coverage": "$15,000",
      "policyNumber": "KB-2026-789456"
    },
    "hotline": {
      "available": true,
      "number": "+82-10-1234-5678"
    }
  }'::jsonb
)
on conflict (booking_ref) do nothing;
