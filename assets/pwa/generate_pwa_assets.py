#!/usr/bin/env python3
"""
Генератор PWA-ассетов Hostera (иконки + iOS/iPadOS splash-screens) из токенов
бренда Titanium & Cognac. Запуск:  python3 generate_pwa_assets.py
Все PNG кладутся рядом со скриптом (assets/pwa/), плюс пишется
splash-links.html — готовый набор <link rel="apple-touch-startup-image">.

Покрытие: iPhone 14–17 (+ Air) — портрет; iPad (Pro 11/12.9/13, Air, mini,
iPad 10.2/10.9) — портрет И альбом. Свет + тьма.

Шрифт: по умолчанию берётся системный serif (Georgia/Liberation/DejaVu).
Чтобы получить 100% брендовый вид — положите Fraunces рядом (Fraunces.ttf).
"""
import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))

# ── Токены бренда Titanium & Cognac ─────────────────────────────────────────
LIGHT_BG   = "#F5F5F7"
LIGHT_TEXT = "#1C1C1E"
LIGHT_MUTED= "#6E6E73"
DARK_BG    = "#1C1C1E"
DARK_TEXT  = "#F5F5F7"
DARK_MUTED = "#8E8E93"
COGNAC     = "#C76B28"   # акцент светлой темы
COGNAC_SOFT= "#D9883F"   # акцент тёмной темы
# Иконка: тёмный «титан» + коньячный вензель — читается на любом хоум-скрине
ICON_BG    = "#1C1C1E"
ICON_MARK  = "#C76B28"

# ── Поиск serif-шрифта ──────────────────────────────────────────────────────
SERIF_CANDIDATES = [
    os.path.join(HERE, "Fraunces.ttf"),
    "/System/Library/Fonts/Supplemental/Georgia.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
    "/usr/share/fonts/truetype/liberation2/LiberationSerif-Regular.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
]
SERIF_BOLD_CANDIDATES = [
    os.path.join(HERE, "Fraunces-SemiBold.ttf"),
    "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
    "/usr/share/fonts/truetype/liberation2/LiberationSerif-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
]

def _first(paths):
    for p in paths:
        if os.path.exists(p):
            return p
    raise SystemExit("Не найден serif-шрифт: " + ", ".join(paths))

SERIF_PATH = _first(SERIF_CANDIDATES)
SERIF_BOLD_PATH = _first(SERIF_BOLD_CANDIDATES)

def font(size, bold=False):
    return ImageFont.truetype(SERIF_BOLD_PATH if bold else SERIF_PATH, size)

def draw_tracked(draw, xy, text, fnt, fill, tracking=0, anchor_center=True):
    """Рисует текст с межбуквенным трекингом, центрируя по xy (если anchor_center)."""
    widths = []
    for ch in text:
        bb = draw.textbbox((0, 0), ch, font=fnt)
        widths.append(bb[2] - bb[0])
    total = sum(widths) + tracking * (len(text) - 1)
    x = xy[0] - total / 2 if anchor_center else xy[0]
    ascent, descent = fnt.getmetrics()
    y = xy[1] - (ascent + descent) / 2
    for ch, w in zip(text, widths):
        bb = draw.textbbox((0, 0), ch, font=fnt)
        draw.text((x - bb[0], y), ch, font=fnt, fill=fill)
        x += w + tracking

# ── Иконки ──────────────────────────────────────────────────────────────────
def make_icon(size, mark_scale=0.52, out="icon.png"):
    """Квадратная непрозрачная иконка: титановый фон + коньячный вензель H."""
    img = Image.new("RGB", (size, size), ICON_BG)
    d = ImageDraw.Draw(img)
    f = font(int(size * mark_scale), bold=True)
    draw_tracked(d, (size/2, size*0.50), "H", f, ICON_MARK, tracking=0)
    # тонкая коньячная черта-подпись под вензелем
    lw = int(size * 0.16); ly = int(size * 0.72); th = max(2, int(size*0.012))
    d.rectangle([size/2 - lw/2, ly, size/2 + lw/2, ly + th], fill=ICON_MARK)
    img.save(os.path.join(HERE, out))
    return out

def make_maskable(size, out="icon-maskable.png"):
    # маскируемая: вензель в пределах центральных ~55% (safe zone для круговой маски)
    return make_icon(size, mark_scale=0.40, out=out)

# ── Splash ──────────────────────────────────────────────────────────────────
def make_splash(w, h, dark, out):
    bg   = DARK_BG if dark else LIGHT_BG
    text = DARK_TEXT if dark else LIGHT_TEXT
    muted= DARK_MUTED if dark else LIGHT_MUTED
    accent = COGNAC_SOFT if dark else COGNAC
    img = Image.new("RGB", (w, h), bg)
    d = ImageDraw.Draw(img)
    cx, cy = w/2, h/2
    # база масштаба — меньшая сторона, чтобы альбомная ориентация не раздувала шрифт
    base = min(w, h)
    # вордмарк
    wm = font(int(base * 0.11))
    draw_tracked(d, (cx, cy - base*0.02), "HOSTERA", wm, text, tracking=int(base*0.022))
    # коньячная разделительная черта
    lw = int(base * 0.14); th = max(2, int(base*0.006)); ly = int(cy + base*0.035)
    d.rectangle([cx - lw/2, ly, cx + lw/2, ly + th], fill=accent)
    # подзаголовок
    sub = font(int(base * 0.032))
    draw_tracked(d, (cx, cy + base*0.075), "a new era of hospitality", sub, muted, tracking=int(base*0.006))
    img.save(os.path.join(HERE, out))
    return out

# (pt_w, pt_h, dpr) — портретные точки экрана и плотность; px = points × dpr
IPHONE_SPLASH = [
    (375, 667, 2),   # 750×1334  — iPhone 6/7/8 / SE 2/3
    (414, 736, 3),   # 1242×2208 — iPhone 6/7/8 Plus
    (375, 812, 3),   # 1125×2436 — X / XS / 11 Pro / 12 mini / 13 mini
    (414, 896, 2),   # 828×1792  — XR / 11
    (414, 896, 3),   # 1242×2688 — XS Max / 11 Pro Max
    (390, 844, 3),   # 1170×2532 — 12 / 12 Pro / 13 / 13 Pro / 14
    (393, 852, 3),   # 1179×2556 — 16 / 15 / 15 Pro / 14 Pro
    (402, 874, 3),   # 1206×2622 — 17 / 17 Pro / 16 Pro
    (420, 912, 3),   # 1260×2736 — iPhone Air
    (428, 926, 3),   # 1284×2778 — 12/13 Pro Max / 14 Plus
    (430, 932, 3),   # 1290×2796 — 16 Plus / 15 Pro Max / 15 Plus / 14 Pro Max
    (440, 956, 3),   # 1320×2868 — 17 Pro Max / 16 Pro Max
]
IPAD_SPLASH = [
    (1032, 1376, 2), # 2064×2752 — iPad Pro 13" (M4)
    (1024, 1366, 2), # 2048×2732 — iPad Pro 12.9" / iPad Air 13"
    (834, 1210, 2),  # 1668×2420 — iPad Pro 11" (M4)
    (834, 1194, 2),  # 1668×2388 — iPad Pro 11" (1–4 gen)
    (820, 1180, 2),  # 1640×2360 — iPad Air 10.9"/11", iPad 10/11 gen
    (810, 1080, 2),  # 1620×2160 — iPad 10.2" (7–9 gen)
    (744, 1133, 2),  # 1488×2266 — iPad mini (6/7 gen)
]

# href относительный: сайт живёт и в корне домена, и на подпути (GitHub Pages
# /hostera-site/), поэтому абсолютные пути от '/' недопустимы. Для страниц не в
# корне сайта (winegallery/index.html) добавляйте префикс ../ при вставке.
LINK_TMPL = ('  <link rel="apple-touch-startup-image" '
             'media="screen and (device-width:{pw}px) and (device-height:{ph}px) '
             'and (-webkit-device-pixel-ratio:{dpr}) and (orientation:{orient}) '
             'and (prefers-color-scheme:{scheme})" '
             'href="assets/pwa/{fname}" />')

def gen_splashes():
    """Генерирует PNG и возвращает список готовых <link>-тегов."""
    links = []
    def emit(pw, ph, dpr, orient):
        w, h = pw * dpr, ph * dpr
        if orient == "landscape":
            w, h = h, w
        for scheme in ("light", "dark"):
            fname = f"splash-{w}x{h}-{scheme}.png"
            make_splash(w, h, dark=(scheme == "dark"), out=fname)
            links.append(LINK_TMPL.format(pw=pw, ph=ph, dpr=dpr, orient=orient,
                                          scheme=scheme, fname=fname))
    for (pw, ph, dpr) in IPHONE_SPLASH:
        emit(pw, ph, dpr, "portrait")
    for (pw, ph, dpr) in IPAD_SPLASH:
        emit(pw, ph, dpr, "portrait")
        emit(pw, ph, dpr, "landscape")
    return links

def main():
    make_icon(192, out="icon-192.png")
    make_icon(512, out="icon-512.png")
    make_maskable(512, out="icon-512-maskable.png")
    make_icon(180, out="apple-touch-icon-180.png")  # непрозрачная, для iOS
    links = gen_splashes()
    snippet = os.path.join(HERE, "splash-links.html")
    with open(snippet, "w", encoding="utf-8") as f:
        f.write("<!-- Сгенерировано generate_pwa_assets.py — вставить в <head> -->\n")
        f.write("\n".join(links) + "\n")
    print(f"Готово: {4 + len(links)} PNG + splash-links.html. Serif: {os.path.basename(SERIF_PATH)}")

if __name__ == "__main__":
    main()
