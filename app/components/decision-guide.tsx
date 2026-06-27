"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  decisionQuestions,
  getDecisionGuideCopy,
  type DecisionQuestionId,
} from "../data/decision-guide";
import { trackEvent } from "../lib/analytics";

type DecisionCopy = ReturnType<typeof getDecisionGuideCopy>;
type Importance = "essential" | "important" | "advantage";
type Rating = "meets" | "partly" | "no" | "unknown";

export type EvaluationProperty = {
  id: string;
  source: "app" | "external";
  title: string;
  reference?: string;
  location?: string;
  price?: string;
  url?: string;
  image?: string;
};

type Answer = {
  importance: Importance;
  rating: Rating | null;
};

type AnswerMap = Record<DecisionQuestionId, Answer>;

type EvaluationResult = {
  overall: number;
  longTerm: number;
  condition: number;
  critical: number;
  unknown: number;
  improvements: number;
  recommendation: "strong" | "good" | "weak" | "reconsider" | "verify";
};

type SavedEvaluation = {
  id: string;
  property: EvaluationProperty;
  answers: AnswerMap;
  result: EvaluationResult;
  updatedAt: string;
};

type FavouriteProperty = {
  ref: string;
  title: string;
  price: string;
  location: string;
  image: string;
  href: string;
};

type DecisionGuideProps = {
  basePath: string;
  copy: DecisionCopy;
  initialProperty?: EvaluationProperty | null;
};

const EVALUATIONS_STORAGE_KEY = "move2marbella:decision-evaluations";
const FAVOURITES_STORAGE_KEY = "move2marbella:favourites";

const importanceWeight: Record<Importance, number> = {
  essential: 3,
  important: 2,
  advantage: 1,
};

const ratingValue: Record<Rating, number> = {
  meets: 1,
  partly: 0.5,
  no: 0,
  unknown: 0.25,
};

function createInitialAnswers(): AnswerMap {
  return Object.fromEntries(
    decisionQuestions.map((question) => [
      question.id,
      { importance: question.defaultImportance, rating: null },
    ]),
  ) as AnswerMap;
}

function calculateResult(answers: AnswerMap): EvaluationResult {
  function sectionScore(changeable: boolean) {
    const questions = decisionQuestions.filter(
      (question) => question.changeable === changeable,
    );
    const possible = questions.reduce(
      (sum, question) => sum + importanceWeight[answers[question.id].importance],
      0,
    );
    const achieved = questions.reduce((sum, question) => {
      const answer = answers[question.id];
      const value = answer.rating ? ratingValue[answer.rating] : 0;
      return sum + importanceWeight[answer.importance] * value;
    }, 0);
    return possible > 0 ? Math.round((achieved / possible) * 100) : 0;
  }

  const longTerm = sectionScore(false);
  const condition = sectionScore(true);
  const critical = decisionQuestions.filter((question) => {
    const answer = answers[question.id];
    return !question.changeable && answer.importance === "essential" && answer.rating === "no";
  }).length;
  const unknownEssentials = decisionQuestions.filter((question) => {
    const answer = answers[question.id];
    return !question.changeable && answer.importance === "essential" && answer.rating === "unknown";
  }).length;
  const unknown = decisionQuestions.filter(
    (question) => answers[question.id].rating === "unknown",
  ).length;
  const improvements = decisionQuestions.filter(
    (question) =>
      question.changeable &&
      (answers[question.id].rating === "partly" || answers[question.id].rating === "no"),
  ).length;

  let overall = Math.round(longTerm * 0.75 + condition * 0.25);
  let recommendation: EvaluationResult["recommendation"] =
    overall >= 80 ? "strong" : overall >= 65 ? "good" : "weak";

  if (unknownEssentials > 0) {
    overall = Math.min(overall, 69);
    recommendation = "verify";
  }
  if (critical > 0) {
    overall = Math.min(overall, 49);
    recommendation = "reconsider";
  }

  return { overall, longTerm, condition, critical, unknown, improvements, recommendation };
}

function readStorage<T>(key: string): T[] {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T[]) : [];
  } catch {
    return [];
  }
}

function recommendationLabel(copy: DecisionCopy, result: EvaluationResult) {
  if (result.recommendation === "reconsider") return copy.reconsider;
  if (result.recommendation === "verify") return copy.verifyFirst;
  if (result.recommendation === "strong") return copy.strongFit;
  if (result.recommendation === "good") return copy.goodFit;
  return copy.weakFit;
}

export function DecisionGuide({
  basePath,
  copy,
  initialProperty = null,
}: DecisionGuideProps) {
  const [mode, setMode] = useState<"choose" | "app" | "external" | "questions" | "result">(
    initialProperty ? "questions" : "choose",
  );
  const [property, setProperty] = useState<EvaluationProperty | null>(initialProperty);
  const [answers, setAnswers] = useState<AnswerMap>(createInitialAnswers);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [savedEvaluations, setSavedEvaluations] = useState<SavedEvaluation[]>([]);
  const [favourites, setFavourites] = useState<FavouriteProperty[]>([]);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const guideTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSavedEvaluations(readStorage<SavedEvaluation>(EVALUATIONS_STORAGE_KEY));
      setFavourites(readStorage<FavouriteProperty>(FAVOURITES_STORAGE_KEY));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mode !== "result") return;
    guideTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [mode]);

  const question = decisionQuestions[questionIndex];
  const answer = answers[question.id];
  const progress = ((questionIndex + 1) / decisionQuestions.length) * 100;
  const groupLabel = question.changeable ? copy.changeable : copy.immutable;
  const groupHint = question.changeable ? copy.changeableHint : copy.immutableHint;

  const scoreCards = useMemo(
    () =>
      result
        ? [
            { label: copy.overallScore, value: `${result.overall}/100`, accent: true },
            { label: copy.longTermFit, value: `${result.longTerm}/100` },
            { label: copy.currentCondition, value: `${result.condition}/100` },
          ]
        : [],
    [copy, result],
  );

  const resultDetails = useMemo(() => {
    if (!result) return { critical: [], verify: [], improvements: [] };

    const label = (questionId: DecisionQuestionId) => copy.questions[questionId];

    return {
      critical: decisionQuestions
        .filter((item) => {
          const itemAnswer = answers[item.id];
          return !item.changeable && itemAnswer.importance === "essential" && itemAnswer.rating === "no";
        })
        .map((item) => label(item.id)),
      verify: decisionQuestions
        .filter((item) => answers[item.id].rating === "unknown")
        .map((item) => label(item.id)),
      improvements: decisionQuestions
        .filter((item) => {
          const rating = answers[item.id].rating;
          return item.changeable && (rating === "partly" || rating === "no");
        })
        .map((item) => label(item.id)),
    };
  }, [answers, copy.questions, result]);

  function beginEvaluation(nextProperty: EvaluationProperty) {
    setProperty(nextProperty);
    setAnswers(createInitialAnswers());
    setQuestionIndex(0);
    setResult(null);
    setMode("questions");
    trackEvent("decision_guide_started", {
      property_reference: nextProperty.reference,
      property_source: nextProperty.source,
    });
  }

  function handleExternalSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title") ?? "").trim();
    const reference = String(data.get("reference") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();
    const price = String(data.get("price") ?? "").trim();
    const url = String(data.get("url") ?? "").trim();

    if (!title || !location) return;

    beginEvaluation({
      id: `external:${reference || title.toLowerCase().replace(/\s+/g, "-")}`,
      source: "external",
      title,
      reference: reference || undefined,
      location,
      price: price || undefined,
      url: url || undefined,
    });
  }

  function updateAnswer(patch: Partial<Answer>) {
    setAnswers((current) => ({
      ...current,
      [question.id]: { ...current[question.id], ...patch },
    }));
  }

  function finishEvaluation(finalAnswers: AnswerMap = answers) {
    if (!property) return;
    const nextResult = calculateResult(finalAnswers);
    const evaluation: SavedEvaluation = {
      id: property.id,
      property,
      answers: finalAnswers,
      result: nextResult,
      updatedAt: new Date().toISOString(),
    };
    const nextSaved = [
      evaluation,
      ...savedEvaluations.filter((saved) => saved.id !== evaluation.id),
    ];

    window.localStorage.setItem(EVALUATIONS_STORAGE_KEY, JSON.stringify(nextSaved));
    setSavedEvaluations(nextSaved);
    setResult(nextResult);
    setMode("result");
    trackEvent("decision_guide_completed", {
      critical_mismatches: nextResult.critical,
      decision_score: nextResult.overall,
      property_reference: property.reference,
      property_source: property.source,
    });
  }

  function continueEvaluation() {
    const nextAnswers = answer.rating
      ? answers
      : {
          ...answers,
          [question.id]: { ...answer, rating: "unknown" as const },
        };

    if (!answer.rating) setAnswers(nextAnswers);

    if (questionIndex === decisionQuestions.length - 1) {
      finishEvaluation(nextAnswers);
      return;
    }

    setQuestionIndex(questionIndex + 1);
  }

  function loadEvaluation(evaluation: SavedEvaluation) {
    setProperty(evaluation.property);
    setAnswers(evaluation.answers);
    setResult(evaluation.result);
    setMode("result");
  }

  function deleteEvaluation(id: string) {
    const nextSaved = savedEvaluations.filter((evaluation) => evaluation.id !== id);
    window.localStorage.setItem(EVALUATIONS_STORAGE_KEY, JSON.stringify(nextSaved));
    setSavedEvaluations(nextSaved);
  }

  function resetGuide() {
    setMode("choose");
    setProperty(null);
    setResult(null);
    setAnswers(createInitialAnswers());
    setQuestionIndex(0);
  }

  return (
    <div ref={guideTopRef} className="scroll-mt-24 space-y-8">
      {mode === "choose" ? (
        <section className="bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {copy.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[#0f253d]">{copy.chooseTitle}</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#5c564d]">{copy.chooseBody}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setMode("app")}
              className="min-h-16 rounded-[8px] bg-[#0f253d] px-5 py-4 text-left text-base font-semibold text-white transition hover:bg-[#173b60]"
            >
              {copy.evaluateInApp}
            </button>
            <button
              type="button"
              onClick={() => setMode("external")}
              className="min-h-16 rounded-[8px] border border-[#ba9456] bg-[#fbf8f2] px-5 py-4 text-left text-base font-semibold text-[#0f253d] transition hover:bg-[#f2eadc]"
            >
              {copy.evaluateAnother}
            </button>
          </div>
        </section>
      ) : null}

      {mode === "app" ? (
        <section className="bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
          <button type="button" onClick={() => setMode("choose")} className="text-sm font-semibold text-[#0f253d]">
            ← {copy.back}
          </button>
          <h2 className="mt-5 text-3xl font-semibold text-[#0f253d]">{copy.savedProperties}</h2>
          {favourites.length > 0 ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {favourites.map((favourite) => (
                <button
                  key={favourite.ref}
                  type="button"
                  onClick={() =>
                    beginEvaluation({
                      id: `app:${favourite.ref}`,
                      source: "app",
                      title: favourite.title,
                      reference: favourite.ref,
                      location: favourite.location,
                      price: favourite.price,
                      image: favourite.image,
                      url: favourite.href,
                    })
                  }
                  className="grid min-h-24 grid-cols-[88px_1fr] gap-3 rounded-[8px] border border-[#e5dac8] p-3 text-left transition hover:border-[#ba9456]"
                >
                  <img src={favourite.image} alt="" className="h-20 w-full rounded-[6px] object-cover" />
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-[#0f253d]">{favourite.title}</span>
                    <span className="mt-1 block truncate text-sm text-[#6f6a61]">{favourite.location}</span>
                    <span className="mt-1 block text-sm font-semibold text-[#9a7a3a]">{favourite.price}</span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-5 border-l-4 border-[#ba9456] bg-[#fbf8f2] p-5">
              <p className="text-base leading-7 text-[#5c564d]">{copy.noSavedProperties}</p>
              <Link href={basePath} className="mt-4 inline-flex rounded-[6px] bg-[#0f253d] px-5 py-3 text-sm font-semibold text-white">
                {copy.browseProperties}
              </Link>
            </div>
          )}
        </section>
      ) : null}

      {mode === "external" ? (
        <section className="bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
          <button type="button" onClick={() => setMode("choose")} className="text-sm font-semibold text-[#0f253d]">
            ← {copy.back}
          </button>
          <h2 className="mt-5 text-3xl font-semibold text-[#0f253d]">{copy.externalTitle}</h2>
          <form onSubmit={handleExternalSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[#4d4942]">
              {copy.propertyName}
              <input name="title" required className="h-12 rounded-[6px] border border-[#d9cfbd] px-4 font-normal" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[#4d4942]">
              {copy.propertyLocation}
              <input name="location" required className="h-12 rounded-[6px] border border-[#d9cfbd] px-4 font-normal" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[#4d4942]">
              {copy.propertyReference} <span className="font-normal text-[#817a70]">({copy.optional})</span>
              <input name="reference" className="h-12 rounded-[6px] border border-[#d9cfbd] px-4 font-normal" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[#4d4942]">
              {copy.propertyPrice} <span className="font-normal text-[#817a70]">({copy.optional})</span>
              <input name="price" inputMode="decimal" className="h-12 rounded-[6px] border border-[#d9cfbd] px-4 font-normal" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[#4d4942] sm:col-span-2">
              {copy.propertyUrl} <span className="font-normal text-[#817a70]">({copy.optional})</span>
              <input name="url" type="url" className="h-12 rounded-[6px] border border-[#d9cfbd] px-4 font-normal" />
            </label>
            <button className="mt-2 min-h-12 rounded-[6px] bg-[#ba9456] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white sm:col-span-2">
              {copy.startEvaluation}
            </button>
          </form>
        </section>
      ) : null}

      {mode === "questions" && property ? (
        <section className="overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
          <div className="h-2 bg-[#e9dfcf]">
            <div className="h-full bg-[#ba9456] transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="p-5 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a7a3a]">
                  {copy.questionProgress} {questionIndex + 1}/{decisionQuestions.length}
                </p>
                <p className="mt-1 text-sm text-[#6f6a61]">{property.title}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${question.changeable ? "bg-[#efe2c5] text-[#73561d]" : "bg-[#dfe8f0] text-[#0f253d]"}`}>
                {groupLabel}
              </span>
            </div>
            <h2 className="mt-7 max-w-3xl text-3xl font-semibold leading-tight text-[#0f253d] sm:text-4xl">
              {copy.questions[question.id]}
            </h2>
            <p className="mt-3 text-base leading-7 text-[#625c53]">{groupHint}</p>

            <fieldset className="mt-7">
              <legend className="text-sm font-semibold text-[#4d4942]">{copy.importance}</legend>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {(["essential", "important", "advantage"] as Importance[]).map((importance) => (
                  <button
                    key={importance}
                    type="button"
                    aria-pressed={answer.importance === importance}
                    onClick={() => updateAnswer({ importance })}
                    className={`min-h-12 rounded-[6px] border px-2 py-3 text-xs font-semibold sm:text-sm ${answer.importance === importance ? "border-[#0f253d] bg-[#0f253d] text-white" : "border-[#d9cfbd] bg-white text-[#4d4942]"}`}
                  >
                    {copy[importance]}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="sr-only">{copy.assessment}</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {(["meets", "partly", "no", "unknown"] as Rating[]).map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    aria-pressed={answer.rating === rating}
                    onClick={() => updateAnswer({ rating })}
                    className={`min-h-14 rounded-[6px] border px-4 py-3 text-left text-sm font-semibold ${answer.rating === rating ? "border-[#ba9456] bg-[#f5ead7] text-[#0f253d] ring-2 ring-[#ba9456]/25" : "border-[#ddd3c1] bg-[#fbfaf7] text-[#4d4942]"}`}
                  >
                    {copy[rating]}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => (questionIndex > 0 ? setQuestionIndex(questionIndex - 1) : resetGuide())}
                className="min-h-12 rounded-[6px] border border-[#d9cfbd] px-5 py-3 text-sm font-semibold text-[#0f253d]"
              >
                {copy.back}
              </button>
              <button
                type="button"
                onClick={continueEvaluation}
                className="min-h-12 rounded-[6px] bg-[#ba9456] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a8834c]"
              >
                {questionIndex === decisionQuestions.length - 1 ? copy.finish : copy.next}
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {mode === "result" && property && result ? (
        <section className="overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
          <div className="bg-[#0f253d] p-5 text-white sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ba9456]">{copy.resultTitle}</p>
            <h2 className="mt-2 text-3xl font-semibold">{property.title}</h2>
            <p className="mt-2 text-white/70">{property.location}</p>
            <p className="mt-5 text-xl font-semibold text-[#f0d39b]">{recommendationLabel(copy, result)}</p>
          </div>
          <div className="p-5 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-3">
              {scoreCards.map((card) => (
                <div key={card.label} className={`rounded-[8px] p-4 ${card.accent ? "bg-[#ba9456] text-white" : "bg-[#f7f2ea] text-[#0f253d]"}`}>
                  <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{card.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{card.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <ResultMetric label={copy.criticalIssues} value={result.critical} />
              <ResultMetric label={copy.itemsToVerify} value={result.unknown} />
              <ResultMetric label={copy.improvementPotential} value={result.improvements} />
            </div>

            {resultDetails.critical.length > 0 ||
            resultDetails.verify.length > 0 ||
            resultDetails.improvements.length > 0 ? (
              <div className="mt-5 grid gap-3 lg:grid-cols-3">
                {resultDetails.critical.length > 0 ? (
                  <ResultDetailList
                    label={copy.criticalIssues}
                    items={resultDetails.critical}
                    tone="critical"
                  />
                ) : null}
                {resultDetails.verify.length > 0 ? (
                  <ResultDetailList label={copy.itemsToVerify} items={resultDetails.verify} tone="verify" />
                ) : null}
                {resultDetails.improvements.length > 0 ? (
                  <ResultDetailList
                    label={copy.improvementPotential}
                    items={resultDetails.improvements}
                    tone="improvement"
                  />
                ) : null}
              </div>
            ) : null}

            {result.critical > 0 ? (
              <p className="mt-5 border-l-4 border-[#a83a32] bg-[#fff1ef] p-4 text-sm leading-6 text-[#71302b]">
                {copy.criticalMessage}
              </p>
            ) : null}

            <p className="mt-5 text-sm text-[#6f6a61]">{copy.saved}</p>
            <p className="mt-2 text-xs leading-5 text-[#817a70]">{copy.scoreDisclaimer}</p>
            <button type="button" onClick={resetGuide} className="mt-6 min-h-12 rounded-[6px] bg-[#0f253d] px-5 py-3 text-sm font-semibold text-white">
              {copy.startOver}
            </button>
          </div>
        </section>
      ) : null}

      <section className="border-t border-[#ded4c2] pt-7">
        <h2 className="text-2xl font-semibold text-[#0f253d]">{copy.yourEvaluations}</h2>
        {savedEvaluations.length > 0 ? (
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {savedEvaluations.map((evaluation) => (
              <article key={evaluation.id} className="grid gap-4 rounded-[8px] bg-white p-4 shadow-sm ring-1 ring-black/5 sm:grid-cols-[1fr_auto] sm:items-center">
                <button type="button" onClick={() => loadEvaluation(evaluation)} className="text-left">
                  <p className="font-semibold text-[#0f253d]">{evaluation.property.title}</p>
                  <p className="mt-1 text-sm text-[#6f6a61]">{evaluation.property.location}</p>
                  <p className="mt-2 text-sm font-semibold text-[#9a7a3a]">{copy.overallScore}: {evaluation.result.overall}/100</p>
                </button>
                <button type="button" onClick={() => deleteEvaluation(evaluation.id)} className="rounded-[6px] border border-[#ded4c2] px-3 py-2 text-xs font-semibold text-[#6f6a61]">
                  {copy.delete}
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm leading-6 text-[#6f6a61]">{copy.noEvaluations}</p>
        )}
      </section>
    </div>
  );
}

function ResultMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[8px] border border-[#e4dac8] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#777168]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[#0f253d]">{value}</p>
    </div>
  );
}

function ResultDetailList({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "critical" | "verify" | "improvement";
}) {
  const styles = {
    critical: "border-[#dca9a4] bg-[#fff4f2] text-[#71302b]",
    verify: "border-[#d8c28f] bg-[#fffaf0] text-[#69511e]",
    improvement: "border-[#b9c9d8] bg-[#f3f7fa] text-[#0f253d]",
  };

  return (
    <section className={`rounded-[8px] border p-4 ${styles[tone]}`}>
      <h3 className="text-sm font-semibold">{label}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
