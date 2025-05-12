
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plane } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlightSearchFormProps {
  onSearch: (searchParams: any) => void;
  isLoading: boolean;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({ onSearch, isLoading }) => {
  const [journeyType, setJourneyType] = useState<'OneWay' | 'RoundTrip' | 'MultiCity'>('OneWay');
  const [departure, setDeparture] = useState('DAC');
  const [arrival, setArrival] = useState('CGP');
  const [departureDate, setDepartureDate] = useState<Date | undefined>(new Date('2025-06-06'));
  const [returnDate, setReturnDate] = useState<Date | undefined>(new Date('2025-06-13'));
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState('Economy');

  const handleSearch = () => {
    const searchParams = {
      journey_type: journeyType,
      segment: [
        {
          departure_airport_type: 'AIRPORT',
          departure_airport: departure,
          arrival_airport_type: 'AIRPORT',
          arrival_airport: arrival,
          departure_date: departureDate ? format(departureDate, 'yyyy-MM-dd') : ''
        }
      ],
      travelers_adult: adults,
      travelers_child: children,
      travelers_child_age: [],
      travelers_infants: infants,
      travelers_infants_age: [],
      preferred_carrier: [],
      non_stop_flight: 'any',
      baggage_option: 'any',
      booking_class: cabinClass,
      supplier_uid: 'all',
      partner_id: '',
      language: 'en',
      short_ref: '12121212121',
      team_profile: [
        {
          member_id: '1',
          pax_type: 'ADT'
        }
      ]
    };

    if (journeyType === 'RoundTrip' && returnDate) {
      searchParams.segment.push({
        departure_airport_type: 'AIRPORT',
        departure_airport: arrival,
        arrival_airport_type: 'AIRPORT',
        arrival_airport: departure,
        departure_date: format(returnDate, 'yyyy-MM-dd')
      });
    }

    onSearch(searchParams);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg max-w-6xl mx-auto">
      {/* Journey Type Selection */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <Button 
          variant={journeyType === 'OneWay' ? "default" : "outline"} 
          onClick={() => setJourneyType('OneWay')}
          className="flex items-center gap-2"
        >
          <Plane className="h-4 w-4" /> One Way
        </Button>
        <Button 
          variant={journeyType === 'RoundTrip' ? "default" : "outline"} 
          onClick={() => setJourneyType('RoundTrip')}
        >
          Round Trip
        </Button>
        <Button 
          variant={journeyType === 'MultiCity' ? "default" : "outline"} 
          onClick={() => setJourneyType('MultiCity')}
        >
          Multi City
        </Button>
      </div>

      {/* Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* From */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Leaving From</label>
          <Input 
            placeholder="Enter airport code" 
            value={departure} 
            onChange={(e) => setDeparture(e.target.value.toUpperCase())}
            className="h-12"
          />
        </div>

        {/* To */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Going To</label>
          <Input 
            placeholder="Enter airport code" 
            value={arrival} 
            onChange={(e) => setArrival(e.target.value.toUpperCase())}
            className="h-12"
          />
        </div>

        {/* Departure Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Departure Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "h-12 w-full justify-start text-left font-normal",
                  !departureDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departureDate ? format(departureDate, "MMM dd, yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Return Date - Only show if RoundTrip is selected */}
        {journeyType === 'RoundTrip' && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Return Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "h-12 w-full justify-start text-left font-normal",
                    !returnDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, "MMM dd, yyyy") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {/* Bottom Row - Class and Passengers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Cabin Class */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Cabin Class</label>
          <Select onValueChange={(value) => setCabinClass(value)} defaultValue={cabinClass}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select cabin class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Economy">Economy</SelectItem>
              <SelectItem value="Premium-Economy">Premium Economy</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="First-Class">First Class</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Passengers */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Adults</label>
          <Select onValueChange={(value) => setAdults(Number(value))} defaultValue={adults.toString()}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Adults" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} Adult{num > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Children</label>
          <Select onValueChange={(value) => setChildren(Number(value))} defaultValue={children.toString()}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Children" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} Child{num !== 1 ? 'ren' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleSearch} 
          size="lg" 
          disabled={isLoading} 
          className="px-16 py-6 bg-orange-400 hover:bg-orange-500 text-lg"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
    </div>
  );
};

export default FlightSearchForm;
