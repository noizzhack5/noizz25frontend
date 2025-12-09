# 🔧 תיקון שגיאת "vite: Permission denied"

## ✅ מה תוקן

שיניתי את הסקריפט `build` ב-`package.json`:
- **לפני:** `"build": "vite build"`
- **אחרי:** `"build": "npx vite build"`

## 📋 הפקודות ל-Render

### Build Command:
```
npm install && npm run build
```

או אם זה לא עובד:
```
npm ci && npm run build
```

### Publish Directory:
```
build
```

## ✅ בדיקה

הפקודה `npm run build` עובדת מקומית עם `npx vite build`.

עכשיו ב-Render:
1. Build Command: `npm install && npm run build`
2. Publish Directory: `build`
3. Environment Variable: `VITE_API_BASE_URL=https://noizz25backend.onrender.com`

השגיאה "Permission denied" אמורה להיפתר! 🎉

