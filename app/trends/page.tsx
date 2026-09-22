import { permanentRedirect } from "next/navigation";

export default function LegacyTrendsRedirect() {
  permanentRedirect("/en/insights");
}
