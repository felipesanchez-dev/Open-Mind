"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animations";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  value, 
  label, 
  delay = 0,
  description 
}) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [isAnimating, setIsAnimating] = useState(false);
  const { isVisible, setElementRef } = useScrollAnimation({ threshold: 0.5 });

  useEffect(() => {
    if (isVisible && !isAnimating) {
      setIsAnimating(true);
      const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
      const suffix = value.replace(/[0-9]/g, '');
      
      if (numericValue > 0) {
        const duration = 2000; // 2 segundos
        const steps = 60;
        const stepValue = numericValue / steps;
        
        let currentValue = 0;
        const timer = setInterval(() => {
          currentValue += stepValue;
          if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
          }
          setDisplayValue(Math.floor(currentValue) + suffix);
        }, duration / steps);

        return () => clearInterval(timer);
      }
    }
  }, [isVisible, value, isAnimating]);

  return (
    <div
      ref={setElementRef}
      className={`group transition-all duration-700 transform ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Card className="h-full bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {displayValue}
          </div>
          <div className="text-sm font-medium text-muted-foreground mb-1">
            {label}
          </div>
          {description && (
            <div className="text-xs text-muted-foreground/70">
              {description}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface StatsGridProps {
  stats: Array<{
    icon: React.ReactNode;
    value: string;
    label: string;
    description?: string;
  }>;
  className?: string;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats, className = "" }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          description={stat.description}
          delay={index * 100}
        />
      ))}
    </div>
  );
};

export { StatCard, StatsGrid };
