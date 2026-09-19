import Link from "next/link";

const topics = [
  {
    question: "1. Hogyan zajlik lépésről lépésre a vásárlás?",
    answer: (
      <>
        <p>
          A jó vásárlás nem az első megtekintéssel, hanem a célok tisztázásával
          kezdődik: saját használat, költözés, nyaraló vagy befektetés; kívánt
          régió; teljes költségkeret; finanszírozás; időzítés és későbbi
          eladhatóság.
        </p>
        <ol className="mt-4 grid gap-3">
          <li>
            <strong>Igényfelmérés és költségkeret:</strong> a vételáron felüli
            költségeket is beleszámítjuk.
          </li>
          <li>
            <strong>Előszűrés:</strong> nemcsak hirdetéseket küldünk, hanem
            lokáció, jogi ellenőrizhetőség, állapot és továbbértékesíthetőség
            alapján szűkítünk.
          </li>
          <li>
            <strong>Megtekintési program:</strong> egy útvonalba rendezzük a
            releváns ingatlanokat és a környékeket.
          </li>
          <li>
            <strong>Ajánlat és tárgyalás:</strong> írásban rögzítjük az árat, a
            feltételeket, a határidőt és azt, hogy mi marad az ingatlanban.
          </li>
          <li>
            <strong>Foglalás és jogi átvilágítás:</strong> független ügyvéd
            ellenőrzi a tulajdont, terheket, engedélyeket, tartozásokat és a
            szerződést.
          </li>
          <li>
            <strong>Magánszerződés:</strong> jellemzően arras vagy adásvételi
            előszerződés rögzíti a fizetési ütemet és a teljesítés feltételeit.
          </li>
          <li>
            <strong>Közjegyzői zárás:</strong> az escritura pública aláírásakor
            megtörténik az elszámolás, a birtokbaadás és a kulcsátadás.
          </li>
          <li>
            <strong>Vásárlás után:</strong> adófizetés, földhivatali bejegyzés,
            közművek, biztosítás, közös képviselet és szükség esetén bérbeadási
            adminisztráció következik.
          </li>
        </ol>
      </>
    ),
  },
  {
    question: "2. Milyen dokumentumokra és azonosítókra van szükség?",
    answer: (
      <>
        <p>
          Alapesetben érvényes útlevél vagy személyi igazolvány, spanyol
          külföldi azonosító (<strong>NIE</strong>), lakcím- és
          adóilletőség-adatok, családi állapot, valamint a pénz eredetét igazoló
          dokumentumok szükségesek. Meghatalmazás esetén az ügyvéd a
          NIE-ügyintézést és több vásárlási lépést is elvégezhet.
        </p>
        <p className="mt-3">
          Banki finanszírozásnál jellemzően jövedelemigazolás, munkáltatói vagy
          vállalkozási iratok, bankszámlakivonatok, meglévő hitelek adatai és
          adóbevallások is kellenek. Magyar okiratnál hiteles fordítás vagy
          további formai követelmény merülhet fel. Spanyol bankszámla praktikus
          a közművek és rendszeres költségek miatt, de szükségességét az ügyvéd
          és a bank az adott ügyletben ellenőrizze.
        </p>
      </>
    ),
  },
  {
    question: "3. Hogyan működik a foglaló, az arras és a tulajdonátruházás?",
    answer: (
      <>
        <p>
          A kezdeti foglalási összeg leveszi az ingatlant a piacról a
          megállapodott időre. Csak akkor érdemes utalni, ha írásban világos a
          kedvezményezett, a visszafizetés feltétele és az ügyvédi ellenőrzés
          lehetősége.
        </p>
        <p className="mt-3">
          A <strong>contrato de arras</strong> gyakran a vételár 10%-ára
          egészíti ki a befizetést, de nem minden arras-szerződés joghatása
          azonos. Az eladó kétszeres visszafizetése és a vevő befizetésének
          elvesztése tipikusan az úgynevezett <em>arras penitenciales</em>{" "}
          megfelelő, kifejezett kikötéséhez kapcsolódik. A pontos szöveget
          aláírás előtt a vevő saját ügyvédjének kell ellenőriznie.
        </p>
        <p className="mt-3">
          A végleges tulajdonátruházás rendszerint közjegyző előtt, közokiratban
          történik. A fennmaradó vételár rendezése után átadják a birtokot és a
          kulcsokat, majd az okirat és az adók rendezése alapján bejegyzik a
          vevőt az ingatlan-nyilvántartásba.
        </p>
      </>
    ),
  },
  {
    question: "4. Kikre van szükség a biztonságos vásárláshoz?",
    answer: (
      <ul className="grid gap-3">
        <li>
          <strong>Vevői ingatlantanácsadó:</strong> lokáció, kínálat, ár-érték,
          tárgyalás és folyamatkoordináció.
        </li>
        <li>
          <strong>Független spanyol ügyvéd:</strong> a vevő érdekeit képviseli,
          átvilágítja az ingatlant és a szerződéseket. A közjegyző pártatlan,
          nem helyettesíti a vevő ügyvédjét.
        </li>
        <li>
          <strong>Közjegyző:</strong> elkészíti vagy ellenőrzi a közokirati
          zárást, azonosítja a feleket és teljesíti a jogszabályi kontrollokat.
        </li>
        <li>
          <strong>Bank és értékbecslő:</strong> hitel esetén vizsgálják a vevőt
          és a fedezetet.
        </li>
        <li>
          <strong>Műszaki szakértő:</strong> felújítandó villa, vidéki ingatlan,
          bővítés vagy bizonytalan állapot esetén különösen fontos.
        </li>
        <li>
          <strong>Adótanácsadó vagy gestor:</strong> nem rezidens adózás,
          kiadás, tulajdonosi struktúra és rendszeres bevallások esetén.
        </li>
      </ul>
    ),
  },
  {
    question: "5. Milyen adók terhelik a használt és az új ingatlant?",
    answer: (
      <>
        <p>
          <strong>Használt ingatlan:</strong> Andalúziában az általános
          vagyonszerzési illeték (ITP) jelenleg 7%. Egyes, jogszabályban
          meghatározott esetekben lehet kedvezményes kulcs, de ezt nem szabad
          automatikusan feltételezni.
        </p>
        <p className="mt-3">
          <strong>Új építésű ingatlan első értékesítése:</strong>{" "}
          lakóingatlannál jellemzően 10% IVA és Andalúziában általánosan 1,2%
          AJD terheli. Telek, üzleti ingatlan vagy különleges ügylet adózása
          eltérhet.
        </p>
        <p className="mt-3">
          A számítás alapja nem minden esetben egyszerűen a hirdetési ár, ezért
          a konkrét adóalapot és kedvezményeket az ügyvédnek vagy
          adótanácsadónak kell megerősítenie.
        </p>
      </>
    ),
  },
  {
    question: "6. Milyen egyéb vásárlási költségekkel kell számolni?",
    answer: (
      <>
        <p>
          Az adókon felül ügyvédi díj, közjegyzői és ingatlan-nyilvántartási
          díj, hiteles fordítás, meghatalmazás, banki átutalás vagy csekk,
          műszaki felmérés és hitelnél értékbecslés merülhet fel. Új építésnél a
          fizetési ütemezést és a bankgaranciákat is ellenőrizni kell.
        </p>
        <p className="mt-3">
          Irányadó tervezésként használt ingatlannál gyakran körülbelül 8,5%
          teljes többlettel számolnak. Új építésnél már a 10% IVA és az
          általános 1,2% AJD együtt 11,2%, ehhez adódnak a szakmai és
          adminisztratív díjak; ezért a pontos teljes összeget mindig az adott
          ügyletre kell kiszámítani.
        </p>
        <Link
          href="/hu/buying-guide#purchase-cost-calculator"
          className="mt-4 inline-flex font-bold text-[#0f253d] underline decoration-[#ba9456] decoration-2 underline-offset-4"
        >
          Vásárlási költség kalkulátor megnyitása
        </Link>
      </>
    ),
  },
  {
    question: "7. Milyen rendszeres tulajdonosi költségek vannak?",
    answer: (
      <ul className="grid gap-3">
        <li>
          <strong>IBI:</strong> éves önkormányzati ingatlanadó.
        </li>
        <li>
          <strong>Basura:</strong> helyi hulladékkezelési díj, ahol külön
          felszámítják.
        </li>
        <li>
          <strong>Community fee:</strong> társasházi vagy lakóparki közös
          költség; medence, kert, őrzés és szolgáltatások jelentősen növelhetik.
        </li>
        <li>
          <strong>Biztosítás és közművek:</strong> áram, víz, internet, riasztó
          és karbantartás.
        </li>
        <li>
          <strong>Adóbevallás:</strong> nem rezidens tulajdonosnál saját
          használat vagy bérbeadás mellett is lehet spanyol bevallási
          kötelezettség.
        </li>
      </ul>
    ),
  },
  {
    question: "8. Mire figyeljen egy magyar, nem rezidens tulajdonos?",
    answer: (
      <>
        <p>
          A spanyol ingatlan tulajdonlása önmagában nem tesz automatikusan
          spanyol adórezidenssé, de spanyol adókötelezettséget keletkeztethet. A
          nem rezidens magánszemély saját használatú városi ingatlanánál
          imputált jövedelem, bérbeadásnál pedig bérleti jövedelem alapján
          merülhet fel IRNR és <strong>Modelo 210</strong>.
        </p>
        <p className="mt-3">
          A magyar és spanyol adóilletőség, a kettős adóztatási egyezmény, a
          tulajdoni arány, az esetleges vagyonadó és egy későbbi eladás adózása
          személyfüggő. Ezekhez két országot értő adótanácsadó szükséges.
        </p>
      </>
    ),
  },
  {
    question: "9. Mi történik, ha kiadásra vagy befektetésnek vásárol?",
    answer: (
      <>
        <p>
          Először az exitet és a reális nettó hozamot kell megtervezni, nem a
          hirdetésben szereplő bruttó százalékot. A számításból nem maradhat ki
          az üresjárat, kezelés, takarítás, közmű, közös költség, biztosítás,
          karbantartás és adó.
        </p>
        <p className="mt-3">
          Hosszú távú és turisztikai kiadásra eltérő szabályok vonatkoznak.
          Turisztikai cél előtt ellenőrizni kell az aktuális önkormányzati
          urbanisztikai megfelelést, a társasház kifejezett jóváhagyását vagy
          tiltását, a Junta de Andalucía követelményeit és a szükséges
          regisztrációt. Marbella és más települések korlátozásai változhatnak,
          ezért egy meglévő vagy ígért „turistalicenc” önmagában nem elég.
        </p>
      </>
    ),
  },
  {
    question: "10. Kaphat-e magyar vevő spanyol banki hitelt?",
    answer: (
      <>
        <p>
          Igen, magyar vevő és spanyol adózási szempontból nem rezidens ügyfél
          is kaphat spanyol jelzáloghitelt, de a bank egyedileg vizsgálja a
          jövedelmet, meglévő terheket, életkort, devizakockázatot és az
          ingatlan értékét. A finanszírozási arány és kondíció bankonként eltér.
        </p>
        <p className="mt-3">
          Érdemes előminősítést kérni még az ajánlat előtt, és a foglalást
          finanszírozási feltételhez kötni, ha a vásárlás a hiteltől függ. A
          banki értékbecslést jellemzően a vevő fizeti; a hitel közjegyzői,
          nyilvántartási, adó- és gestoría-költségeinek bankoldali részét a
          hatályos spanyol jelzálogszabályok szerint a bank viseli. A vevő
          megkapja a FEIN és FiAE dokumentumokat, és kötelező előzetes
          közjegyzői tájékoztatáson vesz részt.
        </p>
      </>
    ),
  },
  {
    question: "11. Mire kell külön figyelni Marbellán és a Costa del Solon?",
    answer: (
      <ul className="grid gap-3">
        <li>
          <strong>Mikrolokáció:</strong> ugyanazon urbanizáción belül is nagy
          különbséget okozhat tájolás, zaj, meredekség, benapozás és gyalogos
          elérhetőség.
        </li>
        <li>
          <strong>Jogi és urbanisztikai státusz:</strong> bővítések,
          teraszbeépítés, medence, első használatbavételi engedély és
          nyilvántartási eltérések ellenőrzendők.
        </li>
        <li>
          <strong>Tengerparti és vidéki korlátozások:</strong> parti védősáv,
          vízellátás, kút, szennyvíz, útjog és telekhatár külön vizsgálatot
          igényelhet.
        </li>
        <li>
          <strong>Társasház:</strong> közös költség, tervezett rendkívüli
          befizetés, tartozás, szabályzat és turisztikai kiadás feltételei.
        </li>
        <li>
          <strong>Új építés:</strong> fejlesztő, engedélyek, bankgaranciák,
          műszaki specifikáció, átadási tolerancia és késés kezelése.
        </li>
        <li>
          <strong>Továbbértékesíthetőség:</strong> ne csak azt nézze, ami ma
          tetszik; fontos a parkolás, lift, terasz, állapot és a következő vevő
          számára is érthető lokáció.
        </li>
      </ul>
    ),
  },
  {
    question: "12. Melyek a külföldi vevők tipikus hibái?",
    answer: (
      <ul className="grid gap-3">
        <li>Csak a vételár alapján döntenek, teljes költségkeret nélkül.</li>
        <li>Az ügyvédi ellenőrzés előtt nem visszatérítendő pénzt utalnak.</li>
        <li>
          Az eladó vagy fejlesztő képviselőjét tekintik saját, független
          ügyvédjüknek.
        </li>
        <li>
          A hirdetés négyzetméterét, kilátását vagy bérbeadhatóságát ellenőrzés
          nélkül elfogadják.
        </li>
        <li>
          Túl sok, egymástól távoli területet hasonlítanak össze valódi
          prioritás nélkül.
        </li>
        <li>
          Nem vizsgálják meg a társasházi jegyzőkönyveket, rendkívüli
          befizetéseket és közös költséget.
        </li>
        <li>Hitelígéret nélkül vállalnak rövid teljesítési határidőt.</li>
        <li>
          A látványos felújítást összekeverik a jó műszaki állapottal és a jogi
          rendezettséggel.
        </li>
      </ul>
    ),
  },
  {
    question: "13. Hogyan dolgozik a Move2Marbella egy magyar érdeklődővel?",
    answer: (
      <>
        <p>
          <strong>Első beszélgetés:</strong> megértjük a vásárlás célját,
          időzítését, teljes keretét és a valódi prioritásokat.{" "}
          <strong>Piaci tájékozódás:</strong> összevetjük a régiókat és
          megmutatjuk, mit lehet reálisan kapni. <strong>Rövidlista:</strong>{" "}
          kiszűrjük a célhoz nem illő, gyenge ár-értékű vagy problémás
          lehetőségeket.
        </p>
        <p className="mt-3">
          <strong>Helyszíni program:</strong> megszervezzük a megtekintéseket,
          és nemcsak az ingatlant, hanem a mindennapi környezetet is bemutatjuk.{" "}
          <strong>Döntéstámogatás:</strong> összehasonlítjuk az alternatívákat,
          tárgyalunk, majd összekötjük a vevőt független ügyvéddel, bankkal és
          szükséges szakemberekkel.
        </p>
        <p className="mt-3">
          <strong>Zárás és utókövetés:</strong> koordináljuk a feleket a
          közjegyzői aláírásig, majd segítünk a közművek, biztosítás, felújítás,
          berendezés vagy ingatlankezelés következő lépéseiben. A cél nem egy
          ingatlan „eladása”, hanem egy ellenőrizhető és hosszú távon is
          vállalható döntés.
        </p>
        <Link
          href="/hu/contact"
          className="mt-4 inline-flex rounded-[6px] bg-[#0f253d] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white"
        >
          Írja meg, milyen ingatlant keres
        </Link>
      </>
    ),
  },
];

const sources = [
  [
    "Andalúz ITP és AJD adókulcsok",
    "https://www.juntadeandalucia.es/organismos/economiahaciendayfondoseuropeos/areas/tributos-juego/tributos/paginas/impuestos-cedidos-transmisiones.html",
  ],
  [
    "Andalúz adóhatóság: új ingatlan és AJD",
    "https://www.juntadeandalucia.es/organismos/atrian/areas/informacion-tributaria/impuestos/preguntas-frecuentes/impuestos-transmisiones-actos/aplicar-ajd.html",
  ],
  [
    "Spanyol adóhatóság: nem rezidensek Modelo 210",
    "https://sede.agenciatributaria.gob.es/Sede/procedimientoini/GF00.shtml",
  ],
  [
    "Spanyol ingatlan-nyilvántartás: Nota Simple",
    "https://sede.registradores.org/site/propiedad?lang=es",
  ],
  [
    "Spanyol közigazgatási portál: közjegyző és nyilvántartás",
    "https://administracion.gob.es/pag_Home/Tu-espacio-europeo/derechos-obligaciones/ciudadanos/residencia/compraventa-bienes-inmuebles/notarias-registros-propiedad",
  ],
  [
    "Junta de Andalucía: turisztikai célú lakások",
    "https://www.juntadeandalucia.es/organismos/turismojusticiadesregulacionyadministracionlocal/areas/turismo/registro-turismo/establecimientos-servicios/paginas/faq-viviendas-turismo.html",
  ],
  [
    "Banco de España: jelzáloghitel költségei",
    "https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/financiacion/hipotecas/guia-textual/primerospasoscon/Gastos_asociados_a_la_hipoteca.html",
  ],
] as const;

export function HungarianBuyerGuideDetails() {
  return (
    <section
      className="border-y border-[#d8d0c2] bg-[#f7f2ea] py-12"
      id="magyar-vevoi-kezikonyv"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9a7a3a]">
          Magyar vevői kézikönyv
        </p>
        <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight text-[#0f253d] sm:text-4xl">
          Spanyolországi ingatlanvásárlás magyar vevőknek
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#514c44]">
          Gyakorlati válaszok az első kapcsolatfelvételtől a kulcsátadásig,
          különös tekintettel Marbellára és a Costa del Solra. A jogi és adózási
          adatokat 2026 szeptemberében ellenőriztük.
        </p>

        <div className="mt-8 grid gap-3">
          {topics.map((topic, index) => (
            <details
              key={topic.question}
              className="group rounded-[8px] bg-white shadow-sm ring-1 ring-black/5"
              open={index === 0}
            >
              <summary className="cursor-pointer list-none px-5 py-5 text-lg font-semibold text-[#0f253d] marker:content-none sm:px-6">
                <span className="flex items-start justify-between gap-4">
                  {topic.question}
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-2xl leading-none text-[#ba9456] group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <div className="border-t border-[#e3ddd2] px-5 py-5 text-base leading-7 text-[#514c44] sm:px-6 [&_strong]:text-[#25221e]">
                {topic.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 rounded-[8px] bg-[#0f253d] p-6 text-white sm:p-8">
          <h2 className="text-2xl font-semibold">
            Hivatalos források és felelősségi megjegyzés
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-white/80">
            Ez az útmutató általános tájékoztatás, nem egyedi jogi, adó- vagy
            hiteltanácsadás. A szabályok, önkormányzati korlátozások és banki
            feltételek változhatnak; minden vásárlást független spanyol
            ügyvéddel és szükség szerint adótanácsadóval kell ellenőrizni.
          </p>
          <ul className="mt-5 grid gap-2 text-sm leading-6 sm:grid-cols-2">
            {sources.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#e4c58b] underline underline-offset-4 hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
