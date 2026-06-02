alter table public.submissions
  add column if not exists show_text boolean not null default true;

comment on column public.submissions.show_text is
  'Controls whether submitted text is visible through public PPGIS views.';
