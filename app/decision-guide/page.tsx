import { permanentRedirect } from "next/navigation";

export default function LegacyDecisionGuideRedirect() {
  permanentRedirect("/en/score");
}
