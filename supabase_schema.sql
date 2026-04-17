-- Book Wish 앱 - Supabase 테이블 설정
-- Supabase 대시보드의 SQL Editor에서 실행하세요

create table if not exists public.books (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  author      text,
  category    text not null check (category in ('자기개발','국내소설','외국소설','에세이','경제','인문','심리','고전')),
  is_millie   boolean not null default false,
  created_at  timestamptz not null default now()
);

-- 누구나 읽기/쓰기/삭제 가능하도록 RLS 정책 설정
alter table public.books enable row level security;

create policy "Anyone can read books"
  on public.books for select
  using (true);

create policy "Anyone can insert books"
  on public.books for insert
  with check (true);

create policy "Anyone can delete books"
  on public.books for delete
  using (true);

create policy "Anyone can update books"
  on public.books for update
  using (true)
  with check (true);
