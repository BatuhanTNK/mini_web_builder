# 🎯 Builder Geliştirme Planı

Modern bir web builder için **olmazsa olmaz** özelliklerin öncelik sırasına göre listesi.

---

## 🔴 KRİTİK - Mutlaka Olmalı (Hemen Ekle)

### 1. Blok Çoğaltma (Duplicate) ⭐⭐⭐⭐⭐

**Neden Gerekli:**
- Kullanıcılar aynı bloğu tekrar tekrar oluşturmak istemez
- En sık kullanılan özelliklerden biri
- Hızlı prototipleme için şart

**Kullanım:**
- Bir bloğu kopyalayıp hızlıca çoğalt
- Canvas'ta blok üzerinde "Çoğalt" butonu
- Klavye kısayolu: Ctrl+D

**Etki:**
- %80 zaman tasarrufu
- Kullanıcı memnuniyeti artışı

**Tahmini Süre:** 5-10 dakika

---

### 2. Geri Al/İleri Al (Undo/Redo) ⭐⭐⭐⭐⭐

**Neden Gerekli:**
- Hata yapınca geri dönebilmek şart
- Kullanıcı güveni için kritik
- Deneme yanılma yapabilme özgürlüğü

**Kullanım:**
- Ctrl+Z (Geri Al)
- Ctrl+Y veya Ctrl+Shift+Z (İleri Al)
- Son 20-50 işlemi sakla

**Etki:**
- Kullanıcı güveni ve rahatlığı
- Hata korkusu olmadan deneme

**Tahmini Süre:** 30-45 dakika

---

### 3. Responsive Önizleme ⭐⭐⭐⭐⭐

**Neden Gerekli:**
- Mobil kullanım %70+
- Mobilde nasıl göründüğünü görmek şart
- Responsive tasarım kontrolü

**Kullanım:**
- Mobil/Tablet/Desktop görünüm değiştir
- Topbar'da cihaz seçici butonlar
- Gerçek cihaz boyutlarında önizleme

**Etki:**
- Profesyonel sonuç
- Mobil uyumluluk garantisi

**Tahmini Süre:** 15-20 dakika

---

### 4. Klavye Kısayolları ⭐⭐⭐⭐

**Neden Gerekli:**
- Hızlı çalışma için gerekli
- Profesyonel kullanıcılar için şart
- Mouse kullanımını azaltır

**Kullanım:**
- **Ctrl+C/V** - Kopyala/Yapıştır
- **Ctrl+D** - Çoğalt
- **Delete** - Sil
- **Arrow Keys** - Yukarı/Aşağı taşı
- **Ctrl+Z/Y** - Geri Al/İleri Al
- **Esc** - Seçimi kaldır

**Etki:**
- %50 hız artışı
- Profesyonel kullanıcı deneyimi

**Tahmini Süre:** 15-20 dakika

---

## 🟡 ÇOK ÖNEMLİ - Yakında Ekle

### 5. Arka Plan Resmi/Gradient ⭐⭐⭐⭐

**Neden Gerekli:**
- Hero bloğu için görsel zenginlik şart
- Modern tasarımların temel öğesi
- Marka kimliği için önemli

**Özellikler:**
- **Arka plan resmi:** Upload + URL
- **Gradient:** 2-3 renk arası geçiş
- **Overlay opacity:** Resim üzerine koyu katman
- **Blur efekti:** Bulanık arka plan
- **Video arka plan:** YouTube/Vimeo (opsiyonel)

**Kullanım:**
- Resim upload veya URL gir
- Gradient builder ile renk seç
- Opacity slider ile şeffaflık ayarla

**Etki:**
- Görsel çekicilik
- Profesyonel görünüm

**Tahmini Süre:** 30-40 dakika

---

### 6. Font Boyutu Kontrolü ⭐⭐⭐⭐

**Neden Gerekli:**
- Her tasarım farklı boyut ister
- Tipografi kontrolü şart
- Hiyerarşi oluşturma

**Özellikler:**
- **Font boyutu:** Slider ile 12-72px
- **Satır yüksekliği:** Line-height kontrolü
- **Harf aralığı:** Letter-spacing
- **Font weight:** 300-900 arası seçim
- **Text shadow:** Metin gölgesi

**Kullanım:**
- Slider ile font boyutu ayarla
- Preset boyutlar (S, M, L, XL)
- Canlı önizleme

**Etki:**
- Tipografi kontrolü
- Profesyonel metin düzeni

**Tahmini Süre:** 20-25 dakika

---

### 7. Animasyon Efektleri (Basit) ⭐⭐⭐⭐

**Neden Gerekli:**
- Modern siteler animasyonlu
- Kullanıcı dikkatini çeker
- Profesyonel görünüm

**Özellikler:**
- **Fade in:** Soluklaşarak giriş
- **Slide from top/bottom:** Yukarı/aşağıdan kayma
- **Zoom in:** Yakınlaşma
- **Scroll animasyonları:** Scroll'da tetiklenen efektler

**Kullanım:**
- Dropdown'dan animasyon seç
- Hız ve gecikme ayarla
- Önizleme ile test et

**Etki:**
- Profesyonel görünüm
- Kullanıcı etkileşimi

**Tahmini Süre:** 25-30 dakika

---

### 8. Yükseklik Kontrolü ⭐⭐⭐⭐

**Neden Gerekli:**
- Hero bloğu için tam ekran önemli
- Esnek tasarım için gerekli
- Farklı içerik miktarları için uyum

**Özellikler:**
- **Minimum yükseklik:** Min-height kontrolü
- **Tam ekran:** 100vh seçeneği
- **Özel yükseklik:** px/vh/% seçenekleri
- **Auto:** İçeriğe göre otomatik

**Kullanım:**
- Slider veya input ile yükseklik ayarla
- Preset seçenekler (Auto, 50vh, 100vh)
- Canlı önizleme

**Etki:**
- Esnek tasarım
- Tam ekran hero blokları

**Tahmini Süre:** 15-20 dakika

---

## 🟢 FAYDALI - İlerisi İçin

### 9. Blok Grupları ⭐⭐⭐

**Özellikler:**
- Birden fazla bloğu grupla
- Grup olarak taşı
- Grup şablonu kaydet
- Grup içinde düzenle

**Tahmini Süre:** 40-50 dakika

---

### 10. Şablon Sistemi ⭐⭐⭐

**Özellikler:**
- Kendi şablonlarını kaydet
- "Favorilerim" bölümü
- Şablon galerisi
- Topluluk şablonları

**Tahmini Süre:** 60-90 dakika

---

### 11. AI Asistanı ⭐⭐⭐

**Özellikler:**
- "Bu bloğu iyileştir" butonu
- Renk önerileri
- İçerik önerileri
- Erişilebilirlik kontrolleri

**Tahmini Süre:** 120+ dakika (API entegrasyonu gerekli)

---

### 12. Versiyon Kontrolü ⭐⭐

**Özellikler:**
- Otomatik kayıt
- Versiyon geçmişi
- Eski versiyona dön
- Karşılaştırma modu

**Tahmini Süre:** 60-90 dakika

---

## 📊 Öncelik Sıralaması

### Faz 1: Temel Özellikler (Hemen) - ~1-2 saat

1. ✅ **Blok Çoğaltma** (5-10 dk)
2. ✅ **Responsive Önizleme** (15-20 dk)
3. ✅ **Klavye Kısayolları** (15-20 dk)
4. ✅ **Geri Al/İleri Al** (30-45 dk)

**Toplam:** ~65-95 dakika

---

### Faz 2: Görsel Özellikler (Yakında) - ~1.5-2 saat

5. ✅ **Arka Plan Resmi/Gradient** (30-40 dk)
6. ✅ **Font Boyutu Kontrolü** (20-25 dk)
7. ✅ **Animasyon Efektleri** (25-30 dk)
8. ✅ **Yükseklik Kontrolü** (15-20 dk)

**Toplam:** ~90-115 dakika

---

### Faz 3: İleri Seviye (İlerisi İçin) - ~4-6 saat

9. ✅ **Blok Grupları** (40-50 dk)
10. ✅ **Şablon Sistemi** (60-90 dk)
11. ✅ **AI Asistanı** (120+ dk)
12. ✅ **Versiyon Kontrolü** (60-90 dk)

**Toplam:** ~280-350 dakika

---

## 🎯 Önerilen İlk Adımlar

### Bugün Eklenecekler (Kolay + Etkili):

1. **Blok Çoğaltma** ⚡
   - En kolay
   - En çok kullanılacak
   - Hemen fark edilir

2. **Responsive Önizleme** 📱
   - Mobil görünüm şart
   - Kullanıcı beklentisi yüksek
   - Orta zorluk

3. **Klavye Kısayolları** ⌨️
   - Delete ve Arrow keys
   - Profesyonel his
   - Kolay implementasyon

---

## 💡 Uygulama Notları

### Blok Çoğaltma İçin:
- `duplicateBlock(blockId)` fonksiyonu ekle
- Yeni UUID oluştur
- Order'ı ayarla (seçili bloğun hemen altına)
- Canvas'ta "Çoğalt" butonu ekle

### Responsive Önizleme İçin:
- Topbar'a cihaz seçici ekle (📱 💻 🖥️)
- Canvas genişliğini değiştir (375px, 768px, 1440px)
- MobileFrame bileşenini kullan

### Klavye Kısayolları İçin:
- `useEffect` ile keyboard event listener ekle
- `event.key` ve `event.ctrlKey` kontrolü
- Seçili bloğu kontrol et

### Geri Al/İleri Al İçin:
- History stack oluştur (array)
- Her değişiklikte state'i kaydet
- Max 50 işlem sakla
- Ctrl+Z/Y event listener'ları ekle

---

## 📈 Başarı Metrikleri

### Kullanıcı Deneyimi:
- ✅ Blok oluşturma süresi %50 azalır
- ✅ Hata düzeltme süresi %80 azalır
- ✅ Mobil uyumluluk %100 artar
- ✅ Kullanıcı memnuniyeti artar

### Teknik:
- ✅ Kod kalitesi artar
- ✅ Bakım kolaylığı artar
- ✅ Performans etkilenmez
- ✅ Geriye dönük uyumluluk korunur

---

## 🚀 Sonraki Adımlar

1. **Faz 1'i tamamla** (Temel özellikler)
2. **Kullanıcı geri bildirimi al**
3. **Faz 2'ye geç** (Görsel özellikler)
4. **Beta test yap**
5. **Faz 3'ü planla** (İleri seviye)

---

**Son Güncelleme:** 2026-04-30
**Durum:** Planlama Aşaması
**Öncelik:** Faz 1 - Temel Özellikler
