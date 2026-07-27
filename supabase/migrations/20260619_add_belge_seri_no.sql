-- Trafik sigortası teklif formuna eklenen "Belge Seri No" (araç tescil
-- belgesi / ruhsat seri no) alanı.
--
-- DÜZELTME (27.07.2026): Bu dosya ilk yazıldığında tablo adı `public.leads`
-- varsayıldığı için hiç uygulanamamıştı; gerçek tablo `public.lead_submissions`.
-- Ayrıca dosyadaki not doğru çıktı: insert_lead RPC'si explicit kolon listesi
-- kullanıyor, dolayısıyla yalnızca kolon eklemek yetmiyordu. Alan forma
-- eklenmiş ve mail'de görünüyor olmasına rağmen veritabanına hiç
-- yazılmıyordu — fonksiyon da aşağıda güncelleniyor.
--
-- Supabase'e `add_belge_seri_no_to_lead_submissions` adıyla uygulandı.

alter table public.lead_submissions
  add column if not exists belge_seri_no text;

comment on column public.lead_submissions.belge_seri_no is
  'Araç tescil belgesi (ruhsat) seri no — örn. AB123456. Yalnızca zorunlu trafik sigortası formunda toplanır.';

create or replace function public.insert_lead(payload jsonb)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  new_id uuid;
  v_source text;
  v_full_name text;
  v_phone text;
begin
  -- Required field validation
  v_source := payload->>'source';
  v_full_name := payload->>'full_name';
  v_phone := payload->>'phone';

  if v_source is null or v_source not in ('hero_quote', 'contact_form', 'product_quote') then
    raise exception 'invalid source';
  end if;
  if v_full_name is null or length(trim(v_full_name)) < 3 then
    raise exception 'invalid full_name';
  end if;
  if v_phone is null or length(regexp_replace(v_phone, '\D', '', 'g')) <> 10 then
    raise exception 'invalid phone';
  end if;
  if coalesce((payload->>'kvkk_consent')::boolean, false) is not true then
    raise exception 'kvkk consent required';
  end if;

  insert into public.lead_submissions (
    source,
    product_slug,
    product_label,
    full_name,
    phone,
    email,
    message,
    service,
    tc_kimlik,
    vkn,
    plaka,
    belge_seri_no,
    birth_date,
    address_text,
    kvkk_consent,
    user_agent,
    ip_address
  ) values (
    v_source,
    nullif(payload->>'product_slug', ''),
    nullif(payload->>'product_label', ''),
    v_full_name,
    regexp_replace(v_phone, '\D', '', 'g'),
    nullif(payload->>'email', ''),
    nullif(payload->>'message', ''),
    nullif(payload->>'service', ''),
    nullif(payload->>'tc_kimlik', ''),
    nullif(payload->>'vkn', ''),
    nullif(payload->>'plaka', ''),
    nullif(payload->>'belge_seri_no', ''),
    nullif(payload->>'birth_date', '')::date,
    nullif(payload->>'address_text', ''),
    true,
    nullif(payload->>'user_agent', ''),
    nullif(payload->>'ip_address', '')::inet
  )
  returning id into new_id;

  return new_id;
end;
$function$;
