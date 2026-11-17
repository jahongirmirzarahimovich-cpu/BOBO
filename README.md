# Bobo — aqlli kassa va ombor

Bitta baza, uch xil qurilma:

| Qurilma | Qanday o'rnatiladi |
|---|---|
| Android telefon | `Bobo.apk` fayli |
| iPhone | Safari → «Bosh ekranga qo'shish» (iPhone APK o'rnatmaydi) |
| Kompyuter (Windows/Mac) | Chrome/Edge → «O'rnatish» (alohida oynali dastur) |

Barcha qurilmalar bitta **Firebase** bazasiga ulanadi — telefondagi sotuv kompyuterda darhol ko'rinadi. Internet uzilsa, yozuvlar qurilmada saqlanib, aloqa tiklanganda avtomatik yuboriladi.

---

## 1-qadam. Firebase bazasini ochish (bepul, ~10 daqiqa)

1. https://console.firebase.google.com ga Google akkaunt bilan kiring → **Add project** → nomi: `bobo-dokon` → Google Analytics shart emas → **Create**.
2. Chap menyu **Build → Firestore Database** → **Create database** → joylashuv: `eur3 (europe-west)` → **Production mode** → **Create**.
3. **Rules** bo'limiga `firebase/firestore.rules` fayli matnini qo'ying. `DOKON_EMAIL` o'rniga 4-bandda yaratiladigan email manzilini yozing → **Publish**.
4. **Build → Authentication** → **Get started** → **Email/Password** → yoqing → **Save**.
   **Users** → **Add user** → do'kon uchun email va kuchli parol (masalan `dokon.bobo@gmail.com`). Shu email va parol bilan barcha qurilmalar ulanadi.
5. **Authentication → Settings → User actions** → **Enable create (sign-up)** belgisini **o'chiring** (begonalar ro'yxatdan o'ta olmasin).
6. ⚙️ **Project settings** → **Your apps** → **</>** (Web) → nomi `Bobo` → **Register app**. Chiqqan `const firebaseConfig = { ... }` matnini nusxalab saqlang — bu **Firebase sozlamasi**.

## 2-qadam. APK va kompyuter versiyasini yig'ish (GitHub, bepul)

1. https://github.com da akkaunt oching → **New repository** → nomi `bobo` → **Public** → **Create**.
2. **Add file → Upload files** → shu papkadagi barcha fayl va papkalarni (`android`, `www`, `firebase`, `.github`, `README.md`, `sync.sh`) sudrab tashlang → **Commit changes**.
   (`.github` papkasi ko'rinmasa: kompyuterda yashirin fayllarni ko'rsatishni yoqing.)
3. **Settings → Secrets and variables → Actions → New repository secret**:
   nomi `BOBO_KEYSTORE_PASSWORD`, qiymati — `MAXFIY_kalit_paroli.txt` dagi parol. (Bu APK yangilanishlari bir-biriga mos bo'lishi uchun kerak.)
4. **Settings → Pages → Source: GitHub Actions** ni tanlang.
5. **Actions** bo'limi → **Bobo — APK va kompyuter versiyasi** → **Run workflow**. 5–8 daqiqada tugaydi.
6. Natija:
   - **Releases** bo'limida `Bobo.apk` — telefonlarga shu faylni yuborasiz;
   - kompyuter versiyasi manzili: `https://<github-login>.github.io/bobo/`.

## 3-qadam. O'rnatish

**Android:** `Bobo.apk` ni telefonga yuboring (Telegram) → oching → «Noma'lum manbalardan o'rnatish»ga ruxsat → **O'rnatish**.

**iPhone:** Safari'da `https://<github-login>.github.io/bobo/` ni oching → **Ulashish** → **Bosh ekranga** → **Qo'shish**.

**Kompyuter:** Chrome/Edge'da shu manzilni oching → manzil satri o'ng tomonidagi **O'rnatish** belgisi → **O'rnatish**. Bobo ish stolida alohida dastur bo'lib turadi.

## 4-qadam. Birinchi ulanish

1. Boshqaruvchi qurilmasida (masalan, kompyuter): «Ulanish kodi yoki Firebase sozlamasi» maydoniga 1-qadamdagi `firebaseConfig` matnini qo'ying, do'kon email va parolini kiriting → **Ulanish** → do'kon nomi, ismingiz va PIN.
2. **Sozlamalar → Qurilmalarni ulash** → **Kodni nusxalash** → kodni (BOBO1:…) xodimlarga yuboring.
3. Xodim telefonida: kodni qo'yadi, do'kon parolini kiritadi → **Ulanish** → o'z ismini tanlab PIN qo'yadi → «Ishni boshlash» → siz smenani tasdiqlaysiz.

## Yangilash

`www/index.html` o'zgarsa — GitHub'da faylni almashtiring. Actions avtomatik yangi APK va kompyuter versiyasini chiqaradi. Kompyuter va iPhone versiyasi o'zi yangilanadi, Android'ga yangi APK o'rnatiladi (ma'lumotlar saqlanib qoladi).

## Xavfsizlik

- Bazaga faqat Firebase'dagi do'kon akkaunti kira oladi (`firestore.rules`).
- Har bir xodim — shaxsiy PIN, 5 marta xato → 15 daqiqa blok, smenani boshqaruvchi ochadi va yopadi, avto-qulf.
- `MAXFIY_kalit_paroli.txt` ni GitHub'ga yuklamang.
