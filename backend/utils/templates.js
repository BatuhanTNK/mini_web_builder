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
      iconBgColor: '#000000',
      iconBorderColor: '#ffffff',
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
    // 1) Profile - Professional Business Identity (Premium Dark)
    makeBlock('profile', {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      name: 'Dr. Selin Yılmaz',
      title: 'Yönetim Danışmanı & Mentor',
      bio: 'Şirketlerin dijital dönüşüm süreçlerine rehberlik ediyorum. 15 yıllık sektör deneyimi ile stratejik çözüm ortağınız.',
      shape: 'circle',
      textColor: '#ffffff',
      bannerColor: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      haloEnabled: true,
      haloColor1: '#3b82f6',
      haloColor2: '#1d4ed8',
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
      avatarBg: 'transparent',
      btnBg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      btnTextColor: '#ffffff',
      nameColor: '#ffffff',
      textColor: 'rgba(255,255,255,0.7)',
      iconColor: '#3b82f6'
    }, 1),

    // 3) Link List - Professional Connections
    makeBlock('link_list', {
      links: [
        { label: 'Resmi Web Sitesi', url: '#', icon: '🌐', color: '#3b82f6' },
        { label: 'LinkedIn Profili', url: '#', icon: '💼', color: '#0077b5' },
        { label: 'Medium Blog', url: '#', icon: '📝', color: '#000000' }
      ],
      size: 'lg',
      borderRadius: 12,
      fontWeight: '600'
    }, 2),

    // 4) Social Icons - Digital Presence
    makeBlock('social_icons', {
      socials: [
        { platform: 'instagram', url: '#' },
        { platform: 'twitter', url: '#' },
        { platform: 'linkedin', url: '#' }
      ],
      iconBgColor: 'rgba(255,255,255,0.03)',
      iconBorderColor: 'rgba(128,128,128,0.2)'
    }, 3),

    // 5) Text - Professional Bio
    makeBlock('text', {
      content: '<p style="text-align:center; opacity:0.8;">Vizyoner liderlik ve dijital strateji konularında uzmanlaşmış, global ölçekte projeler yöneten bir danışman olarak, markanızın geleceğini birlikte inşa ediyoruz.</p>',
      alignment: 'center',
      fontSize: 'md'
    }, 4),

    // 6) Button - Action
    makeBlock('button', {
      label: 'Hemen İletişime Geç',
      url: 'https://wa.me/905329876543',
      style: 'filled',
      color: '#3b82f6',
      textColor: '#ffffff',
      icon: '💬',
      target: '_blank'
    }, 5)
  ],

  restaurant: [
    // 1) Luxury Cover
    makeBlock('cover', {
      title: 'THE IRON GRILL',
      subtitle: 'Premium Steakhouse & Craft Bar Experience',
      badgeText: 'EST. 1994 • AWARD WINNING',
      bgImage: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'MASA REZERVASYONU',
      ctaLink: '#reserve',
      textColor: '#ffffff',
      overlayOpacity: 0.65,
      overlayColor: '#000000',
      alignment: 'center',
      buttonColor: '#991b1b',
      buttonTextColor: '#ffffff',
      minHeight: '100vh',
      showButton: true
    }, 0),

    // 2) Welcome Hero
    makeBlock('hero', {
      title: 'Ateşin ve Lezzetin Buluşma Noktası',
      subtitle: 'Kusursuz mermerleşmiş özel kesim etlerimiz, uzman kasaplarımızın ustalığı ve modern steakhouse dokunuşlarıyla unutulmaz bir lezzet şölenine davetlisiniz.',
      accentWord: 'Ateşin',
      accentColor: '#991b1b',
      bgColor: '#111827',
      bgGradient: true,
      gradientColor1: '#0f172a',
      gradientColor2: '#000000',
      textColor: '#ffffff',
      alignment: 'center'
    }, 1),

    // 3) Expanded Gourmet Menu
    makeBlock('menu', {
      title: 'GURME SEÇENEKLERİMİZ',
      categories: [
        {
          name: 'Başlangıçlar & Atıştırmalıklar',
          icon: '🥘',
          image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=600',
          subcategories: [
            {
              name: 'Soğuk Başlangıçlar',
              image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600',
              items: [
                { name: 'Dana Carpaccio', price: '520', description: 'Trüf mayonez, parmesan ve roka ile', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200' },
                { name: 'Somon Tartar', price: '480', description: 'Avokado püresi ve kapari sos eşliğinde', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=200' }
              ]
            },
            {
              name: 'Sıcak Başlangıçlar',
              image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=600',
              items: [
                { name: 'İlikli Kemik', price: '390', description: 'Sarımsaklı ekşi maya ekmek ve deniz tuzu ile', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=200' },
                { name: 'Izgara Hellim', price: '280', description: 'Nar ekşisi ve taze nane ile', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=200' }
              ]
            }
          ]
        },
        {
          name: 'Ana Yemekler (Steakhouse)',
          icon: '🥩',
          image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=600',
          subcategories: [
            {
              name: 'Özel Kesim Etler',
              image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=600',
              items: [
                { name: 'Dallas Steak (500g)', price: '1.450', description: 'Kendi suyunda dinlendirilmiş, kemikli antrikot', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?q=80&w=200' },
                { name: 'T-Bone Steak (600g)', price: '1.680', description: 'Bonfile ve antrikotun muhteşem uyumu', image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=200' },
                { name: 'Kuzu Kafes', price: '1.250', description: 'Taze kekik ve biberiye ile mühürlenmiş', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=200' }
              ]
            },
            {
              name: 'İmza Burgerler',
              image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600',
              items: [
                { name: 'Iron Grill Burger', price: '420', description: '180g dana köfte, karamelize soğan, cheddar ve özel sos', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200' },
                { name: 'Tütsülenmiş Burger', price: '460', description: 'Füme kaburga eti ve barbekü sos ile', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=200' }
              ]
            }
          ]
        },
        {
          name: 'Tatlılar & Kapanış',
          icon: '🍰',
          image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=600',
          subcategories: [
            {
              name: 'Tatlılar',
              image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600',
              items: [
                { name: 'Sıcak Çikolatalı Sufle', price: '240', description: 'Vanilyalı dondurma eşliğinde', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=200' },
                { name: 'San Sebastian Cheesecake', price: '220', description: 'Belçika çikolatası sosu ile', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=200' }
              ]
            }
          ]
        },
        {
          name: 'İçecekler',
          icon: '🥤',
          image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600',
          subcategories: [
            {
              name: 'Sıcak İçecekler',
              image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600',
              items: [
                { name: 'Americano', price: '120', description: 'Yumuşak içimli, taze çekilmiş çekirdeklerden', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=200' },
                { name: 'Türk Kahvesi', price: '95', description: 'Geleneksel sunumu ve çifte kavrulmuş tadıyla', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=200' },
                { name: 'Demleme Siyah Çay', price: '45', description: 'Rize yaylalarından taze harman', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=200' }
              ]
            },
            {
              name: 'Soğuk İçecekler',
              image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600',
              items: [
                { name: 'Ev Yapımı Limonata', price: '110', description: 'Taze nane ve bal ile tatlandırılmış', image: 'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?q=80&w=200' },
                { name: 'Taze Portakal Suyu', price: '135', description: 'Günlük sıkılmış, %100 doğal', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=200' },
                { name: 'San Pellegrino (750ml)', price: '185', description: 'Doğal mineralli su', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=200' }
              ]
            }
          ]
        }
      ],
      themeColor: '#991b1b',
      cardBg: 'rgba(255,255,255,0.03)',
      nameColor: '#ffffff',
      priceColor: '#ca8a04'
    }, 2),

    // 4) Atmosphere Gallery
    makeBlock('image_gallery', {
      images: [
        { src: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800', alt: 'Ateş Üstünde Mühürleme' },
        { src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=800', alt: 'Mutfak Sanatı' },
        { src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800', alt: 'Zarif Sunum' },
        { src: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800', alt: 'Premium Dinlendirilmiş Etler' }
      ],
      columns: 2,
      gap: '15px',
      borderRadius: '12px'
    }, 3),

    // 5) Executive Chef
    makeBlock('profile', {
      avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=400', 
      name: 'Şef Marco Vieri',
      title: 'Mutfak Direktörü',
      bio: 'Steakhouse kültürünü Avrupa teknikleriyle birleştiren Şef Vieri, THE IRON GRILL mutfağının ruhunu oluşturuyor.',
      shape: 'circle',
      textColor: '#ffffff',
      bannerColor: '#1a1a1a',
      haloEnabled: true,
      haloColor1: '#991b1b',
      haloColor2: '#ca8a04',
      verifiedBadge: true
    }, 4),

    // 6) Map & Location
    makeBlock('map', {
      address: 'Zorlu Center, Beşiktaş, İstanbul',
      lat: 41.0667,
      lng: 29.0167,
      zoom: 16,
      height: 300,
      borderRadius: '12px'
    }, 5),

    // 7) Social Presence
    makeBlock('social_icons', {
      socials: [
        { platform: 'instagram', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'twitter', url: '#' },
        { platform: 'youtube', url: '#' }
      ],
      iconBgColor: 'rgba(255,255,255,0.05)',
      iconBorderColor: 'rgba(153,27,27,0.3)'
    }, 6),

    // 8) Action Button
    makeBlock('button', {
      label: 'WHATSAPP REZERVASYON',
      url: 'https://wa.me/905550000000',
      style: 'filled',
      color: '#991b1b',
      textColor: '#ffffff',
      icon: '🥩',
      target: '_blank',
      animation: 'bounce',
      hoverEffect: 'grow'
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
    // 1) Minimalist Cover - First Impression
    makeBlock('cover', {
      title: 'MERT DEMİR',
      subtitle: 'Dijital Ürün Tasarımcısı & Full-Stack Geliştirici',
      badgeText: 'KREATİF PORTFOLYO • 2024',
      bgImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'Projelerimi Keşfet',
      ctaLink: '#projeler',
      textColor: '#ffffff',
      overlayOpacity: 0.75,
      overlayColor: '#0f172a',
      alignment: 'center',
      buttonColor: '#3b82f6',
      buttonTextColor: '#ffffff',
      minHeight: '85vh'
    }, 0),

    // 2) Profile - Expertise & Bio
    makeBlock('profile', {
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop', 
      name: 'Mert Demir',
      title: 'Senior Full-Stack Creator',
      bio: '10 yılı aşkın süredir markaların dijital dönüşüm süreçlerine liderlik ediyorum. Estetik ve fonksiyonelliği bir araya getiren, ölçeklenebilir çözümler üretiyorum.',
      shape: 'circle',
      verifiedBadge: true
    }, 1),

    // 3) Hero - Key Statement
    makeBlock('hero', {
      title: 'Karmaşıklığı Basitliğe Dönüştürüyorum',
      subtitle: 'Kullanıcı dostu arayüzler ve güçlü backend mimarileri ile işinizi bir üst seviyeye taşıyın.',
      accentWord: 'Basitliğe',
      accentColor: '#3b82f6',
      alignment: 'center'
    }, 2),

    // 4) Numbered List - Expertise
    makeBlock('numbered_list', {
      title: 'Neler Sunuyorum?',
      items: [
        { number: '01', title: 'Stratejik Tasarım', description: 'Kullanıcı araştırması ve veri analizi odaklı modern UI/UX çözümleri.' },
        { number: '02', title: 'Modern Web Mimarisi', description: 'Next.js ve React ile SEO dostu, yüksek performanslı web uygulamaları.' },
        { number: '03', title: 'Mobil Çözümler', description: 'iOS ve Android platformlarında kusursuz çalışan hibrit uygulamalar.' }
      ],
      accentColor: '#3b82f6'
    }, 3),

    // 5) Image Gallery - Case Studies
    makeBlock('image_gallery', {
      title: 'Seçili Projeler',
      images: [
        { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop', alt: 'Fintech App' },
        { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', alt: 'E-Commerce' },
        { src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop', alt: 'Health Platform' },
        { src: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=800&auto=format&fit=crop', alt: 'Data Analytics' }
      ],
      columns: 2,
      gap: 16,
      borderRadius: 20
    }, 4),

    // 6) Timeline - Professional Journey
    makeBlock('timeline', {
      title: 'Kariyer Yolculuğum',
      items: [
        { title: 'Senior Developer @ TechCorp', description: 'Global ölçekli projelerin mimari tasarımı ve teknik liderlik.' },
        { title: 'Product Designer @ DesignStudio', description: 'Kullanıcı deneyimi odaklı arayüz tasarımları ve prototipleme.' },
        { title: 'Full-Stack Developer @ StartupX', description: 'MVP aşamasından ölçeklenebilir ürünlere geçiş süreçleri.' }
      ],
      accentColor: '#3b82f6'
    }, 5),

    // 7) Contact Form - Get in Touch
    makeBlock('contact_form', {
      title: 'Birlikte Çalışalım',
      subtitle: 'Projeniz hakkında konuşmak veya sadece selam vermek için bana ulaşın.',
      buttonText: 'Mesaj Gönder',
      buttonColor: '#3b82f6'
    }, 6),

    // 8) Social Icons - Network
    makeBlock('social_icons', {
      icons: [
        { type: 'linkedin', url: 'https://linkedin.com' },
        { type: 'github', url: 'https://github.com' },
        { type: 'instagram', url: 'https://instagram.com' }
      ],
      alignment: 'center',
      style: 'filled',
      color: '#3b82f6'
    }, 7)
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
      videoUrl: '',
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
      title: 'Size Nasıl Yardımcı Olabiliriz?',
      subtitle: 'Sorularınıza en hızlı çözümü bulmak için hazırladığımız yardım merkezine hoş geldiniz. Kategorilere göz atarak aradığınız cevabı bulabilirsiniz.',
      accentWord: 'Yardımcı',
      accentColor: '#3b82f6',
      alignment: 'center'
    }, 0),

    // 2) FAQ - Sipariş & Teslimat
    makeBlock('faq', {
      title: '📦 Sipariş ve Teslimat',
      items: [
        { question: 'Kargom ne zaman ulaşır?', answer: 'Siparişleriniz genellikle 24 saat içinde kargoya verilir ve bulunduğunuz bölgeye göre 1-3 iş günü içinde adresinize ulaşır.' },
        { question: 'Kargo takibini nasıl yaparım?', answer: 'Siparişiniz kargoya verildiğinde size bir takip numarası gönderilecektir. Bu numara ile kargo firmasının sitesinden takip yapabilirsiniz.' },
        { question: 'Aynı gün teslimat seçeneği var mı?', answer: 'İstanbul içi seçili bölgelerde saat 12:00\'den önce verilen siparişlerde aynı gün teslimat seçeneği sunulmaktadır.' }
      ],
      iconColor: '#3b82f6',
      questionColor: 'var(--site-text)',
      answerColor: 'var(--site-text)',
      borderColor: 'rgba(255,255,255,0.12)'
    }, 1),

    // 3) FAQ - Ödeme & İade
    makeBlock('faq', {
      title: '💳 Ödeme ve İade',
      items: [
        { question: 'Hangi ödeme yöntemleri geçerli?', answer: 'Tüm banka ve kredi kartları ile ödeme yapabilirsiniz. Ayrıca havale/EFT seçeneğimiz de mevcuttur.' },
        { question: 'İade sürecini nasıl başlatırım?', answer: 'Ürünü teslim aldığınız tarihten itibaren 14 gün içinde orijinal kutusuyla birlikte iade edebilirsiniz.' },
        { question: 'Geri ödeme ne zaman yapılır?', answer: 'İade onaylandıktan sonra 3-5 iş günü içerisinde tutar kartınıza iade edilir.' }
      ],
      iconColor: '#3b82f6',
      questionColor: 'var(--site-text)',
      answerColor: 'var(--site-text)',
      borderColor: 'rgba(255,255,255,0.12)'
    }, 2),

    // 4) Link List - Hızlı İletişim Kanalları
    makeBlock('link_list', {
      links: [
        { label: 'WhatsApp Canlı Destek', url: 'https://wa.me/905551234567', icon: '💬', color: '#25D366' },
        { label: 'E-Posta Gönder', url: 'mailto:destek@firma.com', icon: '📧', color: '#3b82f6' },
        { label: 'Kullanım Kılavuzları', url: '#', icon: '📚', color: '#64748b' }
      ]
    }, 3),

    // 5) Button - Destek Talebi
    makeBlock('button', {
      label: 'Destek Talebi Oluştur',
      url: '#',
      style: 'filled',
      color: '#3b82f6',
      textColor: '#ffffff',
      icon: '🎫',
      target: '_blank'
    }, 4)
  ],

  personal_trainer: [
    // 1) Premium Cover - Motivation & Grit
    makeBlock('cover', {
      title: 'HAYALİNDEKİ FORMA KAVUŞ',
      subtitle: 'Kişiye özel antrenman ve beslenme planlarıyla sınırlarını beraber aşalım.',
      badgeText: 'PROFESYONEL KOÇLUK • 2024',
      bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'Değişime Başla',
      ctaLink: '#hakkimda',
      textColor: '#ffffff',
      overlayOpacity: 0.65,
      overlayColor: '#000000',
      alignment: 'center',
      buttonColor: '#ef4444',
      buttonTextColor: '#ffffff',
      minHeight: '85vh'
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

    // 3) Hero - Tanıtım Başlığı
    makeBlock('hero', {
      title: 'Neden Benimle Çalışmalısın?',
      subtitle: 'Bilimsel temelli antrenman metodolojisi ve sürdürülebilir beslenme ile kalıcı sonuçlar almanı sağlıyorum.',
      accentWord: 'Çalışmalısın?',
      accentColor: '#ef4444',
      alignment: 'center'
    }, 2),

    // 4) Timeline - Değişim Süreci
    makeBlock('timeline', {
      title: 'Nasıl Başlıyoruz?',
      items: [
        { title: 'Ücretsiz Ön Görüşme', description: 'Hedeflerini, yaşam tarzını ve beklentilerini anlamak için kısa bir tanışma toplantısı yapıyoruz.' },
        { title: 'Kapsamlı Analiz', description: 'Vücut kompozisyonu, postür analizi ve spor geçmişini detaylıca inceliyoruz.' },
        { title: 'Kişiye Özel Planlama', description: 'Sadece sana özel, yaşam tarzına uygun ve sürdürülebilir antrenman/beslenme programını hazırlıyorum.' },
        { title: 'Uygulama & Eğitim', description: 'Program detaylarını mobil uygulama üzerinden videolu anlatımlarla ve teknik detaylarla paylaşıyorum.' },
        { title: 'Haftalık Takip & Güncelleme', description: 'Form fotoğrafların ve performans verilerin ışığında programı her hafta optimize ediyoruz.' },
        { title: 'Kesintisiz Destek', description: 'Tüm soruların için 7/24 WhatsApp üzerinden doğrudan benimle iletişimde kalıyorsun.' }
      ],
      accentColor: '#ef4444'
    }, 3),

    // 5) Image Gallery - Başarı Hikayeleri
    makeBlock('image_gallery', {
      images: [
        { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop', alt: 'Antrenman' },
        { src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop', alt: 'Beslenme' },
        { src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop', alt: 'Değişim 1' },
        { src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800&auto=format&fit=crop', alt: 'Değişim 2' }
      ],
      columns: 2,
      gap: 12,
      borderRadius: 16
    }, 4),

    // 6) Checklist - Paket İçeriği
    makeBlock('checklist', {
      title: 'Koçluk Paketine Neler Dahil?',
      checkColor: '#ef4444',
      items: [
        { text: 'Kişiye Özel Antrenman Programı' },
        { text: 'Makro-Mikro Beslenme Planı' },
        { text: '7/24 WhatsApp Soru-Cevap Desteği' },
        { text: 'Haftalık Görüntülü Form Kontrolü' },
        { text: 'Supplement Danışmanlığı' }
      ]
    }, 5),

    // 7) Button - WhatsApp Bilgi Al
    makeBlock('button', {
      label: 'WhatsApp ile Bilgi Al',
      url: 'https://wa.me/905551234567?text=Merhaba!%20Online%20ko%C3%A7luk%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.',
      style: 'filled',
      color: '#25D366',
      textColor: '#ffffff',
      icon: '💬',
      target: '_blank'
    }, 6)
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
