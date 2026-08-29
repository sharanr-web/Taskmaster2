import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TEMPLATE_DESIGNS } from '../data/initialData';
import { TemplateTheme } from '../types';
import { 
  Palette, 
  Check, 
  Sparkles, 
  Film, 
  Layers, 
  Zap, 
  Sun, 
  Tv, 
  X, 
  Eye, 
  ChevronRight,
  Sliders,
  Monitor
} from 'lucide-react';

export const TemplateShowcaseModal: React.FC = () => {
  const { currentTheme, setCurrentTheme, isTemplateModalOpen, setIsTemplateModalOpen } = useApp();
  const [hoveredTheme, setHoveredTheme] = useState<TemplateTheme | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<TemplateTheme>(currentTheme);

  if (!isTemplateModalOpen) return null;

  const currentConfig = TEMPLATE_DESIGNS.find(t => t.id === selectedPreview) || TEMPLATE_DESIGNS[0];

  const getThemeIcon = (id: TemplateTheme) => {
    switch (id) {
      case 'cinematic-dark':
        return <Film className="w-5 h-5 text-amber-400" />;
      case 'lightbox-clean':
        return <Layers className="w-5 h-5 text-sky-400" />;
      case 'neo-brutalist':
        return <Zap className="w-5 h-5 text-lime-400" />;
      case 'sunset-clay':
        return <Sun className="w-5 h-5 text-orange-400" />;
      case 'monochrome-editorial':
        return <Tv className="w-5 h-5 text-rose-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  const handleApply = (themeId: TemplateTheme) => {
    setCurrentTheme(themeId);
    setSelectedPreview(themeId);
  };

  return (
    <div 
      id="template-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={() => setIsTemplateModalOpen(false)}
    >
      <div 
        id="template-modal-container"
        className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-bold text-neutral-100">Website Design Templates</h2>
                <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                  5 Styles Ready
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Select your preferred visual identity for Taskmation. Click any template to switch live.
              </p>
            </div>
          </div>
          <button
            id="close-template-modal-btn"
            onClick={() => setIsTemplateModalOpen(false)}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Active Template Notice */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Currently Active</div>
                <div className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
                  {TEMPLATE_DESIGNS.find(t => t.id === currentTheme)?.name}
                  <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                    {TEMPLATE_DESIGNS.find(t => t.id === currentTheme)?.palette.name}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-xs text-neutral-400">
              Instant hot-swap • Persists automatically in storage
            </div>
          </div>

          {/* Grid of 5 Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATE_DESIGNS.map((template) => {
              const isActive = currentTheme === template.id;
              const isSelected = selectedPreview === template.id;

              return (
                <div
                  key={template.id}
                  id={`template-card-${template.id}`}
                  onClick={() => {
                    setSelectedPreview(template.id);
                    handleApply(template.id);
                  }}
                  onMouseEnter={() => setHoveredTheme(template.id)}
                  onMouseLeave={() => setHoveredTheme(null)}
                  className={`relative flex flex-col text-left rounded-xl p-5 cursor-pointer transition-all duration-200 border text-neutral-200 ${
                    isActive
                      ? 'bg-neutral-800/80 border-amber-500/70 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
                      : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/40'
                  }`}
                >
                  {/* Top Badges */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                        {getThemeIcon(template.id)}
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                          {template.category}
                        </span>
                        <h3 className="font-bold text-base text-neutral-100">{template.name}</h3>
                      </div>
                    </div>

                    {isActive && (
                      <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-amber-500 text-neutral-950 rounded-full shadow-sm font-sans">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Active
                      </span>
                    )}
                    {template.isPopular && !isActive && (
                      <span className="px-2 py-0.5 text-[11px] font-medium bg-neutral-800 text-neutral-300 rounded border border-neutral-700">
                        Recommended
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-400 mb-4 line-clamp-2">
                    {template.tagline}
                  </p>

                  {/* Visual Preview Box */}
                  <div 
                    className={`w-full h-24 rounded-lg border border-neutral-700/60 p-3 mb-4 flex flex-col justify-between overflow-hidden relative bg-gradient-to-br ${template.previewGradient}`}
                  >
                    {/* Simulated UI Mockup Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <div 
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-medium"
                        style={{ backgroundColor: template.palette.accentBg, color: template.palette.accent }}
                      >
                        24 FPS • ACTIVE
                      </div>
                    </div>

                    {/* Simulated Miniature Cards */}
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-8 flex-1 rounded border flex items-center justify-center text-[10px] font-bold"
                        style={{ 
                          backgroundColor: template.palette.card, 
                          borderColor: template.palette.border,
                          color: template.palette.text 
                        }}
                      >
                        TASKMATION
                      </div>
                      <div 
                        className="h-8 w-12 rounded flex items-center justify-center text-[10px] font-semibold shadow"
                        style={{ 
                          backgroundColor: template.palette.accent, 
                          color: template.id === 'lightbox-clean' ? '#0f172a' : '#000' 
                        }}
                      >
                        SUBMIT
                      </div>
                    </div>
                  </div>

                  {/* Palette Swatches */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-[11px] text-neutral-400 mr-1">Palette:</span>
                    <div 
                      className="w-4 h-4 rounded-full border border-neutral-700 shadow-sm"
                      style={{ backgroundColor: template.palette.bg }}
                      title={`Background: ${template.palette.bg}`}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-neutral-700 shadow-sm"
                      style={{ backgroundColor: template.palette.card }}
                      title={`Card: ${template.palette.card}`}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-neutral-700 shadow-sm"
                      style={{ backgroundColor: template.palette.accent }}
                      title={`Accent: ${template.palette.accent}`}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-neutral-700 shadow-sm"
                      style={{ backgroundColor: template.palette.border }}
                      title={`Border: ${template.palette.border}`}
                    />
                    <span className="text-[11px] text-neutral-300 font-mono ml-auto">
                      {template.palette.name}
                    </span>
                  </div>

                  {/* Features Mini-list */}
                  <ul className="text-[11px] text-neutral-400 space-y-1 mb-4">
                    {template.features.slice(0, 2).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-neutral-500" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Apply Button */}
                  <button
                    id={`apply-template-${template.id}-btn`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(template.id);
                    }}
                    className={`w-full mt-auto py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 border border-neutral-700'
                    }`}
                  >
                    {isActive ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Selected & Applied
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" /> Select This Design
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Detailed Inspector of Selected Template */}
          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-neutral-200">
                  Detailed Specifications: {currentConfig.name}
                </h4>
              </div>
              <span className="text-xs text-neutral-400">
                Recommended for: <strong className="text-neutral-200">{currentConfig.recommendedFor}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <div className="text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
                  Design Characteristics
                </div>
                <div className="space-y-1.5">
                  {currentConfig.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
                  Visual Architecture & Color Mapping
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                    <span className="text-neutral-500 block text-[10px]">Base Background</span>
                    <span className="font-mono text-neutral-200">{currentConfig.palette.bg}</span>
                  </div>
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                    <span className="text-neutral-500 block text-[10px]">Container Surface</span>
                    <span className="font-mono text-neutral-200">{currentConfig.palette.card}</span>
                  </div>
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                    <span className="text-neutral-500 block text-[10px]">Brand Accent</span>
                    <span className="font-mono text-amber-400">{currentConfig.palette.accent}</span>
                  </div>
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                    <span className="text-neutral-500 block text-[10px]">Structural Dividers</span>
                    <span className="font-mono text-neutral-200">{currentConfig.palette.border}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 flex items-center justify-between bg-neutral-950/80 sticky bottom-0">
          <div className="text-xs text-neutral-400">
            You can change your template anytime from the top navigation bar.
          </div>
          <button
            id="done-template-btn"
            onClick={() => setIsTemplateModalOpen(false)}
            className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
