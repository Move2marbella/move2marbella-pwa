import type { Metadata } from "next";
import { ContentPageShell } from "../../components/content-page-shell";
import { JsonLd } from "../../components/json-ld";
import { PurchaseCostCalculator } from "../../components/purchase-cost-calculator";
import { getLocale, locales, type Locale } from "../../i18n/translations";
import { getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";

type BuyingGuidePageProps = {
  params: Promise<{ locale: string }>;
};

const content = {
  en: {
    body:
      "A compact guide to the practical buying process on the Costa del Sol: réservation, arras contract, legal checks, notary completion and the real extra costs.",
    eyebrow: "Buying guide",
    metaDescription:
      "A compact guide to buying resale and new-build property in Marbella and the Costa del Sol: deposits, arras contract, taxes, legal checks and completion costs.",
    title: "Buying property in Spain, without guessing",
    resaleTitle: "Resale property process",
    newBuildTitle: "New-build and off-plan process",
    costsTitle: "Typical extra costs",
    checksTitle: "Lawyer checks before completion",
    resaleCostsTitle: "Resale property costs",
    newBuildCostsTitle: "New-build costs",
    stepLabel: "Step",
    steps: [
      {
        title: "Offer accepted",
        text: "After the buyer chooses the property, negotiates the price and reaches agreement with the seller, the réservation process starts.",
      },
      {
        title: "Initial deposit",
        text: "For many resale properties, especially below EUR 500,000, a EUR 6,000 deposit is common. It is usually paid to the buyer's lawyer first.",
      },
      {
        title: "Arras contract",
        text: "A short agreement is often followed within about 48 hours by the official Contrato de Arras. The buyer normally tops up the deposit to 10% of the purchase price.",
      },
      {
        title: "Legal protection",
        text: "If the seller withdraws, they generally repay double the deposit. If the buyer withdraws without legal reason, the buyer may lose the deposit.",
      },
      {
        title: "Private purchase terms",
        text: "The private contract records the price, payment terms, possession date and deadline for signing the final deed before the notary.",
      },
      {
        title: "Notary completion",
        text: "Most resale purchases allow around 60 days for checks and completion. At the notary, the balance is paid and ownership transfers to the buyer.",
      },
    ],
    newBuild: [
      "Reservation deposits are often around EUR 6,000-11,000.",
      "During construction, buyers commonly pay around 30% in stages.",
      "The remaining 70% is paid only when the property is completed and signed at the notary.",
      "Timelines are often 1-2 years, depending on the project.",
    ],
    resaleCosts: [
      { label: "Resale transfer tax in Andalucía", value: "7% ITP" },
      { label: "Lawyer fee", value: "approx. 1%" },
      { label: "Notary and land registry", value: "approx. 0.5%" },
      { label: "Typical resale extras", value: "approx. 8.5%" },
    ],
    newBuildCosts: [
      { label: "New-build VAT", value: "10% IVA" },
      { label: "AJD stamp duty", value: "1.2% AJD" },
      { label: "Lawyer, notary and registry", value: "approx. 1.5%" },
      { label: "Typical new-build extras", value: "approx. 11.5%" },
    ],
    checks: [
      "Land registry ownership and title",
      "Charges, debts or mortgages on the property",
      "Licences and legal status",
      "Utility, community and local tax debts",
    ],
    faqs: [
      {
        question: "How much deposit is usual for a resale property?",
        answer:
          "A EUR 6,000 initial deposit is common in many resale transactions, followed by an arras contract that usually brings the payment to 10% of the purchase price.",
      },
      {
        question: "How long does a resale purchase usually take?",
        answer:
          "A typical resale purchase on the Costa del Sol often completes in around 60 days, depending on legal checks, financing and seller-buyer agreement.",
      },
      {
        question: "What are the typical buying costs for resale property?",
        answer:
          "In Andalucía, resale buyers usually budget around 8.5% on top of the price: 7% ITP transfer tax, around 1% lawyer fee and around 0.5% notary and registry costs. ITP is normally paid after notary completion, often within 30-60 days.",
      },
      {
        question: "What is different with new-build property?",
        answer:
          "New-build property usually has staged payments during construction, 10% IVA instead of 7% ITP, and total extra costs of around 11.5% above the purchase price.",
      },
    ],
  },
  es: {
    body:
      "Guía práctica para comprar en la Costa del Sol: reserva, contrato de arras, comprobaciones legales, firma ante notario y costes reales.",
    eyebrow: "Guía de compra",
    metaDescription:
      "Guía compacta para comprar vivienda de reventa u obra nueva en Marbella y la Costa del Sol: depósito, arras, impuestos, abogado y notaría.",
    title: "Comprar vivienda en España, sin improvisar",
    resaleTitle: "Proceso de vivienda de reventa",
    newBuildTitle: "Obra nueva y compra sobre plano",
    costsTitle: "Costes extra habituales",
    checksTitle: "Comprobaciones del abogado antes de firmar",
    resaleCostsTitle: "Costes de vivienda de reventa",
    newBuildCostsTitle: "Costes de obra nueva",
    stepLabel: "Paso",
    steps: [
      {
        title: "Oferta aceptada",
        text: "Cuando el comprador elige la vivienda, negocia el precio y llega a un acuerdo con el vendedor, empieza la reserva.",
      },
      {
        title: "Deposito inicial",
        text: "En muchas viviendas de reventa, especialmente por debajo de EUR 500.000, es habitual un depósito de EUR 6.000, normalmente al abogado del comprador.",
      },
      {
        title: "Contrato de arras",
        text: "Tras el acuerdo inicial suele firmarse el Contrato de Arras. El comprador normalmente completa hasta el 10% del precio.",
      },
      {
        title: "Proteccion legal",
        text: "Si el vendedor se retira, normalmente devuelve el doble del depósito. Si el comprador se retira sin causa legal, puede perderlo.",
      },
      {
        title: "Condiciones privadas",
        text: "El contrato privado fija precio, pagos, entrega de posesion y plazo para firmar la escritura ante notario.",
      },
      {
        title: "Firma ante notario",
        text: "En reventa suele haber alrededor de 60 días para comprobaciones y cierre. En notaría se paga el saldo y se transmite la propiedad.",
      },
    ],
    newBuild: [
      "Las reservas suelen estar alrededor de EUR 6.000-11.000.",
      "Durante la construccion se paga habitualmente alrededor del 30% por fases.",
      "El 70% restante se paga al completar y firmar ante notario.",
      "Los plazos suelen ser de 1-2 años, segun el proyecto.",
    ],
    resaleCosts: [
      { label: "Impuesto de transmisiones en Andalucía", value: "7% ITP" },
      { label: "Honorarios de abogado", value: "aprox. 1%" },
      { label: "Notaria y registro", value: "aprox. 0,5%" },
      { label: "Extras habituales en reventa", value: "aprox. 8,5%" },
    ],
    newBuildCosts: [
      { label: "IVA de obra nueva", value: "10% IVA" },
      { label: "AJD", value: "1,2% AJD" },
      { label: "Abogado, notaría y registro", value: "aprox. 1,5%" },
      { label: "Extras habituales en obra nueva", value: "aprox. 11,5%" },
    ],
    checks: [
      "Titularidad y nota simple registral",
      "Cargas, deudas o hipotecas",
      "Licencias y situacion legal",
      "Deudas de suministros, comunidad e impuestos locales",
    ],
    faqs: [
      {
        question: "Qué depósito es habitual en una reventa?",
        answer:
          "En muchas operaciones se usa un depósito inicial de EUR 6.000, seguido por un contrato de arras que normalmente eleva el pago al 10% del precio.",
      },
      {
        question: "Cuanto tarda una compra de reventa?",
        answer:
          "Una compra de reventa en la Costa del Sol suele cerrarse en unos 60 días, segun comprobaciones legales, financiación y acuerdo entre partes.",
      },
      {
        question: "Qué costes extra tiene una reventa?",
        answer:
          "En Andalucía se suele presupuestar alrededor del 8,5% adicional: 7% ITP, aprox. 1% abogado y aprox. 0,5% notaría y registro.",
      },
      {
        question: "Qué cambia en obra nueva?",
        answer:
          "La obra nueva suele tener pagos por fases, 10% IVA en lugar de 7% ITP y costes totales cercanos al 11,5% sobre el precio.",
      },
    ],
  },
  fr: {
    body:
      "Guide pratique pour acheter sur la Costa del Sol: réservation, contrat d'arras, verifications juridiques, signature notaríale et vrais frais annexes.",
    eyebrow: "Guide d'achat",
    metaDescription:
      "Guide compact pour acheter un bien de revente ou neuf à Marbella et sur la Costa del Sol: dépôt, arras, taxes, avocat et notaire.",
    title: "Acheter en Espagne, sans deviner",
    resaleTitle: "Processus pour un bien de revente",
    newBuildTitle: "Neuf et achat sur plan",
    costsTitle: "Frais annexes habituels",
    checksTitle: "Verifications de l'avocat avant signature",
    resaleCostsTitle: "Frais pour un bien de revente",
    newBuildCostsTitle: "Frais pour un bien neuf",
    stepLabel: "Etape",
    steps: [
      { title: "Offre acceptee", text: "Apres le choix du bien, la negociation du prix et l'accord avec le vendeur, la réservation commence." },
      { title: "Dépôt initial", text: "Pour de nombreuses reventes, surtout sous EUR 500.000, un dépôt de EUR 6.000 est courant, souvent versé à l'avocat de l'acheteur." },
      { title: "Contrat d'arras", text: "Un accord court est souvent suivi du Contrato de Arras. L'acheteur complète généralement jusqu'a 10% du prix." },
      { title: "Protection juridique", text: "Si le vendeur se retire, il rembourse souvent le double du dépôt. Si l'acheteur se retire sans raison juridique, il peut le perdre." },
      { title: "Conditions privees", text: "Le contrat fixe le prix, les paiements, la date de possession et le delai de signature chez le notaire." },
      { title: "Signature notaríale", text: "Une revente laisse souvent environ 60 jours pour les controles et la completion. Le solde est paye chez le notaire." },
    ],
    newBuild: [
      "Les dépôts de réservation sont souvent autour de EUR 6.000-11.000.",
      "Pendant la construction, environ 30% est souvent paye par etapes.",
      "Les 70% restants sont payes a la livraison et signature notaríale.",
      "Les delais sont souvent de 1-2 ans selon le projet.",
    ],
    resaleCosts: [
      { label: "Taxe de transmission en Andalousie", value: "7% ITP" },
      { label: "Honoraires d'avocat", value: "env. 1%" },
      { label: "Notaire et registre foncier", value: "env. 0,5%" },
      { label: "Frais habituels en revente", value: "env. 8,5%" },
    ],
    newBuildCosts: [
      { label: "TVA du neuf", value: "10% IVA" },
      { label: "Droit AJD", value: "1,2% AJD" },
      { label: "Avocat, notaire et registre", value: "env. 1,5%" },
      { label: "Frais habituels du neuf", value: "env. 11,5%" },
    ],
    checks: [
      "Propriete et titre au registre",
      "Charges, dettes ou hypotheques",
      "Licences et situation juridique",
      "Dettes de services, communauté et impôts locaux",
    ],
    faqs: [
      { question: "Quel dépôt pour une revente?", answer: "Un dépôt initial de EUR 6.000 est courant, puis le contrat d'arras porte souvent le paiement a 10% du prix." },
      { question: "Combien de temps dure une revente?", answer: "Une revente sur la Costa del Sol se termine souvent en environ 60 jours, selon les controles, le financement et l'accord des parties." },
      { question: "Quels frais pour une revente?", answer: "En Andalousie, il faut souvent prévoir environ 8,5% en plus: 7% ITP, env. 1% avocat et env. 0,5% notaire/registre." },
      { question: "Qu'est-ce qui change avec le neuf?", answer: "Le neuf implique souvent des paiements par etapes, 10% IVA au lieu de 7% ITP et environ 11,5% de frais totaux." },
    ],
  },
  de: {
    body:
      "Kompakter Leitfaden zum Kauf an der Costa del Sol: Reservierung, Arras-Vertrag, rechtliche Prüfungen, Notartermin und reale Nebenkosten.",
    eyebrow: "Kaufratgeber",
    metaDescription:
      "Kompakter Guide zum Kauf von Bestands- und Neubauimmobilien in Marbella und an der Costa del Sol: Anzahlung, Arras, Steuern, Anwalt und Notar.",
    title: "Immobilienkauf in Spanien, ohne Raten",
    resaleTitle: "Ablauf bei Bestandsimmobilien",
    newBuildTitle: "Neubau und Off-Plan",
    costsTitle: "Typische Nebenkosten",
    checksTitle: "Anwaltliche Prüfungen vor Abschluss",
    resaleCostsTitle: "Kosten bei Bestandsimmobilien",
    newBuildCostsTitle: "Kosten bei Neubau",
    stepLabel: "Schritt",
    steps: [
      { title: "Angebot akzeptiert", text: "Nach Auswahl der Immobilie, Preisverhandlung und Einigung mit dem Verkäufer startet die Reservierung." },
      { title: "Erste Anzahlung", text: "Bei vielen Bestandsimmobilien, besonders unter EUR 500.000, sind EUR 6.000 üblich, meist zuerst an den Anwalt des Käufers." },
      { title: "Arras-Vertrag", text: "Kurz darauf folgt häufig der Contrato de Arras. Der Käufer stockt meist auf 10% des Kaufpreises auf." },
      { title: "Rechtlicher Schutz", text: "Tritt der Verkäufer zurück, zahlt er oft das Doppelte zurück. Tritt der Käufer ohne Rechtsgrund zurück, kann er die Anzahlung verlieren." },
      { title: "Private Kaufbedingungen", text: "Der Vertrag regelt Preis, Zahlungen, Besitzübergabe und Frist für den Notartermin." },
      { title: "Notartermin", text: "Bei Bestandsimmobilien sind oft rund 60 Tage für Prüfung und Abschluss vorgesehen. Beim Notar wird der Rest gezahlt." },
    ],
    newBuild: [
      "Reservierungszahlungen liegen oft bei EUR 6.000-11.000.",
      "Während des Baus werden häufig rund 30% in Etappen gezahlt.",
      "Die restlichen 70% werden bei Fertigstellung und Notartermin gezahlt.",
      "Die Laufzeit betragt oft 1-2 Jahre, je nach Projekt.",
    ],
    resaleCosts: [
      { label: "Grunderwerbsteuer in Andalusien", value: "7% ITP" },
      { label: "Anwaltskosten", value: "ca. 1%" },
      { label: "Notar und Grundbuch", value: "ca. 0,5%" },
      { label: "Typische Nebenkosten Bestand", value: "ca. 8,5%" },
    ],
    newBuildCosts: [
      { label: "Mehrwertsteuer Neubau", value: "10% IVA" },
      { label: "AJD Stempelsteuer", value: "1,2% AJD" },
      { label: "Anwalt, Notar und Grundbuch", value: "ca. 1,5%" },
      { label: "Typische Neubau-Nebenkosten", value: "ca. 11,5%" },
    ],
    checks: ["Eigentum und Grundbuch", "Lasten, Schulden oder Hypotheken", "Lizenzen und rechtlicher Status", "Versorger-, Gemeinschafts- und lokale Steuerschulden"],
    faqs: [
      { question: "Welche Anzahlung ist üblich?", answer: "Haufig sind EUR 6.000 als erste Reservierung üblich, danach bringt der Arras-Vertrag die Zahlung oft auf 10% des Kaufpreises." },
      { question: "Wie lange dauert ein Kauf?", answer: "Eine Bestandsimmobilie an der Costa del Sol wird oft in rund 60 Tagen abgeschlossen, abhangig von Prüfungen und Finanzierung." },
      { question: "Welche Nebenkosten fallen an?", answer: "In Andalusien sollte man bei Bestand etwa 8,5% zusatzlich rechnen: 7% ITP, ca. 1% Anwalt und ca. 0,5% Notar/Grundbuch." },
      { question: "Was ist beim Neubau anders?", answer: "Neubau hat meist Etappenzahlungen, 10% IVA statt 7% ITP und insgesamt etwa 11,5% Zusatzkosten." },
    ],
  },
  ru: {
    body:
      "Краткий практический гид по покупке на Costa del Sol: резерв, contrato de arras, юридические проверки, нотариус и реальные дополнительные расходы.",
    eyebrow: "Гид покупателя",
    metaDescription:
      "Гид по покупке resale и new-build недвижимости в Marbella и на Costa del Sol: депозит, arras, налоги, юрист, нотариус и расходы.",
    title: "Покупка недвижимости в Испании без догадок",
    resaleTitle: "Процесс покупки resale",
    newBuildTitle: "Новостройка и off-plan",
    costsTitle: "Типичные дополнительные расходы",
    checksTitle: "Проверки юриста перед сделкой",
    resaleCostsTitle: "Расходы при resale",
    newBuildCostsTitle: "Расходы при новостройке",
    stepLabel: "Шаг",
    steps: [
      { title: "Предложение принято", text: "После выбора объекта, переговоров и согласования цены с продавцом начинается резервирование." },
      { title: "Первичный депозит", text: "Во многих resale сделках, особенно ниже EUR 500.000, распространен депозит EUR 6.000, обычно сначала юристу покупателя." },
      { title: "Contrato de Arras", text: "После короткого соглашения часто подписывается официальный Contrato de Arras. Обычно покупатель доплачивает до 10% цены." },
      { title: "Юридическая защита", text: "Если продавец отказывается, обычно возвращает депозит в двойном размере. Если покупатель уходит без юридической причины, депозит может быть потерян." },
      { title: "Условия частного договора", text: "Договор фиксирует цену, платежи, дату передачи и срок подписания финального акта у нотариуса." },
      { title: "Нотариальное завершение", text: "Для resale часто есть около 60 дней на проверки и завершение. У нотариуса оплачивается остаток и переходит право собственности." },
    ],
    newBuild: [
      "Резерв обычно около EUR 6.000-11.000.",
      "Во время строительства часто оплачивается около 30% по этапам.",
      "Оставшиеся 70% оплачиваются при завершении и подписании у нотариуса.",
      "Сроки часто 1-2 года в зависимости от проекта.",
    ],
    resaleCosts: [
      { label: "Налог передачи в Андалусии", value: "7% ITP" },
      { label: "Юрист", value: "около 1%" },
      { label: "Нотариус и реестр", value: "около 0,5%" },
      { label: "Типичные расходы resale", value: "около 8,5%" },
    ],
    newBuildCosts: [
      { label: "НДС на новостройку", value: "10% IVA" },
      { label: "AJD", value: "1,2% AJD" },
      { label: "Юрист, нотариус и реестр", value: "около 1,5%" },
      { label: "Типичные расходы новостройки", value: "около 11,5%" },
    ],
    checks: ["Право собственности и реестр", "Обременения, долги или ипотека", "Лицензии и юридический статус", "Долги по коммунальным, сообществу и местным налогам"],
    faqs: [
      { question: "Какой депозит обычен для resale?", answer: "Часто используется первичный депозит EUR 6.000, затем contrato de arras обычно доводит платеж до 10% цены." },
      { question: "Сколько длится resale покупка?", answer: "На Costa del Sol resale сделка часто завершается примерно за 60 дней, в зависимости от проверок, финансирования и договоренностей." },
      { question: "Какие расходы у resale?", answer: "В Андалусии обычно закладывают около 8,5% сверху: 7% ITP, около 1% юрист и около 0,5% нотариус/реестр." },
      { question: "Чем отличается новостройка?", answer: "Новостройка обычно имеет этапные платежи, 10% IVA вместо 7% ITP и общие дополнительные расходы около 11,5%." },
    ],
  },
  pl: {
    body:
      "Krotki praktyczny przewodnik po zakupie na Costa del Sol: rezerwacja, contrato de arras, kontrole prawne, notariusz i realne koszty dodatkowe.",
    eyebrow: "Przewodnik zakupu",
    metaDescription:
      "Przewodnik po zakupie nieruchomości resale i new-build w Marbella oraz na Costa del Sol: depozyt, arras, podatki, prawnik i notariusz.",
    title: "Zakup nieruchomości w Hiszpanii bez zgadywania",
    resaleTitle: "Proces zakupu resale",
    newBuildTitle: "Nowa inwestycja i off-plan",
    costsTitle: "Typowe koszty dodatkowe",
    checksTitle: "Kontrole prawnika przed finalizacja",
    resaleCostsTitle: "Koszty nieruchomości resale",
    newBuildCostsTitle: "Koszty nowej inwestycji",
    stepLabel: "Krok",
    steps: [
      { title: "Oferta zaakceptowana", text: "Po wyborze nieruchomości, negocjacji ceny i zgodzie sprzedającego rozpoczyna się proces rezerwacji." },
      { title: "Depozyt poczatkowy", text: "W wielu transakcjach resale, zwlaszcza ponizej EUR 500.000, typowy jest depozyt EUR 6.000, zwykle najpierw do prawnika kupującego." },
      { title: "Contrato de Arras", text: "Po krótkiej umowie często podpisuje się Contrato de Arras. Kupujący zwykle dopłaca do 10% ceny." },
      { title: "Ochrona prawna", text: "Jesli sprzedajacy się wycofa, zwykle oddaje podwojny depozyt. Jesli kupujacy rezygnuje bez podstawy prawnej, moze go stracic." },
      { title: "Warunki prywatne", text: "Umowa określa cenę, płatności, termin przejęcia i deadline podpisania aktu u notariusza." },
      { title: "Finalizacja u notariusza", text: "Resale często daje około 60 dni na kontrole i zamknięcie. U notariusza płaci się saldo i przenosi własność." },
    ],
    newBuild: [
      "Depozyty rezerwacyjne są często około EUR 6.000-11.000.",
      "W trakcie budowy kupujący zwykle płacą około 30% etapami.",
      "Pozostale 70% placone jest po ukonczeniu i podpisaniu u notariusza.",
      "Terminy często wynoszą 1-2 lata, zależnie od projektu.",
    ],
    resaleCosts: [
      { label: "Podatek transferowy w Andaluzji", value: "7% ITP" },
      { label: "Prawnik", value: "ok. 1%" },
      { label: "Notariusz i rejestr", value: "ok. 0,5%" },
      { label: "Typowe koszty resale", value: "ok. 8,5%" },
    ],
    newBuildCosts: [
      { label: "VAT od nowej inwestycji", value: "10% IVA" },
      { label: "AJD", value: "1,2% AJD" },
      { label: "Prawnik, notariusz i rejestr", value: "ok. 1,5%" },
      { label: "Typowe koszty new-build", value: "ok. 11,5%" },
    ],
    checks: ["Wlasnosc i księga wieczysta", "Obciazenia, dlugi lub hipoteki", "Licencje i status prawny", "Dlugi za media, wspolnote i podatki lokalne"],
    faqs: [
      { question: "Jaki depozyt jest typowy przy resale?", answer: "Czesto spotyka się depozyt EUR 6.000, a potem contrato de arras zwykle podnosi płatność do 10% ceny." },
      { question: "Ile trwa zakup resale?", answer: "Na Costa del Sol zakup resale często zamyka się w około 60 dni, zależnie od kontroli, finansowania i ustalen stron." },
      { question: "Jakie są koszty resale?", answer: "W Andaluzji zwykle zakłada się około 8,5% dodatkowo: 7% ITP, ok. 1% prawnik i ok. 0,5% notariusz/rejestr." },
      { question: "Czym różni się new-build?", answer: "Nowa inwestycja zwykle ma płatności etapowe, 10% IVA zamiast 7% ITP i łączne koszty około 11,5%." },
    ],
  },
  hu: {
    body:
      "Rövid, gyakorlati útmutató a Costa del Sol-on ingatlanvásárláshoz: foglaló, arras szerződés, ügyvédi ellenőrzés, közjegyzői okirat és várható extra költségek.",
    eyebrow: "Vásárlási útmutató",
    metaDescription:
      "Kompakt magyar útmutató használt és újépítésű ingatlan vásárlásához Marbellán és a Costa del Solon: foglaló, arras, ITP, IVA, ügyvéd és közjegyző.",
    title: "Ingatlanvásárlás Spanyolországban, érthetően",
    resaleTitle: "Használt ingatlan vásárlási folyamata",
    newBuildTitle: "Újépítésű és off-plan ingatlanok",
    costsTitle: "Jellemző extra költségek",
    checksTitle: "Ügyvédi ellenőrzések zárás előtt",
    resaleCostsTitle: "Használt ingatlan költségei",
    newBuildCostsTitle: "Újépítésű ingatlan költségei",
    stepLabel: "Lépés",
    steps: [
      {
        title: "Áralku és megállapodás",
        text: "Miután a vevő kiválasztotta az ingatlant és a felek megállapodtak a végleges vételárban, elindul a foglalási folyamat.",
      },
      {
        title: "Kezdeti depozit",
        text: "Használt ingatlanoknál, főleg 500.000 EUR alatt, gyakori a 6.000 EUR depozit. Ezt a vevő jellemzően a saját ügyvédjének utalja.",
      },
      {
        title: "Contrato de Arras",
        text: "A hivatalos foglalói szerződésben általában a vételár 10%-a szerepel. A korábbi 6.000 EUR ebbe beleszámít.",
      },
      {
        title: "A foglaló magyarázata",
        text: "Ha az eladó lép vissza, általában a foglaló kétszeresét fizeti vissza. Ha a vevő lép vissza indokolatlanul, elveszítheti a foglalót.",
      },
      {
        title: "Kb. 60 napos lezárás",
        text: "A legtöbb használt ingatlannál körülbelül 60 nap áll rendelkezésre a jogi ellenőrzésekre, finanszírozásra és közjegyzői zárásra.",
      },
      {
        title: "Közjegyzői aláírás",
        text: "A végleges adásvételi szerződés közjegyző előtt kerül aláírásra. Ekkor fizetik ki a fennmaradó vételárat, és átszáll a tulajdonjog.",
      },
    ],
    newBuild: [
      "A kezdeti foglaló gyakran 6.000-11.000 EUR között van.",
      "Az építkezés alatt jellemzően kb. 30% kerül kifizetésre több részletben.",
      "A fennmaradó kb. 70% az elkészüléskor, közjegyző előtt fizetendő.",
      "A projekt átadása gyakran 1-2 év, ezért a birtokbaadás is később történik.",
    ],
    resaleCosts: [
      { label: "Névreírési illeték Andalúziában", value: "7% ITP" },
      { label: "Ügyvédi munkadíj", value: "kb. 1%" },
      { label: "Közjegyző és földhivatal", value: "kb. 0,5%" },
      { label: "Használt ingatlan teljes extra költség", value: "kb. 8,5%" },
    ],
    newBuildCosts: [
      { label: "Újépítésű ingatlan ÁFA", value: "10% IVA" },
      { label: "AJD okirati illeték", value: "1,2% AJD" },
      { label: "Ügyvéd, közjegyző és földhivatal", value: "kb. 1,5%" },
      { label: "Újépítésű teljes extra költség", value: "kb. 11,5%" },
    ],
    checks: [
      "Tulajdoni lap és tulajdonjog vizsgálata",
      "Terhek, tartozások és jelzálog ellenőrzése",
      "Engedélyek és jogi státusz áttekintése",
      "Közüzemi, közösségi és helyi adótartozások ellenőrzése",
    ],
    faqs: [
      {
        question: "Mekkora foglaló szokás használt ingatlannál?",
        answer:
          "Gyakori a 6.000 EUR kezdeti depozit, majd a Contrato de Arras aláírásakor a fizetés általában a vételár 10%-ára egészül ki.",
      },
      {
        question: "Mennyi idő alatt zárul egy használt ingatlan vásárlása?",
        answer:
          "A Costa del Solon a használt ingatlanok vásárlása gyakran körülbelül 60 nap alatt zárul, ha a jogi ellenőrzés és a finanszírozás rendben halad.",
      },
      {
        question: "Mennyi extra költséggel kell számolni használt ingatlannál?",
        answer:
          "Andalúziában használt ingatlannál jellemzően kb. 8,5% extra költséggel érdemes számolni: 7% ITP, kb. 1% ügyvéd és kb. 0,5% közjegyző/földhivatal.",
      },
      {
        question: "Miben más az újépítésű ingatlan vásárlása?",
        answer:
          "Újépítésű ingatlannál nincs 7% ITP, helyette 10% IVA fizetendő, az építkezés alatt gyakori a kb. 30%-os részletfizetés, a teljes extra költség pedig kb. 11,5%.",
      },
    ],
  },
};

function getContent(locale: Locale) {
  return content[locale];
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: BuyingGuidePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const page = getContent(locale);

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: getLocalizedPath(locale, "/buying-guide"),
      languages: getLanguageAlternates("/buying-guide"),
    },
    robots: getPageRobots(),
  };
}

export default async function BuyingGuidePage({
  params,
}: BuyingGuidePageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const page = getContent(locale);

  return (
    <ContentPageShell
      locale={locale}
      languagePath="/buying-guide"
      eyebrow={page.eyebrow}
      title={page.title}
      body={page.body}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {page.resaleTitle}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {page.steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <p className="text-sm font-semibold text-[#9a7a3a]">
                {page.stepLabel} {index + 1}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{step.title}</h2>
              <p className="mt-3 text-base leading-7 text-[#4b4740]">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:px-8 lg:grid-cols-2">
        <div className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {page.newBuildTitle}
          </p>
          <ul className="mt-4 grid gap-3 text-base leading-7 text-[#4b4740]">
            {page.newBuild.map((item) => (
              <li key={item} className="rounded-[6px] bg-[#f7f2ea] p-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {page.checksTitle}
          </p>
          <ul className="mt-4 grid gap-3 text-base leading-7 text-[#4b4740]">
            {page.checks.map((item) => (
              <li key={item} className="rounded-[6px] bg-[#f7f2ea] p-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {page.costsTitle}
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            {
              title: page.resaleCostsTitle,
              items: page.resaleCosts,
            },
            {
              title: page.newBuildCostsTitle,
              items: page.newBuildCosts,
            },
          ].map((group) => (
            <div
              key={group.title}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <h2 className="text-2xl font-semibold text-[#171717]">
                {group.title}
              </h2>
              <div className="mt-4 grid gap-3">
                {group.items.map((cost) => (
                  <article
                    key={`${cost.label}-${cost.value}`}
                    className="rounded-[8px] bg-[#f7f2ea] p-4"
                  >
                    <p className="text-3xl font-semibold text-[#0f253d]">
                      {cost.value}
                    </p>
                    <p className="mt-2 text-base leading-7 text-[#4b4740]">
                      {cost.label}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <PurchaseCostCalculator locale={locale} />

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            FAQ
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {page.faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <h2 className="text-xl font-semibold text-[#171717]">
                {faq.question}
              </h2>
              <p className="mt-3 text-base leading-7 text-[#4b4740]">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </ContentPageShell>
  );
}

export const revalidate = 300;
