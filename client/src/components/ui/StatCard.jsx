import { FileCode } from 'lucide-react';

export default function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    iconColor = 'bg-primary-500' // Default color
}) {
    return (
        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700'>
           {/* Card content container */}
           <div className="flex items-center justify-between">
                {/* Left side: Text content */}
                <div className="flex-1">
                    {/* Title/Label */}
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {title}
                    </p>

                    {/* Main value  */}
                    <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                        {value}
                    </p>

                    {/* Trend indicator */}
                    {
                        trend && (
                            <div className="mt-2 flex items-center gap-1">
                                {/* Arrow indicator - points up for positive, down for negative */}
                                <span className={trend.isPositive ? 'text-success-500' : 'text-red-500'}>
                                    {trend.isPositive ? '↑' : '↓'}
                                </span>

                                {/* Percentage value */}
                                <span className={`text-sm font-medium ${
                                    trend.isPositive ? 'text-success-500' : 'text-red-500'
                                }`}>
                                    {trend.value}
                                </span>

                                {/* Context text */}
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    vs last week
                                </span>
                            </div>
                        )
                    }
                </div>

                {/* Right side: Icon in a colored circle */}
                    <div className={`${iconColor} rounded-full p-3`}>
                        <Icon size={24} className='text-white' />
                    </div>
           </div>
        </div>
    )
}