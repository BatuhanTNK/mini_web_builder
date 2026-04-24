# MiniWeb Builder - Yeni Şablon Fikirleri ve Planlaması

Bu döküman, MiniWeb Builder platformuna eklenebilecek yeni, modern ve kullanıcı dostu hazır şablonların yapılarını ve kullanım senaryolarını detaylandırmaktadır.

## 1. Podcast / Müzik Tanıtım Sayfası (Podcast & Music Launch)
**Hedef Kitle:** Podcasterlar, müzisyenler, ses sanatçıları, radyocular.
**Kullanım Senaryosu:** Yeni bir podcast bölümünün veya müzik albümünün/teklisinin sosyal medyada (Instagram bio, Twitter vb.) tanıtılması ve dinleyicilerin platformlara yönlendirilmesi.

**Kullanılacak Bloklar ve Sıralaması:**
1. `CoverBlock`: Sayfanın en üstünde tam ekran veya yarım ekran sanatçı/albüm kapak fotoğrafı.
2. `SpotifyBlock`: En son bölümün veya şarkının hemen dinlenebilmesi için gömülü oynatıcı.
3. `TextBlock`: Bölümün içeriği veya şarkının hikayesi hakkında kısa, ilgi çekici bir metin.
4. `LinkListBlock`: Dinleyicileri Apple Podcasts, Spotify, YouTube Music, Soundcloud gibi platformlara yönlendiren marka renklerine sahip butonlar.
5. `SocialIconsBlock`: Sanatçının veya programın sosyal medya hesapları (Instagram, Twitter, Tiktok).

---

## 2. Dijital Düğün / Nişan Davetiyesi (Digital Event RSVP)
**Hedef Kitle:** Evlenecek çiftler, nişan, kına veya bekarlığa veda partisi düzenleyenler, kurumsal etkinlik organizatörleri.
**Kullanım Senaryosu:** Kağıt davetiye masraflarından kurtulmak ve daha ekolojik bir yaklaşım sergilemek isteyenler için, WhatsApp, SMS veya QR kod ile kolayca paylaşılabilecek modern, interaktif ve mobil uyumlu bir dijital davetiye oluşturmak. Konukların anında RSVP (Lütfen Cevap Veriniz) yapabilmesini sağlar.

**Kullanılacak Bloklar, Sıralaması ve Detayları:**
1. **`CoverBlock` (Kapak Bloğu):** 
   - *Görsel:* Çiftin romantik bir nişan veya dış çekim fotoğrafı. Tercihen tam ekran (full height) bir görsel.
   - *Metin:* Görselin üzerine okunaklı bir font ile isimler (Örn: "Ayşe & Ali") ve ana mesaj ("Evleniyoruz!", "Sonsuzluğa İlk Adım").
   - *Tarih:* Alt kısımda şık bir şekilde etkinlik tarihi (Örn: "25 Ağustos 2026").
2. **`CountdownBlock` (Geri Sayım Bloğu):** 
   - *İşlev:* Düğün anına kalan süreyi "Gün, Saat, Dakika, Saniye" formatında gösteren hareketli, dinamik bir sayaç.
   - *Tasarım:* Arka plan rengine uygun, zarif ve okunaklı rakamlar. Bu blok heyecan yaratmak için birebirdir.
3. **`TextBlock` (Davet Metni Bloğu):**
   - *İşlev:* Konuklara özel, içten bir davet mesajı.
   - *Örnek Metin:* "Hayatımızı birleştireceğimiz bu en mutlu günümüzde siz değerli dostlarımızı da aramızda görmekten onur duyarız."
4. **`TimelineBlock` (Etkinlik Akışı Bloğu):** 
   - *İşlev:* Etkinlik gününün saat saat planını misafirlere sunmak.
   - *Örnek Akış:* 
     - 19:00 - Karşılama ve Kokteyl
     - 20:00 - Nikah Töreni
     - 20:30 - İlk Dans
     - 21:00 - Akşam Yemeği ve Eğlence
5. **`MapBlock` (Harita Konum Bloğu):** 
   - *İşlev:* Düğün salonunun, otelin veya kır bahçesinin Google Haritalar'daki kesin konumu.
   - *Kullanıcı Deneyimi:* Misafirlerin kaybolmadan veya adres sormadan tek tıkla yol tarifi alabilmesini sağlar.
6. **`ButtonBlock` (Katılım Durumu / LCV Bloğu):** 
   - *İşlev:* Misafirlerin katılıp katılamayacaklarını bildirmeleri (LCV - Lütfen Cevap Veriniz).
   - *Hedef Bağlantı:* Kullanıcıyı çiftin WhatsApp numarasına ("Düğüne katılıyorum / katılamıyorum" hazır mesajıyla) veya katılım bilgilerinin toplandığı bir Google Form bağlantısına yönlendirebilir.

**Ekstra Öneriler (Gelecek Geliştirmeler İçin):**
- **`GalleryBlock` (Fotoğraf Galerisi):** Çiftin birlikte çekilmiş güzel anılarından oluşan yatay kaydırılabilir (carousel) veya grid yapısında bir albüm.
- **`SpotifyBlock` (Müzik Çalar):** Çiftin en sevdiği veya ilk dansını yapacağı şarkının arka planda dinlenebilmesi için Spotify oynatıcısı.

---

## 3. Emlak / Gayrimenkul İlan Sayfası (Real Estate Listing)
**Hedef Kitle:** Emlak danışmanları, gayrimenkul ofisleri, evini veya arsasını kendi satan bireyler, müteahhitler.
**Kullanım Senaryosu:** Klasik ilan sitelerinin karmaşasından uzak, sadece tek bir lüks veya özel mülke odaklanan, müşteriye kendini özel hissettirecek profesyonel bir "Landing Page" (Açılış Sayfası) oluşturmak. Bu sayfa WhatsApp'tan doğrudan müşterilere atılabilir veya Instagram reklamlarında kullanılabilir.

**Kullanılacak Bloklar, Sıralaması ve Detayları:**
1. **`HeroBlock` / `CoverBlock` (Vitrin Bloğu):** 
   - *Görsel:* Evin en güzel dış cephe, havuz veya manzara fotoğrafı.
   - *Metin:* Başlık olarak konum ve mülk tipi (Örn: "Bodrum Yalıkavak'ta Lüks Villa"). Alt başlık olarak dikkat çekici bir özellik (Örn: "Panoramik Deniz Manzaralı, Özel Havuzlu").
   - *Vurgu:* Fiyat veya mülkün metrekare bilgisi (Örn: "25.000.000 ₺").
2. **`ImageGalleryBlock` (Fotoğraf Galerisi):** 
   - *İşlev:* Evin iç mekanlarını (salon, mutfak, ebeveyn banyosu) modern bir grid veya kaydırılabilir yapıda sergilemek. Görseller mülkün değerini yansıtmalıdır.
3. **`ChecklistBlock` (Özellikler Listesi):** 
   - *İşlev:* Evin öne çıkan özelliklerini anlaşılır ve tikli (✓) maddeler halinde listelemek.
   - *Örnek Maddeler:* "4+2, 350m² Net Kullanım Alanı", "Yerden Isıtma ve Akıllı Ev Sistemi", "2 Araçlık Kapalı Otopark", "7/24 Güvenlikli Site İçi".
4. **`MapBlock` (Konum Bloğu):** 
   - *İşlev:* Mülkün bulunduğu konumu (tam adres veya sadece semt merkezi) Google Haritalar üzerinden göstermek.
5. **`ProfileBlock` (Danışman Profili):** 
   - *İşlev:* Mülkle ilgilenen yetkili emlak danışmanının güven veren bir fotoğrafı, adı, soyadı ve ünvanı (Örn: "Lüks Konut Uzmanı").
6. **`ButtonBlock` (İletişim / CTA Bloğu):** 
   - *İşlev:* Müşterinin danışmana tek tıkla ulaşmasını sağlamak.
   - *Hedef:* "WhatsApp'tan Detaylı Bilgi Al" veya "Hemen Arayın" butonu ile doğrudan telefon aramasına (tel:+90...) yönlendirme.

**Ekstra Öneriler (Gelecek Geliştirmeler İçin):**
- **`VideoBlock` (Sanal Tur / Tanıtım):** Drone çekimleri veya mülkün iç mekan video turunun YouTube gömme (embed) olarak eklenmesi.

---

## 4. Online Eğitim / Webinar Kayıt Sayfası (Course Registration)
**Hedef Kitle:** Eğitmenler, danışmanlar, yaşam koçları, ajanslar ve dijital ürün/kurs satıcıları.
**Kullanım Senaryosu:** Hedef kitlenin dikkatini çekecek, güven verecek ve en sonunda onları bir aksiyona (ücretsiz webinara kayıt olma veya doğrudan kurs satın alma) yönlendirecek, yüksek dönüşüm odaklı bir "Huni (Funnel)" giriş sayfası oluşturmak.

**Kullanılacak Bloklar, Sıralaması ve Detayları:**
1. **`HeroBlock` (Dikkat Çekici Giriş):** 
   - *Başlık:* Kullanıcının ağrı noktasını (pain point) çözen vurucu bir vaat. (Örn: "6 Haftada Kendi Web Uygulamanızı Geliştirin")
   - *Alt Başlık:* Kısa ve net bir açıklama.
   - *Tasarım:* Koyu zemin üzerine kontrast renklerde (örn: Mor veya Turuncu) vurgu kelimeleri.
2. **`VideoBlock` (Tanıtım Videosu):** 
   - *İşlev:* Eğitmenin kendini tanıttığı, kursun içeriğini anlattığı ve güven inşa ettiği 1-2 dakikalık gömülü YouTube/Vimeo videosu. Dönüşüm oranlarını ciddi şekilde artırır.
3. **`ProfileBlock` (Eğitmen Kimliği):** 
   - *İşlev:* Eğitmenin uzmanlığını kanıtlayan bölüm.
   - *İçerik:* Profesyonel bir portre fotoğrafı, eğitmenin adı ve kısa bir "Neden benden eğitim almalısınız?" biyografisi.
4. **`ChecklistBlock` (Müfredat / Kazanımlar):** 
   - *İşlev:* "Bu Eğitimde Neler Öğreneceksiniz?" sorusunun cevabı.
   - *İçerik:* Tikli maddeler halinde kursun en can alıcı 4-5 modül özeti (Örn: "Sıfırdan React Temelleri", "Gerçek Zamanlı Veritabanı Yönetimi", "Canlıya Alma Stratejileri").
5. **`CountdownBlock` (Aciliyet Hissi - Opsiyonel):** 
   - *İşlev:* İndirim süresinin veya erken kayıt fırsatının bitimine ne kadar kaldığını gösteren sayaç (FOMO etkisi yaratmak için).
6. **`ButtonBlock` VEYA `ContactFormBlock` (Dönüşüm Noktası):** 
   - *Ücretsiz Webinar:* Ad, Soyad ve E-posta toplayan bir iletişim formu (Mailchimp vb. yönlendirilebilir).
   - *Ücretli Kurs:* Doğrudan ödeme altyapısına (Shopier, Stripe, Iyzico vb.) giden dikkat çekici bir "Hemen Kaydol - %50 İndirimli" butonu.

---

## 5. SSS / Yardım Merkezi Sayfası (FAQ & Support Desk)
**Hedef Kitle:** E-ticaret marka sahipleri, SaaS girişimleri, kargo/lojistik firmaları, yoğun müşteri hizmeti sunan tüm işletmeler.
**Kullanım Senaryosu:** Müşteri hizmetlerinin yükünü hafifletmek için en çok sorulan soruları (Kargo süresi, iade politikası, ödeme yöntemleri) ve destek kanallarını tek bir sayfada toplamak. Bu sayfa linki, WhatsApp Business otomatik yanıt mesajlarında, Instagram profillerinde veya e-posta imzalarında kullanılabilir.

**Kullanılacak Bloklar, Sıralaması ve Detayları:**
1. **`HeroBlock` (Karşılama ve Arama Eğilimi):** 
   - *Başlık:* Kullanıcıya güven veren bir giriş. (Örn: "Size Nasıl Yardımcı Olabiliriz?")
   - *Alt Başlık:* "Sorularınızın cevaplarını aşağıda bulabilir veya destek ekibimizle iletişime geçebilirsiniz."
   - *Tasarım:* Markanın güven rengi (Mavi veya Yeşil tonları) kullanılarak sade ve temiz bir görünüm.
2. **`FAQBlock` (Sıkça Sorulan Sorular - Akordeon):** 
   - *İşlev:* Çok fazla metni karmaşa yaratmadan sunmak için açılır/kapanır (accordion) yapıda soru-cevap bloğu.
   - *Örnek Sorular:* 
     - "Siparişim kaç günde kargoya verilir?" (Cevap: İş günlerinde 24 saat içerisinde...)
     - "İade ve değişim şartlarınız nelerdir?"
     - "Kapıda ödeme veya taksit seçeneği var mı?"
3. **`TextBlock` (Çalışma Saatleri ve Uyarılar):** 
   - *İşlev:* Destek ekibinin ne zaman aktif olduğunu belirtmek.
   - *Örnek:* "Müşteri hizmetlerimiz Hafta İçi 09:00 - 18:00 saatleri arasında hizmet vermektedir. Mesajlarınıza en geç 2 saat içinde dönüş yapılır."
4. **`LinkListBlock` (Destek Kanalları / İletişim):** 
   - *İşlev:* SSS kısmında cevabını bulamayan kullanıcıyı doğrudan destek platformlarına yönlendirmek.
   - *Butonlar:* 
     - "WhatsApp Canlı Destek" (Yeşil buton, wa.me linki)
     - "E-posta Gönder" (Mavi buton, mailto linki)
     - "Kargomu Takip Et" (Gri buton, kargo firması veya site linki)
5. **`SocialIconsBlock` (Sosyal Medya):**
   - *İşlev:* Müşterilerin markayı diğer kanallardan da takip edebilmesi için ikonlar.

---

## 6. Kişisel Antrenör / Fitness Paketi Sayfası (Personal Trainer)
**Hedef Kitle:** Spor hocaları, personal trainerlar, diyetisyenler, yoga/pilates eğitmenleri.
**Kullanım Senaryosu:** Antrenörün veya diyetisyenin sunduğu hizmetleri (online koçluk, stüdyo dersi vb.) paketler halinde sergileyip, Instagram gibi mecralardan gelen yeni öğrencileri doğrudan WhatsApp'a veya kayıt formuna yönlendirmesi.

**Kullanılacak Bloklar, Sıralaması ve Detayları:**
1. **`CoverBlock` (Motivasyonel Giriş):** 
   - *Başlık:* Kullanıcıyı harekete geçirecek dinamik bir slogan. (Örn: "Daha Güçlü Bir Sen İçin İlk Adımı At!")
   - *Alt Başlık:* "Kişiye özel antrenman ve beslenme programlarıyla hedeflerine ulaş."
   - *Tasarım:* Spor salonunda çekilmiş, koyu temalı (Siyah zemin üzerine Kırmızı veya Turuncu vurgular) ve yüksek çözünürlüklü arka plan görseli.
2. **`ProfileBlock` (Eğitmen Kimliği):** 
   - *İşlev:* Antrenörün sertifikalarını, tecrübesini ve çalışma disiplinini yansıtarak güven inşa etmesi.
   - *İçerik:* Profesyonel bir sporcu portresi, unvan (Örn: "Milli Sporcu & Fitness Koçu") ve kısa bir biyografi.
3. **`VideoBlock` (Öğrenci Dönüşümleri):** 
   - *İşlev:* Sosyal kanıt (Social Proof) sağlamak için "Öncesi/Sonrası" (Before-After) hikayelerini veya motivasyonel bir idman videosunu sergilemek.
4. **`ProductCardBlock` (Hizmet Paketleri):** 
   - *İşlev:* Kullanıcı karmaşasını engellemek için tüm hizmetlerin görsel destekli ve şeffafça listelenmesi.
   - *Örnek İçerikler:* İki adet ürün kartı (Örn: "Aylık Uzaktan Koçluk" ve "10 Derslik Stüdyo Paketi") ile fiyat, görsel ve "Hemen Başla" butonu.
5. **`ButtonBlock` (Dönüşüm / Kayıt):** 
   - *İşlev:* Karar veren öğrencinin doğrudan iletişime geçmesi.
   - *İçerik:* Göze çarpan bir "WhatsApp'tan Bilgi Al" veya "Değişime Şimdi Başla" butonu.

---
**Sonraki Adımlar:**
Bu şablonlardan projenize entegre edilmesini istedikleriniz varsa bana iletebilirsiniz. Seçtiğiniz şablonlar doğrudan sisteme eklenecektir.
