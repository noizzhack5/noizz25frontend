# 🚀 הוראות פריסה ל-Render

## הגדרת Render

### אפשרות 1: Static Site (מומלץ ל-SPA)

1. ב-Render Dashboard:
   - לחץ על "New +" → "Static Site"
   - חבר את ה-Git repository שלך
   - הגדר:
     - **Name:** noizz25frontend
     - **Build Command:** `npm install && npm run build`
     - **Publish Directory:** `build`
     - **Environment Variables:**
       - `VITE_API_BASE_URL` = `https://noizz25backend.onrender.com`

2. Render יבצע:
   - `npm install`
   - `npm run build`
   - יגיש את התיקייה `build` כ-Static Site

### אפשרות 2: Web Service (אם צריך Node.js server)

אם אתה משתמש ב-`render.yaml`:

1. ב-Render Dashboard:
   - לחץ על "New +" → "Blueprint"
   - חבר את ה-Git repository
   - Render יקרא את `render.yaml` אוטומטית

2. או ידנית:
   - **Type:** Web Service
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npx serve -s build -l $PORT`
   - **Environment Variables:**
     - `VITE_API_BASE_URL` = `https://noizz25backend.onrender.com`

## 🔧 פתרון בעיות

### שגיאת "vite: Permission denied"

**פתרון:** העברתי את `vite` מ-`devDependencies` ל-`dependencies` והוספתי `serve` ל-serving ה-build.

### Build נכשל

1. ודא ש-`npm install` עובד
2. ודא ש-`npm run build` עובד מקומית
3. בדוק את ה-logs ב-Render

### Environment Variables

ודא שהוספת ב-Render Dashboard:
- `VITE_API_BASE_URL` = `https://noizz25backend.onrender.com`

**חשוב:** משתני סביבה ב-Vite חייבים להתחיל ב-`VITE_`!

## 📝 קבצים שנוצרו

- `render.yaml` - קונפיגורציה ל-Render (אופציונלי)
- `package.json` - עודכן עם `serve` ו-`start` script

## ✅ בדיקה

לאחר הפריסה:
1. פתח את ה-URL של Render
2. בדוק שהאתר נטען
3. בדוק שהקריאות ל-API עובדות (פתח DevTools → Network)

---

**הערה:** אם אתה משתמש ב-Static Site, Render יגיש את הקבצים הסטטיים ישירות ואין צורך ב-Node.js server.

