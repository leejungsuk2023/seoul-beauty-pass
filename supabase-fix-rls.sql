-- Fix RLS policy to allow INSERT for booking creation
drop policy if exists "Allow insert booking" on public.bookings;
create policy "Allow insert booking"
on public.bookings
for insert
to anon
with check (true);

-- Allow UPDATE for admin dashboard
drop policy if exists "Allow update booking" on public.bookings;
create policy "Allow update booking"
on public.bookings
for update
to anon
using (true)
with check (true);
