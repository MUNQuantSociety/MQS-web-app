"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/types/types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Article[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/get-articles");
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleReadMore = (slug: string) => {
    router.push(`/article/${slug}`);
  };

  return (
    <div className="overflow-x-hidden">
      {projects.map((project) => (
        <section
          key={project.name}
          className="full-image-section relative h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url(/article-list/${project.name}/hero.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-black/20 flex justify-center items-center px-4">
            <div className="max-w-2xl w-full bg-black/40 backdrop-blur-md text-white p-10 rounded-2xl shadow-xl text-center space-y-6">
              <h2 className="text-4xl font-bold">{project.title}</h2>
              <p className="text-lg leading-relaxed text-gray-200">
                {project.summary}
              </p>
              <button
                onClick={() => handleReadMore(project.name)}
                className="px-6 py-2 bg-[#4af6c3] text-black font-medium rounded hover:bg-[#3cd2a6] transition"
              >
                Read More
              </button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
