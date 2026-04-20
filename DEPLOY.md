# Deploy Rehberi (164.90.210.174)

Backend artık frontend build'ini de sunuyor. Tek bir Node process yeterli.

## 1) Projeyi sunucuya al

Termius ile SSH bağlan, projeyi klonla / pull et:

```bash
cd /var/www
git clone <repo-url> miniweb
# veya mevcut klasörde:
cd /var/www/miniweb && git pull
```

## 2) Bağımlılıkları kur ve frontend'i build et

```bash
cd /var/www/miniweb

# Backend bağımlılıkları
cd backend && npm install --omit=dev && cd ..

# Frontend bağımlılıkları + production build
cd frontend && npm install && npm run build && cd ..
```

`frontend/dist/` klasörü oluştuktan sonra backend otomatik olarak bu klasörü serve edecek.

## 3) pm2 ile kalıcı çalıştır

pm2 kurulu değilse:

```bash
npm install -g pm2
```

Başlat:

```bash
cd /var/www/miniweb
pm2 start ecosystem.config.js
pm2 save
pm2 startup        # çıktıdaki komutu aynen kopyala/çalıştır
```

Kontrol:

```bash
pm2 status
pm2 logs miniweb-api
curl http://127.0.0.1:5000/api/health
```

## 4) Port 80'den erişim — iki seçenek

### Seçenek A — Nginx (önerilen)

```bash
sudo cp nginx.conf /etc/nginx/sites-available/miniweb
sudo ln -sf /etc/nginx/sites-available/miniweb /etc/nginx/sites-enabled/miniweb
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### Seçenek B — Node'u doğrudan 80'de çalıştır (Nginx yok)

`ecosystem.config.js` içinde `PORT: 5000` yerine `PORT: 80` yap. Ardından:

```bash
sudo setcap 'cap_net_bind_service=+ep' $(which node)
pm2 restart miniweb-api
```

## 5) Firewall

```bash
sudo ufw allow 80/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

## 6) Güncelleme akışı

Kod değişikliğinden sonra:

```bash
cd /var/www/miniweb
git pull
cd frontend && npm run build && cd ..
pm2 restart miniweb-api
```

## Sorun giderme

- **405 Not Allowed**: Nginx `/api`'yi proxy'lemiyor → `nginx.conf`'u tekrar kopyala, `sudo systemctl reload nginx`
- **502 Bad Gateway**: Backend çalışmıyor → `pm2 logs miniweb-api`
- **Beyaz ekran**: `frontend/dist` yok → `cd frontend && npm run build`
- **Resim yüklenmiyor (413)**: Nginx `client_max_body_size` değeri düşük → config'de `10M` olmalı
