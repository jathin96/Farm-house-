import React from 'react'
import { Check, Lock } from 'lucide-react'

const steps = [
  { key: 1, label: 'Gate Entry', sub: 'Security' },
  { key: 2, label: 'Entry Approved', sub: 'Devaraj' },
  { key: 3, label: 'Trips & Pre-Close', sub: 'Security' },
  { key: 4, label: 'Pre-Close Approved', sub: 'Devaraj' },
  { key: 5, label: 'Bill Upload', sub: 'Sharath' },
  { key: 6, label: 'Fully Closed', sub: 'Devaraj' },
]

function getStepIndex(status) {
  switch (status) {
    case 'PENDING_ENTRY_APPROVAL':
      return 1
    case 'APPROVED_FOR_WORK':
      return 2
    case 'PENDING_PRECLOSE_APPROVAL':
      return 3
    case 'PENDING_BILLING':
      return 4
    case 'PENDING_FULL_CLOSE_APPROVAL':
      return 5
    case 'FULLY_CLOSED':
      return 6
    default:
      return 1
  }
}

export default function ProgressStepper({ status }) {
  const current = getStepIndex(status)
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex min-w-max items-center gap-2 px-1 py-1">
        {steps.map((step, idx) => {
          const done = current > step.key
          const active = current === step.key
          const locked = current < step.key
          return (
            <React.Fragment key={step.key}>
              <div className="flex items-center gap-3">
                <div
                  className={`relative flex h-10 w-10 items-center justify-center rounded-full transition ${
                    done
                      ? 'bg-emerald-500 text-white'
                      : active
                      ? 'bg-safety-500 text-slate-950 shadow-[0_0_0_6px_rgba(249,131,7,0.12)]'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {done ? <Check className="h-5 w-5" /> : locked ? <Lock className="h-4 w-4" /> : <span className="text-sm font-semibold">{step.key}</span>}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${active ? 'text-slate-900' : done ? 'text-slate-900' : 'text-slate-500'}`}>{step.label}</p>
                  <p className="text-xs text-slate-500">{step.sub}</p>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-px w-10 sm:w-14 ${current > step.key ? 'bg-emerald-400' : 'bg-slate-300'}`} />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
