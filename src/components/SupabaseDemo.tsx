import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function SupabaseDemo() {
  const [authMessage, setAuthMessage] = useState("");
  const [dbMessage, setDbMessage] = useState("");
  const [storageMessage, setStorageMessage] = useState("");

  // Auth: Sign up demo
  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email: "demo-user@example.com",
      password: "demoPassword123",
    });
    setAuthMessage(error ? error.message : "Sign up successful! Check your email.");
  };

  // Database: Insert demo
  const handleDbInsert = async () => {
    const { error } = await supabase.from("demo_table").insert({ name: "Demo User", created_at: new Date() });
    setDbMessage(error ? error.message : "Row inserted into demo_table!");
  };

  // Storage: Upload demo
  const handleStorageUpload = async () => {
    const file = new File(["Hello Supabase Storage!"], "demo.txt", { type: "text/plain" });
    const { error } = await supabase.storage.from("demo-bucket").upload("demo.txt", file);
    setStorageMessage(error ? error.message : "File uploaded to demo-bucket!");
  };

  return (
    <div className="space-y-4 p-4 border rounded">
      <h2 className="font-bold text-lg">Supabase Integration Demo</h2>
      <div>
        <button className="btn" onClick={handleSignup}>Demo Sign Up</button>
        <p>{authMessage}</p>
      </div>
      <div>
        <button className="btn" onClick={handleDbInsert}>Demo DB Insert</button>
        <p>{dbMessage}</p>
      </div>
      <div>
        <button className="btn" onClick={handleStorageUpload}>Demo Storage Upload</button>
        <p>{storageMessage}</p>
      </div>
    </div>
  );
}