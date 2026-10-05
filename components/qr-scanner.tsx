'use client'

import type { Html5QrcodeScanner as Html5QrcodeScannerInstance } from 'html5-qrcode'
import { useEffect, useRef } from 'react'

interface QrScannerProps {
  onScanSuccess: (decodedText: string) => void
  onScanError?: (errorMessage: string) => void
  qrCodeContainerId: string
}

export function QrScanner({ onScanSuccess, onScanError, qrCodeContainerId }: QrScannerProps) {
  const successRef = useRef(onScanSuccess)
  const errorRef = useRef(onScanError)
  successRef.current = onScanSuccess
  errorRef.current = onScanError

  useEffect(() => {
    let scanner: Html5QrcodeScannerInstance | undefined
    let cancelled = false
    void import('html5-qrcode').then(({ Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeSupportedFormats }) => {
      if (cancelled) return
      scanner = new Html5QrcodeScanner(
        qrCodeContainerId,
        {
          fps: 10,
          qrbox: { width: 240, height: 240 },
          aspectRatio: 1,
          rememberLastUsedCamera: true,
          showTorchButtonIfSupported: true,
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA, Html5QrcodeScanType.SCAN_TYPE_FILE],
        },
        false,
      )
      scanner.render((decodedText) => successRef.current(decodedText), (error) => errorRef.current?.(error))
    }).catch((error) => errorRef.current?.(String(error)))
    return () => {
      cancelled = true
      void scanner?.clear().catch(() => undefined)
    }
  }, [qrCodeContainerId])

  return <div id={qrCodeContainerId} className="qr-code-reader" />
}
