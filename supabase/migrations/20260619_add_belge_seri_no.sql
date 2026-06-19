-- Trafik sigortası teklif formuna eklenen "Belge Seri No" (araç tescil
-- belgesi / ruhsat seri no) alanı için leads tablosuna kolon ekler.
--
-- NOT: insert_lead(payload jsonb) RPC fonksiyonu payload içindeki tüm
-- alanları kolonlara mapliyorsa, aşağıdaki kolon ekleme yeterlidir.
-- Fonksiyon explicit kolon listesi kullanıyorsa, mevcut gövdesine
--   belge_seri_no = payload->>'belge_seri_no'
-- satırı da eklenmelidir (proje açıldığında fonksiyon gövdesi incelenip
-- gerekirse güncellenecek).

alter table public.leads
  add column if not exists belge_seri_no text;

comment on column public.leads.belge_seri_no is
  'Araç tescil belgesi (ruhsat) seri no — örn. AB123456. Yalnızca zorunlu trafik sigortası formunda toplanır.';
