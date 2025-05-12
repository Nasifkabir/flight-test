
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Hotel, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FlightSearchForm from "@/components/FlightSearchForm";
import SearchResults from "@/components/SearchResults";
import customFetch from "@/lib/customFetch";

const Index = () => {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (searchParams: any) => {
    try {
      setIsLoading(true);
      console.log("Search params:", searchParams);
      
      const res = await customFetch("/flight/search", searchParams);
      
      if (res.error) {
        toast({
          title: "Error",
          description: res.message || "Failed to fetch flight data",
          variant: "destructive",
        });
        console.error("Error fetching data:", res.message);
      } else {
        toast({
          title: "Success",
          description: "Flight data fetched successfully",
        });
        console.log("Data fetched successfully:", res.data);
        setSearchResults(res);  // Store the complete response object
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-blue-50 p-4 md:p-8"
      style={{
        backgroundImage: "url('/lovable-uploads/814ac873-44d2-4d81-974a-051b2caaf2d6.png')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Flight Search</h1>
          
          <Tabs defaultValue="flights" className="w-full mb-6">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="flights" className="flex items-center gap-2">
                <Plane className="h-4 w-4" /> Flights
              </TabsTrigger>
              <TabsTrigger value="hotels" className="flex items-center gap-2">
                <Hotel className="h-4 w-4" /> Hotels
              </TabsTrigger>
              <TabsTrigger value="group" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Group Fare
              </TabsTrigger>
              <TabsTrigger value="insurance" className="flex items-center gap-2">
                <Shield className="h-4 w-4" /> Insurance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="flights">
              <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />
            </TabsContent>
            
            <TabsContent value="hotels">
              <div className="text-center p-12">
                <p className="text-gray-500">Hotel search will be implemented in a future update.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="group">
              <div className="text-center p-12">
                <p className="text-gray-500">Group fare search will be implemented in a future update.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="insurance">
              <div className="text-center p-12">
                <p className="text-gray-500">Insurance search will be implemented in a future update.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Results Section */}
        {searchResults && (
          <div className="max-w-6xl mx-auto mt-8">
            <SearchResults data={searchResults} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
