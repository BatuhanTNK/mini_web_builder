# 🖼️ Görsel (Image) Bloğu Gelişmiş Özellikleri Planı

NotebookLM MCP analizinden elde edilen bilgilere dayanarak, görsel (image) bloğunun sağ panel özelliklerini zenginleştirmek için eklenebilecek gelişmiş özelliklerin listesi aşağıdadır.

### 1. En-Boy Oranı (Aspect Ratio) ve Sığdırma (Object Fit)
- **Açıklama:** Mevcut ImageBlock bileşenindeki aspectRatio ('16/9') sabitinin kullanıcıya açılması.
- **Seçenekler:**
  - En-Boy Oranı: Otomatik (Orijinal), 1:1 (Kare), 16:9 (Yatay), 4:3, 9:16 (Dikey Story formatı).
  - Görsel Sığdırma (Object Fit): `cover` (alanı tamamen kapla/kırp) veya `contain` (görselin tamamını kırpmadan göster, boşlukları koru).

### 2. Tıklanınca Büyütme (Lightbox / Zoom)
- **Açıklama:** Görsellere tıklandığında ekranı kaplayan (lightbox) büyütme özelliğinin tekil görsellere de eklenmesi (Mevcut GalleryBlock'ta olduğu gibi).
- **Ayar:** "Tıklanınca Tam Ekran Yap" (Açık/Kapalı toggle).

### 3. Maksimum Genişlik (Max-Width) ve Hizalama
- **Açıklama:** Görsellerin her zaman ekranın tamamını (%100) kaplamasını engellemek ve isteğe bağlı boyutlandırma/hizalama sunmak (Örn. logo veya ikon eklerken).
- **Ayar:** Yüzdelik (%25, %50, %75, %100) veya piksel bazlı maksimum genişlik kontrolü.
- **Hizalama:** Görsel tam genişlikte değilse Sola, Ortaya veya Sağa hizalama seçenekleri.

### 4. Gölge Efektleri (Drop Shadow / Box Shadow)
- **Açıklama:** Görsellere derinlik katmak için CSS box-shadow özellikleri.
- **Ayar:** Gölge Yok, Hafif Gölge (Sm), Orta Gölge (Md), Belirgin Gölge (Lg).

### 5. Renk Örtüsü (Overlay) Karartma Filtresi
- **Açıklama:** CoverBlock ve HeroBlock bileşenlerindeki karartma özelliğinin standart görsellere uygulanması. Görselin üzerinde karartıcı veya renklendirici bir katman oluşturur.
- **Ayarlar:** `overlayColor` ve `overlayOpacity` seçenekleri.

### 6. Görsel Filtreleri (CSS Filters)
- **Açıklama:** Doğrudan tarayıcı üzerinden görsele basit CSS filtreleri uygulama.
- **Ayarlar:**
  - `Grayscale`: Görseli siyah/beyaz yapma seçeneği (portfolyo veya takım görsellerinde popülerdir).
  - `Blur`: Görsele hafif bir sansür/buzlama efekti verme.

### 7. Görsel Alt Yazısı (Image Caption)
- **Açıklama:** Sadece ekran okuyucular için olan "Alt Metin" dışında, kullanıcıların görselin altında şık bir şekilde görünen bir açıklama metni ekleyebilmesi.
- **Ayar:** Alt Yazı Metni ve Alt Yazı Rengi.

---
**Önerilen Öncelikler:** En-Boy Oranı, Lightbox ve Maksimum Genişlik özellikleri, kullanıcı deneyimini hızlıca artıracağı için öncelikli olarak geliştirilebilir.
