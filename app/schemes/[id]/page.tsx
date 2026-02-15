import { notFound } from "next/navigation";
import { use } from "react";
import schemesData from "@/data/schemes.json";
import { Scheme } from "@/types/scheme";
import SchemeDetailClient from "./client";

const schemes = schemesData as Scheme[];

export function generateStaticParams() {
  return schemes.map((scheme) => ({
    id: scheme.id,
  }));
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function SchemeDetailPage({ params }: Props) {
  const { id } = use(params);
  const scheme = schemes.find((s) => s.id === id);

  if (!scheme) {
    notFound();
  }

  return <SchemeDetailClient scheme={scheme} />;
}
