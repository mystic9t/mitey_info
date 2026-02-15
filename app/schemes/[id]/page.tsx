import { notFound } from "next/navigation";
import Link from "next/link";
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
  params: {
    id: string;
  };
}

export default function SchemeDetailPage({ params }: Props) {
  const scheme = schemes.find((s) => s.id === params.id);

  if (!scheme) {
    notFound();
  }

  return <SchemeDetailClient scheme={scheme} />;
}
