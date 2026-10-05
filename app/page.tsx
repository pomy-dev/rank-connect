'use client'

import { useState } from 'react'
import { QrScanner } from '@/components/qr-scanner'
import { InstallApp } from '@/components/install-app'
import {
  ArrowDownLeft,
  ArrowRight,
  Banknote,
  BarChart3,
  Bell,
  BusFront,
  Camera,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  CreditCard,
  Eye,
  EyeOff,
  FileText,
  Fingerprint,
  History,
  Landmark,
  LockKeyhole,
  MapPin,
  Menu,
  MoreHorizontal,
  QrCode,
  Route,
  ScanLine,
  Settings,
  ShieldCheck,
  Smartphone,
  UserRound,
  WalletCards,
  X,
  Zap,
} from 'lucide-react'

type Tab = 'home' | 'activity' | 'routes' | 'profile'
type PaymentMethod = 'QR code' | 'Bank card' | 'eWallet' | 'Mobile Money'

const transactions = [
  { id: 'TX-48291', time: '09:42 AM', route: 'Airport → CBD', method: 'QR code', amount: 'R 18.50', status: 'Paid', initials: 'LK', tone: 'mint' },
  { id: 'TX-48290', time: '09:18 AM', route: 'CBD → Observatory', method: 'Mobile Money', amount: 'R 15.00', status: 'Paid', initials: 'JM', tone: 'blue' },
  { id: 'TX-48289', time: '08:51 AM', route: 'Airport → CBD', method: 'eWallet', amount: 'R 18.50', status: 'Paid', initials: 'NS', tone: 'lavender' },
  { id: 'TX-48288', time: '08:27 AM', route: 'Khayelitsha → CBD', method: 'QR code', amount: 'R 22.00', status: 'Declined', initials: 'PM', tone: 'orange' },
]

const routes = [
  { name: 'Airport → CBD', stops: 'Airport, Foreshore, Civic Centre', price: 'R 18.50', rides: '24 rides' },
  { name: 'CBD → Observatory', stops: 'Adderley, District Six, Observatory', price: 'R 15.00', rides: '11 rides' },
  { name: 'Khayelitsha → CBD', stops: 'Khayelitsha, Nyanga, Cape Town', price: 'R 22.00', rides: '8 rides' },
]

export default function Page() {
  const [tab, setTab] = useState<Tab>('home')
  const [showScan, setShowScan] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('QR code')
  const [amount, setAmount] = useState('18.50')
  const [paymentState, setPaymentState] = useState<'scan' | 'review' | 'success' | 'declined'>('scan')
  const [showBalance, setShowBalance] = useState(true)

  const openScanner = () => { setPaymentState('scan'); setShowScan(true) }

  return (
    <main className="app-background">
      <div className="phone-shell">
        <header className="topbar">
          <div className="brand-lockup">
            <div className="brand-mark"><BusFront size={18} strokeWidth={2.5} /></div><span>RankConnect<span className="brand-dot">.</span></span></div>
          <div className="top-actions">
            {/* <InstallApp /> */}
            <button className="icon-button" aria-label="Notifications" onClick={() => setShowNotifications(!showNotifications)}><Bell size={19} /><span className="notification-dot" /></button>
            <button className="avatar" aria-label="Open profile" onClick={() => setTab('profile')}>TM</button>
          </div>
          {showNotifications && <div className="notification-popover"><div className="popover-title">Notifications <span className="unread">2 new</span></div><p><span className="notification-icon success"><Check size={13} /></span>Payment of R 18.50 received</p><p><span className="notification-icon warning"><Clock3 size={13} /></span>Your vehicle documents expire soon</p></div>}
        </header>

        <div className="content-area">
          {tab === 'home' && <HomeScreen showBalance={showBalance} setShowBalance={setShowBalance} onScan={openScanner} setTab={setTab} />}
          {tab === 'activity' && <ActivityScreen />}
          {tab === 'routes' && <RoutesScreen onScan={openScanner} />}
          {tab === 'profile' && <ProfileScreen />}
        </div>

        <nav className="bottom-nav" aria-label="Main navigation">
          <NavItem active={tab === 'home'} icon={<BarChart3 size={20} />} label="Overview" onClick={() => setTab('home')} />
          <NavItem active={tab === 'activity'} icon={<History size={20} />} label="Activity" onClick={() => setTab('activity')} />
          <button className="scan-button" onClick={openScanner} aria-label="Scan passenger QR code"><ScanLine size={25} /><span>Scan</span></button>
          <NavItem active={tab === 'routes'} icon={<Route size={20} />} label="Routes" onClick={() => setTab('routes')} />
          <NavItem active={tab === 'profile'} icon={<UserRound size={20} />} label="Profile" onClick={() => setTab('profile')} />
        </nav>
      </div>

      {showScan && <ScanSheet paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} amount={amount} setAmount={setAmount} state={paymentState} setState={setPaymentState} onClose={() => setShowScan(false)} />}
    </main>
  )
}

function HomeScreen({ showBalance, setShowBalance, onScan, setTab }: { showBalance: boolean; setShowBalance: (value: boolean) => void; onScan: () => void; setTab: (tab: Tab) => void }) {
  return <section className="screen enter-up">
    <div className="welcome-row"><div><p className="eyebrow">TUESDAY, 14 MAY 2024</p><h1>Good morning, <span>Thabo</span></h1></div><div className="online-status"><i /> Online</div></div>
    <div className="balance-card"><div className="card-glow" /><div className="balance-top"><span>Today&apos;s earnings</span><button className="balance-eye" onClick={() => setShowBalance(!showBalance)} aria-label="Toggle balance">{showBalance ? <Eye size={17} /> : <EyeOff size={17} />}</button></div><div className="balance-amount">{showBalance ? 'R 1,284.50' : 'R •••••••'}</div><div className="balance-footer"><span><ArrowDownLeft size={14} /> 43 rides today</span><span className="positive">+12.8% <span className="muted">vs last Tuesday</span></span></div></div>
    <button className="primary-action" onClick={onScan}><span className="action-icon"><QrCode size={22} /></span><span><strong>Scan passenger QR</strong><small>Collect a fare in seconds</small></span><ArrowRight size={19} /></button>
    <div className="section-heading"><h2>Quick overview</h2><button onClick={() => setTab('activity')}>View activity <ChevronRight size={15} /></button></div>
    <div className="stat-grid"><StatCard label="Today" value="R 1,284.50" detail="43 rides" icon={<Zap size={17} />} /><StatCard label="This week" value="R 7,920.00" detail="218 rides" icon={<BarChart3 size={17} />} /></div>
    <div className="section-heading recent-heading"><h2>Recent payments</h2><button onClick={() => setTab('activity')}>See all <ChevronRight size={15} /></button></div>
    <div className="transaction-list">{transactions.slice(0, 3).map((transaction) => <TransactionRow key={transaction.id} transaction={transaction} />)}</div>
  </section>
}

function StatCard({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: React.ReactNode }) { return <div className="stat-card"><div className="stat-icon">{icon}</div><span className="stat-label">{label}</span><strong>{value}</strong><small>{detail}</small></div> }
function TransactionRow({ transaction }: { transaction: typeof transactions[number] }) { return <div className="transaction-row"><div className={`transaction-avatar ${transaction.tone}`}>{transaction.initials}</div><div className="transaction-main"><strong>{transaction.route}</strong><span>{transaction.time} · {transaction.method}</span></div><div className="transaction-total"><strong>{transaction.amount}</strong><span className={transaction.status === 'Paid' ? 'paid' : 'declined'}>{transaction.status}</span></div></div> }
function NavItem({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) { return <button className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>{icon}<span>{label}</span></button> }

function ActivityScreen() { const [filter, setFilter] = useState('Today'); const totals = { Today: 'R 1,284.50', Week: 'R 7,920.00', Month: 'R 31,480.00' }; return <section className="screen enter-up"><ScreenTitle eyebrow="PAYMENT HISTORY" title="Activity" /><div className="filter-tabs">{['Today', 'Week', 'Month'].map(item => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="activity-summary"><div><span>Total collected</span><strong>{totals[filter as keyof typeof totals]}</strong></div><div className="summary-badge"><BarChart3 size={15} /> {filter === 'Today' ? '43 rides' : filter === 'Week' ? '218 rides' : '894 rides'}</div></div><div className="list-heading"><span>{filter === 'Today' ? 'Today, 14 May' : `This ${filter.toLowerCase()}`}</span><span>{transactions.length} transactions</span></div><div className="transaction-list full-list">{transactions.map((transaction) => <TransactionRow key={transaction.id} transaction={transaction} />)}<div className="transaction-row"><div className="transaction-avatar green">LK</div><div className="transaction-main"><strong>Airport → CBD</strong><span>07:54 AM · Bank card</span></div><div className="transaction-total"><strong>R 18.50</strong><span className="paid">Paid</span></div></div></div></section> }

function RoutesScreen({ onScan }: { onScan: () => void }) {
  const [routeNotice, setRouteNotice] = useState('')
  const [customRoutes, setCustomRoutes] = useState<typeof routes>([])
  const addRoute = () => {
    const name = window.prompt('Route name (for example, CBD → Airport)')?.trim()
    if (!name) return
    const fare = window.prompt('Fare amount in rand', '18.50')?.trim()
    if (!fare || !Number.isFinite(Number(fare)) || Number(fare) <= 0) return
    setCustomRoutes((items) => [...items, { name, stops: 'Stops to be added', price: `R ${Number(fare).toFixed(2)}`, rides: '0 rides' }])
    setRouteNotice(`${name} added`)
  }
  return <section className="screen enter-up"><ScreenTitle eyebrow="YOUR FARES" title="Routes & pricing" action={<button className="small-primary" onClick={onScan}><QrCode size={15} /> Scan</button>} /><p className="screen-subtitle">Set the fares you collect on each route. Prices can be updated anytime.</p><div className="route-list">{[...routes, ...customRoutes].map(route => <div className="route-card" key={route.name}><div className="route-line"><div className="route-pin"><MapPin size={16} /></div><div><strong>{route.name}</strong><span>{route.stops}</span></div><button className="more-button" aria-label={`More options for ${route.name}`} onClick={() => setRouteNotice(`${route.name} · ${route.price} · ${route.stops}`)}><MoreHorizontal size={18} /></button></div><div className="route-meta"><span><Banknote size={14} /> {route.rides}</span><strong>{route.price}</strong></div></div>)}</div><button className="outline-action" onClick={addRoute}><span>+</span> Add a new route</button>{routeNotice && <div className="toast-message" role="status">{routeNotice}<button onClick={() => setRouteNotice('')} aria-label="Dismiss"><X size={14} /></button></div>}<button className="vehicle-mini vehicle-button" onClick={() => setRouteNotice('Active vehicle: Toyota Quantum · CA 482-119')}><div className="vehicle-icon"><BusFront size={21} /></div><div><span>Active vehicle</span><strong>Toyota Quantum · CA 482-119</strong></div><ChevronRight size={17} /></button></section>
}

function ProfileScreen() { const [section, setSection] = useState<string | null>(null); return <section className="screen enter-up"><ScreenTitle eyebrow="ACCOUNT" title="Profile & settings" /><div className="profile-card"><div className="profile-avatar">TM</div><div><strong>Thabo Mokoena</strong><span>Driver ID · RP-004821</span><small><ShieldCheck size={13} /> Verified driver</small></div><button aria-label="Edit profile" onClick={() => setSection('Personal details')}><ChevronRight size={18} /></button></div><div className="settings-group"><p>DRIVER ACCOUNT</p><SettingRow icon={<UserRound size={18} />} title="Personal details" detail="Name, phone and ID number" onClick={() => setSection('Personal details')} /><SettingRow icon={<LockKeyhole size={18} />} title="Password & security" detail="Reset password, biometrics" onClick={() => setSection('Password & security')} /><SettingRow icon={<Landmark size={18} />} title="Bank accounts" detail="1 account connected" onClick={() => setSection('Bank accounts')} /></div><div className="settings-group"><p>VEHICLE & ROUTES</p><SettingRow icon={<BusFront size={18} />} title="Taxi details" detail="Toyota Quantum · CA 482-119" onClick={() => setSection('Taxi details')} /><SettingRow icon={<Route size={18} />} title="Manage routes" detail="3 active routes" onClick={() => setSection('Manage routes')} /></div><div className="settings-group"><p>SUPPORT</p><SettingRow icon={<CircleHelp size={18} />} title="Help centre" detail="FAQs and get in touch" onClick={() => setSection('Help centre')} /></div>{section && <div className="toast-message" role="status">{section} is ready to configure in the full app.<button onClick={() => setSection(null)}><X size={14} /></button></div>}</section> }
function ScreenTitle({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) { return <div className="screen-title"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>{action}</div> }
function SettingRow({ icon, title, detail, onClick }: { icon: React.ReactNode; title: string; detail: string; onClick: () => void }) { return <button className="setting-row" onClick={onClick}><span className="setting-icon">{icon}</span><span><strong>{title}</strong><small>{detail}</small></span><ChevronRight size={17} /></button> }

function ScanSheet({ paymentMethod, setPaymentMethod, amount, setAmount, state, setState, onClose }: { paymentMethod: PaymentMethod; setPaymentMethod: (method: PaymentMethod) => void; amount: string; setAmount: (amount: string) => void; state: 'scan' | 'review' | 'success' | 'declined'; setState: (state: 'scan' | 'review' | 'success' | 'declined') => void; onClose: () => void }) { const [scannedCode, setScannedCode] = useState(''); return <div className="sheet-backdrop"><div className="scan-sheet"><div className="sheet-handle" /><button className="sheet-close" onClick={onClose} aria-label="Close scanner"><X size={19} /></button>{state === 'scan' && <><div className="scanner-heading"><div className="scanner-icon"><ScanLine size={25} /></div><p className="eyebrow">NEW PAYMENT</p><h2>Scan passenger QR</h2><span>Ask the passenger to show their RidePay code</span></div><div className="qr-scanner-container"><QrScanner qrCodeContainerId="ridepay-qr-reader" onScanSuccess={(decodedText) => { setScannedCode(decodedText); setState('review') }} onScanError={() => undefined} /></div><button className="demo-scan" onClick={() => setState('review')}>Use demo passenger <ArrowRight size={16} /></button></>}{state === 'review' && <><div className="review-heading"><div className="passenger-avatar">AM</div><p className="eyebrow">PASSENGER FOUND</p><h2>Alex Morgan</h2><span>Wallet balance · <strong>R 246.80</strong></span>{scannedCode && <span className="scanned-code">Scanned QR: {scannedCode}</span>}</div><div className="amount-card"><label htmlFor="fare-amount">Enter fare amount</label><div className="amount-input"><span>R</span><input id="fare-amount" inputMode="decimal" value={amount} onChange={e => setAmount(e.target.value)} /><small>ZAR</small></div><div className="amount-hint"><MapPin size={13} /> Airport → CBD <button onClick={() => setAmount('18.50')}>Use route fare</button></div></div><div className="method-label">PAYMENT METHOD</div><div className="payment-methods">{(['QR code', 'Bank card', 'eWallet', 'Mobile Money'] as PaymentMethod[]).map(method => <button key={method} className={paymentMethod === method ? 'chosen' : ''} onClick={() => setPaymentMethod(method)}>{method === 'QR code' ? <QrCode size={16} /> : method === 'Bank card' ? <CreditCard size={16} /> : method === 'eWallet' ? <WalletCards size={16} /> : <Smartphone size={16} />}{method}</button>)}</div><button className="confirm-payment" onClick={() => setState(Number.parseFloat(amount) > 20 ? 'declined' : 'success')}>Collect R {amount || '0.00'} <ArrowRight size={18} /></button></>}{state === 'success' && <ResultState success amount={amount} onClose={onClose} />}{state === 'declined' && <ResultState success={false} amount={amount} onClose={onClose} />}</div></div> }
function ResultState({ success, amount, onClose }: { success: boolean; amount: string; onClose: () => void }) { return <div className="result-state"><div className={`result-icon ${success ? 'success' : 'failure'}`}>{success ? <Check size={34} /> : <X size={34} />}</div><p className="eyebrow">PAYMENT {success ? 'COMPLETE' : 'DECLINED'}</p><h2>{success ? 'Fare collected' : 'Couldn’t collect fare'}</h2><strong className="result-amount">R {amount}</strong><p className="result-copy">{success ? 'R 18.50 has been added to your driver balance.' : 'The passenger’s available balance is too low for this fare. Try a different payment method.'}</p>{success && <div className="receipt"><span><Check size={14} /> Transaction ID</span><strong>TX-48292</strong></div>}{!success && <button className="try-again" onClick={onClose}>Try another method</button>}<button className={success ? 'done-button' : 'close-result'} onClick={onClose}>{success ? 'Done' : 'Close'}</button></div> }
