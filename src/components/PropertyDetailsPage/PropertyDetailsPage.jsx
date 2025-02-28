import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Carousel = ({ imgSrc }) => {
  return (
    <div className="flex justify-between items-center mt-4 h-full">
      <Button variant="outline" className="w-full">
        Previous
      </Button>
      <div className="flex gap-2">
        <img
          src={imgSrc}
          alt="Property"
          height={700}
          width={800}
          className="object-cover rounded-lg"
        />
      </div>
      <Button variant="outline" className="w-full">
        Next
      </Button>
    </div>
  );
};

export default function PropertyDetailPage({ propertyDetails }) {
  const {
    price,
    bedrooms,
    bathrooms,
    streetAddress,
    city,
    imgSrc,
    homeType,
    zpid,
    nice_to_haves,
  } = propertyDetails;
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <a href="/" className="flex items-center text-[#0249ff]">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Search
          </a>
        </div>

        <div className="mb-6">
          <Carousel imgSrc={imgSrc} />
        </div>

        <div className="">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold">${price}</h1>
                <p>
                  {streetAddress}, {city}
                </p>
                <div className="flex items-center text-sm text-[#767676]">
                  <div className="relative">
                    <button className="absolute top-4 right-4 bg-white p-2 rounded-full">
                      <Heart className="w-5 h-5 text-[#767676]" />
                    </button>
                    <button className="absolute top-4 right-16 bg-white p-2 rounded-full">
                      <Share2 className="w-5 h-5 text-[#767676]" />
                    </button>
                  </div>
                </div>
              </div>
              <h2 className="text-xl text-[#3e4958] mb-4">{homeType}</h2>
              <div className="flex flex-wrap gap-6 mb-6 text-sm">
                <div className="flex items-center">
                  <Bed className="w-5 h-5 mr-2 text-[#767676]" />
                  <span>{bedrooms} Beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-5 h-5 mr-2 text-[#767676]" />
                  <span>{bathrooms} Baths</span>
                </div>
                <div className="flex items-center">
                  <Square className="w-5 h-5 mr-2 text-[#767676]" />
                  <span>1,800 sqft</span>
                </div>
              </div>

              <iv className="border-t border-b py-4 my-4">
                <h3 className="font-semibold mb-2">About this home</h3>
                <p className="text-[#4b545a] text-sm leading-relaxed">
                  This beautiful single-family home features an open floor plan
                  with plenty of natural light. The kitchen has been recently
                  updated with stainless steel appliances and granite
                  countertops. The spacious backyard is perfect for entertaining
                  and includes a covered patio. Located in a quiet neighborhood
                  with excellent schools nearby and easy access to shopping and
                  dining.
                </p>
              </iv>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
                <div className="border rounded-md p-3">
                  <div className="text-xs text-[#767676]">Year Built</div>
                  <div className="font-medium">2015</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-xs text-[#767676]">Lot Size</div>
                  <div className="font-medium">0.25 acres</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-xs text-[#767676]">Heating</div>
                  <div className="font-medium">Central</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-xs text-[#767676]">Cooling</div>
                  <div className="font-medium">Central A/C</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-xs text-[#767676]">Parking</div>
                  <div className="font-medium">2-Car Garage</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-xs text-[#767676]">Property Type</div>
                  <div className="font-medium">Single Family</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex  lg:justify-between items-stretch gap-4">
            <Button className="text-xl lg:w-full py-4 bg-[#4128EA] hover:bg-[#4128EA]/90 text-white">
              Love It
            </Button>
            <Button className="text-xl lg:w-full py-4 bg-slate-800 text-white">
              Not For Me
            </Button>
          </div>

          {/* Right Column - Contact and Map */}
          {/* <div>
            <div>
              <h3 className="font-semibold mb-4">Recommendations for you</h3>
              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="border rounded-lg p-3 flex gap-3">
                    <img
                      src="/placeholder.svg?height=80&width=120"
                      alt="Property"
                      width={120}
                      height={80}
                      className="w-24 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="font-bold">$189,500</div>
                      <div className="text-xs text-[#767676] mb-1">
                        Marietta, GA
                      </div>
                      <div className="flex justify-between text-xs text-[#767676]">
                        <span>3 bd</span>
                        <span>2 ba</span>
                        <span>1,650 sqft</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}
