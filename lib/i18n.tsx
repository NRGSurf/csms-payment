import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';

type Lang = 'en' | 'de';

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const translations: Record<Lang, Record<string, any>> = {
  en: {
    footer: { secure: 'Secure Payment', eu: 'EU AFIR Compliant', mobile: 'Mobile Optimized' },
    steps: { overview: 'Overview', data: 'Data', payment: 'Payment', charging: 'Charging' },
    billing: {
      title: 'Billing Details',
      description: 'We\'ll email a receipt to the address below. Turn on invoice to add address details.',
      fullName: 'Full name',
      fullNamePlaceholder: 'Your full name',
      fullNameError: 'Please enter your full name',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      emailError: 'Please enter a valid email',
      phone: 'Phone (optional)',
      phonePlaceholder: '+49 123 456789',
      invoiceToggleTitle: 'Need an invoice?',
      invoiceToggleDescription: 'Add address details for a full invoice.',
      street: 'Street & Number',
      streetPlaceholder: 'Street and number',
      streetError: 'Street is required',
      postalCode: 'Postal code',
      postalCodePlaceholder: 'e.g. 80331',
      postalCodeError: 'Postal code is required',
      city: 'City',
      cityPlaceholder: 'City',
      cityError: 'City is required',
      country: 'Country',
      countryPlaceholder: 'Country',
      countryError: 'Country is required',
      submitWaiting: 'Please wait…',
      submit: 'Continue to payment',
    },
    paymentPanel: {
      preparing: 'Preparing payment…',
      secureTitle: 'Secure Payment',
      secureDescription: 'Your card details are handled securely by Braintree.',
      processing: 'Processing…',
      payStart: 'Pay & Start Charging',
      compliant: 'EU AFIR Compliant',
      secure: 'Secure Payment',
    },
    paymentAuthorized: {
      title: 'Payment authorized',
      default: "You're good to go — start charging when ready.",
      hold: "You're good to go. We've placed a temporary hold of {amount}.",
      cta: 'Continue',
      holdAmount: 'Hold amount',
      receiptEmail: 'Receipt email',
    },
    done: {
      title: 'You\'re all set',
      description: 'Charging will begin shortly. You\'ll receive a receipt by email after the session.',
      backHome: 'Back home',
    },
    qr: {
      notFoundTitle: 'QR not found',
      notFoundHeading: 'QR code not found',
    },
    transactionGate: {
      loading: 'Loading transaction…',
      error: 'Error: {error}',
      none: 'No transactions found.',
    },
    pricingDisplay: {
      stationConnected: 'Station Connected',
      location: 'Location',
      pricingInformation: 'Pricing Information',
      pricingInfoDesc: 'Transparent pricing as required by EU AFIR regulations',
      perKwh: 'per kWh',
      energyConsumptionRate: 'Energy consumption rate',
      paymentInformation: 'Payment Information',
      payInfo1: "You'll only pay for energy actually consumed",
      payInfo2: 'Pre-authorization will be released after charging',
      payInfo3: 'Final cost calculated when session ends',
      payInfo4: 'Digital receipt provided immediately',
      acceptPricing: 'Accept Pricing & Continue',
      connector: 'Connector',
      available: 'Available',
      occupied: 'Occupied',
      maintenance: 'Maintenance',
      euCompliant: 'EU AFIR Compliant',
      securePayment: 'Secure Payment',
    },
    chargingSession: {
      kwhDelivered: 'kWh Delivered',
      cost: 'Cost',
      total: 'Total',
      sessionDetails: 'Session Details',
      stationId: 'Station ID',
      sessionId: 'Session ID',
      started: 'Started',
      connector: 'Connector',
      statusCharging: 'Charging',
      statusPaused: 'Paused',
      liveSession: 'Live Session',
    },
    receipt: {
      chargingComplete: 'Charging Complete!',
      paymentProcessed: 'Your payment has been processed successfully',
      finalAmount: 'Final Amount Charged',
      energyCharged: 'Energy Charged',
      emailReceipt: 'Email Receipt',
      emailSent: 'Your receipt has been sent to your email address.',
      transactionId: 'Transaction ID',
      euCompliant: 'EU AFIR Compliant',
      complianceText: 'This transaction complies with EU Alternative Fuels Infrastructure Regulation (AFIR) requirements for transparent pricing and ad-hoc payments.',
      totalAmount: 'Total Amount Charged',
      startNew: 'Start New Charging Session',
      thankYou: 'Thank you for using our EV charging network!',
      support: 'Support',
      terms: 'Terms',
      privacy: 'Privacy',
    },
  },
  de: {
    footer: { secure: 'Sichere Zahlung', eu: 'EU-AFIR-konform', mobile: 'Für Mobilgeräte optimiert' },
    steps: { overview: 'Übersicht', data: 'Daten', payment: 'Zahlung', charging: 'Laden' },
    billing: {
      title: 'Rechnungsdetails',
      description: 'Wir senden eine Quittung an die unten angegebene Adresse. Aktivieren Sie die Rechnung, um Adressdetails hinzuzufügen.',
      fullName: 'Vollständiger Name',
      fullNamePlaceholder: 'Ihr vollständiger Name',
      fullNameError: 'Bitte geben Sie Ihren vollständigen Namen ein',
      email: 'E-Mail',
      emailPlaceholder: 'sie@beispiel.de',
      emailError: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      phone: 'Telefon (optional)',
      phonePlaceholder: '+49 123 456789',
      invoiceToggleTitle: 'Rechnung benötigt?',
      invoiceToggleDescription: 'Fügen Sie Adressdetails für eine vollständige Rechnung hinzu.',
      street: 'Straße & Hausnummer',
      streetPlaceholder: 'Straße und Hausnummer',
      streetError: 'Straße ist erforderlich',
      postalCode: 'Postleitzahl',
      postalCodePlaceholder: 'z.B. 80331',
      postalCodeError: 'Postleitzahl ist erforderlich',
      city: 'Stadt',
      cityPlaceholder: 'Stadt',
      cityError: 'Stadt ist erforderlich',
      country: 'Land',
      countryPlaceholder: 'Land',
      countryError: 'Land ist erforderlich',
      submitWaiting: 'Bitte warten…',
      submit: 'Weiter zur Zahlung',
    },
    paymentPanel: {
      preparing: 'Zahlung wird vorbereitet…',
      secureTitle: 'Sichere Zahlung',
      secureDescription: 'Ihre Kartendaten werden sicher von Braintree verarbeitet.',
      processing: 'Verarbeitung…',
      payStart: 'Bezahlen & Laden starten',
      compliant: 'EU-AFIR-konform',
      secure: 'Sichere Zahlung',
    },
    paymentAuthorized: {
      title: 'Zahlung autorisiert',
      default: 'Alles bereit – starten Sie den Ladevorgang, wenn Sie bereit sind.',
      hold: 'Alles bereit. Wir haben eine vorübergehende Reservierung über {amount} vorgenommen.',
      cta: 'Weiter',
      holdAmount: 'Reservierungsbetrag',
      receiptEmail: 'E-Mail für Beleg',
    },
    done: {
      title: 'Alles bereit',
      description: 'Der Ladevorgang beginnt in Kürze. Sie erhalten nach der Sitzung eine Quittung per E-Mail.',
      backHome: 'Zur Startseite',
    },
    qr: {
      notFoundTitle: 'QR nicht gefunden',
      notFoundHeading: 'QR-Code nicht gefunden',
    },
    transactionGate: {
      loading: 'Transaktion wird geladen…',
      error: 'Fehler: {error}',
      none: 'Keine Transaktionen gefunden.',
    },
    pricingDisplay: {
      stationConnected: 'Station verbunden',
      location: 'Standort',
      pricingInformation: 'Preisinformationen',
      pricingInfoDesc: 'Transparente Preise gemäß EU-AFIR-Vorgaben',
      perKwh: 'pro kWh',
      energyConsumptionRate: 'Energieverbrauchsrate',
      paymentInformation: 'Zahlungsinformationen',
      payInfo1: 'Sie bezahlen nur für tatsächlich verbrauchte Energie',
      payInfo2: 'Die Vorautorisierung wird nach dem Laden freigegeben',
      payInfo3: 'Endpreis wird nach Sitzungsende berechnet',
      payInfo4: 'Digitaler Beleg wird sofort bereitgestellt',
      acceptPricing: 'Preise akzeptieren & fortfahren',
      connector: 'Stecker',
      available: 'Verfügbar',
      occupied: 'Belegt',
      maintenance: 'Wartung',
      euCompliant: 'EU-AFIR-konform',
      securePayment: 'Sichere Zahlung',
    },
    chargingSession: {
      kwhDelivered: 'Gelieferte kWh',
      cost: 'Kosten',
      total: 'Gesamt',
      sessionDetails: 'Sitzungsdetails',
      stationId: 'Stations-ID',
      sessionId: 'Sitzungs-ID',
      started: 'Gestartet',
      connector: 'Stecker',
      statusCharging: 'Laden',
      statusPaused: 'Pausiert',
      liveSession: 'Live-Sitzung',
    },
    receipt: {
      chargingComplete: 'Laden abgeschlossen!',
      paymentProcessed: 'Ihre Zahlung wurde erfolgreich verarbeitet',
      finalAmount: 'Endbetrag',
      energyCharged: 'Geladene Energie',
      emailReceipt: 'E-Mail-Beleg',
      emailSent: 'Ihr Beleg wurde an Ihre E-Mail-Adresse gesendet.',
      transactionId: 'Transaktions-ID',
      euCompliant: 'EU-AFIR-konform',
      complianceText: 'Diese Transaktion entspricht den Anforderungen der EU-Richtlinie für Infrastruktur alternativer Kraftstoffe (AFIR) für transparente Preise und Ad-hoc-Zahlungen.',
      totalAmount: 'Gesamtbetrag',
      startNew: 'Neue Ladesitzung starten',
      thankYou: 'Vielen Dank, dass Sie unser EV-Ladenetz nutzen!',
      support: 'Support',
      terms: 'AGB',
      privacy: 'Datenschutz',
    },
  },
};

const I18nContext = createContext<I18nCtx>({
  lang: 'en',
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({children}: {children: ReactNode}) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lang');
      if (stored === 'en' || stored === 'de') setLangState(stored);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem('lang', l);
  };

  const t = (key: string, vars?: Record<string, string | number>) => {
    const parts = key.split('.');
    let value: any = translations[lang];
    for (const p of parts) value = value?.[p];
    if (typeof value !== 'string') return key;
    if (vars) {
      value = value.replace(/\{(\w+)\}/g, (_, v) => String(vars[v] ?? ''));
    }
    return value;
  };

  return (
    <I18nContext.Provider value={{lang, setLang, t}}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

