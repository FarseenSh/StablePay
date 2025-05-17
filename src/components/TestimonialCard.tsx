
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  company,
  image,
  className,
}) => {
  return (
    <Card className={cn("transition-all duration-300 hover:shadow-lg", className)}>
      <CardContent className="pt-6">
        <div className="text-2xl text-accent-500 mb-2 font-serif">"</div>
        <p className="text-slate-700 dark:text-slate-300 mb-6 italic">{quote}</p>
      </CardContent>
      <CardFooter className="flex items-center gap-4">
        {image && (
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={image} alt={author} className="w-full h-full object-cover" />
          </div>
        )}
        {!image && (
          <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400 text-lg font-medium">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {role}, {company}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
