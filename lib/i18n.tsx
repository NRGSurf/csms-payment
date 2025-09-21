import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Lang = "en" | "de";

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const translations: Record<Lang, Record<string, any>> = {
  en: {
    header: {
      readyToCharge: "Ready to charge",
      subtitle: "Plug your car and enter payment details to start!",
    },
    footer: {
      secure: "Secure payment",
      eu: "EU server location",
      mobile: "Optimized for mobile",
      imprint: "Imprint",
      privacy: "Privacy Policy",
    },
    steps: {
      overview: "Overview",
      data: "Data",
      payment: "Payment",
      charging: "Charging",
    },
    billing: {
      title: "Billing Details",
      description: "We'll email a receipt to the address below. ",
      fullName: "Name",
      fullNamePlaceholder: "Your name / name of the company",
      fullNameError: "Please enter name",
      email: "Email*",
      emailPlaceholder: "you@example.com",
      emailError: "Please enter a valid email",
      phone: "Phone (optional)",
      phonePlaceholder: "+49 123 456789",
      invoiceToggleTitle: "Need a detailed invoice?",
      invoiceToggleDescription: "Add details for your invoice.",
      street: "Street & Number",
      streetPlaceholder: "Street and number",
      streetError: "Street is required",
      postalCode: "Postal code",
      postalCodePlaceholder: "e.g. 80331",
      postalCodeError: "Postal code is required",
      city: "City",
      cityPlaceholder: "City",
      cityError: "City is required",
      country: "Country",
      countryPlaceholder: "Country",
      countryError: "Country is required",
      submitWaiting: "Please wait…",
      submit: "Continue to payment",
      chargingSession: "Charging Session",
      transactionCompleted: "Transaction completed on {{date}}",
      vatId: "VAT / Tax ID",
      vatIdPlaceholder: "Your company VAT/Tax ID",
    },
    paymentPanel: {
      preparing: "Preparing payment…",
      secureTitle: "Secure Payment",
      secureDescription: "Your card details are handled securely by Braintree.",
      processing: "Processing…",
      payStart: "Pay & Start Charging",
      compliant: "EU AFIR Compliant",
      secure: "Secure Payment",
      loadingWidget: "Loading payment form…",
    },
    paymentAuthorized: {
      title: "Payment authorized",
      default: "You're good to go — start charging when ready.",
      hold: "You're good to go. We've placed a temporary hold of {amount}.",
      cta: "Continue",
      holdAmount: "Hold amount",
      receiptEmail: "Receipt email",
    },
    transactionGate: {
      loading: "Loading…",
      error: "Something went wrong: {{error}}",
      none: "No sessions found.",
      paymentAuthorized: "Payment Authorized",
      preauthSuccess: "Pre-authorization Successful",
      preauthAmount: "€{{amount}} temporarily authorized",
      nextSteps: "Next Steps:",
      step1: "Plug the connector into your vehicle",
      step2: "Tap “Start Charging”",
      step3: "Monitor your session in real time",
      startCharging: "Start Charging Session",
    },
    done: {
      title: "You're all set",
      description:
        "Charging will begin shortly. You'll receive a receipt by email after the session.",
      backHome: "Back home",
    },
    qr: {
      notFoundTitle: "QR not found",
      notFoundHeading: "QR code not found",
    },
    pricingDisplay: {
      stationConnected: "Station Connected",
      location: "Location",
      pricingInfoDesc: "Transparent pricing as required by EU AFIR regulations",
      energyConsumptionRate: "Energy consumption rate",
      payInfo1: "You'll only pay for energy actually charged",
      payInfo2: "Pre-authorization (€{amount}) will be released after charging",
      payInfo3: "Final cost calculated when session ends",
      payInfo4: "Digital receipt provided immediately",
      connector: "Connector",
      available: "Available",
      occupied: "Occupied",
      maintenance: "Maintenance",
      pricingInformation: "Current Rate",
      perKwh: "per kWh",
      completeBreakdown: "Complete Price Breakdown",
      energyRate: "Energy Rate",
      sessionFee: "Session Fee",
      preauthorization: "Pre-authorization",
      tempHold: "Temporary hold on your card",
      costExamples: "Cost Examples",
      paymentInformation: "Payment Information",
      euCompliant: "EU AFIR Compliant",
      securePayment: "Secure Payment",
      acceptPricing: "Accept Pricing & Continue",
    },
    chargingSession: {
      kwhDelivered: "kWh Delivered",
      cost: "Cost",
      total: "Total",
      sessionDetails: "Session Details",
      stationId: "Station ID",
      sessionId: "Session ID",
      started: "Started",
      connector: "Connector",
      statusCharging: "Charging in progress",
      statusPaused: "Paused",
      liveSession: "Live Session",
      disclaimer: "Displayed values may be delayed by a few minutes.",
      chargingFee: "Charging Fee",
    },
    receipt: {
      chargingComplete: "Charging Complete!",
      paymentProcessed: "Your payment has been processed successfully",
      finalAmount: "Final Amount Charged",
      energyCharged: "Energy Charged",
      emailReceipt: "Email Receipt",
      emailSent: "Your receipt has been sent to your email address.",
      transactionId: "Transaction ID",
      euCompliant: "EU AFIR Compliant",
      complianceText:
        "This transaction complies with EU Alternative Fuels Infrastructure Regulation (AFIR) requirements for transparent pricing and ad-hoc payments.",
      totalAmount: "Total Amount Charged",
      startNew: "Start New Charging Session",
      thankYou: "Thank you for using our EV charging network!",
      support: "Support",
      terms: "Terms",
      privacy: "Privacy",
    },
    legal: {
      termsLabel: "Accept Terms and Conditions*",
      termsText: "I have read and accept the Terms and Conditions.",
      termsLink: "Open Terms and Conditions",
      termsError: "Please accept the Terms and Conditions to continue.",

      waiveLabel: "Immediate Start & Waiver of Withdrawal Right*",
      waiveTextBefore:
        "I agree that the service (charging session) will begin immediately and",
      waiveTextStrong:
        "that I lose my right of withdrawal once the charging session starts",
      waiveTextAfter: ". More information:",
      rightOfWithdrawalLink: "Withdrawal Policy",
      waiveError: "Please confirm the waiver of withdrawal to continue.",
      emailConsentLabel: "Consent to email usage",
      emailConsentText:
        "I agree that my email address may be used for the development of innovative features. (optional)",
    },
  },
  de: {
    header: {
      readyToCharge: "Bereit zum Laden",
      subtitle:
        "Stecken Sie Ihr Auto an und geben Sie die Zahlungsdetails ein, um zu starten!",
    },
    footer: {
      secure: "Sichere Zahlung",
      eu: "EU-Serverstandort",
      mobile: "Optimiert für Mobilgeräte",
      imprint: "Impressum",
      privacy: "Datenschutzerklärung",
    },
    steps: {
      overview: "Übersicht",
      data: "Daten",
      payment: "Zahlung",
      charging: "Laden",
    },
    billing: {
      title: "Rechnungsdetails",
      description: "Wir senden eine Rechnung an die unten angegebene E-Mail. ",
      fullName: "Name",
      fullNamePlaceholder: "Ihr Name / Name des Unternehmens",
      fullNameError: "Bitte geben Sie den Namen ein",
      email: "E-Mail*",
      emailPlaceholder: "sie@beispiel.de",
      emailError: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
      phone: "Telefon (optional)",
      phonePlaceholder: "+49 123 456789",
      invoiceToggleTitle: "Detaillierte Rechnung benötigt?",
      invoiceToggleDescription:
        "Fügen Sie weitere Informationen für Ihre Rechnung hinzu.",
      street: "Straße & Hausnummer",
      streetPlaceholder: "Straße und Hausnummer",
      streetError: "Straße ist erforderlich",
      postalCode: "Postleitzahl",
      postalCodePlaceholder: "z.B. 80331",
      postalCodeError: "Postleitzahl ist erforderlich",
      city: "Stadt",
      cityPlaceholder: "Stadt",
      cityError: "Stadt ist erforderlich",
      country: "Land",
      countryPlaceholder: "Land",
      countryError: "Land ist erforderlich",
      submitWaiting: "Bitte warten…",
      submit: "Weiter zur Zahlung",
      vatId: "USt-IdNr. / Steuernummer",
      vatIdPlaceholder: "Ihre Unternehmens-USt-IdNr. oder Steuernummer",
    },
    paymentPanel: {
      preparing: "Zahlung wird vorbereitet…",
      secureTitle: "Sichere Zahlung",
      secureDescription:
        "Ihre Kartendaten werden sicher von Braintree verarbeitet.",
      processing: "Verarbeitung…",
      payStart: "Bezahlen & Laden starten",
      compliant: "EU-AFIR-konform",
      secure: "Sichere Zahlung",
      loadingWidget: "Zahlungsformular wird geladen …",
    },
    paymentAuthorized: {
      title: "Zahlung autorisiert",
      default:
        "Alles bereit – starten Sie den Ladevorgang, wenn Sie bereit sind.",
      hold: "Alles bereit. Wir haben eine vorübergehende Reservierung über {amount} vorgenommen.",
      cta: "Weiter",
      holdAmount: "Reservierungsbetrag",
      receiptEmail: "E-Mail für Beleg",
    },
    transactionGate: {
      loading: "Wird geladen…",
      error: "Es ist ein Fehler aufgetreten: {{error}}",
      none: "Keinen Ladevorgang gefunden.",
      paymentAuthorized: "Zahlung autorisiert",
      preauthSuccess: "Vorautorisierung erfolgreich",
      preauthAmount: "€{amount} vorübergehend reserviert",
      nextSteps: "Nächste Schritte:",
      step1: "Stecken Sie Ihr Fahrzeug an",
      step2: "Tippen Sie auf „Laden starten“",
      step3: "Überwachen Sie den Ladevorgang in Echtzeit",
      startCharging: "Laden starten",
    },
    done: {
      title: "Alles bereit",
      description:
        "Der Ladevorgang beginnt in Kürze. Sie erhalten nach dem Ladevorgang eine Rechnung per E-Mail.",
      backHome: "Zur Startseite",
    },
    qr: {
      notFoundTitle: "QR nicht gefunden",
      notFoundHeading: "QR-Code nicht gefunden",
    },
    pricingDisplay: {
      stationConnected: "Station verbunden",
      location: "Standort",
      pricingInformation: "Preisinformationen",
      pricingInfoDesc: "Transparente Preise gemäß EU-AFIR-Vorgaben",
      perKwh: "pro kWh",
      energyConsumptionRate: "Energieverbrauchsrate",
      paymentInformation: "Informationen",
      payInfo1: "Sie bezahlen nur für tatsächlich geladene Energie.",
      payInfo2:
        "Die Vorautorisierung ({amount}€) wird nach dem Laden freigegeben.",
      payInfo3: "Endpreis wird nach dem Ladevorgang berechnet",
      payInfo4: "Digitaler Beleg wird sofort bereitgestellt",
      acceptPricing: "Preise akzeptieren & fortfahren",
      connector: "Stecker",
      available: "Verfügbar",
      occupied: "Belegt",
      maintenance: "Wartung",
      euCompliant: "EU-AFIR-konform",
      securePayment: "Sichere Zahlung",
      completeBreakdown: "Preisaufstellung",
      energyRate: "Energiepreis",
      sessionFee: "Gebühr pro Ladevorgang",
      preauthorization: "Vorautorisierung",
      tempHold: "Vorübergehende Reservierung auf Ihrer Karte",
      costExamples: "Kostenbeispiele",
    },
    chargingSession: {
      kwhDelivered: "Geladene kWh",
      cost: "Kosten",
      total: "Gesamt",
      sessionDetails: "Details",
      stationId: "Stations-ID",
      sessionId: "Ladevorgang-ID",
      started: "Gestartet",
      connector: "Stecker",
      statusCharging: "Fahrzeug wird geladen",
      statusPaused: "Pausiert",
      liveSession: "Live",
      disclaimer:
        "Die angezeigten Werte können um einige Minuten verzögert sein.",
      chargingFee: "Gebühr pro Ladevorgang",
    },
    receipt: {
      chargingComplete: "Laden abgeschlossen!",
      paymentProcessed: "Ihre Zahlung wurde erfolgreich verarbeitet",
      finalAmount: "Endbetrag",
      energyCharged: "Geladene Energie",
      emailReceipt: "E-Mail-Beleg",
      emailSent: "Ihr Beleg wurde an Ihre E-Mail-Adresse gesendet.",
      transactionId: "Transaktions-ID",
      euCompliant: "EU-AFIR-konform",
      complianceText:
        "Diese Transaktion entspricht den Anforderungen der EU-Richtlinie für Infrastruktur alternativer Kraftstoffe (AFIR) für transparente Preise und Ad-hoc-Zahlungen.",
      totalAmount: "Gesamtbetrag",
      startNew: "Neuen Ladevorgang starten",
      thankYou: "Vielen Dank, dass Sie unser EV-Ladenetz nutzen!",
      support: "Support",
      terms: "AGB",
      privacy: "Datenschutz",
      chargingSession: "Ladevorgang",
      transactionCompleted: "Transaktion abgeschlossen am {date}",
    },
    legal: {
      termsLabel: "AGB akzeptieren*",
      termsText: "Ich habe die AGB gelesen und akzeptiere sie.",
      termsLink: "AGB öffnen",
      termsError: "Bitte AGB akzeptieren, um fortzufahren.",

      waiveLabel: "Sofortiger Beginn & Widerrufsverzicht*",
      waiveTextBefore:
        "Ich stimme zu, dass die Dienstleistung (Ladevorgang) sofort beginnt und",
      waiveTextStrong:
        "ich mein Widerrufsrecht mit Beginn des Ladevorgangs verliere",
      waiveTextAfter: ". Weitere Informationen:",
      rightOfWithdrawalLink: "Widerrufsbelehrung",
      waiveError: "Bitte den Widerrufsverzicht bestätigen, um fortzufahren.",
      emailConsentLabel: "Einwilligung zur E-Mail-Nutzung",
      emailConsentText:
        "Ich möchte, dass meine E-Mail-Adresse für die Entwicklung innovativer Funktionen genutzt werden darf. (optional)",
    },
  },
};

const I18nContext = createContext<I18nCtx>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lang");
      if (stored === "en" || stored === "de") setLangState(stored);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (key: string, vars?: Record<string, string | number>) => {
    const parts = key.split(".");
    let value: any = translations[lang];
    for (const p of parts) value = value?.[p];
    if (typeof value !== "string") return key;
    if (vars) {
      value = value.replace(/\{(\w+)\}/g, (_, v) => String(vars[v] ?? ""));
    }
    return value;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
