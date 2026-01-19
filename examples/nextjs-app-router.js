// examples/nextjs-app-router.js
// Complete Next.js App Router integration example

// tailwind.config.js
export const tailwindConfig = {
  presets: [require('@contact-biosolutions/firehawk-brand-kit/tailwind/preset')],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Project-specific extensions
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
      }
    }
  }
};

// app/globals.css
export const globalCSS = `
@import '@contact-biosolutions/firehawk-brand-kit/css/base.css';

/* Additional project styles */
.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
`;

// app/layout.tsx
export const RootLayout = `
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
`;

// components/ui/Button.tsx
export const ButtonComponent = `
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
          'disabled:pointer-events-none disabled:opacity-50',
          
          // Variants
          {
            'bg-primary-600 text-white hover:bg-primary-700': variant === 'primary',
            'bg-secondary-100 text-secondary-900 hover:bg-secondary-200': variant === 'secondary',
            'bg-accent-500 text-white hover:bg-accent-600': variant === 'accent',
            'border border-neutral-300 bg-white hover:bg-neutral-50': variant === 'outline',
          },
          
          // Sizes
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
`;

// components/ui/Card.tsx
export const CardComponent = `
import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-neutral-200 bg-white shadow-sm',
        className
      )}
      {...props}
    />
  )
);

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);

export { Card, CardHeader, CardTitle, CardContent };
`;

// app/page.tsx
export const HomePage = `
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Contact BioSolutions
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Leading agricultural innovation through cutting-edge biotechnology 
              and sustainable farming solutions.
            </p>
            <div className="flex gap-4">
              <Button variant="accent" size="lg">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Our Solutions
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Comprehensive agricultural solutions designed to maximize yield 
              while promoting environmental sustainability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Precision Agriculture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Advanced monitoring and optimization tools for modern farming operations.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sustainable Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Environmentally conscious approaches to agricultural challenges.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Research & Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Cutting-edge research driving the future of agricultural technology.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
`;