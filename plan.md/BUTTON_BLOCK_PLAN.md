# 🔘 Buton (Button) Bloğu Gelişmiş Özellikleri Planı

NotebookLM MCP analizinden elde edilen bilgilere dayanarak, buton (button) bloğunun sağ panel özelliklerini zenginleştirmek için eklenebilecek gelişmiş özelliklerin listesi aşağıdadır.

### 1. ✅ Boyut ve Genişlik Ayarları
- **Açıklama:** Hazır buton boyutları (Küçük, Orta, Büyük), iç boşluk (padding) değerleri ve butonu tüm satıra yayma (%100 genişlik) seçeneği.
- **Ayarlar:**
  - Boyut: Küçük, Orta, Büyük (select)
  - Tam Genişlik: Açık/Kapalı (toggle)

### 2. ✅ Kenar Yuvarlama (Border Radius)
- **Açıklama:** Köşeli, hafif yuvarlak veya hap (pill/oval) stili için slider aracı ile px bazlı kontrol.
- **Ayar:** Range slider (0px - 50px)

### 3. ✅ Gelişmiş İkon Desteği
- **Açıklama:** Emoji seçimi, ikonun metne göre konumu (sağda/solda) ve boyutu ayarı.
- **Ayarlar:**
  - İkon: Emoji girişi
  - İkon Konumu: Sol / Sağ (select)

### 4. ✅ Tipografi (Yazı) Ayarları
- **Açıklama:** Buton metni için metin boyutu, kalınlık (font-weight) ve büyük/küçük harf (text-transform) kontrolleri.
- **Ayarlar:**
  - Yazı Boyutu: Küçük, Normal, Büyük (select)
  - Kalınlık: Normal, Kalın (toggle)
  - Metin Dönüşümü: Normal, BÜYÜK HARF (select)

### 5. ✅ Hover (Üzerine Gelme) Efektleri
- **Açıklama:** Fare ile butonun üzerine gelindiğinde arka plan/yazı rengi değişimi, opaklık ayarı, yukarı kayma veya büyüme gibi etkileşimler.
- **Ayarlar:**
  - Hover Efekti: Yok, Renk Değiştir, Yukarı Kay, Büyüme, Opaklık (select)

### 6. ✅ Gelişmiş Kenarlık (Border) Ayarları
- **Açıklama:** Kenarlık kalınlığı, stili ve rengi özelleştirmesi.
- **Ayarlar:**
  - Kenarlık Kalınlığı: Range slider (0px - 4px)
  - Kenarlık Rengi: Renk seçici
  - Kenarlık Stili: Düz, Kesik Çizgi, Noktalı (select)

### 7. ✅ Arka Plan ve Gradient
- **Açıklama:** Tek renk yerine, iki renkli geçiş (gradient) arka plan desteği.
- **Ayarlar:**
  - Gradient Modu: Açık/Kapalı (toggle)
  - Gradient Başlangıç Rengi: Renk seçici
  - Gradient Bitiş Rengi: Renk seçici

### 8. ✅ Animasyonlar
- **Açıklama:** Butona dikkat çekmek için "pulse", "bounce" gibi döngüsel animasyonlar.
- **Ayarlar:**
  - Animasyon: Yok, Pulse, Bounce, Shake (select)

### 9. ✅ Gelişmiş Bağlantı (Target ve Aksiyon) Ayarları
- **Açıklama:** Mevcut `_blank` / `_self` özelliklerine ek olarak telefon arama (`tel:`), e-posta gönderme (`mailto:`) bağlama kolaylığı.
- **Ayarlar:**
  - Bağlantı Tipi: URL, Telefon, E-posta (select)
  - Hedef: Yeni Sekmede Aç / Aynı Sayfada Aç (select)
