"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Locale } from "../i18n/translations";

type PropertyType = "resale" | "newbuild";

type Labels = {
  adminCosts: string;
  ajdNote: string;
  appraisalFee: string;
  bankCosts: string;
  calculate: string;
  cashOutsideMortgage: string;
  cashPurchase: string;
  deposit: string;
  depositPercent: string;
  disclaimer: string;
  fixedLawyer: string;
  lawyerFee: string;
  mortgage: string;
  mortgageAmount: string;
  mortgageCopy: string;
  mortgageFee: string;
  newBuild: string;
  notaryFees: string;
  notaryPercent: string;
  otherBankCosts: string;
  price: string;
  professionalCosts: string;
  propertyType: string;
  reduced: string;
  reducedHint: string;
  registryFees: string;
  registryPercent: string;
  resale: string;
  reset: string;
  resultCaption: string;
  resultKicker: string;
  sectionTitle: string;
  subtitle: string;
  taxes: string;
  totalExpenses: string;
  validPrice: string;
};

const labelsByLocale: Record<Locale, Labels> = {
  de: {
    adminCosts: "Gestoria / Verwaltung / NIE / Extras (€)",
    ajdNote: "AJD und Hypothekenkosten auf Bankseite werden hier nicht dem Käufer zugerechnet.",
    appraisalFee: "Bewertungsgebühr (€)",
    bankCosts: "Bank- / Hypothekenkosten",
    calculate: "Kosten berechnen",
    cashOutsideMortgage: "Restkaufpreis bei Abschluss",
    cashPurchase: "Barkauf",
    deposit: "Anzahlung / Arras",
    depositPercent: "Anzahlung / Arras (%)",
    disclaimer: "Indikative Kaufkosten für Andalusien. Bitte genaue Zahlen mit Anwalt, Bank und Notar bestätigen.",
    fixedLawyer: "Oder fixer Anwaltspreis (€)",
    lawyerFee: "Anwaltskosten",
    mortgage: "Hypothek",
    mortgageAmount: "Hypothekenbetrag (% des Preises)",
    mortgageCopy: "Hypothek ein- oder ausschalten und Finanzierungsquote anpassen.",
    mortgageFee: "Bearbeitungsgebühr (%)",
    newBuild: "Neubau",
    notaryFees: "Notarkosten",
    notaryPercent: "Geschätzter Notar (%)",
    otherBankCosts: "Weitere Käufer-Bankkosten (€)",
    price: "Kaufpreis (€)",
    professionalCosts: "Professionelle & Abschlusskosten",
    propertyType: "Immobilientyp",
    reduced: "Reduzierte andalusische Wohnsteuersätze anwenden, falls berechtigt.",
    reducedHint: "Vereinfachte Logik für Hauptwohnsitz-Schwellen. Anspruch prüfen lassen.",
    registryFees: "Grundbuchkosten",
    registryPercent: "Geschätztes Grundbuch (%)",
    resale: "Bestandsimmobilie",
    reset: "Beispiel zurücksetzen",
    resultCaption: "Geschätzte Mittel vor und bei Abschluss.",
    resultKicker: "Geschätztes Ergebnis",
    sectionTitle: "Purchase Cost Calculator",
    subtitle: "Schätzung der wichtigsten Käuferkosten in Andalusien.",
    taxes: "Steuern",
    totalExpenses: "Gesamtkosten",
    validPrice: "Bitte einen gültigen Kaufpreis eingeben.",
  },
  en: {
    adminCosts: "Gestoria / Admin / NIE / Extras (€)",
    ajdNote: "Mortgage deed AJD and lender-side notary/registry costs are not added to the buyer in this estimator.",
    appraisalFee: "Appraisal / Valuation Fee (€)",
    bankCosts: "Bank / Mortgage Costs",
    calculate: "Calculate costs",
    cashOutsideMortgage: "Balance at completion",
    cashPurchase: "Cash purchase",
    deposit: "Deposit / Arras",
    depositPercent: "Deposit / Arras (%)",
    disclaimer: "Indicative purchase costs calculated for Andalusia. Please confirm exact figures with your lawyer, lender and notary before completion.",
    fixedLawyer: "Or fixed lawyer fee (€)",
    lawyerFee: "Lawyer fee",
    mortgage: "Mortgage",
    mortgageAmount: "Mortgage amount (% of price)",
    mortgageCopy: "Switch mortgage assumptions on or off and adjust the financing level if relevant.",
    mortgageFee: "Opening / arrangement fee (%)",
    newBuild: "New-build property",
    notaryFees: "Notary fees",
    notaryPercent: "Estimated notary (%)",
    otherBankCosts: "Other buyer-paid bank costs (€)",
    price: "Property price (€)",
    professionalCosts: "Professional & closing costs",
    propertyType: "Type of property",
    reduced: "Apply reduced Andalusian housing tax rates if eligible.",
    reducedHint: "Simplified reduced-rate logic for habitual residence thresholds. Verify eligibility before relying on it.",
    registryFees: "Registry fees",
    registryPercent: "Estimated registry (%)",
    resale: "Resale property",
    reset: "Reset example",
    resultCaption: "Estimated total funds needed before and at completion.",
    resultKicker: "Estimated result",
    sectionTitle: "Purchase Cost Calculator",
    subtitle: "Estimate buyer-side acquisition costs in Andalusia, including taxes, legal fees, notary, registry and admin costs.",
    taxes: "Taxes",
    totalExpenses: "Total expenses",
    validPrice: "Please enter a valid property price.",
  },
  es: {
    adminCosts: "Gestoría / Admin / NIE / Extras (€)",
    ajdNote: "AJD de hipoteca y costes notariales/registro del banco no se añaden al comprador aquí.",
    appraisalFee: "Tasación bancaria (€)",
    bankCosts: "Costes bancarios / hipoteca",
    calculate: "Calcular costes",
    cashOutsideMortgage: "Resto del precio en firma",
    cashPurchase: "Compra al contado",
    deposit: "Depósito / Arras",
    depositPercent: "Depósito / Arras (%)",
    disclaimer: "Estimación indicativa para Andalucía. Confirma cifras exactas con abogado, banco y notaría.",
    fixedLawyer: "O abogado fijo (€)",
    lawyerFee: "Honorarios abogado",
    mortgage: "Hipoteca",
    mortgageAmount: "Importe hipoteca (% del precio)",
    mortgageCopy: "Activa o desactiva supuestos de hipoteca y ajusta la financiación.",
    mortgageFee: "Comisión apertura (%)",
    newBuild: "Obra nueva",
    notaryFees: "Notaría",
    notaryPercent: "Notaría estimada (%)",
    otherBankCosts: "Otros costes bancarios comprador (€)",
    price: "Precio de compra (€)",
    professionalCosts: "Costes profesionales y cierre",
    propertyType: "Tipo de propiedad",
    reduced: "Aplicar tipos reducidos andaluces si corresponde.",
    reducedHint: "Lógica simplificada para vivienda habitual. Verificar elegibilidad.",
    registryFees: "Registro",
    registryPercent: "Registro estimado (%)",
    resale: "Reventa",
    reset: "Restablecer ejemplo",
    resultCaption: "Fondos estimados antes y en la firma.",
    resultKicker: "Resultado estimado",
    sectionTitle: "Calculadora de costes de compra",
    subtitle: "Calcula costes de comprador en Andalucía: impuestos, abogado, notaría, registro y administración.",
    taxes: "Impuestos",
    totalExpenses: "Gastos totales",
    validPrice: "Introduce un precio válido.",
  },
  fr: {
    adminCosts: "Gestoria / admin / NIE / extras (€)",
    ajdNote: "AJD hypothécaire et frais côté banque non ajoutés ici.",
    appraisalFee: "Frais d'expertise (€)",
    bankCosts: "Frais banque / prêt",
    calculate: "Calculer",
    cashOutsideMortgage: "Solde à la signature",
    cashPurchase: "Achat comptant",
    deposit: "Dépôt / Arras",
    depositPercent: "Dépôt / Arras (%)",
    disclaimer: "Estimation indicative pour l'Andalousie. Vérifiez avec avocat, banque et notaire.",
    fixedLawyer: "Ou frais avocat fixes (€)",
    lawyerFee: "Frais avocat",
    mortgage: "Prêt",
    mortgageAmount: "Montant du prêt (% du prix)",
    mortgageCopy: "Activez ou désactivez l'hypothèque et ajustez le financement.",
    mortgageFee: "Frais d'ouverture (%)",
    newBuild: "Neuf",
    notaryFees: "Frais notaire",
    notaryPercent: "Notaire estimé (%)",
    otherBankCosts: "Autres frais bancaires (€)",
    price: "Prix d'achat (€)",
    professionalCosts: "Frais professionnels et clôture",
    propertyType: "Type de bien",
    reduced: "Appliquer les taux réduits andalous si éligible.",
    reducedHint: "Logique simplifiée. Vérifiez l'éligibilité.",
    registryFees: "Registre",
    registryPercent: "Registre estimé (%)",
    resale: "Revente",
    reset: "Réinitialiser",
    resultCaption: "Fonds estimés avant et à la signature.",
    resultKicker: "Résultat estimé",
    sectionTitle: "Calculateur des frais d'achat",
    subtitle: "Estimez les principaux frais d'acquisition en Andalousie.",
    taxes: "Taxes",
    totalExpenses: "Dépenses totales",
    validPrice: "Veuillez saisir un prix valide.",
  },
  hu: {
    adminCosts: "Gestoria / admin / NIE / extrák (€)",
    ajdNote: "A jelzálog AJD és a bankoldali közjegyző/földhivatali költségek ebben a becslésben nem kerülnek a vevőhöz.",
    appraisalFee: "Banki értékbecslés (€)",
    bankCosts: "Banki / jelzálog költségek",
    calculate: "Költségek számítása",
    cashOutsideMortgage: "Fennmaradó vételár záráskor",
    cashPurchase: "Készpénzes vétel",
    deposit: "Foglaló / Arras",
    depositPercent: "Foglaló / Arras (%)",
    disclaimer: "Indikatív andalúziai vásárlási költségbecslés. A pontos számokat ügyvéddel, bankkal és közjegyzővel ellenőrizni kell.",
    fixedLawyer: "Vagy fix ügyvédi díj (€)",
    lawyerFee: "Ügyvédi díj",
    mortgage: "Jelzálog",
    mortgageAmount: "Jelzálog összege (% a vételárból)",
    mortgageCopy: "Kapcsold be vagy ki a jelzálog feltételezést, és állítsd a finanszírozási arányt.",
    mortgageFee: "Banki nyitási díj (%)",
    newBuild: "Újépítésű ingatlan",
    notaryFees: "Közjegyzői költség",
    notaryPercent: "Becsült közjegyző (%)",
    otherBankCosts: "Egyéb vevői bankköltség (€)",
    price: "Ingatlan vételára (€)",
    professionalCosts: "Szakmai és zárási költségek",
    propertyType: "Ingatlan típusa",
    reduced: "Kedvezményes andalúziai lakásadó-kulcs alkalmazása, ha jogosult.",
    reducedHint: "Egyszerűsített logika főlakóhely küszöbökre. Jogosultságot ellenőrizni kell.",
    registryFees: "Földhivatali költség",
    registryPercent: "Becsült földhivatal (%)",
    resale: "Használt ingatlan",
    reset: "Példa visszaállítása",
    resultCaption: "Becsült teljes szükséges forrás a zárás előtt és záráskor.",
    resultKicker: "Becsült eredmény",
    sectionTitle: "Vásárlási költség kalkulátor",
    subtitle: "Számold ki a fő vevői költségeket Andalúziában: illetékek, ÁFA/AJD, ügyvéd, közjegyző, földhivatal és adminisztráció.",
    taxes: "Adók és illetékek",
    totalExpenses: "Teljes extra költség",
    validPrice: "Adj meg érvényes vételárat.",
  },
  pl: {
    adminCosts: "Gestoria / admin / NIE / extras (€)",
    ajdNote: "AJD hipoteczny i koszty bankowe notariusza/rejestru nie są tu doliczane kupującemu.",
    appraisalFee: "Wycena bankowa (€)",
    bankCosts: "Koszty banku / kredytu",
    calculate: "Oblicz koszty",
    cashOutsideMortgage: "Saldo przy akcie",
    cashPurchase: "Zakup gotówkowy",
    deposit: "Depozyt / Arras",
    depositPercent: "Depozyt / Arras (%)",
    disclaimer: "Orientacyjna kalkulacja dla Andaluzji. Potwierdź kwoty z prawnikiem, bankiem i notariuszem.",
    fixedLawyer: "Lub stała opłata prawnika (€)",
    lawyerFee: "Prawnik",
    mortgage: "Kredyt",
    mortgageAmount: "Kwota kredytu (% ceny)",
    mortgageCopy: "Włącz lub wyłącz założenia kredytu i dostosuj finansowanie.",
    mortgageFee: "Prowizja bankowa (%)",
    newBuild: "Nowa inwestycja",
    notaryFees: "Notariusz",
    notaryPercent: "Szacowany notariusz (%)",
    otherBankCosts: "Inne koszty bankowe (€)",
    price: "Cena nieruchomości (€)",
    professionalCosts: "Koszty profesjonalne i zamknięcia",
    propertyType: "Typ nieruchomości",
    reduced: "Zastosuj obniżone stawki, jeśli kwalifikujesz się.",
    reducedHint: "Uproszczona logika. Sprawdź kwalifikację.",
    registryFees: "Rejestr",
    registryPercent: "Szacowany rejestr (%)",
    resale: "Rynek wtórny",
    reset: "Reset przykładu",
    resultCaption: "Szacowane środki przed i przy zamknięciu.",
    resultKicker: "Wynik szacunkowy",
    sectionTitle: "Kalkulator kosztów zakupu",
    subtitle: "Szacunek głównych kosztów kupującego w Andaluzji.",
    taxes: "Podatki",
    totalExpenses: "Koszty łączne",
    validPrice: "Podaj prawidłową cenę.",
  },
  ru: {
    adminCosts: "Gestoria / админ / NIE / прочее (€)",
    ajdNote: "AJD по ипотеке и банковские нотариальные/регистрационные расходы здесь не добавляются покупателю.",
    appraisalFee: "Оценка банка (€)",
    bankCosts: "Банк / ипотека",
    calculate: "Рассчитать",
    cashOutsideMortgage: "Остаток при завершении",
    cashPurchase: "Покупка без ипотеки",
    deposit: "Депозит / Arras",
    depositPercent: "Депозит / Arras (%)",
    disclaimer: "Ориентировочная оценка для Андалусии. Уточняйте с юристом, банком и нотариусом.",
    fixedLawyer: "Или фикс. юрист (€)",
    lawyerFee: "Юрист",
    mortgage: "Ипотека",
    mortgageAmount: "Сумма ипотеки (% цены)",
    mortgageCopy: "Включите ипотеку и настройте уровень финансирования.",
    mortgageFee: "Комиссия банка (%)",
    newBuild: "Новостройка",
    notaryFees: "Нотариус",
    notaryPercent: "Нотариус (%)",
    otherBankCosts: "Другие банковские расходы (€)",
    price: "Цена объекта (€)",
    professionalCosts: "Профессиональные и закрывающие расходы",
    propertyType: "Тип объекта",
    reduced: "Применить сниженные ставки, если применимо.",
    reducedHint: "Упрощенная логика. Проверьте право на льготу.",
    registryFees: "Реестр",
    registryPercent: "Реестр (%)",
    resale: "Вторичный рынок",
    reset: "Сбросить пример",
    resultCaption: "Оценка средств до и при завершении.",
    resultKicker: "Оценочный результат",
    sectionTitle: "Калькулятор расходов покупки",
    subtitle: "Оцените основные расходы покупателя в Андалусии.",
    taxes: "Налоги",
    totalExpenses: "Всего расходов",
    validPrice: "Введите корректную цену.",
  },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-ES", {
    currency: "EUR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: "currency",
  }).format(Number.isFinite(value) ? value : 0);

function getTransferTaxRate(price: number, reduced: boolean) {
  if (!reduced) {
    return 0.07;
  }

  return price <= 150000 ? 0.06 : 0.07;
}

function getAjdRate(price: number, reduced: boolean) {
  if (!reduced) {
    return 0.012;
  }

  return price <= 150000 ? 0.01 : 0.012;
}

function NumberField({
  label,
  min = 0,
  onChange,
  step = 0.01,
  value,
}: {
  label: string;
  min?: number;
  onChange: (value: number) => void;
  step?: number;
  value: number;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
        {label}
      </span>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
        className="h-12 min-w-0 rounded-[6px] border border-[#d7d2c4] bg-white px-3 text-base outline-none"
      />
    </label>
  );
}

function ToggleButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-[6px] bg-[#0f253d] px-4 py-3 text-sm font-semibold text-white"
          : "rounded-[6px] border border-[#d7d2c4] bg-white px-4 py-3 text-sm font-semibold text-[#0f253d]"
      }
    >
      {children}
    </button>
  );
}

export function PurchaseCostCalculator({ locale }: { locale: Locale }) {
  const labels = labelsByLocale[locale];
  const [price, setPrice] = useState(550000);
  const [depositPercent, setDepositPercent] = useState(10);
  const [propertyType, setPropertyType] = useState<PropertyType>("resale");
  const [lawyerFeePercent, setLawyerFeePercent] = useState(1);
  const [lawyerFeeFixed, setLawyerFeeFixed] = useState(0);
  const [notaryPercent, setNotaryPercent] = useState(0.1);
  const [registryPercent, setRegistryPercent] = useState(0.05);
  const [adminCosts, setAdminCosts] = useState(600);
  const [reducedRate, setReducedRate] = useState(false);

  const result = useMemo(() => {
    if (price <= 0) {
      return null;
    }

    const deposit = price * (depositPercent / 100);
    const balanceAtCompletion = Math.max(price - deposit, 0);
    const lawyerFee =
      lawyerFeeFixed > 0 ? lawyerFeeFixed : price * (lawyerFeePercent / 100);
    const notaryFee = Math.max(price * (notaryPercent / 100), 600);
    const registryFee = Math.max(price * (registryPercent / 100), 400);
    const tpoRate = getTransferTaxRate(price, reducedRate);
    const ajdRate = getAjdRate(price, reducedRate);
    const transferTax = propertyType === "resale" ? price * tpoRate : 0;
    const vat = propertyType === "newbuild" ? price * 0.1 : 0;
    const ajd = propertyType === "newbuild" ? price * ajdRate : 0;
    const taxes = transferTax + vat + ajd;
    const totalExpenses =
      taxes + notaryFee + registryFee + lawyerFee + adminCosts;
    const totalUpfrontFunds = deposit + balanceAtCompletion + totalExpenses;
    const notes =
      propertyType === "resale"
        ? [
            `Resale property in Andalusia: transfer tax (TPO) applied at ${(tpoRate * 100).toFixed(1)}%.`,
          ]
        : [
            "New-build property: VAT applied at 10%.",
            `Andalusia AJD applied at ${(ajdRate * 100).toFixed(1)}%.`,
          ];

    if (reducedRate) {
      notes.push(
        propertyType === "resale" && tpoRate < 0.07
          ? "Reduced Andalusian TPO rate applied on a simplified eligibility basis."
          : propertyType === "newbuild" && ajdRate < 0.012
            ? "Reduced Andalusian AJD rate applied on a simplified eligibility basis."
            : "Reduced-rate option selected, but the example price does not qualify under the simplified threshold.",
      );
    }

    notes.push(
      `Estimated cash required before / at closing: ${formatCurrency(totalUpfrontFunds)}.`,
    );

    return {
      cashOutsideMortgage: balanceAtCompletion,
      deposit,
      lawyerFee,
      notes,
      notaryFee,
      registryFee,
      taxes,
      totalExpenses,
      totalUpfrontFunds,
    };
  }, [
    adminCosts,
    depositPercent,
    lawyerFeeFixed,
    lawyerFeePercent,
    notaryPercent,
    price,
    propertyType,
    reducedRate,
    registryPercent,
  ]);

  function resetExample() {
    setPrice(550000);
    setDepositPercent(10);
    setPropertyType("resale");
    setLawyerFeePercent(1);
    setLawyerFeeFixed(0);
    setNotaryPercent(0.1);
    setRegistryPercent(0.05);
    setAdminCosts(600);
    setReducedRate(false);
  }

  const rows = result
    ? [
        { label: labels.deposit, value: result.deposit },
        { label: labels.cashOutsideMortgage, value: result.cashOutsideMortgage },
        { label: labels.taxes, value: result.taxes },
        { label: labels.notaryFees, value: result.notaryFee },
        { label: labels.registryFees, value: result.registryFee },
        { label: labels.lawyerFee, value: result.lawyerFee },
        { label: labels.adminCosts, value: adminCosts },
        { label: labels.totalExpenses, value: result.totalExpenses },
      ]
    : [];

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
          Calculator
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-[#171717]">
          {labels.sectionTitle}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[#4b4740]">
          {labels.subtitle}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4">
          <div className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-lg font-semibold">{labels.propertyType}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <NumberField label={labels.price} value={price} onChange={setPrice} />
              <NumberField
                label={labels.depositPercent}
                value={depositPercent}
                onChange={setDepositPercent}
                step={0.1}
              />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ToggleButton
                active={propertyType === "resale"}
                onClick={() => setPropertyType("resale")}
              >
                {labels.resale}
              </ToggleButton>
              <ToggleButton
                active={propertyType === "newbuild"}
                onClick={() => setPropertyType("newbuild")}
              >
                {labels.newBuild}
              </ToggleButton>
            </div>
          </div>

          <div className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-lg font-semibold">{labels.professionalCosts}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <NumberField
                label={`${labels.lawyerFee} (%)`}
                value={lawyerFeePercent}
                onChange={setLawyerFeePercent}
              />
              <NumberField
                label={labels.fixedLawyer}
                value={lawyerFeeFixed}
                onChange={setLawyerFeeFixed}
              />
              <NumberField
                label={labels.notaryPercent}
                value={notaryPercent}
                onChange={setNotaryPercent}
              />
              <NumberField
                label={labels.registryPercent}
                value={registryPercent}
                onChange={setRegistryPercent}
              />
              <NumberField
                label={labels.adminCosts}
                value={adminCosts}
                onChange={setAdminCosts}
              />
            </div>
            <label className="mt-4 flex items-start gap-3 rounded-[6px] bg-[#f7f2ea] p-3 text-sm leading-6 text-[#4b4740]">
              <input
                type="checkbox"
                checked={reducedRate}
                onChange={(event) => setReducedRate(event.target.checked)}
                className="mt-1"
              />
              <span>
                <strong className="block text-[#171717]">{labels.reduced}</strong>
                {labels.reducedHint}
              </span>
            </label>
          </div>
        </div>

        <aside className="rounded-[8px] bg-[#0f253d] p-5 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ba9456]">
            {labels.resultKicker}
          </p>
          <p className="mt-3 text-4xl font-semibold">
            {result ? formatCurrency(result.totalUpfrontFunds) : formatCurrency(0)}
          </p>
          <p className="mt-2 text-sm leading-6 text-white/72">
            {result ? labels.resultCaption : labels.validPrice}
          </p>
          {result ? (
            <>
              <div className="mt-6 grid gap-2">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 rounded-[6px] bg-white/10 px-3 py-2 text-sm"
                  >
                    <strong className="font-semibold text-white/86">
                      {row.label}
                    </strong>
                    <span className="text-right font-semibold">
                      {formatCurrency(row.value)}
                    </span>
                  </div>
                ))}
              </div>
              <ul className="mt-5 grid gap-2 text-sm leading-6 text-white/72">
                {result.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </>
          ) : null}
          <p className="mt-5 rounded-[6px] bg-white/10 p-3 text-sm leading-6 text-white/72">
            {labels.disclaimer}
          </p>
          <button
            type="button"
            onClick={resetExample}
            className="mt-4 w-full rounded-[6px] border border-white/25 px-4 py-3 text-sm font-semibold text-white"
          >
            {labels.reset}
          </button>
        </aside>
      </div>
    </section>
  );
}
