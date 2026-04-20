#!/usr/bin/env bash
# Sunucuda tek komutla deploy: bash deploy.sh
# Ilk kurulum + sonraki guncellemeler icin ayni script calisir.

set -e

PROJECT_DIR="${PROJECT_DIR:-/var/www/miniweb}"
REPO_URL="${REPO_URL:-https://github.com/BatuhanTNK/mini_web_builder.git}"

echo "==> Proje klasoru: $PROJECT_DIR"

# 1) Proje yoksa klonla, varsa pull
if [ ! -d "$PROJECT_DIR/.git" ]; then
  echo "==> Repo klonlaniyor..."
  sudo mkdir -p "$(dirname "$PROJECT_DIR")"
  sudo chown -R "$USER":"$USER" "$(dirname "$PROJECT_DIR")"
  git clone "$REPO_URL" "$PROJECT_DIR"
else
  echo "==> git pull..."
  cd "$PROJECT_DIR"
  git pull
fi

cd "$PROJECT_DIR"

# 2) Node ve pm2 kurulu mu?
if ! command -v node >/dev/null 2>&1; then
  echo "==> Node.js kurulumu (NodeSource 20.x)..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> pm2 kurulumu..."
  sudo npm install -g pm2
fi

# 3) Backend bagimliliklarini kur
echo "==> Backend npm install..."
cd "$PROJECT_DIR/backend"
npm install --omit=dev

# 4) Frontend build
echo "==> Frontend npm install + build..."
cd "$PROJECT_DIR/frontend"
npm install
npm run build

# 5) pm2 ile baslat / yeniden baslat
cd "$PROJECT_DIR"
if pm2 describe miniweb-api >/dev/null 2>&1; then
  echo "==> pm2 restart..."
  pm2 restart miniweb-api
else
  echo "==> pm2 start..."
  pm2 start ecosystem.config.js
  pm2 save
fi

# 6) Nginx config (varsa atla, yoksa kopyala)
if command -v nginx >/dev/null 2>&1; then
  if [ ! -f /etc/nginx/sites-available/miniweb ]; then
    echo "==> Nginx config kuruluyor..."
    sudo cp "$PROJECT_DIR/nginx.conf" /etc/nginx/sites-available/miniweb
    sudo ln -sf /etc/nginx/sites-available/miniweb /etc/nginx/sites-enabled/miniweb
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo nginx -t
    sudo systemctl reload nginx
  else
    echo "==> Nginx config zaten var, atlandi."
  fi
else
  echo "==> Nginx kurulu degil. Yuklemek icin: sudo apt-get install -y nginx"
fi

# 7) Ozet
echo ""
echo "==> Tamamlandi."
pm2 status
echo ""
echo "Test: curl http://127.0.0.1:5000/api/health"
