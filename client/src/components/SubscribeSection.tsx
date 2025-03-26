import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface SubscribeFormData {
  email: string;
  name?: string;
}

const SubscribeSection: React.FC = () => {
  const [formData, setFormData] = useState<SubscribeFormData>({
    email: '',
    name: '',
  });
  const { toast } = useToast();
  
  const subscribeMutation = useMutation({
    mutationFn: (data: SubscribeFormData) => 
      apiRequest('POST', '/api/subscribers', data),
    onSuccess: () => {
      toast({
        title: "Subscription Successful!",
        description: "You've been added to our newsletter.",
        variant: "default",
      });
      // Reset form
      setFormData({ email: '', name: '' });
    },
    onError: (error) => {
      toast({
        title: "Subscription Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeMutation.mutate(formData);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  return (
    <section id="subscribe" className="py-16 relative overflow-hidden subscribe-section">
      <div className="absolute inset-0 bg-[#452b6a]/5 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center fade-in">
          <h2 className="font-space text-3xl md:text-4xl font-bold mb-4">Stay Updated With Cosmic Insights</h2>
          <p className="text-gray-300 text-lg mb-8">
            Join our newsletter and receive the latest tech trends, scientific breakthroughs, and in-depth analysis straight to your inbox.
          </p>
          
          <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex-grow rounded-full px-6 py-3 bg-[#1e1e2a] border border-[#2c2c42] focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] placeholder-gray-500 transition-all"
              />
              <button 
                type="submit" 
                className="neon-border rounded-full px-8 py-3 bg-gradient-to-r from-[#00f0ff]/20 to-[#ff00e6]/20 text-[#00f0ff] font-medium hover:from-[#00f0ff]/30 hover:to-[#ff00e6]/30 transition-all whitespace-nowrap"
                disabled={subscribeMutation.isPending}
              >
                {subscribeMutation.isPending ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </form>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="font-space text-4xl font-bold text-[#00f0ff] mb-2">10k+</div>
              <div className="text-gray-400">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="font-space text-4xl font-bold text-[#ff00e6] mb-2">350+</div>
              <div className="text-gray-400">Articles</div>
            </div>
            <div className="text-center">
              <div className="font-space text-4xl font-bold text-[#0aff9d] mb-2">8</div>
              <div className="text-gray-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="font-space text-4xl font-bold text-[#ffaa00] mb-2">24</div>
              <div className="text-gray-400">Authors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
