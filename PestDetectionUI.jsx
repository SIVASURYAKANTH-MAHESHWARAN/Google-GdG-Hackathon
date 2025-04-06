import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";

export default function PestDetectionApp() {
  const [screen, setScreen] = useState("home");
  const [ussdCode, setUssdCode] = useState("");

  const renderHome = () => (
    <Card className="p-6 w-full max-w-sm">
      <CardContent className="space-y-4">
        <Button className="w-full" onClick={() => setScreen("alert")}>🚨 View Alerts</Button>
        <Button className="w-full" onClick={() => setScreen("sendReport")}>📷 Send Report</Button>
      </CardContent>
    </Card>
  );

  const renderAlert = () => (
    <Card className="p-6 w-full max-w-sm text-center">
      <CardContent className="space-y-4">
        <AlertTriangle className="mx-auto text-yellow-500" size={48} />
        <h2 className="text-xl font-semibold">Pest detected: Fall Armyworm</h2>
        <p>Take action to protect your crops</p>
        <Button onClick={() => setScreen("home")}>OK</Button>
      </CardContent>
    </Card>
  );

  const renderSendReport = () => (
    <Card className="p-6 w-full max-w-sm">
      <CardContent className="space-y-4">
        <h2 className="text-lg font-semibold">Enter the USSD code to report a problem:</h2>
        <Input
          placeholder="*123#"
          value={ussdCode}
          onChange={(e) => setUssdCode(e.target.value)}
        />
        <Button className="w-full" onClick={() => setScreen("result")}>Submit</Button>
      </CardContent>
    </Card>
  );

  const renderResult = () => (
    <Card className="p-6 w-full max-w-sm text-center">
      <CardContent className="space-y-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Spodoptera_frugiperda_-_larva.jpg/320px-Spodoptera_frugiperda_-_larva.jpg"
          alt="Fall Armyworm"
          className="rounded-xl w-full h-40 object-cover"
        />
        <h2 className="text-xl font-semibold">Fall Armyworm</h2>
        <p>Suggested pesticide: XYZ at 2ml per liter</p>
        <Button onClick={() => setScreen("home")}>OK</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {screen === "home" && renderHome()}
      {screen === "alert" && renderAlert()}
      {screen === "sendReport" && renderSendReport()}
      {screen === "result" && renderResult()}
    </div>
  );
}
