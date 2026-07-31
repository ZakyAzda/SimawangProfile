import { Inter, Merriweather } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const NG_CSS = `
  .ng {
    --white:    #ffffff;
    --gray-50:  #f8f9fa;
    --gray-100: #f1f3f5;
    --gray-200: #e9ecef;
    --gray-300: #dee2e6;
    --gray-400: #ced4da;
    --gray-500: #adb5bd;
    --gray-600: #6c757d;
    --gray-700: #495057;
    --gray-800: #343a40;
    --gray-900: #212529;
    --accent:     #495057;
    --accent-l:   #6c757d;
    --accent-50:  #f8f9fa;
    --accent-100: #e9ecef;
    --line:     #e9ecef;

    font-family: var(--font-body), system-ui, sans-serif;
    background-color: #ffffff;
    background-image:
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
    background-attachment: fixed;
    color: var(--gray-900);
    -webkit-font-smoothing: antialiased;
  }
  .ng .serif { font-family: var(--font-display), Georgia, serif; }

  .ng-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .ng-card {
    border: 1px solid var(--line);
    background: var(--white);
    transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  }
  .ng-card:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    transform: translateY(-2px);
    border-color: var(--gray-300);
  }

  .ng-wrap { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
  @media (max-width: 768px) {
    .ng-wrap { padding: 0 20px; }
    .ng-cols-2 { grid-template-columns: 1fr !important; }
    .ng-cols-3 { grid-template-columns: 1fr !important; }
    .ng-cols-4 { grid-template-columns: 1fr 1fr !important; }
    .ng-cols-jorong { grid-template-columns: 1fr !important; }
  }
`;
