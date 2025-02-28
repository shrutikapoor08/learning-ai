import { Button } from "@/components/ui/button";

export default function FutureDetails() {
  return (
    <div>
      <div className="bg-[#f5f5f5] p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-4">Schedule a Tour</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button variant="outline" className="justify-start">
            In Person
          </Button>
          <Button variant="outline" className="justify-start">
            Video Chat
          </Button>
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Select Date</label>
          <input type="date" className="w-full p-2 border rounded-md" />
        </div>
        <Button className="w-full bg-[#0249ff] hover:bg-[#0249ff]/90">
          Request a Tour
        </Button>
      </div>

      <div className="border rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-4">Contact Agent</h3>
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/placeholder.svg?height=50&width=50"
            alt="Agent"
            width={50}
            height={50}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-medium">Sarah Johnson</div>
            <div className="text-sm text-[#767676]">Premier Realty</div>
          </div>
        </div>
        <Button variant="outline" className="w-full mb-2">
          Call Agent
        </Button>
        <Button className="w-full bg-[#0249ff] hover:bg-[#0249ff]/90">
          Email Agent
        </Button>
      </div>

      <div className="rounded-lg overflow-hidden h-64 relative mb-6">
        <div className="absolute inset-0 bg-[#e3e3e3] flex items-center justify-center">
          <span className="text-[#767676]">Map View</span>
        </div>
      </div>
    </div>
  );
}
