
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plane } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const SearchResults = ({ data }) => {
  if (!data) return null;

  // Check if we have valid flight data
  const flightsArray = data?.data?.data || [];
  const hasFlights = Array.isArray(flightsArray) && flightsArray.length > 0;
  // Get the carrier logo base URL from resources
  const carrierBaseUrl = data?.data?.resources?.base_url?.carrier || '';
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Flight Search Results</h2>
      
      {hasFlights ? (
        <div className="space-y-4">
          {flightsArray.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Plane className="h-5 w-5 text-blue-500" />
                    <div>
                      <span className="font-semibold">{item.journey_type}</span>
                      {item.flight_group && item.flight_group[0]?.routes && (
                        <p className="text-sm text-gray-600">
                          {item.flight_group[0].routes[0]?.origin || ''} to {item.flight_group[0].routes[0]?.destination || ''}
                        </p>
                      )}
                    </div>
                  </div>
                  {item.price && (
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">
                        BDT {item.price.total}
                      </p>
                      <p className="text-sm text-gray-500">Total Price</p>
                    </div>
                  )}
                </div>
                
                {/* Flight details */}
                {item.flight_group && item.flight_group.map((group, groupIndex) => (
                  group.routes && group.routes.map((route, routeIndex) => (
                    <div key={`${groupIndex}-${routeIndex}`} className="border-t pt-3 mt-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{route.departure_time ? new Date(route.departure_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'N/A'}</p>
                          <p className="text-sm text-gray-600">{route.origin || 'N/A'}</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <p className="text-xs text-gray-500">{route.flight_time || group.flight_time || 'N/A'}</p>
                          <div className="w-32 h-0.5 bg-gray-300 relative my-2">
                            <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2">
                              <Plane className="h-3 w-3 text-gray-500" />
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">{group.no_of_stops === 0 ? 'Direct' : `${group.no_of_stops} Stop(s)`}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{route.arrival_time ? new Date(route.arrival_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'N/A'}</p>
                          <p className="text-sm text-gray-600">{route.destination || 'N/A'}</p>
                        </div>
                      </div>
                      {route.marketing && (
                        <div className="flex items-center gap-2 mt-2">
                          {route.marketing.carrier_logo && (
                            <Avatar className="h-6 w-6">
                              <AvatarImage 
                                src={`${carrierBaseUrl}/${route.marketing.carrier_logo}`} 
                                alt={route.marketing.carrier_name || route.marketing.carrier || 'Airline'}
                              />
                              <AvatarFallback>{route.marketing.carrier?.substring(0, 2) || 'AL'}</AvatarFallback>
                            </Avatar>
                          )}
                          <p className="text-sm text-gray-600">
                            {route.marketing.carrier_name || route.marketing.carrier || 'N/A'} • {route.marketing.flight_number || 'N/A'}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg p-6 shadow text-center">
          <p>No flight results found. Please try different search parameters.</p>
        </div>
      )}
      
      {/* Raw API Response */}
      <div className="mt-8">
        <details className="bg-white p-4 rounded-lg shadow">
          <summary className="cursor-pointer font-medium mb-2 text-blue-600">View Raw API Response</summary>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-xs">
            {JSON.stringify(data, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default SearchResults;
