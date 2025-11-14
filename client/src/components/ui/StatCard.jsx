import { useTheme } from '../../context/ThemeContext';
import { FileCode } from 'lucide-react';

export default function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    iconColor = 'bg-primary-500' // Default color
}) {
    const { isDark } = useTheme();
    
    return (
        <div className={`${isDark ? 'bg-[#121212] rounded-lg shadow-sm p-6 border border-gray-200 border-gray-700' : 'bg-white rounded-lg shadow-sm p-6 border border-gray-500'}`}>
           {/* Card content container */}
           <div className="flex items-center justify-between">
                {/* Left side: Text content */}
                <div className="flex-1">
                    {/* Title/Label */}
                    <p className={`${isDark ? 'text-gray-400 text-sm font-medium' : 'text-sm font-medium text-[#121212]'} `}>
                        {title}
                    </p>

                    {/* Main value  */}
                    <p className={`{${isDark ? 'mt-2 text-3xl font-semibold text-white' : 'mt-2 text-3xl font-semibold text-gray-900'}`}>
                        {value}
                    </p>

                    {/* Trend indicator */}
                    {
                        trend && (
                            <div className="mt-2 flex items-center gap-1">
                                {/* Arrow indicator - points up for positive, down for negative */}
                                <span className={trend.isPositive ? 'text-green-500' : 'text-red-500'}>
                                    {trend.isPositive ? '↑' : '↓'}
                                </span>

                                {/* Percentage value */}
                                <span className={`text-sm font-medium ${
                                    trend.isPositive ? 'text-green-500' : 'text-red-500'
                                }`}>
                                    {trend.value}
                                </span>

                                {/* Context text */}
                                <span className={`${isDark ? 'text-gray-400 text-sm' : 'text-sm text-[#121212]'}`}>
                                    vs last week
                                </span>
                            </div>
                        )
                    }
                </div>

                {/* Right side: Icon in a colored circle */}
                    <div className={`${iconColor} rounded-full p-3`}>
                        <Icon size={24} className={`${isDark ? 'text-white' : 'text-[#121212]'}`} />
                    </div>
           </div>
        </div>
    )
}