import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, CreditCard, Globe, Moon, ChevronRight } from "lucide-react";

const settingsSections = [
  { id: "profile", icon: User, label: "Profile", desc: "Manage your personal information" },
  { id: "notifications", icon: Bell, label: "Notifications", desc: "Email, SMS and push notification preferences" },
  { id: "security", icon: Shield, label: "Security", desc: "Password, 2FA and login history" },
  { id: "payments", icon: CreditCard, label: "Payment Methods", desc: "Manage your deposit and withdrawal methods" },
  { id: "language", icon: Globe, label: "Language & Region", desc: "Language, timezone and regional settings" },
  { id: "appearance", icon: Moon, label: "Appearance", desc: "Theme and display preferences" },
];

export default function SettingsPage() {
  const [active, setActive] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true, marketing: false });
  const [language, setLanguage] = useState("en");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: "#EDE8E0" }}>
      <div className="container-axi">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-6" style={{ color: "#1A1A1A" }}>Settings</motion.h1>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB" }}>
              {settingsSections.map(s => (
                <button key={s.id} onClick={() => setActive(s.id)} className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b last:border-0" style={{ backgroundColor: active === s.id ? "rgba(211,28,43,0.05)" : "#fff", borderColor: "#F5F2ED" }}>
                  <s.icon size={18} style={{ color: active === s.id ? "#D31C2B" : "#9B9590" }} />
                  <span className="text-sm font-medium" style={{ color: active === s.id ? "#D31C2B" : "#1A1A1A" }}>{s.label}</span>
                  <ChevronRight size={14} className="ml-auto" style={{ color: "#9B9590" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border p-6" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB" }}>
              {saved && <div className="mb-4 p-3 rounded-lg text-sm font-semibold" style={{ backgroundColor: "rgba(34,169,88,0.1)", color: "#22A958" }}>Settings saved successfully!</div>}

              {active === "profile" && (
                <div>
                  <h2 className="text-lg font-bold mb-4" style={{ color: "#1A1A1A" }}>Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: "#6B6560" }}>First Name</label><input type="text" defaultValue="John" className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D31C2B]/30" style={{ borderColor: "#D9D3CB" }} /></div>
                    <div><label className="block text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: "#6B6560" }}>Last Name</label><input type="text" defaultValue="Smith" className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D31C2B]/30" style={{ borderColor: "#D9D3CB" }} /></div>
                    <div><label className="block text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: "#6B6560" }}>Email</label><input type="email" defaultValue="john.smith@example.com" className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D31C2B]/30" style={{ borderColor: "#D9D3CB" }} /></div>
                    <div><label className="block text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: "#6B6560" }}>Phone</label><input type="tel" defaultValue="+1 234 567 890" className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D31C2B]/30" style={{ borderColor: "#D9D3CB" }} /></div>
                  </div>
                </div>
              )}

              {active === "notifications" && (
                <div>
                  <h2 className="text-lg font-bold mb-4" style={{ color: "#1A1A1A" }}>Notification Preferences</h2>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#F5F2ED" }}>
                        <div><p className="text-sm font-semibold capitalize" style={{ color: "#1A1A1A" }}>{key} Notifications</p><p className="text-xs" style={{ color: "#6B6560" }}>Receive {key} notifications about your account</p></div>
                        <button onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))} className="w-12 h-6 rounded-full transition-colors relative" style={{ backgroundColor: value ? "#D31C2B" : "#D9D3CB" }}><div className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all" style={{ left: value ? "26px" : "2px" }} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {active === "security" && (
                <div>
                  <h2 className="text-lg font-bold mb-4" style={{ color: "#1A1A1A" }}>Security Settings</h2>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border" style={{ borderColor: "#D9D3CB", backgroundColor: "#F5F2ED" }}>
                      <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>Change Password</p>
                      <p className="text-xs mt-1" style={{ color: "#6B6560" }}>Last changed 30 days ago</p>
                      <button className="mt-3 px-4 py-2 rounded border text-xs font-semibold uppercase tracking-wider" style={{ borderColor: "#D31C2B", color: "#D31C2B" }}>Change</button>
                    </div>
                    <div className="p-4 rounded-lg border" style={{ borderColor: "#D9D3CB", backgroundColor: "#F5F2ED" }}>
                      <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>Two-Factor Authentication</p>
                      <p className="text-xs mt-1" style={{ color: "#6B6560" }}>Add an extra layer of security</p>
                      <button className="mt-3 btn-yellow text-[10px] py-2 px-4">Enable 2FA</button>
                    </div>
                    <div className="p-4 rounded-lg border" style={{ borderColor: "#D9D3CB", backgroundColor: "#F5F2ED" }}>
                      <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>Login History</p>
                      <p className="text-xs mt-1" style={{ color: "#6B6560" }}>View recent login activity</p>
                      <button className="mt-3 px-4 py-2 rounded border text-xs font-semibold uppercase tracking-wider" style={{ borderColor: "#D9D3CB", color: "#6B6560" }}>View</button>
                    </div>
                  </div>
                </div>
              )}

              {active === "payments" && (
                <div>
                  <h2 className="text-lg font-bold mb-4" style={{ color: "#1A1A1A" }}>Payment Methods</h2>
                  <div className="space-y-3">
                    {["Visa ending in 4242", "Bank Transfer (ACH)", "Skrill"].map((method, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: "#D9D3CB" }}>
                        <div className="flex items-center gap-3">
                          <CreditCard size={20} style={{ color: "#D31C2B" }} />
                          <span className="text-sm font-semibold">{method}</span>
                        </div>
                        <button className="text-xs px-3 py-1.5 rounded border" style={{ borderColor: "#D9D3CB", color: "#6B6560" }}>Manage</button>
                      </div>
                    ))}
                    <button className="w-full py-3 rounded-lg border-2 border-dashed text-sm font-semibold" style={{ borderColor: "#D9D3CB", color: "#D31C2B" }}>+ Add Payment Method</button>
                  </div>
                </div>
              )}

              {active === "language" && (
                <div>
                  <h2 className="text-lg font-bold mb-4" style={{ color: "#1A1A1A" }}>Language & Region</h2>
                  <div className="space-y-4">
                    <div><label className="block text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: "#6B6560" }}>Language</label>
                      <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none" style={{ borderColor: "#D9D3CB" }}>
                        <option value="en">English</option><option value="es">Spanish</option><option value="fr">French</option><option value="de">German</option>
                      </select>
                    </div>
                    <div><label className="block text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: "#6B6560" }}>Timezone</label>
                      <select className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none" style={{ borderColor: "#D9D3CB" }}>
                        <option>UTC (GMT+0)</option><option>EST (GMT-5)</option><option>CET (GMT+1)</option><option>JST (GMT+9)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {active === "appearance" && (
                <div>
                  <h2 className="text-lg font-bold mb-4" style={{ color: "#1A1A1A" }}>Appearance</h2>
                  <div className="flex items-center justify-between py-3">
                    <div><p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>Dark Mode</p><p className="text-xs" style={{ color: "#6B6560" }}>Switch between light and dark theme</p></div>
                    <button onClick={() => setDarkMode(!darkMode)} className="w-12 h-6 rounded-full transition-colors relative" style={{ backgroundColor: darkMode ? "#D31C2B" : "#D9D3CB" }}><div className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all" style={{ left: darkMode ? "26px" : "2px" }} /></button>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t" style={{ borderColor: "#F5F2ED" }}>
                <button onClick={handleSave} className="btn-yellow">Save Changes</button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
