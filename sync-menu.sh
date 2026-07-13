#!/bin/sh
# Подтягивает свежую версию меню winegallery из его собственного репозитория
# в ./winegallery/. Меню разрабатывается отдельно; здесь лежит его копия,
# которая деплоится вместе с сайтом.
#
#   ./sync-menu.sh              # взять из пути по умолчанию
#   MENU_SRC=/путь ./sync-menu.sh
#
# После синхронизации изменения нужно закоммитить: git add winegallery && git commit
set -e

MENU_SRC="${MENU_SRC:-$HOME/Desktop/Ди/Вино/winegallery1/winegallery}"
DEST="$(dirname "$0")/winegallery"

if [ ! -f "$MENU_SRC/index.html" ]; then
  echo "Не найден исходник меню: $MENU_SRC" >&2
  echo "Укажи путь через MENU_SRC=/путь/к/winegallery ./sync-menu.sh" >&2
  exit 1
fi

rsync -a --delete \
  --exclude '.git' --exclude '.DS_Store' --exclude 'node_modules' \
  "$MENU_SRC/" "$DEST/"

# В исходнике часть файлов лежит с правами 400/600 — веб-сервер их не прочитает.
chmod -R u+rwX,go+rX,go-w "$DEST"

echo "Меню обновлено из $MENU_SRC"
git -C "$(dirname "$0")" status --short winegallery
