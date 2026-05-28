-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Profiles
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- CATEGORIES
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PRODUCTS
create table products (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  slug text unique not null,
  description text,
  short_description text,
  price decimal(10,2) not null,
  original_price decimal(10,2),
  category_id uuid references categories(id) on delete set null,
  images text[] default '{}',
  ingredients text[] default '{}',
  how_to_use text,
  is_bestseller boolean default false,
  is_new boolean default false,
  rating decimal(3,2) default 5.0,
  reviews_count integer default 0,
  stock integer default 100,
  tags text[] default '{}'
);

-- PRODUCT SIZES (One-to-many relationship)
create table product_sizes (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id) on delete cascade not null,
  label text not null,
  price decimal(10,2) not null
);

-- COUPONS
create table coupons (
  code text primary key,
  discount_percentage integer check (discount_percentage > 0 and discount_percentage <= 100),
  valid_until timestamp with time zone,
  usage_limit integer,
  used_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CART ITEMS
create table cart_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references products(id) on delete cascade not null,
  size_label text, -- Storing label directly for simplicity or link to product_sizes
  quantity integer default 1 check (quantity > 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id, size_label)
);

-- WISHLIST
create table wishlist (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references products(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- WEBSITE CONFIG (Testimonials, Headers)
create table website_customizations (
  key text primary key,
  content jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES (Basic)

-- Categories: Read public, Write admin
alter table categories enable row level security;
create policy "Categories are viewable by everyone" on categories for select using (true);
create policy "Admin can insert categories" on categories for insert with check (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "Admin can update categories" on categories for update using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "Admin can delete categories" on categories for delete using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Products: Read public, Write admin
alter table products enable row level security;
create policy "Products are viewable by everyone" on products for select using (true);
create policy "Admin can insert products" on products for insert with check (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "Admin can update products" on products for update using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "Admin can delete products" on products for delete using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Product Sizes: Read public, Write admin
alter table product_sizes enable row level security;
create policy "Sizes are viewable by everyone" on product_sizes for select using (true);
create policy "Admin can insert sizes" on product_sizes for insert with check (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "Admin can update sizes" on product_sizes for update using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "Admin can delete sizes" on product_sizes for delete using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Cart: Users can CRUD their own items
alter table cart_items enable row level security;
create policy "Users can view own cart" on cart_items for select using (auth.uid() = user_id);
create policy "Users can insert own cart" on cart_items for insert with check (auth.uid() = user_id);
create policy "Users can update own cart" on cart_items for update using (auth.uid() = user_id);
create policy "Users can delete own cart" on cart_items for delete using (auth.uid() = user_id);

-- Wishlist: Users can CRUD own items
alter table wishlist enable row level security;
create policy "Users can view own wishlist" on wishlist for select using (auth.uid() = user_id);
create policy "Users can insert own wishlist" on wishlist for insert with check (auth.uid() = user_id);
create policy "Users can delete own wishlist" on wishlist for delete using (auth.uid() = user_id);

-- Config: Read public, Write admin only
alter table website_customizations enable row level security;
create policy "Config viewable by everyone" on website_customizations for select using (true);
create policy "Admin can insert config" on website_customizations for insert with check (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "Admin can update config" on website_customizations for update using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
