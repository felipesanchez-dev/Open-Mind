"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, BookOpen, Clock, Users, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animations";

interface CourseCardProps {
  title: string;
  description: string;
  instructor: {
    name: string;
    avatar: string;
  };
  rating: number;
  price: {
    current: number;
    original?: number;
  };
  duration: string;
  modules: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  badge?: {
    text: string;
    color: "green" | "orange" | "red" | "blue";
  };
  gradientColors: string;
  delay?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  instructor,
  rating,
  price,
  duration,
  modules,
  level,
  category,
  badge,
  gradientColors,
  delay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isVisible, setElementRef } = useScrollAnimation({ threshold: 0.3 });

  const getBadgeColor = (color: string) => {
    const colors = {
      green: "bg-green-500",
      orange: "bg-orange-500",
      red: "bg-red-500",
      blue: "bg-blue-500",
    };
    return colors[color as keyof typeof colors] || "bg-gray-500";
  };

  const getLevelColor = (level: string) => {
    const colors = {
      Beginner: "border-green-500/30 text-green-600",
      Intermediate: "border-orange-500/30 text-orange-600",
      Advanced: "border-red-500/30 text-red-600",
    };
    return colors[level as keyof typeof colors] || "border-gray-500/30 text-gray-600";
  };

  return (
    <div
      ref={setElementRef}
      className={`group relative transition-all duration-700 transform ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <Card className="relative h-full bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
        {/* Header Image */}
        <div className={`relative h-48 ${gradientColors} overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Badge */}
          {badge && (
            <div className={`absolute top-4 right-4 ${getBadgeColor(badge.color)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
              {badge.text}
            </div>
          )}
          
          {/* Course Info Overlay */}
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-3 h-3" />
                </div>
                <span className="text-sm font-medium">{modules} módulos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Clock className="w-3 h-3" />
                </div>
                <span className="text-sm font-medium">{duration}</span>
              </div>
            </div>
          </div>

          {/* Animated Icons */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`w-8 h-8 bg-white/20 rounded-full flex items-center justify-center ${isHovered ? 'animate-bounce' : ''}`}>
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Category and Level */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs">{category}</Badge>
            <Badge variant="outline" className={`text-xs ${getLevelColor(level)}`}>
              {level}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Instructor and Rating */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-foreground truncate max-w-[120px]">
                {instructor.name}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-foreground">
                {rating}
              </span>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                ${price.current}
              </span>
              {price.original && (
                <span className="text-sm text-muted-foreground line-through">
                  ${price.original}
                </span>
              )}
            </div>
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground group-hover:scale-105 transition-transform"
            >
              Inscribirme
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface CoursesGridProps {
  courses: Array<{
    title: string;
    description: string;
    instructor: {
      name: string;
      avatar: string;
    };
    rating: number;
    price: {
      current: number;
      original?: number;
    };
    duration: string;
    modules: number;
    level: "Beginner" | "Intermediate" | "Advanced";
    category: string;
    badge?: {
      text: string;
      color: "green" | "orange" | "red" | "blue";
    };
    gradientColors: string;
  }>;
  className?: string;
}

const CoursesGrid: React.FC<CoursesGridProps> = ({ courses, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {courses.map((course, index) => (
        <CourseCard
          key={index}
          {...course}
          delay={index * 200}
        />
      ))}
    </div>
  );
};

export { CourseCard, CoursesGrid };
