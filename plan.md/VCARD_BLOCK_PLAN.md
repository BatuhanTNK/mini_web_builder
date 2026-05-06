# Dijital Kartvizit (VCard) Block Geliştirme Planı

Bu belge, modern dijital kartvizit bloğuna eklenebilecek yeni özellik ve iyileştirmelerin listesidir.

## Mevcut Durum

**Var Olanlar:**
- ✅ Profil fotoğrafı (dairesel kırpma ile)
- ✅ Ad, pozisyon, şirket bilgileri
- ✅ Telefon, e-posta, website linkleri
- ✅ vCard (.vcf) indirme butonu
- ✅ Tam renk paleti (avatar, metin, ikon, buton renkleri)

---

## 1. İletişim Bilgileri Genişletme

### 📍 Adres Bilgisi
- Fiziksel adres alanı ekle
- İkon: 📍 veya 🏢
- vCard'a `ADR` alanı olarak dahil edilir
- Örnek: "Kadıköy, İstanbul, Türkiye"

### 💼 LinkedIn / Sosyal Medya Linkleri
- LinkedIn profil URL'i
- Twitter/X handle
- Instagram profil
- Her biri için ayrı ikon ve link
- vCard'a `X-SOCIALPROFILE` olarak eklenebilir

### 📝 Notlar / Bio
- Kısa açıklama/bio alanı
- vCard'a `NOTE` olarak dahil edilir
- Maksimum 2-3 satır

---

## 2. Görsel ve Tasarım İyileştirmeleri

### 🎨 Arka Plan Stili
- **Düz renk** (mevcut)
- **Gradient** (2 renk arası geçiş)
- **Resim** (upload + blur/overlay seçenekleri)
- **Şeffaf** (sayfa arka planını göster)

### 🖼️ Kapak Görseli (Banner)
- Tıpkı ProfileBlock'taki gibi üst kısma banner
- Avatar banner üzerine overlap yapar
- Profesyonel görünüm

### 🔲 Kart Şekli
- **Yuvarlatılmış köşeler** (mevcut)
- **Keskin köşeler**
- **Tam yuvarlak** (pill shape)
- Köşe yuvarlama slider'ı (0-32px)

### 🌟 Gölge ve Derinlik
- Kart gölgesi (shadow) kontrolü
- Yükseklik hissi (elevation)
- Slider ile 0-5 arası seviye

### 📐 Hizalama
- Avatar + bilgilerin hizalaması
- **Sol** / **Orta** / **Sağ**
- Yatay layout seçeneği (avatar solda, bilgiler sağda)

---

## 3. İşlevsel Özellikler

### 📲 QR Kod
- Kartvizit bilgilerini içeren QR kod
- Toggle ile göster/gizle
- QR kod pozisyonu (sağ üst köşe / alt kısım)
- vCard verilerini QR'a encode et

### 📤 Paylaşım Butonları
- "Kişiyi Kaydet" yanına ek butonlar:
  - **Paylaş** (Web Share API)
  - **Kopyala** (vCard linkini kopyala)
  - **WhatsApp'ta Paylaş**
  - **E-posta ile Gönder**

### 🔗 Kısa Link / Slug
- Kartvizit için özel kısa URL
- Örnek: `site.com/card/john-doe`
- QR kod bu linki gösterir

### 📊 İstatistikler (İlerisi İçin)
- Kaç kişi kartviziti indirdi
- Kaç kişi QR kodu taradı
- Hangi linkler tıklandı

---

## 4. Ekstra Bilgi Alanları

### 🏷️ Etiketler / Beceriler
- Küçük pill şeklinde etiketler
- Örnek: "React", "UI/UX", "Freelancer"
- Maksimum 5-6 etiket
- Renk özelleştirmesi

### 🌐 Dil Seçenekleri
- Çoklu dil desteği
- Türkçe / İngilizce toggle
- Her dil için ayrı ad, pozisyon, bio

### 🎓 Sertifikalar / Rozetler
- Küçük ikonlar veya rozetler
- Örnek: "AWS Certified", "Google Partner"
- Maksimum 3-4 rozet

---

## 5. Animasyon ve Etkileşim

### ✨ Hover Efektleri
- Kart hover'da hafif yukarı kayma
- Gölge artışı
- Hafif scale (büyüme)

### 🎭 Giriş Animasyonu
- Fade in
- Slide from bottom
- Scale in
- Toggle ile açılıp kapanabilir

### 🖱️ İletişim Butonları Hover
- Hover'da ikon rengi değişimi
- Hafif büyüme efekti
- Arka plan rengi değişimi

---

## 6. Gelişmiş Özellikler (İlerisi İçin)

### 🎨 Tema Presetleri
- Hazır renk temaları
- **Profesyonel** (mavi tonlar)
- **Yaratıcı** (mor/pembe tonlar)
- **Minimal** (siyah/beyaz)
- **Doğa** (yeşil tonlar)

### 📱 Dijital Kartvizit Modu
- Tam ekran kartvizit görünümü
- Sadece kartvizit göster (diğer blokları gizle)
- Özel URL: `/card/username`

### 🔐 Gizlilik Ayarları
- Hangi bilgilerin gösterileceği
- Telefon/e-posta gizlenebilir
- Sadece QR kod ile paylaşım

### 📧 Otomatik E-posta İmzası
- vCard'dan HTML e-posta imzası oluştur
- Kopyala/yapıştır ile kullan
- Gmail, Outlook formatları

---

## Öncelik Sıralaması

### Faz 1: Temel İyileştirmeler (Hızlı Kazanımlar)
1. **QR Kod** — En çok talep edilen özellik
2. **Adres Bilgisi** — vCard standardında var
3. **Kart Gölgesi** — Görsel iyileştirme
4. **Köşe Yuvarlama Slider** — Kolay implement

### Faz 2: Görsel Zenginleştirme
5. **Arka Plan Gradient/Resim**
6. **Kapak Görseli (Banner)**
7. **Hizalama Seçenekleri**
8. **Hover Animasyonları**

### Faz 3: Sosyal ve Paylaşım
9. **LinkedIn / Sosyal Medya Linkleri**
10. **Paylaşım Butonları**
11. **Etiketler / Beceriler**
12. **Tema Presetleri**

---

## Uygulama Notları

### QR Kod İçin:
- `qrcode.react` veya `qrcode` npm paketi kullan
- vCard verisini veya kartvizit URL'ini encode et
- Toggle ile göster/gizle
- Boyut ve pozisyon ayarları

### Sosyal Medya İçin:
- Maksimum 4-5 platform
- Her biri için ikon + URL
- vCard'a `X-SOCIALPROFILE:type=linkedin;url=...` formatında ekle

### Arka Plan Gradient İçin:
- HeroBlock'taki gradient sistemini kullan
- 2 renk + açı seçimi
- Overlay opacity kontrolü

---

**Son Güncelleme:** 2026-05-05
**Durum:** Planlama Aşaması
**Öncelik:** Faz 1 - QR Kod ve Temel İyileştirmeler
