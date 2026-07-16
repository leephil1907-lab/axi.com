import { useState } from "react";
import { trpc } from "@/providers/trpc";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import TopBar from "@/sections/TopBar";
import { PAYMENT_METHODS } from "@/lib/constants";
import { 
  ChevronRight, Wallet, CreditCard, Banknote, 
  Bitcoin, Smartphone, Globe,
  AlertTriangle, Eye, EyeOff
} from "lucide-react";

export default function FundsPage() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'transfer' | 'history'>('deposit');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [showBalance, setShowBalance] = useState(true);

  const { data: account } = trpc.trading.account.useQuery();

  // Real account data (falls back to a placeholder while loading)
  const accounts = account
    ? [{ id: String(account.id), name: `${account.accountType} ${account.accountNumber}`, type: account.accountType.toUpperCase(), balance: Number(account.balance), currency: account.currency, server: `Axi-${account.currency}-Live`, leverage: `1:${account.leverage}` }]
    : [];

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <TopBar />
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Funds</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {[
            { key: 'deposit', label: 'Deposit' },
            { key: 'withdraw', label: 'Withdraw' },
            { key: 'transfer', label: 'Transfers' },
            { key: 'history', label: 'Funding History' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key ? 'border-[#D51820] text-[#D51820]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Progress Stepper */}
        <div className="flex items-center mb-8">
          <div className="flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-l-lg text-sm font-medium">
            <span>Select Account</span>
          </div>
          <div className="w-8 h-8 bg-gray-200 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2 bg-gray-200 text-gray-500 px-4 py-2 text-sm">
            <span>Select Method</span>
          </div>
          <div className="w-8 h-8 bg-gray-200 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2 bg-gray-200 text-gray-500 px-4 py-2 rounded-r-lg text-sm">
            <span>Confirm</span>
          </div>
        </div>

        {/* Account Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Which account would you like to fund?</h2>
          <div className="space-y-3">
            {accounts.map((acc) => (
              <div 
                key={acc.id}
                onClick={() => setSelectedAccount(acc.id)}
                className={`bg-white rounded-xl border-2 p-4 cursor-pointer transition-all ${selectedAccount === acc.id ? 'border-[#D51820] shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAccount === acc.id ? 'border-[#D51820]' : 'border-gray-300'}`}>
                      {selectedAccount === acc.id && <div className="w-3 h-3 rounded-full bg-[#D51820]" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-gradient-to-r from-red-500 to-orange-400 text-white text-xs px-2 py-0.5 rounded font-semibold">{acc.type}</span>
                        <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded font-semibold">AXI SELECT</span>
                        <span className="text-sm font-semibold text-gray-900">Standard</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{acc.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1.5 text-sm text-gray-500">
                      Balance ({acc.currency})
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setShowBalance((v) => !v); }}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label={showBalance ? "Hide balance" : "Show balance"}
                      >
                        {showBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {showBalance ? `${acc.currency} ${acc.balance.toFixed(2)}` : '****'}
                    </div>
                  </div>
                </div>

                {selectedAccount === acc.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      Fund
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      Trade
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <span className="text-lg">⋮</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Deposit Tab Content */}
        {activeTab === 'deposit' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">What payment method would you like to use?</h2>
            <p className="text-sm text-gray-500 mb-4">Add new funding methods</p>

            <div className="grid grid-cols-2 gap-3">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`bg-white rounded-xl border-2 p-4 text-left transition-all hover:shadow-md ${selectedMethod === method.id ? 'border-[#D51820]' : 'border-gray-200'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {method.id === 'card' && <CreditCard className="w-5 h-5 text-blue-600" />}
                        {method.id === 'bank' && <Banknote className="w-5 h-5 text-green-600" />}
                        {method.id === 'crypto' && <Bitcoin className="w-5 h-5 text-orange-500" />}
                        {method.id === 'googlepay' && <Smartphone className="w-5 h-5 text-gray-700" />}
                        {method.id === 'binance' && <Globe className="w-5 h-5 text-yellow-500" />}
                        {method.id === 'skrill' && <Wallet className="w-5 h-5 text-purple-600" />}
                        {method.id === 'neteller' && <Wallet className="w-5 h-5 text-green-500" />}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{method.name}</div>
                        <div className="text-xs text-gray-500">Instantly, 0% Fee</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>

            {/* Amount Input */}
            {selectedMethod && (
              <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Enter Amount</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-semibold text-gray-900">EUR</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-lg font-mono focus:outline-none focus:border-[#D51820]"
                  />
                </div>
                <div className="flex gap-2 mb-4">
                  {['100', '500', '1000', '5000'].map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      €{val}
                    </button>
                  ))}
                </div>
                <button className="w-full bg-[#D51820] text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Deposit €{amount || '0.00'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Withdraw Tab */}
        {activeTab === 'withdraw' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Withdraw Funds</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Select Account</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm">
                  <option>Standard 60332183 - USD 0.00</option>
                  <option>Standard 60332182 - USD 0.00</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Withdrawal Method</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm">
                  <option>Bank Transfer</option>
                  <option>Credit/Debit Card</option>
                  <option>Skrill</option>
                  <option>Neteller</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Amount (EUR)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm"
                />
              </div>
              <button className="w-full bg-[#D51820] text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Request Withdrawal
              </button>
            </div>
          </div>
        )}

        {/* Transfer Tab */}
        {activeTab === 'transfer' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Transfer Between Accounts</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">From Account</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm">
                  <option>Standard 60332183 - USD 0.00</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">To Account</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm">
                  <option>Standard 60332182 - USD 0.00</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Amount (EUR)</label>
                <input type="number" placeholder="0.00" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm" />
              </div>
              <button className="w-full bg-[#D51820] text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Transfer Funds
              </button>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-left px-4 py-3">Method</th>
                  <th className="text-right px-4 py-3">Amount</th>
                  <th className="text-center px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 text-gray-500">No transactions yet</td>
                  <td className="px-4 py-3" colSpan={4}></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Important Info */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-1">Important Information</p>
            <p>At Axi, all transactions are processed instantly on our end. These transactions are then forwarded to our card processors and your bank. The entire process can take anywhere from 1 to 7 business days for the funds to be reflected in the respective account, depending on your bank and country.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
