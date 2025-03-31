"use client";

import useFetchDocData from "@/hooks/useFetchDocData";

interface PageProps {
    params: {
      slug: string;
    };
}

export default function Page({ params }: PageProps) {
    const { data } = useFetchDocData(params.slug);
    console.log("🚀 ~ Page ~ data:", data);
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }