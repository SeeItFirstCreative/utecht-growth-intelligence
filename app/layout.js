import './globals.css';
import './mobile-fixes.css';
import './opportunities.css';
import './demo.css';
import './workspaces.css';
import './auth.css';
import './live.css';
import './crm.css';
import './live-pipeline.css';
import AuthGate from './AuthGate';
export const metadata={title:'Utecht Growth Intelligence',description:'Commercial P&C Growth Command Center'};
export default function RootLayout({children}){return <html lang="en"><body><AuthGate>{children}</AuthGate></body></html>}
