'use client'

import { Download, Share } from 'lucide-react'
import { useEffect, useState } from 'react'

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallApp() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null)
  const [help, setHelp] = useState('')
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true
    setInstalled(standalone)

    const onBeforeInstall = (event: Event) => {
      event.preventDefault()
      setInstallEvent(event as InstallPromptEvent)
    }
    const onInstalled = () => setInstalled(true)
    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed) return null

  const onInstall = async () => {
    if (installEvent) {
      await installEvent.prompt()
      const choice = await installEvent.userChoice
      if (choice.outcome === 'accepted') setInstalled(true)
      setInstallEvent(null)
      return
    }
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    setHelp(ios
      ? 'In Safari, tap Share, then Add to Home Screen.'
      : 'Open your browser menu and choose Install app or Add to Home Screen.')
  }

  return <div className="install-wrap">
    <button className="install-button" onClick={onInstall} aria-label="Install RankConnect">
      <Download size={15} /><span>Install</span>
    </button>
    {help && <div className="install-help" role="status">
      <button className="install-help-close" onClick={() => setHelp('')} aria-label="Close install instructions">×</button>
      {help}{help.startsWith('In Safari') && <Share size={14} />}
    </div>}
  </div>
}
