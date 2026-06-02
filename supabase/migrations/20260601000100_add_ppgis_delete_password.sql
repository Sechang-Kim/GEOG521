alter table public.submissions
  add column if not exists delete_password_salt text,
  add column if not exists delete_password_hash text;

comment on column public.submissions.delete_password_salt is
  'Private salt for the 6-digit PPGIS edit/delete password. Do not expose in public views or frontend clients.';

comment on column public.submissions.delete_password_hash is
  'Private PBKDF2 hash for the 6-digit PPGIS edit/delete password. Do not expose in public views or frontend clients.';
