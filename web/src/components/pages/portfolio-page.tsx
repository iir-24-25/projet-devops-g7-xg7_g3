"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  github: string;
  tags: string[];
}

export function PortfolioPage() {
  const [portfolioItems] = useState<PortfolioItem[]>([
    {
      id: 1,
      title: "HealthTrack Mobile App",
      description:
        "Complete redesign of a healthcare tracking application. Thesis & Research: 'Designing Intuitive Interfaces for Complex Systems: A Case Study in Healthcare Applications'.",
      image: "/placeholder.svg?height=300&width=400&text=HealthTrack",
      link: "https://example.com/healthtrack",
      github: "https://github.com/example/healthtrack",
      tags: ["UI/UX Design", "Mobile App", "React Native"],
    },
    {
      id: 2,
      title: "E-commerce Website",
      description:
        "Developed a responsive e-commerce platform with React. Senior Project: 'Visual Communication in Digital Environments: Exploring the Intersection of Design and Technology'.",
      image: "/placeholder.svg?height=300&width=400&text=E-commerce",
      link: "https://example.com/ecommerce",
      github: "https://github.com/example/ecommerce",
      tags: ["Web Development", "React", "Node.js"],
    },
  ])

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Portfolio
          </CardTitle>
          <CardDescription>Showcase your best work and projects</CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {portfolioItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={item.id === 1} // Only prioritize the first item for LCP
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="text-base font-medium mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Project
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PortfolioPage