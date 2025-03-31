"use client";

interface PageProps {
    params: {
      slug: string;
    };
}


export default function Page({ params }: PageProps) {
    console.log("🚀 ~ Page ~ params:", params)
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }