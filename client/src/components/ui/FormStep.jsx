import { Check, CheckCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function FormStep({ steps, currentStep, children }) {
  const { isDark } = useTheme();
  return (
    <div className="w-1/2 mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    relative w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                    transition-all duration-300
                    ${index < currentStep 
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? `text-white ring-4 bg-[#2563eb] ${isDark ? 'ring-[#1d4ed8]/30' : 'ring-blue-100'}`
                      : `${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`
                    }
                  `}
                >
                  {index < currentStep ? (
                    <CheckCircle size={20} />
                  ) : (
                    <span>{index + 1 }</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-2 text-center">
                  <p
                    className={`
                      text-sm font-medium
                      ${index <= currentStep
                        ? `${isDark ? 'text-white' : 'text-gray-900'}`
                        : `${isDark ? 'text-gray-400' : 'text-gray-500'}`
                      }
                    `}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p
                      className={`
                        text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}
                     `}
                    >
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connecto Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-0.5 mt-8 transition-all duration-300
                    ${index < currentStep
                      ? 'bg-green-500'
                      : `${isDark ? 'bg-gray-700' : 'bg-gray-200'}`
                    }
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className={`rounded-lg border p-4 ${isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
        {children}
      </div>
    </div>
  )
}