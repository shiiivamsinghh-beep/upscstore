-- Create the products table
create table public.products (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  institute text, -- e.g. Vision IAS, Vajiram
  price integer not null,
  original_price integer,
  category text not null check (category in ('gs', 'optional', 'test-series', 'current-affairs', 'books')),
  image text,
  rating numeric default 0,
  reviews integer default 0,
  is_best_seller boolean default false,
  is_new boolean default false
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Create Policy: Allow public read access (Anyone can view products)
create policy "Public Read Access"
  on public.products
  for select
  to public
  using (true);

-- Create Policy: Allow admin write access (Only authenticated users can add/edit)
-- Note: In a real app, you'd restrict this further to specific admin user IDs or roles.
create policy "Authenticated Admin Access"
  on public.products
  for all
  to authenticated
  using (true)
  with check (true);

-- Create Storage Bucket for Product Images
insert into storage.buckets (id, name, public) 
values ('product-images', 'product-images', true);

create policy "Public Access to Product Images"
  on storage.objects for select
  using ( bucket_id = 'product-images' );

create policy "Authenticated Upload to Product Images"
  on storage.objects for insert
  with check ( bucket_id = 'product-images' and auth.role() = 'authenticated' );
