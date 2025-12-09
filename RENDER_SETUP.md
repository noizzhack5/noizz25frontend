# 🚀 הגדרות Render - הוראות מדויקות

## ⚙️ הגדרות ב-Render Dashboard

### שלב 1: יצירת Static Site

1. היכנס ל-Render Dashboard
2. לחץ על **"New +"** → **"Static Site"**
3. חבר את ה-Git repository שלך

### שלב 2: הגדרת Build

**Build Command:**
```
npm install && npm run build
```

**Publish Directory:**
```
build
```

### שלב 3: Environment Variables

הוסף Environment Variable:
- **Key:** `VITE_API_BASE_URL`
- **Value:** `https://noizz25backend.onrender.com`

### שלב 4: Advanced Settings (אופציונלי)

- **Node Version:** `20.x` (או הגרסה שבה אתה משתמש)
- **Auto-Deploy:** `Yes` (אם אתה רוצה auto-deploy מ-Git)

---

## 📋 סיכום ההגדרות

| שדה | ערך |
|-----|-----|
| **Type** | Static Site |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `build` |
| **Environment Variable** | `VITE_API_BASE_URL=https://noizz25backend.onrender.com` |

---

## 🔍 פתרון בעיות

### אם עדיין מקבל "vite: Permission denied"

**פתרון 1:** ודא ש-`vite` ב-`dependencies` (לא `devDependencies`)
✅ כבר תוקן ב-`package.json`

**פתרון 2:** נסה Build Command זה:
```
npm ci && npm run build
```

**פתרון 3:** אם זה לא עובד, נסה:
```
npm install --production=false && npm run build
```

### אם Build נכשל

1. בדוק את ה-logs ב-Render
2. ודא ש-`npm run build` עובד מקומית
3. ודא שכל ה-dependencies מותקנים

---

## ✅ בדיקה

לאחר הפריסה:
1. פתח את ה-URL של Render
2. בדוק שהאתר נטען
3. פתח DevTools → Console ו-Network
4. בדוק שאין שגיאות

---

## 📝 הערות

- **Static Site** = Render מגיש את הקבצים הסטטיים ישירות (מומלץ ל-React SPA)
- **Web Service** = צריך Node.js server (לא נדרש כאן)
- ה-`render.yaml` הוא אופציונלי - אפשר להגדיר הכל ב-Dashboard

