"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { trackEvent } from "../lib/analytics";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
};

const DISMISSED_STORAGE_KEY = "move2marbella:install-prompt-dismissed";
const DISMISS_FOR_DAYS = 14;

const promptText = {
  en: {
    dismiss: "Not now",
    iosDone: "Got it",
    install: "Add to Home Screen",
    ios: "On iPhone: open the Share or ... menu, then tap Add to Home Screen.",
    text: "Keep Move2Marbella on your phone for quick property searches.",
    title: "Install the Move2Marbella app",
  },
  es: {
    dismiss: "Ahora no",
    iosDone: "Entendido",
    install: "Añadir a inicio",
    ios: "En iPhone: abre Compartir o el menú ..., y pulsa Añadir a pantalla de inicio.",
    text: "Guarda Move2Marbella en tu móvil para buscar propiedades rápidamente.",
    title: "Instala la app Move2Marbella",
  },
  fr: {
    dismiss: "Plus tard",
    iosDone: "Compris",
    install: "Ajouter à l'accueil",
    ios: "Sur iPhone : ouvrez Partager ou le menu ..., puis touchez Sur l'écran d'accueil.",
    text: "Gardez Move2Marbella sur votre téléphone pour vos recherches rapides.",
    title: "Installez l'app Move2Marbella",
  },
  de: {
    dismiss: "Später",
    iosDone: "Verstanden",
    install: "Zum Startbildschirm",
    ios: "Auf dem iPhone: Teilen oder das Menü ... öffnen und Zum Home-Bildschirm wählen.",
    text: "Speichern Sie Move2Marbella für die schnelle Immobiliensuche.",
    title: "Move2Marbella App installieren",
  },
  ru: {
    dismiss: "Не сейчас",
    iosDone: "Понятно",
    install: "На главный экран",
    ios: "На iPhone: откройте Поделиться или меню ..., затем выберите На экран Домой.",
    text: "Сохраните Move2Marbella на телефоне для быстрого поиска.",
    title: "Установите приложение Move2Marbella",
  },
  pl: {
    dismiss: "Nie teraz",
    iosDone: "Rozumiem",
    install: "Dodaj do ekranu",
    ios: "Na iPhone: otwórz Udostępnij lub menu ..., a następnie wybierz Do ekranu początkowego.",
    text: "Zachowaj Move2Marbella w telefonie, aby szybko wyszukiwać oferty.",
    title: "Zainstaluj aplikację Move2Marbella",
  },
  hu: {
    dismiss: "Most nem",
    iosDone: "Értem",
    install: "Kezdőképernyőre",
    ios: "iPhone-on nyisd meg a Megosztás vagy a ... menüt, majd válaszd a Főképernyőhöz adás lehetőséget.",
    text: "Tartsd a Move2Marbella appot a telefonodon a gyors ingatlankereséshez.",
    title: "Telepítsd a Move2Marbella appot",
  },
};

type PromptLocale = keyof typeof promptText;

function getPromptLocale(pathname: string) {
  const locale = pathname.split("/")[1];

  return locale in promptText ? (locale as PromptLocale) : "en";
}

function isIosDevice() {
  return (
    typeof window !== "undefined" &&
    /iPad|iPhone|iPod/.test(window.navigator.userAgent) &&
    !("MSStream" in window)
  );
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator &&
      Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

function wasRecentlyDismissed() {
  const dismissedAt = Number(window.localStorage.getItem(DISMISSED_STORAGE_KEY));

  return (
    dismissedAt > 0 &&
    Date.now() - dismissedAt < DISMISS_FOR_DAYS * 24 * 60 * 60 * 1000
  );
}

export function InstallAppPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<InstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const locale = getPromptLocale(pathname);
  const isIos = isIosDevice();

  useEffect(() => {
    if (isStandalone() || wasRecentlyDismissed()) {
      return;
    }

    let promptTimer: number | undefined;

    function showPrompt() {
      setVisible(true);
      trackEvent("pwa_install_prompt_shown", {
        platform: isIos ? "ios" : "installable",
      });
    }

    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setDeferredPrompt(event as InstallPromptEvent);
      promptTimer = window.setTimeout(showPrompt, 1200);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    if (isIos) {
      promptTimer = window.setTimeout(showPrompt, 1200);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.clearTimeout(promptTimer);
    };
  }, [isIos]);

  function dismiss() {
    window.localStorage.setItem(DISMISSED_STORAGE_KEY, String(Date.now()));
    setVisible(false);
    trackEvent("pwa_install_dismissed", {
      platform: isIos ? "ios" : "installable",
    });
  }

  async function install() {
    trackEvent("pwa_install_clicked", {
      platform: isIos ? "ios" : "installable",
    });

    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      trackEvent("pwa_install_accepted", {
        platform: "installable",
      });
    }

    setDeferredPrompt(null);
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  const text = promptText[locale];

  return (
    <aside className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md rounded-[8px] border border-white/10 bg-[#0f253d] p-4 text-white shadow-2xl shadow-black/30">
      <div className="flex gap-3">
        <Image
          src="/icon-192.png"
          alt=""
          height={40}
          width={40}
          className="h-10 w-10 shrink-0 rounded-[6px]"
        />
        <div>
          <p className="font-bold">{text.title}</p>
          <p className="mt-1 text-sm leading-5 text-white/75">{text.text}</p>
          {isIos ? (
            <p className="mt-3 rounded-[6px] bg-white/10 px-3 py-2 text-sm font-semibold leading-5 text-[#e7c98d]">
              {text.ios}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={dismiss}
          className="rounded-[6px] px-3 py-2 text-sm font-semibold uppercase tracking-wide text-white/75"
        >
          {text.dismiss}
        </button>
        {isIos ? (
          <button
            type="button"
            onClick={dismiss}
            className="rounded-[6px] bg-[#ba9456] px-3 py-2 text-sm font-bold uppercase tracking-wide text-white"
          >
            {text.iosDone}
          </button>
        ) : (
          <button
            type="button"
            onClick={install}
            className="rounded-[6px] bg-[#ba9456] px-3 py-2 text-sm font-bold uppercase tracking-wide text-white"
          >
            {text.install}
          </button>
        )}
      </div>
    </aside>
  );
}
