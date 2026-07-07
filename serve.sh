#!/bin/sh
# Локальный запуск платформы Hostera + меню winegallery (симлинк ./winegallery).
# Открой http://localhost:8000 после запуска.
cd "$(dirname "$0")" && python3 -m http.server 8000
