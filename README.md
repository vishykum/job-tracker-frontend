# Job Tracker App — Frontend

This is the **React + Vite + Tailwind CSS** frontend for the Job Tracker web app. It allows users to visually manage and track job applications, networking efforts, references, and skill-building activities.

---

## 🔧 Tech Stack

- **React 18** with **TypeScript**
- **Vite** for lightning-fast development
- **Tailwind CSS v4**
- **React Router DOM** for page routing
- **Axios** for HTTP requests
- **Recharts** for visual data charts
- **XLSX** for CSV/XLSX data export

---

## 📁 Folder Structure

```
frontend/
├── features/
│   ├── applications/
│   ├── networking/
│   ├── references/
│   ├── skills/
│   └── dashboard/
├── utils/
│   └── ExportButton.tsx
├── App.tsx
├── main.tsx
├── index.css
├── tailwind.config.ts
└── vite.config.ts
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Replace `localhost:3000` with your backend API address if needed.

### 3. Start development server

```bash
npm run dev
```

---

## ✅ Available Pages

| Page          | Description                                      |
|---------------|--------------------------------------------------|
| `/dashboard`  | Summary of overall job search activity           |
| `/applications` | Track applications, stages, and notes           |
| `/networking` | Log and manage professional contacts             |
| `/references` | Maintain a list of professional references       |
| `/skills`     | Log technical skill-building, focus on Leetcode  |

---

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` folder.

---

## 📝 Notes

- Each feature folder is self-contained with `Page.tsx`, chart/table/filter/modal files.
- Charts automatically adapt based on content (e.g., Leetcode vs others).
- Data is cached in `localStorage` for snappy reloads.
- Tailwind classes are used directly in JSX; no separate CSS files.

---

## 📄 License

MIT
