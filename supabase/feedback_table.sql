-- FEEDBACK
create table feedback (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  product_id uuid references products(id) on delete set null,
  product_name text,
  rating integer check (rating >= 1 and rating <= 5),
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Feedback
alter table feedback enable row level security;

-- Anyone can read feedback (to show on product pages)
create policy "Feedback is viewable by everyone" on feedback for select using (true);

-- Anyone can submit feedback (form is public-facing)
create policy "Anyone can insert feedback" on feedback for insert with check (true);
