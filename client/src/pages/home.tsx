import { Link } from "wouter";
import { Star, Book, Check, Zap, Wand2, Award } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slide-up">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Stunning
              <span className="gradient-text"> Logos & Book Covers</span>
              <br />with AI Power
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Transform your creative vision into professional designs in minutes. 
              Our AI-powered platform generates multiple design options tailored to your brand.
            </p>
            
            {/* Service Selection Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Logo Creation Card */}
              <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Star className="text-3xl text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Logo</h3>
                  <p className="text-gray-600 mb-6">
                    Design professional logos that capture your brand's essence. 
                    Get 5 unique AI-generated options to choose from.
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center">
                      <Check className="text-green-500 mr-2 h-4 w-4" />
                      5 Logo Options
                    </span>
                    <span className="flex items-center">
                      <Check className="text-green-500 mr-2 h-4 w-4" />
                      High Quality
                    </span>
                    <span className="flex items-center">
                      <Check className="text-green-500 mr-2 h-4 w-4" />
                      Commercial Use
                    </span>
                  </div>
                  <Link href="/logo-form">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Start Creating Logo
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Book Cover Creation Card */}
              <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                    <Book className="text-3xl text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Book Cover</h3>
                  <p className="text-gray-600 mb-6">
                    Design captivating book covers that attract readers. 
                    Perfect for authors, publishers, and content creators.
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center">
                      <Check className="text-green-500 mr-2 h-4 w-4" />
                      5 Cover Options
                    </span>
                    <span className="flex items-center">
                      <Check className="text-green-500 mr-2 h-4 w-4" />
                      Print Ready
                    </span>
                    <span className="flex items-center">
                      <Check className="text-green-500 mr-2 h-4 w-4" />
                      Multiple Formats
                    </span>
                  </div>
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-white" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose LogoCraft Pro?</h3>
            <p className="text-xl text-gray-600">Professional design tools powered by AI innovation</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce-gentle">
                <Zap className="text-2xl text-primary" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h4>
              <p className="text-gray-600">Generate professional designs in under 2 minutes with our advanced AI technology.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce-gentle">
                <Wand2 className="text-2xl text-secondary" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Design</h4>
              <p className="text-gray-600">Advanced AI technology creates unique, professional designs tailored specifically to your brand and industry.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce-gentle">
                <Award className="text-2xl text-accent" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Professional Quality</h4>
              <p className="text-gray-600">High-resolution, commercial-ready designs suitable for all your business needs.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
