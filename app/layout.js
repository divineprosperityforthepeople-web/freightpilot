export const metadata = {
  title: 'FreightPilot - AI-Powered Trucking Back Office',
  description: 'Track loads, manage expenses, calculate settlements, monitor maintenance, and grow your trucking business from one AI-powered platform.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'FreightPilot - AI-Powered Trucking Back Office',
    description: 'Your entire trucking back office powered by AI.',
    type: 'website',
    siteName: 'FreightPilot',
  },
};

const styles = `
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Inter', system-ui, -apple-system, sans-serif; color: #1F2937; background: #F8FAFC; margin: 0; padding: 0; }
:root { --primary: #0F2D52; --primary-50: #e8edf3; --primary-100: #c5d1e0; --primary-200: #9fb3cc; --primary-300: #7995b8; --primary-400: #5c7ea8; --primary-500: #0F2D52; --primary-600: #0d2647; --primary-700: #0a1f3b; --primary-800: #08182f; --primary-900: #05101f; --secondary: #1E88E5; --secondary-50: #e3f0fd; --secondary-100: #b8d9fa; --secondary-200: #8ac0f7; --secondary-300: #5ca7f4; --secondary-400: #3a93f1; --secondary-500: #1E88E5; --secondary-600: #1a7ac8; --secondary-700: #1568a7; --secondary-800: #105686; --secondary-900: #0a3d5e; --accent: #34A853; --accent-50: #e6f9ed; --accent-100: #c2f0d3; --accent-200: #99e6b7; --accent-300: #70dc9b; --accent-400: #52d486; --accent-500: #34A853; --accent-600: #2d9648; --accent-700: #247f3c; --accent-800: #1b6830; --accent-900: #0f4b20; --bg-light: #F8FAFC; --text-primary: #1F2937; --text-secondary: #6B7280; }
a { text-decoration: none; color: inherit; }
button { cursor: pointer; font-family: inherit; }
input, textarea, select { font-family: inherit; }
`;
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚛</text></svg>" />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}