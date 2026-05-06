const { v4: uuidv4 } = require('uuid');

const makeBlock = (type, data, order) => ({
  id: uuidv4(),
  type,
  order,
  visible: true,
  data
});

const templateDefinitions = {
  blank: [],

  linktree: [
    // 1) Profile - Premium Bio Header
    makeBlock('profile', {
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
      name: 'Ece Yıldız',
      title: 'Digital Creator & Traveler',
      bio: 'Gezgin, fotoğrafçı ve içerik üreticisi. Dünyayı keşfederken hikayelerimi paylaşıyorum. ✨✈️',
      shape: 'circle',
      bannerColor: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
      haloEnabled: true,
      haloColor1: '#f093fb',
      haloColor2: '#f5576c',
      verifiedBadge: true
    }, 0),

    // 2) Link List - Essential Links
    makeBlock('link_list', {
      links: [
        { label: 'YouTube Kanalım', url: '#', icon: '🎬', color: '#ff0000' },
        { label: 'Seyahat Blogum', url: '#', icon: '🌍', color: '#0ea5e9' },
        { label: 'İş Birlikleri İçin', url: '#', icon: '📧', color: '#10b981' }
      ],
      size: 'lg',
      borderRadius: 50,
      fontWeight: 'bold',
      hoverEffect: 'lift',
      fullWidth: true
    }, 1),

    // 3) Social Icons - Social Presence
    makeBlock('social_icons', {
      socials: [
        { platform: 'instagram', url: 'https://instagram.com/eceyildiz' },
        { platform: 'tiktok', url: 'https://tiktok.com/@eceyildiz' },
        { platform: 'twitter', url: 'https://twitter.com/eceyildiz' },
        { platform: 'pinterest', url: 'https://pinterest.com/eceyildiz' }
      ],
      iconBgColor: 'rgba(255,255,255,0.06)',
      iconBorderColor: 'rgba(255,255,255,0.12)',
      iconBorderWidth: 2
    }, 2),

    // 4) Divider - Subtle Separator
    makeBlock('divider', {
      style: 'dots',
      color: 'rgba(255,255,255,0.2)',
      height: 40
    }, 3),

    // 5) Button - Newsletter / Subscription
    makeBlock('button', {
      label: 'Haftalık Seyahat Bülteni',
      url: '#',
      style: 'outline',
      color: '#f5576c',
      textColor: '#ffffff',
      icon: '📮',
      target: '_blank'
    }, 4)
  ],

  digital_card: [
    // 1) Profile - Professional Business Identity
    makeBlock('profile', {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      name: 'Dr. Selin Yılmaz',
      title: 'Yönetim Danışmanı & Mentor',
      bio: 'Şirketlerin dijital dönüşüm süreçlerine rehberlik ediyorum. 15 yıllık sektör deneyimi ile stratejik çözüm ortağınız.',
      shape: 'circle',
      bannerColor: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
      verifiedBadge: true
    }, 0),

    // 2) VCard - Interactive Business Card
    makeBlock('vcard', {
      name: 'Selin Yılmaz',
      jobTitle: 'Yönetim Danışmanı',
      company: 'SY Consulting',
      phone: '+90 532 987 65 43',
      email: 'selin@syconsulting.com',
      website: 'https://selinyilmaz.com',
      downloadable: true,
      btnBg: '#0f172a',
      btnTextColor: '#ffffff'
    }, 1),

    // 3) Link List - Professional Connections
    makeBlock('link_list', {
      links: [
        { label: 'Resmi Web Sitesi', url: '#', icon: '🌐', color: '#0f172a' },
        { label: 'LinkedIn Profili', url: '#', icon: '💼', color: '#0077b5' },
        { label: 'Medium Blog', url: '#', icon: '📝', color: '#000000' }
      ]
    }, 2),

    // 4) Checklist - Hizmet Alanları
    makeBlock('checklist', {
      title: 'Uzmanlık Alanlarım',
      checkColor: '#0f172a',
      items: [
        { text: 'Dijital Dönüşüm Stratejileri' },
        { text: 'Liderlik ve Yönetim Eğitimi' },
        { text: 'Süreç Optimizasyonu' },
        { text: 'Yapay Zeka Entegrasyonu' }
      ]
    }, 3),

    // 5) Map - Ofis Konumu
    makeBlock('map', {
      address: 'Levent, Beşiktaş, İstanbul',
      lat: 41.0772,
      lng: 29.0124,
      zoom: 14,
      height: 200
    }, 4),

    // 6) Button - Hızlı İletişim
    makeBlock('button', {
      label: 'WhatsApp ile Mesaj Gönder',
      url: 'https://wa.me/905329876543',
      style: 'filled',
      color: '#25D366',
      textColor: '#ffffff',
      icon: '💬',
      target: '_blank'
    }, 5)
  ],

  restaurant: [
    // 1) Premium Cover - Fine Dining Atmosphere
    makeBlock('cover', {
      title: 'L’Artiste Bistro',
      subtitle: 'Modern Fransız Mutfağı & Unutulmaz Bir Gastronomi Deneyimi',
      badgeText: 'MICHELIN SEÇKİSİ • 2024',
      bgImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'Menüyü Keşfet',
      ctaLink: '#menu',
      textColor: '#ffffff',
      overlayOpacity: 0.5,
      overlayColor: '#0a0a0a',
      alignment: 'center',
      buttonColor: '#c2410c', 
      buttonTextColor: '#ffffff',
      minHeight: '85vh'
    }, 0),

    // 2) Hero - Hoşgeldiniz & Çalışma Saatleri
    makeBlock('hero', {
      title: 'Lezzet Sanatla Buluşuyor',
      subtitle: 'Her gün 12:00 - 23:00 saatleri arasında hizmetinizdeyiz.',
      accentWord: 'Sanatla',
      accentColor: '#c2410c',
      bgColor: '#0f0f0f',
      textColor: '#ffffff',
      alignment: 'center'
    }, 1),

    // 3) Checklist - Neden Biz?
    makeBlock('checklist', {
      title: 'Ayrıcalıklı Deneyim',
      checkColor: '#c2410c',
      items: [
        { text: '🌿 %100 Organik ve Mevsimsel Ürünler' },
        { text: '🍷 Zengin Şarap Kavı ve Tadım Menüleri' },
        { text: '🎶 Akşamları Canlı Piyano Performansı' },
        { text: '🚗 Ücretsiz Vale ve Otopark Hizmeti' }
      ]
    }, 2),

    // 4) Menu - Gurme Seçenekler
    makeBlock('menu', {
      categories: [
        {
          name: 'Başlangıçlar',
          icon: '🥟',
          subcategories: [
            {
              name: 'Sıcak & Soğuk',
              items: [
                { name: 'Trüflü Burrata', price: '450', description: 'Taze roka, balsamik inci ve trüf yağı ile', image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=200&auto=format&fit=crop' },
                { name: 'Izgara Ahtapot', price: '680', description: 'İsli patates püresi ve chimichurri sos ile', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd679?q=80&w=200&auto=format&fit=crop' }
              ]
            }
          ]
        },
        {
          name: 'Ana Yemekler',
          icon: '🥩',
          subcategories: [
            {
              name: 'Et & Deniz Ürünleri',
              items: [
                { name: 'Dana Bonfile', price: '1.200', description: 'Madagaskar biber sosu ve kuşkonmaz eşliğinde', image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=200&auto=format&fit=crop' },
                { name: 'Levrek Fileto', price: '890', description: 'Limonlu tereyağı sosu ve safranlı risotto ile', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=200&auto=format&fit=crop' }
              ]
            }
          ]
        }
      ],
      themeColor: '#c2410c'
    }, 3),

    // 5) Image Gallery - Mekan & Tabaklar
    makeBlock('image_gallery', {
      images: [
        { src: 'https://images.unsplash.com/photo-1550966841-3ee390234720?q=80&w=800&auto=format&fit=crop', alt: 'İç Mekan Tasarımı' },
        { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop', alt: 'Sunum Detayı' },
        { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop', alt: 'Şarap Kavı' },
        { src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop', alt: 'Bar Alanı' }
      ],
      columns: 2,
      gap: '10px',
      borderRadius: '12px'
    }, 4),

    // 6) Profile - Şefimiz
    makeBlock('profile', {
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop', 
      name: 'Chef Julian Rossi',
      title: 'Executive Chef',
      bio: 'Michelin yıldızlı mutfaklarda yetişen Şef Rossi, geleneksel Fransız tekniklerini modern dokunuşlarla harmanlıyor.',
      shape: 'circle'
    }, 5),

    // 7) Map - Konum
    makeBlock('map', {
      address: 'Nişantaşı, Şişli, İstanbul',
      lat: 41.0519,
      lng: 28.9904,
      zoom: 15,
      height: 250
    }, 6),

    // 8) Button - Rezervasyon
    makeBlock('button', {
      label: 'Rezervasyon Yap (WhatsApp)',
      url: 'https://wa.me/905551234567?text=Merhaba%2C%20ak%C5%9Fam%20i%C3%A7in%20rezervasyon%20yapt%C4%B1rmak%20istiyorum.',
      style: 'filled',
      color: '#c2410c',
      textColor: '#ffffff',
      icon: '🍴',
      target: '_blank'
    }, 7)
  ],

  event: [
    // 1) Premium Cover - Visual Event Intro
    makeBlock('cover', {
      title: 'TECH FORWARD 2024',
      subtitle: 'Yapay Zeka ve Geleceğin Teknolojileri Zirvesi',
      badgeText: '10-12 EKİM • İSTANBUL',
      bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      ctaText: 'Biletini Al',
      ctaLink: '#bilet',
      textColor: '#ffffff',
      overlayOpacity: 0.6,
      overlayColor: '#000000',
      alignment: 'center',
      buttonColor: '#8b5cf6',
      buttonTextColor: '#ffffff',
      minHeight: '80vh'
    }, 0),

    // 2) Countdown - Urgency
    makeBlock('countdown', {
      targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      label: 'Büyük Buluşmaya Kalan Süre',
      numberColor: '#8b5cf6',
      labelColor: 'rgba(255,255,255,0.8)'
    }, 1),

    // 3) Hero - Event Mission
    makeBlock('hero', {
      title: 'Geleceği Birlikte Tasarlıyoruz',
      subtitle: 'Sektör liderleri, vizyoner girişimciler ve teknoloji meraklıları bu zirvede buluşuyor.',
      accentWord: 'Geleceği',
      accentColor: '#8b5cf6',
      bgColor: '#0a0a0a',
      textColor: '#ffffff',
      alignment: 'center'
    }, 2),

    // 4) Timeline - Schedule
    makeBlock('timeline', {
      title: 'Etkinlik Programı',
      cards: [
        { time: '09:00 - 10:00', title: 'Kayıt & Networking', description: 'Hoşgeldin kahvesi ve tanışma seansı.', bgColor: '#8b5cf6', textColor: '#ffffff' },
        { time: '10:00 - 12:00', title: 'Keynote: AI Devrimi', description: 'Sektörün devlerinden gelecek öngörüleri.', bgColor: '#7c3aed', textColor: '#ffffff' },
        { time: '13:00 - 17:00', title: 'Workshop: Uygulamalı Veri Bilimi', description: 'Kendi modelinizi eğitme ve yayına alma.', bgColor: '#6d28d9', textColor: '#ffffff' }
      ]
    }, 3),

    // 5) Numbered List - Neden Katılmalısın?
    makeBlock('numbered_list', {
      items: [
        { number: '01', title: 'Global Vizyon', description: 'Dünya çapındaki gelişmeleri yerinde öğrenin.' },
        { number: '02', title: 'Network Ağı', description: 'Sektör paydaşları ile kalıcı bağlantılar kurun.' },
        { number: '03', title: 'Sertifika', description: 'Katılımınızla kariyerinize değer katın.' }
      ],
      accentColor: '#8b5cf6'
    }, 4),

    // 6) FAQ - Sık Sorulan Sorular
    makeBlock('faq', {
      items: [
        { question: 'Bilet iadesi yapabiliyor muyum?', answer: 'Etkinlik tarihinden 15 gün öncesine kadar %100 iade garantisi sunuyoruz.' },
        { question: 'Konaklama dahil mi?', answer: 'Bilet fiyatına konaklama dahil değildir, ancak anlaşmalı otellerimiz için indirim kodları paylaşıyoruz.' },
        { question: 'Online katılım mümkün mü?', answer: 'Evet, zirvemiz hibrit olarak gerçekleşecektir. Online bilet seçeneklerimizi inceleyebilirsiniz.' }
      ],
      activeBg: 'rgba(139,92,246,0.1)',
      iconColor: '#8b5cf6'
    }, 5),

    // 7) Map - Venue
    makeBlock('map', {
      address: 'Lütfi Kırdar Kongre Merkezi, İstanbul',
      lat: 41.0478,
      lng: 28.9886,
      zoom: 15,
      height: 250
    }, 6),

    // 8) Button - Final CTA
    makeBlock('button', {
      label: 'Hemen Biletini Ayırt',
      url: '#',
      style: 'filled',
      color: '#8b5cf6',
      textColor: '#ffffff',
      icon: '🎟️',
      target: '_blank'
    }, 7)
  ],

  portfolio: [
    // 1) Cover - Professional Intro
    makeBlock('cover', {
      title: 'Mert Demir',
      subtitle: 'Senior Full-Stack Developer & UI Designer',
      badgeText: 'AÇIK PORTFÖY • 2024',
      bgImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'Projelerimi Gör',
      ctaLink: '#projeler',
      textColor: '#ffffff',
      overlayOpacity: 0.7,
      overlayColor: '#0f172a',
      alignment: 'center',
      buttonColor: '#3b82f6',
      buttonTextColor: '#ffffff',
      minHeight: '80vh'
    }, 0),

    // 2) Hero - Misyon & Vizyon
    makeBlock('hero', {
      title: 'Kullanıcı Odaklı Dijital Deneyimler Tasarlıyorum',
      subtitle: 'Karmaşık problemleri, basit ve estetik çözümlere dönüştürmek için buradayım.',
      accentWord: 'Deneyimler',
      accentColor: '#3b82f6',
      bgColor: '#0f172a',
      textColor: '#ffffff',
      alignment: 'center'
    }, 1),

    // 3) Numbered List - Uzmanlık Alanları
    makeBlock('numbered_list', {
      items: [
        { number: '01', title: 'Web Geliştirme', description: 'React, Next.js ve modern web teknolojileri ile hızlı uygulamalar.' },
        { number: '02', title: 'UI/UX Tasarım', description: 'Kullanıcı dostu arayüzler ve etkileşimli prototipler.' },
        { number: '03', title: 'Mobil Uygulama', description: 'React Native ile her iki platformda da kusursuz çalışan uygulamalar.' }
      ],
      accentColor: '#3b82f6'
    }, 2),

    // 4) Image Gallery - Portfolyo Projeleri
    makeBlock('image_gallery', {
      images: [
        { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop', alt: 'Fintech Dashboard' },
        { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', alt: 'E-Ticaret Platformu' },
        { src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop', alt: 'Mobil Sağlık Uygulaması' },
        { src: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2070&auto=format&fit=crop', alt: 'Veri Analiz Paneli' }
      ],
      columns: 2,
      gap: '12px',
      borderRadius: '16px'
    }, 3),

    // 5) Checklist - Yetenek Seti
    makeBlock('checklist', {
      title: 'Teknik Yetkinlikler',
      checkColor: '#3b82f6',
      items: [
        { text: 'Proficient in JavaScript (ES6+), TypeScript' },
        { text: 'Expert in React.js, Next.js, Redux' },
        { text: 'Backend: Node.js, Express, MongoDB' },
        { text: 'Design tools: Figma, Adobe XD' },
        { text: 'DevOps: Docker, CI/CD, AWS' }
      ]
    }, 4),

    // 6) Timeline - Deneyim Yolculuğu
    makeBlock('timeline', {
      title: 'İş Deneyimi',
      cards: [
        { time: '2021 - Günümüz', title: 'Senior Developer @ TechCorp', description: 'Büyük ölçekli web uygulamalarının mimarisi ve ekip liderliği.', bgColor: '#3b82f6', textColor: '#ffffff' },
        { time: '2018 - 2021', title: 'Full-Stack Developer @ StartupX', description: 'Sıfırdan ürün geliştirme ve pazar genişletme süreçleri.', bgColor: '#1d4ed8', textColor: '#ffffff' },
        { time: '2016 - 2018', title: 'Frontend Developer @ AgencyX', description: 'Modern ve responsive arayüz tasarımları.', bgColor: '#1e3a8a', textColor: '#ffffff' }
      ]
    }, 5),

    // 7) Profile - Hakkımda Detay
    makeBlock('profile', {
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop', 
      name: 'Mert Demir',
      title: 'Full-Stack Creator',
      bio: 'Yazılım dünyasına olan tutkum, kullanıcıların hayatını kolaylaştıran dijital ürünler tasarlamamı sağlıyor. Her projede yeni bir şeyler öğrenmeyi ve sınırları zorlamayı seviyorum.',
      shape: 'circle'
    }, 6),

    // 8) Link List - Sosyal Medya & Linkler
    makeBlock('link_list', {
      links: [
        { label: 'GitHub', url: 'https://github.com/mertdemir', icon: '💻', color: '#333' },
        { label: 'LinkedIn', url: 'https://linkedin.com/in/mertdemir', icon: '💼', color: '#0077b5' },
        { label: 'Dribbble', url: 'https://dribbble.com/mertdemir', icon: '🎨', color: '#ea4c89' }
      ]
    }, 7),

    // 9) Button - İletişim & CV
    makeBlock('button', {
      label: 'CV İndir (PDF)',
      url: '#',
      style: 'filled',
      color: '#3b82f6',
      textColor: '#ffffff',
      icon: '📄',
      target: '_blank'
    }, 8)
  ],

  real_estate: [
    // 1) Premium Cover - Luxury First Impression
    makeBlock('cover', {
      title: 'Villa Ocean Breeze',
      subtitle: 'Bodrum Yalıkavak\'ta Kesintisiz Deniz Manzaralı Müstakil Malikane',
      badgeText: 'ÖZEL PORTFÖY • 45.000.000 ₺',
      bgImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      ctaText: 'Portföyü İncele',
      ctaLink: '#detaylar',
      textColor: '#ffffff',
      overlayOpacity: 0.45,
      overlayColor: '#0c0c0c',
      alignment: 'center',
      buttonColor: '#d4af37',
      buttonTextColor: '#ffffff',
      minHeight: '90vh'
    }, 0),

    // 2) Hero - Mülk Özeti
    makeBlock('hero', {
      title: 'Mülk Özellikleri',
      subtitle: '6+2 Oda • 450m² Net • 1.200m² Arsa Payı • Müstakil Havuzlu',
      accentWord: 'Özellikleri',
      accentColor: '#d4af37',
      bgColor: '#1a1a1a',
      textColor: '#ffffff',
      alignment: 'center'
    }, 1),

    // 3) Numbered List - Neden Bu Malikane?
    makeBlock('numbered_list', {
      items: [
        { number: '01', title: 'Panoramik Manzara', description: 'Tüm odalardan kesintisiz Ege Denizi ve gün batımı manzarası.' },
        { number: '02', title: 'Akıllı Ev Teknolojisi', description: 'Dünyanın her yerinden kontrol edilebilen tam entegre otomasyon sistemi.' },
        { number: '03', title: 'Özel İskele Erişimi', description: 'Siteye özel plaj ve tekne bağlama imkanı sunan özel iskele.' }
      ],
      accentColor: '#d4af37'
    }, 2),

    // 4) Image Gallery - Mimari Detaylar
    makeBlock('image_gallery', {
      images: [
        { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop', alt: 'Salon ve Galeri Boşluğu' },
        { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop', alt: 'Modern Mutfak Tasarımı' },
        { src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop', alt: 'Ebeveyn Yatak Odası' },
        { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop', alt: 'Sonsuzluk Havuzu' }
      ],
      columns: 2,
      gap: '12px',
      borderRadius: '16px'
    }, 3),

    // 5) Checklist - Teknik Detaylar
    makeBlock('checklist', {
      title: 'Donanım ve Konfor',
      checkColor: '#d4af37',
      items: [
        { text: 'VRF İklimlendirme Sistemi (Daikin)' },
        { text: 'Yerden Isıtma (Rehau)' },
        { text: '3 Araçlık Kapalı Otopark' },
        { text: 'Müştemilat ve Yardımcı Odası' },
        { text: 'Jeneratör ve Su Deposu' }
      ]
    }, 4),

    // 6) Map - Konum
    makeBlock('map', {
      address: 'Yalıkavak, Bodrum, Muğla',
      lat: 37.1044,
      lng: 27.2913,
      zoom: 14,
      height: 280
    }, 5),

    // 7) Profile - Uzman Danışman
    makeBlock('profile', {
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop', 
      name: 'Burak Yılmaz',
      title: 'Lüks Konut ve Ticari Gayrimenkul Uzmanı',
      bio: '15 yıllık sektör deneyimi ile Bodrum\'un en özel portföylerini sizlere sunuyorum. Bu malikaneyi yerinde görmek için randevu alabilirsiniz.',
      shape: 'circle'
    }, 6),

    // 8) Button - İletişim
    makeBlock('button', {
      label: 'WhatsApp ile Randevu Al',
      url: 'https://wa.me/905551234567?text=Villa%20Ocean%20Breeze%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.',
      style: 'filled',
      color: '#d4af37',
      textColor: '#ffffff',
      icon: '💬',
      target: '_blank'
    }, 7)
  ],

  e_commerce: [
    makeBlock('hero', {
      title: 'Premium Akıllı Saat X-200',
      subtitle: 'Stil ve teknolojiyi bileğinizde birleştirin. Sınırları zorlayan özellikler, minimalist tasarım.',
      accentWord: 'X-200',
      accentColor: '#6366f1',
      bgColor: '#0f0f13',
      textColor: '#ffffff',
      alignment: 'center'
    }, 0),
    // 2) Product Card 1 - Ana Teklif
    makeBlock('product_card', {
      image: 'https://images.unsplash.com/photo-1544117518-e7963231d27a?q=80&w=800&auto=format&fit=crop',
      name: 'Akıllı Saat X-200 (Pro)',
      description: '2 haftalık pil ömrü, 5ATM su direnci, 100+ spor modu ve gelişmiş sağlık takibi özellikleri.',
      price: '2.499',
      originalPrice: '3.199',
      currency: '₺',
      showButton: true,
      buttonText: 'Hemen Satın Al',
      buyUrl: '#',
      buttonColor: '#6366f1',
      buttonTextColor: '#ffffff',
      priceColor: '#6366f1',
      cardBg: 'rgba(255,255,255,0.04)',
      nameColor: '#ffffff',
      descriptionColor: 'rgba(255,255,255,0.6)',
    }, 1),
    // 3) Product Card 2 - Alternatif Seçenek
    makeBlock('product_card', {
      image: 'https://images.unsplash.com/photo-1508685096489-77aef538561d?q=80&w=800&auto=format&fit=crop',
      name: 'Akıllı Saat X-200 (Lite)',
      description: 'Hafif tasarım, 1 hafta pil ömrü ve temel sağlık takibi özellikleri. Bütçe dostu seçenek.',
      price: '1.299',
      originalPrice: '1.599',
      currency: '₺',
      showButton: true,
      buttonText: 'Hemen Satın Al',
      buyUrl: '#',
      buttonColor: '#8b5cf6',
      buttonTextColor: '#ffffff',
      priceColor: '#8b5cf6',
      cardBg: 'rgba(255,255,255,0.04)',
      nameColor: '#ffffff',
      descriptionColor: 'rgba(255,255,255,0.6)',
    }, 2),
    makeBlock('checklist', {
      title: 'Neden Bizi Seçmelisiniz?',
      checkColor: '#6366f1',
      textColor: '#ffffff',
      items: [
        { text: '🚚 Aynı Gün Ücretsiz Kargo' },
        { text: '🛡️ 2 Yıl Resmi Distribütör Garantisi' },
        { text: '💳 Vade Farksız 6 Taksit İmkanı' },
        { text: '🔄 14 Gün Koşulsuz İade Garantisi' }
      ]
    }, 3),
    makeBlock('image_carousel', {
      images: [
        { src: 'https://images.unsplash.com/photo-1517502474097-f9b30659dadb?q=80&w=800&auto=format&fit=crop', alt: 'Kasa Detayı' },
        { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop', alt: 'Kordon Seçenekleri' },
        { src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop', alt: 'Ekran Parlaklığı' }
      ],
      aspectRatio: '16/9',
      borderRadius: 16
    }, 4),
    makeBlock('countdown', {
      targetDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      label: '🔥 Stoklarla Sınırlı Fırsat!',
      style: 'card',
      showDays: true,
      accentColor: '#6366f1'
    }, 5),
    makeBlock('faq', {
      title: 'Sıkça Sorulan Sorular',
      items: [
        { question: 'Hangi modeller iPhone ile uyumlu?', answer: 'Tüm X-200 serisi modellerimiz hem iOS hem de Android cihazlarla tam uyumlu çalışır.' },
        { question: 'Suya dayanıklılık farkı var mı?', answer: 'Pro modeli 5ATM (50 metre), Lite modeli ise IP68 (1.5 metre) su direncine sahiptir.' },
        { question: 'Lite modelde de sağlık takibi var mı?', answer: 'Evet, her iki modelde de kalp atış hızı ve uyku takibi standart olarak sunulmaktadır.' }
      ],
      accentColor: '#6366f1'
    }, 6),
    makeBlock('coupon', {
      code: 'PRO100',
      discount: '100 ₺ İndirim',
      description: 'Seçili modellerde geçerli ekstra indirim kuponu.',
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      copyable: true
    }, 7),
    makeBlock('button', {
      label: 'Yardım mı lazım? WhatsApp Destek',
      url: 'https://wa.me/905551234567',
      style: 'ghost',
      color: '#25D366',
      textColor: '#25D366',
      icon: '💬',
      target: '_blank'
    }, 8)
  ],

  course_registration: [
    // 1) Hero - Modern Giriş
    makeBlock('hero', {
      title: 'Full-Stack Web Geliştirme Masterclass',
      subtitle: 'Sıfırdan İleri Seviyeye: 12 Haftada Profesyonel Bir Yazılımcı Olun',
      accentWord: 'Masterclass',
      accentColor: '#a855f7',
      bgColor: '#0f172a',
      textColor: '#ffffff',
      alignment: 'center'
    }, 0),

    // 2) Video - Eğitim Tanıtımı
    makeBlock('video', {
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      autoplay: false,
      controls: true
    }, 1),

    // 3) Numbered List - Eğitim Modülleri
    makeBlock('numbered_list', {
      items: [
        { number: '01', title: 'Frontend Dünyası', description: 'React, Next.js ve TailwindCSS ile modern arayüzler geliştirin.' },
        { number: '02', title: 'Backend Mimarisi', description: 'Node.js, Express ve PostgreSQL ile ölçeklenebilir sistemler kurun.' },
        { number: '03', title: 'Deployment & Devops', description: 'Docker ve AWS kullanarak projelerinizi dünya ile paylaşın.' }
      ],
      accentColor: '#a855f7'
    }, 2),

    // 4) Checklist - Eğitimin Avantajları
    makeBlock('checklist', {
      title: 'Neden Bu Eğitimi Seçmelisiniz?',
      checkColor: '#a855f7',
      items: [
        { text: '✅ Canlı Soru-Cevap Oturumları' },
        { text: '✅ Sektör Onaylı Başarı Sertifikası' },
        { text: '✅ Ömür Boyu Güncel İçerik Erişimi' },
        { text: '✅ Özel Discord Topluluğu Katılımı' },
        { text: '✅ Birebir Portfolyo İnceleme' }
      ]
    }, 3),

    // 5) Profile - Eğitmen
    makeBlock('profile', {
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop', 
      name: 'Ayşe Yılmaz',
      title: 'Senior Software Engineer & Educator',
      bio: 'Sektörde 10+ yıl deneyim. Bugüne kadar binlerce öğrencinin kariyer yolculuğuna rehberlik ettim.',
      shape: 'circle'
    }, 4),

    // 6) Countdown - Erken Kayıt Fırsatı
    makeBlock('countdown', {
      targetDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      label: '🔥 Erken Kayıt İndirimi İçin Son Günler!',
      style: 'card',
      showDays: true,
      accentColor: '#a855f7'
    }, 5),

    // 7) FAQ - Merak Edilenler
    makeBlock('faq', {
      title: 'Sıkça Sorulan Sorular',
      items: [
        { question: 'Eğitim canlı mı yoksa kayıt mı?', answer: 'Eğitimimiz haftada 2 gün canlı ders ve geri kalan günlerde video içeriklerle desteklenmektedir.' },
        { question: 'Hiç kodlama bilmiyorum, katılabilir miyim?', answer: 'Evet, müfredatımız sıfırdan başlayarak en ileri seviyeye kadar tasarlanmıştır.' },
        { question: 'İade garantisi var mı?', answer: 'Eğitimin ilk 14 günü içerisinde herhangi bir sebep göstermeksizin %100 iade alabilirsiniz.' }
      ],
      accentColor: '#a855f7'
    }, 6),

    // 8) Coupon - İndirim Kodu
    makeBlock('coupon', {
      code: 'YAZILIM50',
      discount: '%50 İNDİRİM',
      description: 'Lansmana özel sınırlı sayıda kontenjan için geçerlidir.',
      expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      copyable: true
    }, 7),

    // 9) Button - Kayıt Ol
    makeBlock('button', {
      label: 'Hemen Kayıt Ol ve Başla',
      url: '#',
      style: 'filled',
      color: '#a855f7',
      textColor: '#ffffff',
      icon: '🚀',
      target: '_blank'
    }, 8)
  ],

  faq_support: [
    // 1) Hero - Modern Help Center Header
    makeBlock('hero', {
      title: 'Müşteri Destek Merkezi',
      subtitle: 'Sorularınıza en hızlı çözümü bulmak için buradayız. Aşağıdaki sıkça sorulan soruları inceleyebilir veya bizimle iletişime geçebilirsiniz.',
      accentWord: 'Destek',
      accentColor: '#3b82f6',
      bgColor: '#f8fafc',
      textColor: '#0f172a',
      alignment: 'center'
    }, 0),

    // 2) FAQ - Categorized Questions
    makeBlock('faq', {
      items: [
        { question: 'Kargom ne zaman ulaşır?', answer: 'Siparişleriniz genellikle 24 saat içinde kargoya verilir ve 1-3 iş günü içinde adresinize ulaşır.' },
        { question: 'İade sürecini nasıl başlatırım?', answer: 'Profilinizdeki "Siparişlerim" bölümünden kolayca iade talebi oluşturabilirsiniz.' },
        { question: 'Taksit seçenekleri nelerdir?', answer: 'Tüm kredi kartlarına vade farksız 3, toplamda 12 aya varan taksit seçenekleri sunuyoruz.' }
      ],
      activeBg: 'rgba(59,130,246,0.05)',
      iconColor: '#3b82f6'
    }, 1),

    // 3) Link List - Contact Channels
    makeBlock('link_list', {
      links: [
        { label: 'WhatsApp Canlı Destek', url: 'https://wa.me/905551234567', icon: '💬', color: '#25D366' },
        { label: 'E-Posta Gönder', url: 'mailto:destek@firma.com', icon: '📧', color: '#3b82f6' },
        { label: 'Kargo Takip', url: '#', icon: '📦', color: '#64748b' }
      ]
    }, 2),

    // 4) Button - Secondary Action
    makeBlock('button', {
      label: 'Destek Talebi Oluştur',
      url: '#',
      style: 'outline',
      color: '#3b82f6',
      textColor: '#3b82f6',
      icon: '🎫',
      target: '_blank'
    }, 3)
  ],

  personal_trainer: [
    // 1) Premium Cover - Motivation & Grit
    makeBlock('cover', {
      title: 'SINIRLARINI ZORLA',
      subtitle: 'Kişiye özel antrenman ve beslenme planlarıyla hayalindeki forma kavuş.',
      badgeText: 'ONLINE KOÇLUK • 2024',
      bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'Değişime Başla',
      ctaLink: '#paketler',
      textColor: '#ffffff',
      overlayOpacity: 0.6,
      overlayColor: '#000000',
      alignment: 'center',
      buttonColor: '#ef4444',
      buttonTextColor: '#ffffff',
      minHeight: '80vh'
    }, 0),

    // 2) Profile - Expert Trainer
    makeBlock('profile', {
      avatar: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop', 
      name: 'Caner Şahin',
      title: 'IFBB Pro & Fitness Mentor',
      bio: '10 yıllık profesyonel spor geçmişi ve yüzlerce başarılı değişim hikayesi. Senin hedefin, benim görevim.',
      shape: 'circle',
      verifiedBadge: true
    }, 1),

    // 3) Numbered List - Değişim Süreci
    makeBlock('numbered_list', {
      items: [
        { number: '01', title: 'Analiz', description: 'Form ve postür analizi ile mevcut durumunu belirliyoruz.' },
        { number: '02', title: 'Planlama', description: 'Sana özel antrenman ve sürdürülebilir beslenme programı.' },
        { number: '03', title: 'Takip', description: 'Haftalık kontroller ve anlık WhatsApp desteği ile gelişimini izliyoruz.' }
      ],
      accentColor: '#ef4444'
    }, 2),

    // 4) Product Card - Online Koçluk
    makeBlock('product_card', {
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop',
      name: 'Aylık Online Koçluk',
      description: 'Kişiye özel antrenman, kalori takibi, haftalık form kontrolü ve 7/24 soru-cevap.',
      price: '1.500',
      originalPrice: '2.000',
      currency: '₺',
      showButton: true,
      buttonText: 'Hemen Başla',
      buyUrl: '#',
      buttonColor: '#ef4444',
      buttonTextColor: '#ffffff',
      priceColor: '#ef4444',
      cardBg: 'rgba(255,255,255,0.04)'
    }, 3),

    // 5) Button - Hızlı İletişim
    makeBlock('button', {
      label: 'Ücretsiz Ön Görüşme Yap',
      url: 'https://wa.me/905551234567',
      style: 'filled',
      color: '#25D366',
      textColor: '#ffffff',
      icon: '💬',
      target: '_blank'
    }, 4)
  ],

  pdf_lead: [
    // 1) Premium Cover - E-Book Visual
    makeBlock('cover', {
      title: 'DİJİTAL PAZARLAMA REHBERİ',
      subtitle: '2024 Stratejileri ile İşinizi Büyütün',
      badgeText: 'ÜCRETSİZ E-KİTAP',
      bgImage: 'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2031&auto=format&fit=crop',
      ctaText: 'Hemen İndir',
      ctaLink: '#download',
      textColor: '#ffffff',
      overlayOpacity: 0.7,
      overlayColor: '#111827',
      alignment: 'center',
      buttonColor: '#10b981',
      buttonTextColor: '#ffffff',
      minHeight: '70vh'
    }, 0),

    // 2) Hero - Value Proposition
    makeBlock('hero', {
      title: 'Sektörün Sırlarını Keşfedin',
      subtitle: 'Bu 50 sayfalık kapsamlı rehber, markanızı dijital dünyada nasıl konumlandıracağınızı adım adım gösteriyor.',
      accentWord: 'Sırlarını',
      accentColor: '#10b981',
      bgColor: '#111827',
      textColor: '#ffffff',
      alignment: 'center'
    }, 1),

    // 3) Numbered List - Neler Öğreneceksiniz?
    makeBlock('numbered_list', {
      items: [
        { number: '01', title: 'SEO Optimizasyonu', description: 'Google aramalarında ilk sayfada yer almanın püf noktaları.' },
        { number: '02', title: 'İçerik Stratejisi', description: 'Etkileşim odaklı içerik üretimi ve planlama.' },
        { number: '03', title: 'Reklam Yönetimi', description: 'Meta ve Google reklamlarında düşük maliyet, yüksek dönüşüm.' }
      ],
      accentColor: '#10b981'
    }, 2),

    // 4) Profile - Author
    makeBlock('profile', {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      name: 'Kerem Aydın',
      title: 'Digital Marketing Strategist',
      bio: 'Fortune 500 şirketlerine danışmanlık yapmış, 15 yıllık dijital pazarlama uzmanı.',
      shape: 'circle',
      verifiedBadge: true
    }, 3),

    // 5) Button - Final CTA
    makeBlock('button', {
      label: 'Ücretsiz PDF\'i İndir',
      url: '#',
      style: 'filled',
      color: '#10b981',
      textColor: '#ffffff',
      icon: '📥',
      target: '_blank'
    }, 4)
  ],

  coupon_page: [
    // 1) Hero - Urgent Offer
    makeBlock('hero', {
      title: 'FLAŞ İNDİRİM FIRSATI!',
      subtitle: 'Sadece sınırlı bir süre için tüm alışverişlerinizde geçerli dev indirim.',
      accentWord: 'İNDİRİM',
      accentColor: '#ef4444',
      bgColor: '#0a0a0a',
      textColor: '#ffffff',
      alignment: 'center'
    }, 0),

    // 2) Coupon - Big Code
    makeBlock('coupon', {
      code: 'SUMMER50',
      discount: '%50 İNDİRİM',
      description: 'Sepet toplamında anında geçerli indirim kodu.',
      expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      copyable: true
    }, 1),

    // 3) Countdown - Time Running Out
    makeBlock('countdown', {
      targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      label: 'Fırsatın Bitmesine Kalan Süre',
      numberColor: '#ef4444',
      labelColor: 'rgba(255,255,255,0.7)'
    }, 2),

    // 4) Checklist - Kullanım Şartları
    makeBlock('checklist', {
      title: 'Kampanya Detayları',
      checkColor: '#ef4444',
      items: [
        { text: 'Tüm kategorilerde geçerlidir.' },
        { text: 'Başka kampanyalarla birleştirilemez.' },
        { text: 'Tek seferlik kullanım için uygundur.' },
        { text: 'Minimum 500 ₺ üzeri alışverişlerde geçerlidir.' }
      ]
    }, 3),

    // 5) Button - Shop Now
    makeBlock('button', {
      label: 'Hemen Alışverişe Başla',
      url: '#',
      style: 'filled',
      color: '#ef4444',
      textColor: '#ffffff',
      icon: '🛍️',
      target: '_blank'
    }, 4)
  ],

  travel_itinerary: [
    // 1) Premium Cover - Wanderlust
    makeBlock('cover', {
      title: '48 SAATTE İSTANBUL',
      subtitle: 'Tarih, Lezzet ve Boğaz Havası: En İyi Şehir Rehberi',
      badgeText: 'HAFTA SONU ROTASI',
      bgImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
      ctaText: 'Rotayı İndir',
      ctaLink: '#rota',
      textColor: '#ffffff',
      overlayOpacity: 0.5,
      overlayColor: '#000000',
      alignment: 'center',
      buttonColor: '#f59e0b',
      buttonTextColor: '#ffffff',
      minHeight: '80vh'
    }, 0),

    // 2) Timeline - Detailed Schedule
    makeBlock('timeline', {
      title: '1. GÜN: Tarihi Yarımada',
      cards: [
        { time: '09:00', title: 'Ayasofya & Sultanahmet', description: 'Güne tarihin kalbinde muhteşem bir başlangıç.', bgColor: '#f59e0b', textColor: '#ffffff' },
        { time: '13:00', title: 'Mısır Çarşısı Tadım', description: 'Baharat kokuları arasında yöresel lezzetler.', bgColor: '#d97706', textColor: '#ffffff' },
        { time: '16:00', title: 'Galata Kulesi Gün Batımı', description: 'Şehri kuş bakışı izlemek için en iyi nokta.', bgColor: '#b45309', textColor: '#ffffff' }
      ]
    }, 1),

    // 3) Image Gallery - Travel Highlights
    makeBlock('image_gallery', {
      images: [
        { src: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800&auto=format&fit=crop', alt: 'Boğaz Hattı' },
        { src: 'https://images.unsplash.com/photo-1527838832702-585f237f6671?q=80&w=800&auto=format&fit=crop', alt: 'Sokak Lezzetleri' }
      ],
      columns: 2,
      gap: '12px',
      borderRadius: '16px'
    }, 2),

    // 4) Checklist - Packing List
    makeBlock('checklist', {
      title: 'Yanınıza Almayı Unutmayın',
      checkColor: '#f59e0b',
      items: [
        { text: 'Rahat yürüyüş ayakkabıları' },
        { text: 'İstanbulkart (Toplu taşıma için)' },
        { text: 'Taşınabilir şarj cihazı' },
        { text: 'MüzeKart' }
      ]
    }, 3),

    // 5) Button - Final CTA
    makeBlock('button', {
      label: 'PDF Olarak İndir',
      url: '#',
      style: 'filled',
      color: '#f59e0b',
      textColor: '#ffffff',
      icon: '📥',
      target: '_blank'
    }, 4)
  ],

  simple_download: [
    // 1) Premium Cover - Clean Download
    makeBlock('cover', {
      title: 'PROJE PLANLAMA ŞABLONU',
      subtitle: 'Başarılı bir başlangıç için ihtiyacınız olan tüm dokümanlar tek bir PDF\'te.',
      badgeText: 'ÜCRETSİZ KAYNAK',
      bgImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop',
      ctaText: 'Şimdi İndir',
      ctaLink: '#download',
      textColor: '#ffffff',
      overlayOpacity: 0.6,
      overlayColor: '#0f172a',
      alignment: 'center',
      buttonColor: '#3b82f6',
      buttonTextColor: '#ffffff',
      minHeight: '100vh'
    }, 0)
  ],

  podcast_launch: [
    // 1) Premium Cover - Audio Vibes
    makeBlock('cover', {
      title: 'ZİHNİN ÖTESİNDE',
      subtitle: 'Geleceği, teknolojiyi ve insanı konuştuğumuz yeni bölüm yayında!',
      badgeText: 'YENİ BÖLÜM',
      bgImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'Hemen Dinle',
      ctaLink: '#listen',
      textColor: '#ffffff',
      overlayOpacity: 0.7,
      overlayColor: '#000000',
      alignment: 'center',
      buttonColor: '#1db954',
      buttonTextColor: '#ffffff',
      minHeight: '65vh'
    }, 0),

    // 2) Spotify - Embed
    makeBlock('spotify', {
      spotifyUrl: 'https://open.spotify.com/episode/7makk4oTQel546B0PZlVR5',
      compact: false
    }, 1),

    // 3) Hero - Episode Summary
    makeBlock('hero', {
      title: 'Bu Bölümde Neler Var?',
      subtitle: 'Yapay zeka etiği, biyoteknoloji ve insan evrimi üzerine ufuk açıcı bir sohbet.',
      accentWord: 'Neler Var?',
      accentColor: '#1db954',
      bgColor: '#0a0a0a',
      textColor: '#ffffff',
      alignment: 'center'
    }, 2),

    // 4) Link List - Platforms
    makeBlock('link_list', {
      links: [
        { label: 'Apple Podcasts', url: '#', icon: '🎙️', color: '#872ec4' },
        { label: 'Google Podcasts', url: '#', icon: '🎧', color: '#4285f4' },
        { label: 'YouTube İzle', url: '#', icon: '📺', color: '#FF0000' }
      ]
    }, 3),

    // 5) Social Icons - Stay Connected
    makeBlock('social_icons', {
      socials: [
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'youtube', url: 'https://youtube.com' }
      ]
    }, 4)
  ],

  digital_rsvp: [
    makeBlock('cover', {
      title: 'Elif & Emre',
      subtitle: '25 Ağustos 2026 • Sonsuzluğa İlk Adım',
      badgeText: '— Evleniyoruz —',
      bgImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'Katılım Bildir', ctaLink: '#',
      textColor: '#ffffff', overlayOpacity: 0.45, overlayColor: '#1a0a1e',
      alignment: 'center', buttonColor: '#e8c4a0', buttonTextColor: '#1a0a1e',
      minHeight: '100vh', bgSize: 'cover', bgPosition: 'center'
    }, 0),
    makeBlock('text', {
      content: '<p style="text-align:center; font-style:italic; opacity:0.85;">✦</p><p style="text-align:center;">Sevgili Dostlarımız,</p><p style="text-align:center;">Hayatımızın en güzel gününde<br>sizi de aramızda görmekten<br>büyük mutluluk duyacağız.</p><p style="text-align:center; font-style:italic; opacity:0.85;">✦</p>',
      alignment: 'center', fontSize: 'lg'
    }, 1),
    makeBlock('countdown', {
      targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      label: 'Büyük Güne Kalan Süre', style: 'neon', showDays: true,
      accentColor: '#e8c4a0', numberColor: '#ffffff',
      unitLabelColor: 'rgba(232,196,160,0.7)', labelColor: 'rgba(255,255,255,0.8)',
      expiredMessage: 'Düğün Günü Geldi! 🎉', hideOnExpire: false
    }, 2),
    makeBlock('hero', {
      title: 'Nikah Töreni',
      subtitle: '25 Ağustos 2026, Cumartesi • Saat 19:00\nGrand Bosphorus Kır Bahçesi, İstanbul',
      accentWord: 'Nikah', accentColor: '#e8c4a0',
      bgColor: '#1a0a1e', bgGradient: true,
      gradientColor1: '#1a0a1e', gradientColor2: '#2d1338', gradientAngle: 135,
      textColor: '#ffffff', alignment: 'center'
    }, 3),
    makeBlock('timeline', {
      title: 'Gece Programı', titleColor: '#e8c4a0',
      cards: [
        { time: '18:30', title: 'Karşılama & Hoş Geldiniz Kokteyli', description: 'Canlı piyano eşliğinde karşılama', bgColor: '#e8c4a0', textColor: '#1a0a1e' },
        { time: '19:30', title: 'Nikah Töreni', description: 'Hayatımızın en güzel "Evet"i', bgColor: '#c084a0', textColor: '#ffffff' },
        { time: '20:00', title: 'İlk Dans & Pasta Kesimi', description: 'Gecenin en romantik anları', bgColor: '#9f5080', textColor: '#ffffff' },
        { time: '20:30', title: 'Akşam Yemeği', description: '5 çeşit özel menü', bgColor: '#7a3068', textColor: '#ffffff' },
        { time: '22:00', title: 'DJ & Parti', description: 'Gece boyunca dans ve eğlence! 🎶', bgColor: '#5a1a50', textColor: '#ffffff' }
      ]
    }, 4),
    makeBlock('image_carousel', {
      images: [
        { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop', alt: 'Düğün mekanı' },
        { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop', alt: 'Masa süslemesi' },
        { src: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=2070&auto=format&fit=crop', alt: 'Çiçek detay' }
      ],
      aspectRatio: '16/9', borderRadius: 16
    }, 5),
    makeBlock('text', {
      content: '<p style="text-align:center; font-size:13px; text-transform:uppercase; letter-spacing:3px; opacity:0.6;">📍 Mekan</p><p style="text-align:center; font-weight:700; font-size:18px;">Grand Bosphorus Kır Bahçesi</p><p style="text-align:center; opacity:0.7;">Çamlıca Mahallesi, Boğaz Cd. No:42, Üsküdar / İstanbul</p>',
      alignment: 'center'
    }, 6),
    makeBlock('map', {
      address: 'Çamlıca, Üsküdar, İstanbul', lat: 41.0285, lng: 29.0658, zoom: 15, height: 280
    }, 7),
    makeBlock('checklist', {
      title: 'Hatırlatmalar', titleColor: '#e8c4a0', textColor: '#ffffff', checkColor: '#e8c4a0',
      items: [
        { text: 'Kıyafet Kodu: Şık / Resmi Giyim' },
        { text: 'Otopark mevcuttur (Vale hizmeti)' },
        { text: 'Çocuklar için oyun alanı bulunmaktadır' },
        { text: 'Lütfen katılım durumunuzu 15 Ağustos\'a kadar bildiriniz' }
      ]
    }, 8),
    makeBlock('button', {
      label: '💌  Katılım Durumunu Bildir (LCV)',
      url: 'https://wa.me/905551234567?text=Merhaba!%20D%C3%BC%C4%9F%C3%BCne%20kat%C4%B1l%C4%B1yorum.',
      style: 'filled', color: '#e8c4a0', textColor: '#1a0a1e',
      icon: '', target: '_blank', size: 'lg', borderRadius: 50
    }, 9),
    makeBlock('text', {
      content: '<p style="text-align:center; font-style:italic; opacity:0.5; font-size:14px;">— Elif & Emre —</p><p style="text-align:center; opacity:0.4; font-size:12px;">Bu özel günümüze ortak olduğunuz için teşekkür ederiz 💕</p>',
      alignment: 'center'
    }, 10)
  ]
};

const getTemplateBlocks = (templateId) => {
  const blocks = templateDefinitions[templateId];
  if (!blocks) return [];
  // Generate fresh UUIDs for each instance
  return blocks.map((block, index) => ({
    ...block,
    id: uuidv4(),
    order: index
  }));
};

module.exports = { getTemplateBlocks, templateDefinitions };
