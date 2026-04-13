-- Contact form requests for Blueberry Systems
create table if not exists contact_requests (
  id bigserial primary key,
  name text not null,
  email text not null,
  company text,
  budget text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

-- Allow anonymous inserts (website visitors)
alter table contact_requests enable row level security;

drop policy if exists "contact_requests anon insert" on contact_requests;
create policy "contact_requests anon insert" on contact_requests
  for insert with check (true);

-- Allow authenticated reads (admin)
drop policy if exists "contact_requests admin read" on contact_requests;
create policy "contact_requests admin read" on contact_requests
  for select using (auth.role() = 'authenticated');

drop policy if exists "contact_requests admin update" on contact_requests;
create policy "contact_requests admin update" on contact_requests
  for update using (auth.role() = 'authenticated');
