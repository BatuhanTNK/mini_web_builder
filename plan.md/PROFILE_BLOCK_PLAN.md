# Profile Block Geliştirme Planı

Bu belge, modern portfolyo ve link-in-bio (Linktree benzeri) sitelerinde sıkça kullanılan, Profile (Profil) bloğuna eklenebilecek yeni görsel ve işlevsel özelliklerin listesidir.

## 1. Görsel ve Tasarımsal Özellikler

- [x] **Avatar Çerçevesi / Halo Efekti** ✅
  - Profil resminin etrafında ince, gradient veya dönen bir animasyonlu halka.
  - *Amaç:* "Şu an canlı yayında" veya "yeni hikaye var" hissi vererek tıklanabilirliği ve odaklanmayı artırmak.
  - **Eklendi:** Property Panel'den açılıp kapanabilen, 2 renk seçimi ve dönen animasyon seçeneği ile.

- [x] **Kapak Görseli (Banner)** ✅
  - Tıpkı Twitter (X) veya LinkedIn'de olduğu gibi, avatarın arkasına yatay bir kapak resmi ekleme seçeneği.
  - *Amaç:* Daha geniş bir kişiselleştirme alanı sunmak.
  - **Eklendi:** Banner resmi upload + fallback renk seçeneği ile.

- [x] **Doğrulanmış Rozeti (Mavi Tik)** ✅
  - İsmin hemen yanına (Property Panel'den açılıp kapatılabilen) bir doğrulanmış onay işareti (Mavi Tik) eklenmesi.
  - *Amaç:* Otorite ve profesyonellik katmak.
  - **Eklendi:** Toggle ile açılıp kapanabilen Twitter tarzı mavi tik.

- [x] **Hizalama Seçenekleri** ✅
  - Profilin sadece ortada (Center) değil, sola (Left) veya sağa (Right) dayalı olarak düzenlenebilmesi.
  - **Eklendi:** Sol / Orta / Sağ hizalama seçenekleri.

## 2. İşlevsel (Fonksiyonel) Özellikler

- [x] **Konum / Çalışma Durumu (Status Badges)** ✅
  - Biyografinin altına küçük ikonlarla eklenebilir. 
  - Örnek: `📍 İstanbul, Türkiye` veya `🟢 Şu an yeni iş arıyor` / `🔴 Meşgul`.
  - **Eklendi:** Max 4 rozet, emoji + metin + renk özelleştirmesi ile.

- [x] **Hızlı Eylem Butonları (Quick Actions)** ✅
  - Biyografinin hemen altına, ana bağlantı butonlarından (ButtonBlock) bağımsız olarak çalışan 2-3 adet mini yan yana buton.
  - *Örnekler:* "Rehbere Ekle (vCard)", "Bana Kahve Ismarla", "E-posta Gönder".
  - **Eklendi:** Max 3 buton, emoji + metin + URL/mail/tel + renk özelleştirmesi ile.

- [x] **Hover Animasyonları (Avatar için)** ✅
  - Avatara fare ile gelindiğinde fotoğrafın hafifçe büyümesi (Scale), siyah-beyazdan renkliye dönmesi (Grayscale to Color) veya arka yüzünü göstermesi (Flip).
  - **Eklendi:** Scale / Grayscale→Color / Flip seçenekleri Property Panel'den.

- [x] **Profil Detay Genişletme (Read More)** ✅
  - Biyografi çok uzun olduğunda varsayılan olarak 2-3 satır gösterip, altına "...devamını oku" butonu eklemek.
  - **Eklendi:** 0–6 satır slider ile ayarlanabilir, "devamını oku / daha az göster" toggle.

## Mevcut Durum & Öncelik Sırası
*İlk olarak `Mavi Tik`, `Kapak Görseli (Banner)` ve `Hizalama` seçenekleri PropertyPanel üzerinden hızlıca sisteme entegre edilebilir.*
