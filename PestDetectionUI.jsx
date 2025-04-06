import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";

// Fake dataset simulating AI knowledge base
const pestDatabase = {
  "*101#": {
    name: "Fall Armyworm",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Spodoptera_frugiperda_-_larva.jpg/320px-Spodoptera_frugiperda_-_larva.jpg",
    remedy: "Use pesticide XYZ at 2ml/liter. Spray early morning.",
  },
  "*202#": {
    name: "Whitefly",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Whiteflies.jpg/320px-Whiteflies.jpg",
    remedy: "Use neem oil spray or Imidacloprid. Avoid overwatering.",
  },
  "*303#": {
    name: "Powdery Mildew",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Powdery_Mildew_Grape.jpg/320px-Powdery_Mildew_Grape.jpg",
    remedy: "Apply sulfur-based fungicide. Improve airflow in crops.",
  },
};

export default function PestDetectionApp() {
  const [screen, setScreen] = useState("home");
  const [ussdCode, setUssdCode] = useState("");
  const [detectedPest, setDetectedPest] = useState(null);

  const handleDetection = () => {
    const data = pestDatabase[ussdCode.trim()];
    setDetectedPest(data || null);
    setScreen("result");
  };

  const renderHome = () => (
    <Card className="p-6 w-full max-w-sm">
      <CardContent className="space-y-4">
        <Button className="w-full" onClick={() => setScreen("alert")}>🚨 View Alerts</Button>
        <Button className="w-full" onClick={() => setScreen("sendReport")}>📡 Send Report</Button>
      </CardContent>
    </Card>
  );

  const renderAlert = () => (
    <Card className="p-6 w-full max-w-sm text-center">
      <CardContent className="space-y-4">
        <AlertTriangle className="mx-auto text-yellow-500" size={48} />
        <h2 className="text-xl font-semibold">Pest alert in your region</h2>
        <p>Monitor for Fall Armyworm infestation this week.</p>
        <Button onClick={() => setScreen("home")}>OK</Button>
      </CardContent>
    </Card>
  );

  const renderSendReport = () => (
    <Card className="p-6 w-full max-w-sm">
      <CardContent className="space-y-4">
        <h2 className="text-lg font-semibold">Enter USSD code (simulating issue):</h2>
        <Input
          placeholder="e.g., *101#"
          value={ussdCode}
          onChange={(e) => setUssdCode(e.target.value)}
        />
        <Button className="w-full" onClick={handleDetection}>Submit</Button>
      </CardContent>
    </Card>
  );

  const renderResult = () => (
    <Card className="p-6 w-full max-w-sm text-center">
      <CardContent className="space-y-4">
        {detectedPest ? (
          <>
            <img
              src={detectedPest.image}
              alt={detectedPest.name}
              className="rounded-xl w-full h-40 object-cover"
            />
            <h2 className="text-xl font-semibold">{detectedPest.name}</h2>
            <p>{detectedPest.remedy}</p>
          </>
        ) : (
          <p>No known pest found for the code entered. Please check again.</p>
        )}
        <Button onClick={() => setScreen("home")}>OK</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {screen === "home" && renderHome()}
      {screen === "alert" && renderAlert()}
      {screen === "sendReport" && renderSendReport()}
      {screen === "result" && renderResult()}
    </div>
  );
}
