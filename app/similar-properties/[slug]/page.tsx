import SimilarPropertiesPage, { metadata as baseMetadata } from "../page";

type SimilarPropertiesSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata = baseMetadata;

export default function SimilarPropertiesSlugPage({
  params,
}: SimilarPropertiesSlugPageProps) {
  return <SimilarPropertiesPage params={params} />;
}

export const revalidate = 300;
