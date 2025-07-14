import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { logoRequestFormSchema, type LogoRequestForm } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LoadingScreen from "@/components/loading-screen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const colors = [
  { name: "blue", class: "bg-blue-500 hover:ring-blue-200" },
  { name: "green", class: "bg-green-500 hover:ring-green-200" },
  { name: "purple", class: "bg-purple-500 hover:ring-purple-200" },
  { name: "red", class: "bg-red-500 hover:ring-red-200" },
  { name: "orange", class: "bg-orange-500 hover:ring-orange-200" },
  { name: "yellow", class: "bg-yellow-500 hover:ring-yellow-200" },
  { name: "gray", class: "bg-gray-500 hover:ring-gray-200" },
  { name: "black", class: "bg-black hover:ring-gray-200" },
];

export default function LogoForm() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LogoRequestForm>({
    resolver: zodResolver(logoRequestFormSchema),
    defaultValues: {
      logoName: "",
      tagline: "",
      description: "",
      businessName: "",
      industry: "",
      style: "",
      color: "",
      audience: "",
      requirements: "",
    },
  });

  const createLogoMutation = useMutation({
    mutationFn: async (data: LogoRequestForm) => {
      const response = await apiRequest("POST", "/api/logo-requests", data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsLoading(false);
      setLocation(`/logo-results/${data.id}`);
      toast({
        title: "Logos Generated!",
        description: "Your AI-powered logos are ready for review.",
      });
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to generate logos. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LogoRequestForm) => {
    setIsLoading(true);
    createLogoMutation.mutate(data);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <LoadingScreen isVisible={isLoading} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Form Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Create Your Perfect Logo</h2>
          <p className="text-xl text-gray-600">Tell us about your brand and we'll generate 5 unique logo options</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Step 1 of 2</span>
            <span>Brand Information</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: "50%" }}></div>
          </div>
        </div>

        {/* Logo Creation Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-8">
              {/* Primary Logo Information */}
              <div className="space-y-6 border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900">Logo Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="logoName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-900">Logo Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Shakti Kavach" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-900">Tagline (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Strength Stillness Shield" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-900">Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your vision for the logo, what it should represent..."
                          className="resize-none h-20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Business Details */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-900">Business Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your business name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-900">Industry *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fitness">Fitness & Yoga</SelectItem>
                          <SelectItem value="wellness">Health & Wellness</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="creative">Creative Services</SelectItem>
                          <SelectItem value="real-estate">Real Estate</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-900">Logo Style *</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-3">
                          <div className="flex items-center space-x-2 border border-gray-300 rounded-xl p-3 hover:border-primary transition-colors">
                            <RadioGroupItem value="modern" id="modern" />
                            <Label htmlFor="modern">Modern</Label>
                          </div>
                          <div className="flex items-center space-x-2 border border-gray-300 rounded-xl p-3 hover:border-primary transition-colors">
                            <RadioGroupItem value="vintage" id="vintage" />
                            <Label htmlFor="vintage">Vintage</Label>
                          </div>
                          <div className="flex items-center space-x-2 border border-gray-300 rounded-xl p-3 hover:border-primary transition-colors">
                            <RadioGroupItem value="minimalist" id="minimalist" />
                            <Label htmlFor="minimalist">Minimalist</Label>
                          </div>
                          <div className="flex items-center space-x-2 border border-gray-300 rounded-xl p-3 hover:border-primary transition-colors">
                            <RadioGroupItem value="playful" id="playful" />
                            <Label htmlFor="playful">Playful</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-900">Primary Color Preference</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-4 gap-3">
                          {colors.map((color) => (
                            <div key={color.name} className="relative">
                              <RadioGroupItem value={color.name} id={color.name} className="sr-only" />
                              <Label htmlFor={color.name} className="cursor-pointer">
                                <div className={`w-12 h-12 ${color.class} rounded-xl ring-4 ring-transparent transition-all`}></div>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-900">Target Audience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select target audience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="young-adults">Young Adults (18-30)</SelectItem>
                          <SelectItem value="professionals">Professionals (30-50)</SelectItem>
                          <SelectItem value="seniors">Seniors (50+)</SelectItem>
                          <SelectItem value="families">Families</SelectItem>
                          <SelectItem value="businesses">Businesses</SelectItem>
                          <SelectItem value="general">General Public</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-900">Additional Requirements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any specific elements, text, or ideas you'd like to include..."
                          className="resize-none h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex justify-between">
              <Link href="/">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isLoading}>
                Generate Logos
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <Footer />
    </div>
  );
}
