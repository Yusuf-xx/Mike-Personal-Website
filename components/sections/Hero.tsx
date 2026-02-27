'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SignalStrip from '@/components/ui/SignalStrip';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="pointer-events-none absolute inset-0 bg-network-lines opacity-[0.12]" />
      <div className="pointer-events-none absolute inset-x-0 -top-32 flex justify-center">
        <motion.div
          className="h-72 w-72 rounded-full bg-gradient-to-br from-primary-blue/15 via-primary-light/10 to-transparent blur-3xl"
          animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto max-w-7xl px-4 pt-28 pb-24 md:pt-32 md:pb-32">
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2.5fr)]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-blue/10 bg-white/60 px-3 py-1 text-xs font-medium text-primary-blue/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-blue" />
                <span>Cybersecurity Architecture • Risk & Resilience</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl leading-tight text-cyber-black md:text-5xl lg:text-6xl lg:leading-[1.05]">
                  Secure the systems<br className="hidden md:block" />
                  <span className="bg-gradient-to-r from-primary-blue to-primary-light bg-clip-text text-transparent">
                    that run your business.
                  </span>
                </h1>
                <p className="max-w-xl text-base text-gray-600/90 md:text-lg leading-relaxed">
                  I design and implement modern security architectures that harden cloud, data, and
                  application layers—turning complex threat landscapes into manageable, resilient
                  systems.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="#projects" className="sm:w-auto w-full">
                  <Button variant="primary" className="w-full sm:w-auto">
                    View security case studies
                  </Button>
                </a>
                <a href="#blog" className="sm:w-auto w-full">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Read cybersecurity insights
                  </Button>
                </a>
              </div>

              <SignalStrip
                className="mt-2"
                items={[
                  { label: 'ZERO_TRUST • EAST_WEST_SEGMENTED', tone: 'success' },
                  { label: 'ANOMALY_BLOCKED • LATERAL_MOVE', tone: 'warning' },
                  { label: 'DLP_ENFORCED • DATA_EGRESS', tone: 'info' },
                ]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative mx-auto max-w-md rounded-3xl border border-primary-blue/15 bg-white/80 p-6 shadow-soft backdrop-blur-sm">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium tracking-[0.22em] uppercase text-primary-blue/70">
                      Security posture snapshot
                    </p>
                    <p className="mt-1 text-sm text-gray-500">Representative client environment</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                    Risk ↓ 78%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-gray-500">Attack surface</p>
                    <p className="mt-2 text-2xl font-semibold text-cyber-black">42%</p>
                    <p className="mt-1 text-xs text-emerald-500">Reduced after zero‑trust rollout</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-gray-500">Detection coverage</p>
                    <p className="mt-2 text-2xl font-semibold text-cyber-black">99.1%</p>
                    <p className="mt-1 text-xs text-primary-blue">ML‑driven anomaly signals</p>
                  </div>
                  <div className="col-span-2 rounded-2xl bg-gradient-to-r from-primary-blue/10 via-primary-light/5 to-slate-50 p-4">
                    <p className="mb-3 text-xs font-medium text-gray-600">
                      Real‑time incident stream (sample)
                    </p>
                    <div className="flex flex-col gap-2 text-[11px] font-mono text-slate-700">
                      <div className="flex items-center justify-between rounded-full bg-white/70 px-3 py-1.5">
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          LOGIN_OK • SSO
                        </span>
                        <span className="text-[10px] text-gray-500">EU‑WEST‑1</span>
                      </div>
                      <div className="flex items-center justify-between rounded-full bg-white/70 px-3 py-1.5">
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          ANOMALY • LATERAL_MOVE_BLOCKED
                        </span>
                        <span className="text-[10px] text-gray-500">MITRE T1021</span>
                      </div>
                      <div className="flex items-center justify-between rounded-full bg-white/70 px-3 py-1.5">
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                          POLICY • DATA_EGRESS_GUARDED
                        </span>
                        <span className="text-[10px] text-gray-500">DLP ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
