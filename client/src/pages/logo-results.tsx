import { useState } from "react";
import { Link, useParams } from "wouter";
import { Download, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { LogoRequest, GeneratedLogo } from "@shared/schema";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function LogoResults() {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedLogo, setSelectedLogo] = useState<GeneratedLogo | null>(null);

  const { data: logoRequest, isLoading } = useQuery<LogoRequest>({
    queryKey: ["/api/logo-requests", id],
    enabled: !!id,
  });

  const logos = logoRequest?.generatedLogos as GeneratedLogo[] || [];

  const selectLogo = (logo: GeneratedLogo) => {
    setSelectedLogo(logo);
  };

  const downloadSelected = () => {
    if (!selectedLogo) {
      toast({
        title: "No Logo Selected",
        description: "Please select a logo first!",
        variant: "destructive",
      });
      return;
    }
    
    // Create a link to download the image
    const link = document.createElement('a');
    link.href = selectedLogo.imageUrl;
    link.download = `${logoRequest?.businessName || 'logo'}-${selectedLogo.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: "Your selected logo is being downloaded.",
    });
  };

  const regenerateLogos = () => {
    toast({
      title: "Regenerating Logos",
      description: "This feature will be available soon!",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your logos...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!logoRequest) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Logo Request Not Found</h2>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Logo Options</h2>
          <p className="text-xl text-gray-600">Choose from 5 AI-generated logos tailored to your brand</p>
          <p className="text-gray-500 mt-2">Logo: {logoRequest.logoName} | Business: {logoRequest.businessName} | Industry: {logoRequest.industry}</p>
        </div>

        {/* Logo Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {logos.map((logo, index) => (
            <Card 
              key={logo.id}
              className={`hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                selectedLogo?.id === logo.id ? 'ring-4 ring-primary' : ''
              }`}
              onClick={() => selectLogo(logo)}
            >
              <CardContent className="p-0">
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-8">
                  <img 
                    src={logo.imageUrl} 
                    alt={logo.title}
                    className="w-full h-full object-cover rounded-lg" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{logo.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{logo.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Option {index + 1}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLogo(logo);
                        downloadSelected();
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="space-x-4">
            <Button onClick={downloadSelected} className="bg-green-600 hover:bg-green-700 text-white">
              <Download className="mr-2 h-4 w-4" />
              Download Selected
            </Button>
            <Button onClick={regenerateLogos} className="bg-secondary hover:bg-secondary/90 text-white">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Options
            </Button>
          </div>
          <Link href="/">
            <Button variant="ghost">
              Start Over
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
