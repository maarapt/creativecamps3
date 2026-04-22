create extension if not exists pgcrypto;

create table if not exists public.authorized_users (
  id text primary key,
  email text not null unique,
  role text not null check (role in ('staff', 'mentor', 'participant')),
  full_name text not null,
  display_name text,
  show_legal_name boolean not null default true,
  instagram text,
  date_label text,
  room_id text,
  account_status text not null default 'Conta pendente',
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  authorized_user_id text references public.authorized_users (id) on delete set null,
  email text not null unique,
  role text not null,
  full_name text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.groups (
  id text primary key,
  day text not null,
  period text not null,
  studio text not null,
  mentor_id text not null references public.authorized_users (id) on delete restrict,
  final_lyrics text not null default '',
  session_feedback text not null default '',
  audio_upload_name text not null default '',
  audio_upload_size_label text not null default '',
  is_locked boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.group_members (
  group_id text not null references public.groups (id) on delete cascade,
  participant_id text not null references public.authorized_users (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (group_id, participant_id)
);

create table if not exists public.feedback_entries (
  author_key text primary key,
  author_email text,
  author_role text,
  message text not null,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.access_recovery_requests (
  email text primary key,
  user_id text references public.authorized_users (id) on delete set null,
  name text not null,
  role text not null,
  requested_at timestamptz not null default timezone('utc', now()),
  resolved boolean not null default false,
  prepared_at timestamptz
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_authorized_users_updated_at on public.authorized_users;
create trigger set_authorized_users_updated_at
before update on public.authorized_users
for each row
execute function public.set_updated_at();

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_groups_updated_at on public.groups;
create trigger set_groups_updated_at
before update on public.groups
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  invited public.authorized_users;
begin
  select *
  into invited
  from public.authorized_users
  where lower(email) = lower(new.email)
  limit 1;

  if invited.id is null then
    return new;
  end if;

  insert into public.profiles (id, authorized_user_id, email, role, full_name)
  values (new.id, invited.id, lower(new.email), invited.role, invited.full_name)
  on conflict (id) do update
    set
      authorized_user_id = excluded.authorized_user_id,
      email = excluded.email,
      role = excluded.role,
      full_name = excluded.full_name,
      updated_at = timezone('utc', now());

  update public.authorized_users
  set account_status = 'Conta criada'
  where id = invited.id;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_auth_user();

alter table public.authorized_users enable row level security;
alter table public.profiles enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.feedback_entries enable row level security;
alter table public.access_recovery_requests enable row level security;

drop policy if exists "authorized users are readable" on public.authorized_users;
create policy "authorized users are readable"
on public.authorized_users
for select
to anon, authenticated
using (true);

drop policy if exists "authorized users are writable by authenticated users" on public.authorized_users;
create policy "authorized users are writable by authenticated users"
on public.authorized_users
for all
to authenticated
using (true)
with check (true);

drop policy if exists "profiles are readable by authenticated users" on public.profiles;
create policy "profiles are readable by authenticated users"
on public.profiles
for select
to authenticated
using (true);

drop policy if exists "groups are readable by authenticated users" on public.groups;
create policy "groups are readable by authenticated users"
on public.groups
for select
to authenticated
using (true);

drop policy if exists "groups are writable by authenticated users" on public.groups;
create policy "groups are writable by authenticated users"
on public.groups
for all
to authenticated
using (true)
with check (true);

drop policy if exists "group members are readable by authenticated users" on public.group_members;
create policy "group members are readable by authenticated users"
on public.group_members
for select
to authenticated
using (true);

drop policy if exists "group members are writable by authenticated users" on public.group_members;
create policy "group members are writable by authenticated users"
on public.group_members
for all
to authenticated
using (true)
with check (true);

drop policy if exists "feedback is readable by authenticated users" on public.feedback_entries;
create policy "feedback is readable by authenticated users"
on public.feedback_entries
for select
to authenticated
using (true);

drop policy if exists "feedback is writable by authenticated users" on public.feedback_entries;
create policy "feedback is writable by authenticated users"
on public.feedback_entries
for all
to authenticated
using (true)
with check (true);

drop policy if exists "recovery requests are readable by authenticated users" on public.access_recovery_requests;
create policy "recovery requests are readable by authenticated users"
on public.access_recovery_requests
for select
to authenticated
using (true);

drop policy if exists "recovery requests are writable by anyone" on public.access_recovery_requests;
create policy "recovery requests are writable by anyone"
on public.access_recovery_requests
for all
to anon, authenticated
using (true)
with check (true);

insert into public.authorized_users (
  id,
  email,
  role,
  full_name,
  display_name,
  show_legal_name,
  instagram,
  date_label,
  room_id,
  account_status,
  notes
)
values
  ('staff-daniel', 'danieldacruz@maara.pt', 'staff', 'Daniel da Cruz', null, true, null, null, null, 'Conta pendente', null),
  ('staff-sofia', 'sofiacecilio@maara.pt', 'staff', 'Sofia Cecílio', null, true, null, null, null, 'Conta pendente', null),
  ('staff-maria', 'mariabarreira@maara.pt', 'staff', 'Maria Barreira', null, true, null, null, null, 'Conta pendente', null),
  ('staff-gadunhas', 'gadunhas@maara.pt', 'staff', 'G. Adunhas', null, true, null, null, null, 'Conta pendente', null),
  ('mentor-1', 'franciscomarques.mentor@maara.pt', 'mentor', 'Francisco Marques', null, true, '@next.level.prod', '25 a 28 junho', null, 'Conta pendente', null),
  ('mentor-2', 'tommas.mentor@maara.pt', 'mentor', 'Tommas', null, true, '@tommasmusic', '25 a 28 junho', null, 'Conta pendente', null),
  ('mentor-3', 'inesapenas.mentor@maara.pt', 'mentor', 'Inês Apenas', null, true, '@ines___apenas', '26 junho', null, 'Conta pendente', null),
  ('mentor-4', 'luarmusic.mentor@maara.pt', 'mentor', 'Luar', null, true, '@luarmusic_', '27 junho', null, 'Conta pendente', null),
  ('participant-1', 'jpmp3000@gmail.com', 'participant', 'José Portela', null, true, '@theportasog', null, 'room-1', 'Conta pendente', 'Chegada confirmada.'),
  ('participant-2', 'luis.sa.music@gmail.com', 'participant', 'Luís Sá', null, true, '@_luis.f.sa_', null, 'room-6', 'Conta pendente', 'Confirmar horário de chegada.'),
  ('participant-3', 'carolinaalmeidagama@gmail.com', 'participant', 'Carolina Gama', null, true, '@so_marte', null, 'room-5', 'Conta pendente', 'Preferência alimentar comunicada.'),
  ('participant-4', 'rafaelsequeiralves@gmail.com', 'participant', 'Rafael Alves', null, true, '@_rafaelsequeira', null, 'room-4', 'Conta pendente', null),
  ('participant-5', 'dossantos.ludovic@gmail.com', 'participant', 'Ludovic dos Santos', null, true, '@luvisantosmusic', null, 'room-6', 'Conta pendente', 'Atribuição de grupo pronta para validação.'),
  ('participant-6', 'joanabbanza@gmail.com', 'participant', 'Joana Banza', null, true, '@joanabbanza', null, 'room-2', 'Conta pendente', null),
  ('participant-7', 'carolina.melodias@gmail.com', 'participant', 'Carolina Dias', 'Mê.Lo', false, '@me.lo__', null, 'room-2', 'Conta pendente', null),
  ('participant-8', 'catarina.g.brandao@gmail.com', 'participant', 'Catarina Brandão', null, true, '@catarinagb12', null, 'room-3', 'Conta pendente', 'Enviar briefing final.'),
  ('participant-9', 'margaridacastanheiraaa@gmail.com', 'participant', 'Margarida Castanheira', null, true, '@heyitsguida', null, 'room-3', 'Conta pendente', null),
  ('participant-10', 'afap2003@gmail.com', 'participant', 'André Pereira', null, true, '@andrrepereira_', null, 'room-4', 'Conta pendente', null),
  ('participant-11', 'prodbyswaintz@gmail.com', 'participant', 'David Santos', 'Swaintz', false, '@swaintzz', null, 'room-1', 'Conta pendente', 'Necessita confirmação de upload final.'),
  ('participant-12', 'aboutjlm.info@gmail.com', 'participant', 'José Luís Monteiro', null, true, '@aboutjlm', null, 'room-1', 'Conta pendente', null),
  ('participant-13', 'natachaduartecruz@gmail.com', 'participant', 'Natacha Duarte', null, true, '@_natachaduarte', null, 'room-5', 'Conta pendente', 'Feedback de chegada já recolhido.'),
  ('participant-14', 'puttobooking@gmail.com', 'participant', 'Putto', null, true, '@putto_56', null, 'room-1', 'Conta pendente', null)
on conflict (email) do update
set
  id = excluded.id,
  role = excluded.role,
  full_name = excluded.full_name,
  display_name = excluded.display_name,
  show_legal_name = excluded.show_legal_name,
  instagram = excluded.instagram,
  date_label = excluded.date_label,
  room_id = excluded.room_id,
  notes = excluded.notes;
