import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Server, Database, Shield, Cpu, Layers, Terminal, ChevronRight, Activity, Network, ArrowRight } from 'lucide-react';

interface NodeInfo {
  id: string;
  label: string;
  type: 'client' | 'gateway' | 'service' | 'storage' | 'ai';
  shortDesc: string;
  fullTech: string;
  details: string[];
  x: number;
  y: number;
}

export default function NetworkTopology() {
  const [activeTab, setActiveTab] = useState<'erp' | 'rag'>('erp');
  const [selectedNode, setSelectedNode] = useState<string | null>('db');

  // ERP Architecture Nodes
  const erpNodes: NodeInfo[] = [
    {
      id: 'client',
      label: 'Multi-Tenant SPA Web App',
      type: 'client',
      shortDesc: 'Vite React/jQuery frontend core',
      fullTech: 'Vite + React 18, TypeScript, custom modular JavaScript replacing legacy thick components',
      details: [
        'Interactions with highly optimized, clean, stateful tabular elements',
        'Smooth heavy-payload handling bypassing memory leaks of old-gen frames',
        'Built-in responsive grid layouts customized for diverse enterprise displays'
      ],
      x: 10, y: 50
    },
    {
      id: 'gateway',
      label: 'Auth Proxy & Load Balancer',
      type: 'gateway',
      shortDesc: 'Reverse proxy & token authority',
      fullTech: 'Nginx, IIS, Custom Auth Identity Providers',
      details: [
        'Multi-tenant domain routing structure directing requests by company namespace',
        'State-of-the-art token security and single sign-on logic across client systems',
        'Adaptive rate-limiting protecting mid-tenant services during Peak business hours'
      ],
      x: 35, y: 50
    },
    {
      id: 'app',
      label: '.NET Microservices (C# Core)',
      type: 'service',
      shortDesc: 'High-volume business transactional logic',
      fullTech: 'C# .NET, WebAPI, Business Intelligence Core services',
      details: [
        'Advanced manufacturing planning matrix algorithms and supply logistics solvers',
        'Clean domain design separating business transactions from generic read-heavy modules',
        'Modular, dependency-injected design matching global ERP architecture frameworks'
      ],
      x: 60, y: 25
    },
    {
      id: 'bi',
      label: 'Visual Business Intelligence Web Engine',
      type: 'service',
      shortDesc: 'Real-time corporate analytics processor',
      fullTech: 'JavaScript Charts integration, pre-calculating OLAP cubes',
      details: [
        'Pre-calculated data streams representing enterprise profitability indexes',
        'Extensible JSON schema grids transforming deep recursive accounting sheets in sub-seconds',
        'Custom interactive controls representing complex ledger states visually'
      ],
      x: 60, y: 75
    },
    {
      id: 'db',
      label: 'Enterprise SQL Server',
      type: 'storage',
      shortDesc: 'Secure, high-scale database cluster',
      fullTech: 'Microsoft SQL Server, Complex Stored Procedures, XML structures',
      details: [
        'Heavily tuned physical relational schemas handling millions of production rows per tenant',
        'Advanced vertical table partitioning preventing transactional blocking on shared catalogs',
        'Optimized Stored Procedures and CTE indexes returning critical financial metrics under 150ms'
      ],
      x: 90, y: 50
    }
  ];

  // RAG Architecture Nodes
  const ragNodes: NodeInfo[] = [
    {
      id: 'dify',
      label: 'Dify App Space Router',
      type: 'client',
      shortDesc: 'Orchestration gateway & flow routing',
      fullTech: 'Dify, OpenWebUI customize workflows',
      details: [
        'Multi-department workflows routing organizational intent to specific LLM models',
        'Visual cognitive graphs executing stateful LLM queries based on corporate permissions',
        'Interactions logs stored securely to meet strict metadata audit specs'
      ],
      x: 10, y: 50
    },
    {
      id: 'litellm',
      label: 'LiteLLM Enterprise Proxy',
      type: 'gateway',
      shortDesc: 'Model governance, caching, and rate management',
      fullTech: 'LiteLLM middleware, Redis caching, Azure key vault integration',
      details: [
        'Unified API facade serving consistent payloads across multiple internal models',
        'Redis-backed prompt caching reducing model operational costs up to 40%',
        'Load balancing between hot and shadow model instances to guarantee 99.9% uptime'
      ],
      x: 35, y: 50
    },
    {
      id: 'vllm',
      label: 'vLLM Local Compute Cluster',
      type: 'service',
      shortDesc: 'High-throughput local LLM hosting engine',
      fullTech: 'vLLM, DeepSeek / Llama model architectures, self-hosted environments',
      details: [
        'PagedAttention memory optimization maximizing GPU resource efficiency',
        'Secured local hardware networks serving sensitive queries within the corporate intranet',
        'Dynamic request batching handling concurrent corporate chats simultaneously'
      ],
      x: 60, y: 20
    },
    {
      id: 'azure',
      label: 'Azure OpenAI Private Endpoints',
      type: 'ai',
      shortDesc: 'Secured fallback cloud model pipeline',
      fullTech: 'Azure OpenAI, Virtual Network integration, private keys setup',
      details: [
        'Industry-grade security routing external fallback queries over isolated private tunnels',
        'Context-aware safety filters scrubbing potential PII data before leaving local networks',
        'High-density token throughput allocation for complex corporate summarization jobs'
      ],
      x: 60, y: 80
    },
    {
      id: 'milvus',
      label: 'Milvus High-Density Vector DB',
      type: 'storage',
      shortDesc: 'Indexed memory store representing corporate data systems',
      fullTech: 'Milvus Cluster, HNSW indexing indexes, embedding engines',
      details: [
        'Isolated vector collection architectures categorized by security access levels',
        'Hybrid semantic-keyword searches powered by dense/sparse dual embedding algorithms',
        'Sub-second query responses across massive knowledge libraries containing thousands of documents'
      ],
      x: 90, y: 50
    }
  ];

  const currentNodes = activeTab === 'erp' ? erpNodes : ragNodes;
  const currentNode = currentNodes.find(n => n.id === selectedNode) || currentNodes[0];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'client': return <Terminal className="w-5 h-5 text-indigo-400" />;
      case 'gateway': return <Shield className="w-5 h-5 text-sky-400" />;
      case 'service': return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'ai': return <Layers className="w-5 h-5 text-purple-400" />;
      case 'storage': return <Database className="w-5 h-5 text-cyan-400" />;
      default: return <Server className="w-5 h-5 text-slate-400" />;
    }
  };

  const getBorderColor = (type: string, isSelected: boolean) => {
    if (isSelected) {
      switch (type) {
        case 'client': return 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-500/20';
        case 'gateway': return 'border-sky-600 bg-sky-50/70 text-sky-950 ring-1 ring-sky-500/20';
        case 'service': return 'border-amber-600 bg-amber-50/70 text-amber-950 ring-1 ring-amber-500/20';
        case 'ai': return 'border-purple-600 bg-purple-50/70 text-purple-950 ring-1 ring-purple-500/20';
        case 'storage': return 'border-cyan-600 bg-cyan-50/70 text-cyan-950 ring-1 ring-cyan-500/20';
        default: return 'border-slate-400 bg-slate-50 text-slate-900';
      }
    }
    return 'border-slate-200 hover:border-slate-350 bg-white text-slate-700';
  };

  return (
    <div id="interactive-topology" className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4 gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600 animate-pulse" />
          <h3 className="font-display font-semibold text-slate-800">Interactive System Architecture</h3>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 w-full sm:w-auto">
          <button
            id="toggle-erp-tab"
            onClick={() => { setActiveTab('erp'); setSelectedNode('db'); }}
            className={`flex-1 sm:flex-none px-4 py-2 font-display text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'erp' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            SaaS ERP EverSuite
          </button>
          <button
            id="toggle-rag-tab"
            onClick={() => { setActiveTab('rag'); setSelectedNode('milvus'); }}
            className={`flex-1 sm:flex-none px-4 py-2 font-display text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'rag' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Enterprise RAG Framework
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        {/* SVG/Interactive Diagram Viewport */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-slate-50/40 border border-slate-200 rounded-xl p-4 min-h-[380px] relative overflow-hidden">
          {/* Faint Background Grid Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

          <div className="z-10 text-xs text-slate-500 font-mono flex items-center gap-1.5 self-start">
            <Network className="w-3.5 h-3.5 text-indigo-600" />
            <span>Click any node to inspect physical specifications</span>
          </div>

          {/* SVG Connector Lines */}
          <div className="absolute inset-0 w-full h-full pointer-events-none p-4">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Connected Lines of ERP */}
              {activeTab === 'erp' && (
                <>
                  <line x1="10%" y1="50%" x2="35%" y2="50%" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" />
                  <line x1="10%" y1="50%" x2="35%" y2="50%" stroke="#4f46e5" strokeWidth="2" strokeDasharray="6,24" className="stroke-dash-anim-left" />
                  
                  <line x1="35%" y1="50%" x2="60%" y2="25%" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="2" />
                  <line x1="35%" y1="50%" x2="60%" y2="25%" stroke="#d97706" strokeWidth="2" strokeDasharray="6,24" className="stroke-dash-anim-left" />

                  <line x1="35%" y1="50%" x2="60%" y2="75%" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="2" />
                  <line x1="35%" y1="50%" x2="60%" y2="75%" stroke="#d97706" strokeWidth="2" strokeDasharray="6,24" className="stroke-dash-anim-left" />

                  <line x1="60%" y1="25%" x2="90%" y2="50%" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="2" />
                  <line x1="60%" y1="25%" x2="90%" y2="50%" stroke="#0891b2" strokeWidth="2" strokeDasharray="6,24" className="stroke-dash-anim-left" />

                  <line x1="60%" y1="75%" x2="90%" y2="50%" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="2" />
                  <line x1="60%" y1="75%" x2="90%" y2="50%" stroke="#0891b2" strokeWidth="2" strokeDasharray="6,24" className="stroke-dash-anim-left" />
                </>
              )}

              {/* Connected Lines of RAG */}
              {activeTab === 'rag' && (
                <>
                  <line x1="10%" y1="50%" x2="35%" y2="50%" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" />
                  <line x1="10%" y1="50%" x2="35%" y2="50%" stroke="#4f46e5" strokeWidth="2" strokeDasharray="6,24" className="stroke-dash-anim-left" />
                  
                  <line x1="35%" y1="50%" x2="60%" y2="20%" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="2" />
                  <line x1="35%" y1="50%" x2="60%" y2="20%" stroke="#9333ea" strokeWidth="2" strokeDasharray="6,24" className="stroke-dash-anim-left" />

                  <line x1="35%" y1="50%" x2="60%" y2="80%" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="2" />
                  <line x1="35%" y1="50%" x2="60%" y2="80%" stroke="#9333ea" strokeWidth="2" strokeDasharray="6,24" className="stroke-dash-anim-left" />

                  <line x1="60%" y1="20%" x2="90%" y2="50%" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="2" />
                  <line x1="60%" y1="20%" x2="90%" y2="50%" stroke="#0891b2" strokeWidth="2" strokeDasharray="6,24" className="stroke-dash-anim-left" />

                  <line x1="60%" y1="80%" x2="90%" y2="50%" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="2" />
                  <line x1="60%" y1="80%" x2="90%" y2="50%" stroke="#0891b2" strokeWidth="2" strokeDasharray="6,24" className="stroke-dash-anim-left" />
                </>
              )}
            </svg>
          </div>

          {/* Node Overlay Blocks (Absolute Position Grid) */}
          <div className="relative h-[250px] w-full mt-6">
            {currentNodes.map((node) => (
              <button
                key={node.id}
                id={`node-${node.id}`}
                onClick={() => setSelectedNode(node.id)}
                className={`absolute p-3 rounded-xl border text-left transition-all max-w-[180px] sm:max-w-[200px] z-20 group hover:scale-[1.02] ${getBorderColor(
                  node.type,
                  selectedNode === node.id
                )}`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  {getNodeIcon(node.type)}
                  <span className={`text-[10px] uppercase font-mono tracking-wider font-semibold ${
                    selectedNode === node.id ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-650'
                  }`}>
                    {node.type}
                  </span>
                </div>
                <div className="text-xs font-semibold leading-tight text-slate-800 group-hover:text-indigo-900 line-clamp-1">
                  {node.label}
                </div>
                <div className="text-[10px] text-slate-400 leading-snug font-mono line-clamp-1 mt-0.5">
                  {node.shortDesc}
                </div>
              </button>
            ))}
          </div>

          <div className="z-10 mt-auto flex items-center justify-between text-[11px] text-slate-400 font-mono pt-4 border-t border-slate-200">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span className="text-slate-600">STATE: ACTIVE</span>
            </span>
            <span className="text-slate-400">ANONYMIZED LIVE FLOW</span>
          </div>
        </div>

        {/* Node Detail Readout Box */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-5 min-h-[380px]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                {getNodeIcon(currentNode.type)}
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider block uppercase">Component Specs</span>
                <h4 className="font-display font-semibold text-slate-800 leading-tight">{currentNode.label}</h4>
              </div>
            </div>

            <div className="border-t border-slate-200 my-4" />

            {/* Tech Stack Specs */}
            <div className="mb-4">
              <span className="text-[11px] text-slate-500 font-mono block mb-1">Technology Stack</span>
              <p className="text-xs bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg font-mono text-indigo-700 leading-relaxed text-[11px]">
                {currentNode.fullTech}
              </p>
            </div>

            {/* Architectural Highlights */}
            <div>
              <span className="text-[11px] text-slate-500 font-mono block mb-2">Technical Focus</span>
              <ul className="space-y-2">
                {currentNode.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-lg mt-6">
            <h5 className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
              <Shield className="w-3.5 h-3.5 text-slate-500" />
              <span>SLA & Security Configuration</span>
            </h5>
            <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
              In production setups, these layers are insulated in virtual private clouds (VPCs) with strict credential policies.
            </p>
          </div>
        </div>
      </div>

      {/* Embedded CSS for SVG Connection Dotted Lines Animations */}
      <style>{`
        .stroke-dash-anim-left {
          animation: dashLinear 12s linear infinite;
        }
        @keyframes dashLinear {
          to {
            stroke-dashoffset: -100px;
          }
        }
      `}</style>
    </div>
  );
}
